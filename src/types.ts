export type NavigationTab = 
  | 'dashboard'
  | 'assistant'
  | 'database'
  | 'evidence'
  | 'cases'
  | 'suspects'
  | 'reports'
  | 'analytics'
  | 'settings';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type CaseStatus = 'UNDER_INVESTIGATION' | 'CHARGE_SHEET_FILED' | 'SUSPECT_DETAINED' | 'CLOSED_SOLVED' | 'COLD_CASE';

export interface FIRRecord {
  firNumber: string;
  policeStation: string;
  district: string;
  ipcSections: string[];
  crimeType: string;
  dateReported: string;
  dateIncident: string;
  status: CaseStatus;
  priority: PriorityLevel;
  complainantName: string;
  suspectsName: string[];
  victimName: string;
  stolenValueINR?: string;
  description: string;
  locationCoordinates: { lat: number; lng: number; address: string };
  investigatingOfficer: string;
  evidenceItemsCount: number;
  modusOperandiTag: string;
}

export interface SuspectProfile {
  id: string;
  fullName: string;
  alias: string;
  age: number;
  gender: string;
  status: 'WANTED' | 'IN_CUSTODY' | 'UNDER_SURVEILLANCE' | 'ABSPONDING';
  rewardINR: string;
  crimeSpecialization: string;
  associatedFIRs: string[];
  lastKnownLocation: string;
  photoUrl: string;
  fingerprintId: string;
  biometricScore: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
}

export interface InvestigationTimelineEvent {
  id: string;
  caseId: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'FIR_FILED' | 'EVIDENCE_COLLECTED' | 'SUSPECT_SPOTTED' | 'FORENSIC_MATCH' | 'INTERROGATION' | 'CHARGE_SHEET';
  officerInCharge: string;
  location: string;
  verified: boolean;
}

export interface SmartAlert {
  id: string;
  timestamp: string;
  type: 'MO_MATCH' | 'HIGH_ALERT' | 'FORENSIC_HIT' | 'HOTSPOT_SPIKE';
  title: string;
  message: string;
  caseReference?: string;
  district: string;
  severity: 'CRITICAL' | 'HIGH' | 'INFO';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  groundingData?: {
    firsMatched?: FIRRecord[];
    suspectsMatched?: SuspectProfile[];
    insights?: string[];
    suggestedActions?: string[];
    modusOperandiAlert?: string;
  };
  attachments?: { name: string; type: string; url?: string }[];
  isStreaming?: boolean;
}

export interface PoliceOfficer {
  badgeId: string;
  name: string;
  rank: string;
  unit: string;
  station: string;
  district: string;
  avatarUrl: string;
  casesLed: number;
  clearanceRate: string;
}

export type HotspotLocation = {
  id: string;
  areaName: string;
  district: string;
  crimeCount: number;
  dominantCrime: string;
  riskLevel: 'VERY_HIGH' | 'HIGH' | 'MODERATE';
  coordinates: [number, number];
};

export type AppTheme = 'liquid-glass' | 'minimal-light' | 'midnight-obsidian' | 'cyber-slate';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  description: string;
  isDark: boolean;
  accentColor: string;
  badgeTag: string;
}

