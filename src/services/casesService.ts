import { FIRRecord } from '../types';
import { MOCK_FIRS } from '../data/mockData';

const LOCAL_STORAGE_KEY = 'ksp_cases_db_v1';

// Helper to get local cases fallback
function getStoredLocalCases(): FIRRecord[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse local stored cases:', e);
  }
  // Initialize local storage with mock data if empty
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_FIRS));
  } catch (e) {
    // Ignore storage write errors
  }
  return MOCK_FIRS;
}

function saveStoredLocalCases(cases: FIRRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cases));
  } catch (e) {
    console.error('Failed to save cases to local storage:', e);
  }
}

export const casesService = {
  /**
   * Fetch all cases from database
   */
  async getCases(searchQuery?: string, district?: string, status?: string): Promise<FIRRecord[]> {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.set('q', searchQuery);
      if (district && district !== 'ALL') queryParams.set('district', district);
      if (status && status !== 'ALL') queryParams.set('status', status);

      const res = await fetch(`/api/cases?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.firs)) {
          // Sync local storage as cache
          saveStoredLocalCases(data.firs);
          return data.firs;
        }
      }
    } catch (e) {
      console.warn('API connection offline, using persistent local cases cache:', e);
    }

    // Fallback to local storage
    let cases = getStoredLocalCases();

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      cases = cases.filter(c =>
        c.firNumber.toLowerCase().includes(q) ||
        c.crimeType.toLowerCase().includes(q) ||
        c.policeStation.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.complainantName.toLowerCase().includes(q) ||
        c.suspectsName.some(s => s.toLowerCase().includes(q)) ||
        c.ipcSections.some(i => i.toLowerCase().includes(q))
      );
    }

    if (district && district !== 'ALL') {
      cases = cases.filter(c => c.district === district);
    }

    if (status && status !== 'ALL') {
      cases = cases.filter(c => c.status === status);
    }

    return cases;
  },

  /**
   * Add a new case to database
   */
  async addCase(newCaseData: Partial<FIRRecord>): Promise<FIRRecord> {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' IST';
    const firNumber = newCaseData.firNumber?.trim() || `FIR/KSP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

    const fullCaseRecord: FIRRecord = {
      firNumber,
      policeStation: newCaseData.policeStation || 'Central Crime Branch (CCB), Bengaluru',
      district: newCaseData.district || 'Bengaluru Urban',
      ipcSections: newCaseData.ipcSections?.length ? newCaseData.ipcSections : ['Section 66D IT Act', 'IPC 420'],
      crimeType: newCaseData.crimeType || 'General Offense Investigation',
      dateReported: newCaseData.dateReported || timestamp,
      dateIncident: newCaseData.dateIncident || timestamp,
      status: newCaseData.status || 'UNDER_INVESTIGATION',
      priority: newCaseData.priority || 'HIGH',
      complainantName: newCaseData.complainantName || 'State Enforcement Wing',
      suspectsName: newCaseData.suspectsName?.length ? newCaseData.suspectsName : ['Unknown Accused'],
      victimName: newCaseData.victimName || 'Public Property / Citizen',
      stolenValueINR: newCaseData.stolenValueINR || '₹ 0',
      description: newCaseData.description || 'New case record registered in CaseIntel Database.',
      locationCoordinates: newCaseData.locationCoordinates || { lat: 12.9716, lng: 77.5946, address: 'Bengaluru Urban' },
      investigatingOfficer: newCaseData.investigatingOfficer || 'Inspector K. Vijay Kumar',
      evidenceItemsCount: newCaseData.evidenceItemsCount || 1,
      modusOperandiTag: newCaseData.modusOperandiTag || 'Standard Investigation Protocol'
    };

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullCaseRecord)
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.case) {
          // Sync with local storage
          const currentLocal = getStoredLocalCases();
          saveStoredLocalCases([data.case, ...currentLocal.filter(c => c.firNumber !== data.case.firNumber)]);
          return data.case;
        }
      }
    } catch (e) {
      console.warn('API offline when adding case, storing locally:', e);
    }

    // Save to local storage as fallback
    const localCases = getStoredLocalCases();
    const updatedLocal = [fullCaseRecord, ...localCases.filter(c => c.firNumber !== fullCaseRecord.firNumber)];
    saveStoredLocalCases(updatedLocal);
    return fullCaseRecord;
  },

  /**
   * Delete a case from database
   */
  async deleteCase(firNumber: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(firNumber)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const localCases = getStoredLocalCases();
        saveStoredLocalCases(localCases.filter(c => c.firNumber !== firNumber));
        return true;
      }
    } catch (e) {
      console.warn('API offline when deleting case, removing locally:', e);
    }

    const localCases = getStoredLocalCases();
    saveStoredLocalCases(localCases.filter(c => c.firNumber !== firNumber));
    return true;
  },

  /**
   * Request concise summary of a case from backend AI / Engine
   */
  async summarizeCase(firNumber: string): Promise<string> {
    try {
      const res = await fetch('/api/cases/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firNumber })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.summary) {
          return data.summary;
        }
      }
    } catch (e) {
      console.warn('Summarize API error, generating client summary:', e);
    }

    // Fallback Client Summary Generator
    const cases = getStoredLocalCases();
    const fir = cases.find(c => c.firNumber.toLowerCase() === firNumber.toLowerCase());

    if (!fir) {
      return `### 📑 Case Summary: ${firNumber}\n\n* **Record Status:** Record not found in local active database cache.`;
    }

    return `### 📑 Executive AI Brief: ${fir.firNumber}
**Category:** ${fir.crimeType}  
**Station & District:** ${fir.policeStation} (${fir.district})  
**Investigating Officer:** ${fir.investigatingOfficer}

#### 📌 Key Facts:
* **Offense / Sections:** ${fir.ipcSections.join(', ')}
* **Incident Summary:** ${fir.description}
* **Primary Suspects:** ${fir.suspectsName.join(', ')}
* **Complainant / Victim:** ${fir.complainantName} / ${fir.victimName}
* **Valuation / Financial Loss:** ${fir.stolenValueINR || 'N/A'}
* **Modus Operandi:** ${fir.modusOperandiTag}

#### 🛡️ Current Status & Action Items:
* **Status:** \`${fir.status}\` | **Priority:** \`${fir.priority}\`
* **Evidence Items Logged:** ${fir.evidenceItemsCount} files attached
* **Next Tactical Step:** Maintain digital surveillance and coordinate with district station unit.`;
  }
};
