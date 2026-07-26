import { FIRRecord, SuspectProfile, InvestigationTimelineEvent, SmartAlert, PoliceOfficer, HotspotLocation } from '../types';

export const CURRENT_OFFICER: PoliceOfficer = {
  badgeId: "KSP-IPS-2021-884",
  name: "Inspector K. Vijay Kumar",
  rank: "Circle Inspector",
  unit: "Central Crime Branch (CCB) - Cyber & Organized Crime",
  station: "CCB Headquarters, Nrupatunga Road",
  district: "Bengaluru City",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  casesLed: 142,
  clearanceRate: "89.4%"
};

export const MOCK_FIRS: FIRRecord[] = [
  {
    firNumber: "FIR/CCB/2026/2401",
    policeStation: "Cyber Crime PS, Bengaluru City",
    district: "Bengaluru Urban",
    ipcSections: ["Section 66D IT Act", "IPC 420", "IPC 468", "BNS 318"],
    crimeType: "Cyber Financial Fraud & Ransomware",
    dateReported: "2026-07-22 14:30 IST",
    dateIncident: "2026-07-21 23:15 IST",
    status: "UNDER_INVESTIGATION",
    priority: "CRITICAL",
    complainantName: "FinTech Systems India Pvt Ltd",
    suspectsName: ["ShadowBytes Cyber Syndicate", "Arjun 'Crypto' Varma"],
    victimName: "Global Digital Payments Gateway",
    stolenValueINR: "₹ 3,45,00,000",
    description: "Unauthorized API injection targeting central bank payment router. Malware signature matches 'DarkPhish-3' strain previously flagged in Mysuru financial fraud cases.",
    locationCoordinates: { lat: 12.9716, lng: 77.5946, address: "MG Road, Bengaluru Urban" },
    investigatingOfficer: "Inspector K. Vijay Kumar",
    evidenceItemsCount: 18,
    modusOperandiTag: "API Injection via Compromised Admin Credentials & USDT Tumbler"
  },
  {
    firNumber: "FIR/IND/2026/1892",
    policeStation: "Indiranagar PS, Bengaluru City",
    district: "Bengaluru Urban",
    ipcSections: ["IPC 392", "IPC 395", "IPC 397", "BNS 309"],
    crimeType: "Armed Robbery & Gold Heist",
    dateReported: "2026-07-20 09:15 IST",
    dateIncident: "2026-07-20 02:40 IST",
    status: "SUSPECT_DETAINED",
    priority: "HIGH",
    complainantName: "Rajesh Soni (Swarna Jewellers)",
    suspectsName: ["Vikram 'Raja' Gowda", "Siddharth 'Snake' Naik"],
    victimName: "Swarna Jewellers Showroom",
    stolenValueINR: "₹ 1,80,00,000",
    description: "Four masked suspects breached rear security grid using thermal torch, cut alarm relays, and seized 2.4kg raw gold bullion before escaping on stolen KTM motorcycles.",
    locationCoordinates: { lat: 12.9784, lng: 77.6408, address: "100 Feet Road, Indiranagar, Bengaluru" },
    investigatingOfficer: "Sub-Inspector M. Ramesh",
    evidenceItemsCount: 24,
    modusOperandiTag: "Thermal Torch Vault Cutting & Stolen Bike Getaway"
  },
  {
    firNumber: "FIR/MNG/2026/0941",
    policeStation: "Panambur PS, Mangaluru",
    district: "Dakshina Kannada",
    ipcSections: ["NDPS Act 20(b)", "IPC 120B", "BNS 61"],
    crimeType: "Narcotics Trafficking & Maritime Smuggling",
    dateReported: "2026-07-18 22:10 IST",
    dateIncident: "2026-07-18 19:30 IST",
    status: "UNDER_INVESTIGATION",
    priority: "CRITICAL",
    complainantName: "Coast Guard Intelligence Wing",
    suspectsName: ["Rashid 'Ocean' Al-Mansoori", "Kiran Hegde"],
    victimName: "State Security",
    stolenValueINR: "₹ 12,00,00,000",
    description: "Interception of mechanized fishing vessel carrying 45 kg high-grade hydroponic cannabis and synthetic amphetamines concealed inside double-bottomed ice holds.",
    locationCoordinates: { lat: 12.9520, lng: 74.8080, address: "Panambur Port Outer Anchorage, Mangaluru" },
    investigatingOfficer: "ACP B. Suresh Nayak",
    evidenceItemsCount: 31,
    modusOperandiTag: "High-Sea Vessel Ship-to-Ship Transfer with GPS Beaconing"
  },
  {
    firNumber: "FIR/MYS/2026/1120",
    policeStation: "Lashkar PS, Mysuru City",
    district: "Mysuru",
    ipcSections: ["IPC 302", "IPC 201", "BNS 103"],
    crimeType: "Homicide & Syndicate Contract Strike",
    dateReported: "2026-07-15 06:45 IST",
    dateIncident: "2026-07-15 01:20 IST",
    status: "CHARGE_SHEET_FILED",
    priority: "CRITICAL",
    complainantName: "Sanjay Prasad",
    suspectsName: ["Nagaraj 'Bullet' Anna", "Syed Zeeshan"],
    victimName: "Anand Murthy (Real Estate Developer)",
    description: "Victim targeted outside private estate by two assailants on unnumbered scooter using 7.65mm unregistered firearm. Shell casings match weapon from 2024 Hubballi gang case.",
    locationCoordinates: { lat: 12.3052, lng: 76.6552, address: "Chamundi Hill Road, Mysuru" },
    investigatingOfficer: "Inspector Devraj Patil",
    evidenceItemsCount: 14,
    modusOperandiTag: "Drive-by Shooting with 7.65mm Country-made Firearm"
  },
  {
    firNumber: "FIR/HBL/2026/0655",
    policeStation: "Suburban PS, Hubballi-Dharwad",
    district: "Dharwad",
    ipcSections: ["IPC 379", "IPC 411", "BNS 303"],
    crimeType: "Organized Heavy Vehicle Theft Ring",
    dateReported: "2026-07-12 11:00 IST",
    dateIncident: "2026-07-11 23:45 IST",
    status: "CLOSED_SOLVED",
    priority: "MEDIUM",
    complainantName: "VRL Logistics Fleet Operations",
    suspectsName: ["Mahesh 'Mechanic' Patil"],
    victimName: "VRL Logistics Fleet",
    stolenValueINR: "₹ 65,00,00,0",
    description: "Interstate theft ring bypassing GPS scramblers on Ashok Leyland multi-axle trucks using frequency jammers and fake chassis number etching.",
    locationCoordinates: { lat: 15.3647, lng: 75.1240, address: "National Highway 48 Bypass, Hubballi" },
    investigatingOfficer: "Inspector P. Shivaswamy",
    evidenceItemsCount: 9,
    modusOperandiTag: "GPS Frequency Jammer & Chassis Re-stamping Workshop"
  },
  {
    firNumber: "FIR/WFD/2026/3012",
    policeStation: "Whitefield Tech PS, Bengaluru",
    district: "Bengaluru Urban",
    ipcSections: ["IPC 384", "Section 66 IT Act", "BNS 308"],
    crimeType: "Deepfake Extortion & Cyber Blackmail",
    dateReported: "2026-07-24 10:15 IST",
    dateIncident: "2026-07-23 18:00 IST",
    status: "UNDER_INVESTIGATION",
    priority: "HIGH",
    complainantName: "Dr. Ananya Rao",
    suspectsName: ["Digital Syndicate 'X-Ghost'", "Unknown Crypto Operator"],
    victimName: "Dr. Ananya Rao & 12 Senior Tech Executives",
    stolenValueINR: "₹ 45,00,000",
    description: "Perpetrators generated hyper-realistic voice deepfakes and manipulated video logs of corporate leadership to demand immediate Monero ransom.",
    locationCoordinates: { lat: 12.9698, lng: 77.7499, address: "ITPL Main Road, Whitefield, Bengaluru" },
    investigatingOfficer: "Inspector K. Vijay Kumar",
    evidenceItemsCount: 12,
    modusOperandiTag: "Generative AI Voice Cloning & Monero Crypto Extortion"
  }
];

export const MOCK_SUSPECTS: SuspectProfile[] = [
  {
    id: "SUS-KAR-001",
    fullName: "Arjun 'Crypto' Varma",
    alias: "GhostCode / ByteLord",
    age: 32,
    gender: "Male",
    status: "WANTED",
    rewardINR: "₹ 10,00,000",
    crimeSpecialization: "Cyber Heist & Banking API Exploits",
    associatedFIRs: ["FIR/CCB/2026/2401", "FIR/WFD/2026/3012"],
    lastKnownLocation: "Koramangala 4th Block / Dubai VPN Proxy Node",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    fingerprintId: "FP-KAR-9821-X",
    biometricScore: 98.6,
    threatLevel: "CRITICAL"
  },
  {
    id: "SUS-KAR-002",
    fullName: "Vikram 'Raja' Gowda",
    alias: "Gold Raja / Phantom",
    age: 38,
    gender: "Male",
    status: "IN_CUSTODY",
    rewardINR: "₹ 5,00,000",
    crimeSpecialization: "Armed Commercial Robbery & Laser Safe Breaching",
    associatedFIRs: ["FIR/IND/2026/1892"],
    lastKnownLocation: "Central Prison Parappana Agrahara, Bengaluru",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    fingerprintId: "FP-KAR-4102-A",
    biometricScore: 99.1,
    threatLevel: "HIGH"
  },
  {
    id: "SUS-KAR-003",
    fullName: "Rashid 'Ocean' Al-Mansoori",
    alias: "Captain Rashid / Coast Phantom",
    age: 44,
    gender: "Male",
    status: "ABSPONDING",
    rewardINR: "₹ 25,00,000",
    crimeSpecialization: "International Maritime Syndicate & High-Sea Smuggling",
    associatedFIRs: ["FIR/MNG/2026/0941"],
    lastKnownLocation: "International Waters / Muscat-Goa Belt",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    fingerprintId: "FP-INTERPOL-7711",
    biometricScore: 94.2,
    threatLevel: "CRITICAL"
  },
  {
    id: "SUS-KAR-004",
    fullName: "Nagaraj 'Bullet' Anna",
    alias: "Bullet Nagi / 7.65 King",
    age: 41,
    gender: "Male",
    status: "UNDER_SURVEILLANCE",
    rewardINR: "₹ 15,00,000",
    crimeSpecialization: "Targeted Contract Killing & Illegal Firearms Supply",
    associatedFIRs: ["FIR/MYS/2026/1120"],
    lastKnownLocation: "Srirangapatna Border, Mandya District",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    fingerprintId: "FP-KAR-1209-Z",
    biometricScore: 97.4,
    threatLevel: "HIGH"
  }
];

export const MOCK_TIMELINE_EVENTS: InvestigationTimelineEvent[] = [
  {
    id: "TL-001",
    caseId: "FIR/CCB/2026/2401",
    timestamp: "2026-07-25 06:15 IST",
    title: "Dark Web Wallet Movement Flagged",
    description: "Cyber Intelligence Node detected 420 Monero coins transferred from FinTech breach address to an offshore mixer in Eastern Europe.",
    category: "FORENSIC_MATCH",
    officerInCharge: "Inspector K. Vijay Kumar",
    location: "Cyber Crime HQ, Bengaluru",
    verified: true
  },
  {
    id: "TL-002",
    caseId: "FIR/IND/2026/1892",
    timestamp: "2026-07-24 21:40 IST",
    title: "Gold Melt Vault Recovery in Peenya",
    description: "Special Strike Force raided unmapped industrial shed in Peenya Phase 2; seized 1.8kg melted gold bars and thermal cutting tools.",
    category: "EVIDENCE_COLLECTED",
    officerInCharge: "ACP S. Harish",
    location: "Peenya Industrial Area, Bengaluru",
    verified: true
  },
  {
    id: "TL-003",
    caseId: "FIR/MNG/2026/0941",
    timestamp: "2026-07-24 16:10 IST",
    title: "Satellite Telemetry Intercepted",
    description: "Thuraya satellite phone chatter intercepted confirming secondary landing site at Bhatkal port outer jetty.",
    category: "SUSPECT_SPOTTED",
    officerInCharge: "Inspector N. Coast Intelligence",
    location: "Panambur Coast, Mangaluru",
    verified: true
  },
  {
    id: "TL-004",
    caseId: "FIR/MYS/2026/1120",
    timestamp: "2026-07-23 11:30 IST",
    title: "Ballistics Lab Matching Confirmation",
    description: "FSL Madiwala confirmed 7.65mm bullet rifling grooves strictly match weapon confiscated from 2024 Gang War suspect.",
    category: "FORENSIC_MATCH",
    officerInCharge: "Dr. Sunitha FSL Expert",
    location: "Forensic Science Lab, Madiwala",
    verified: true
  }
];

export const MOCK_SMART_ALERTS: SmartAlert[] = [
  {
    id: "ALT-2026-901",
    timestamp: "10 mins ago",
    type: "MO_MATCH",
    title: "Modus Operandi Pattern Alert",
    message: "High similarity (94.2%) detected between FIR 2401 (Bengaluru) and FIR 1129 (Hyderabad Cyber Crime) involving USDT Mixer routes.",
    caseReference: "FIR/CCB/2026/2401",
    district: "Bengaluru Urban",
    severity: "CRITICAL"
  },
  {
    id: "ALT-2026-882",
    timestamp: "35 mins ago",
    type: "HIGH_ALERT",
    title: "Wanted Suspect CCTV Facial Match",
    message: "ANPR Camera #CCB-402 at Electronic City Toll Plaza flagged high-probability facial hit for Arjun Varma (88.4% match score).",
    caseReference: "SUS-KAR-001",
    district: "Bengaluru South",
    severity: "CRITICAL"
  },
  {
    id: "ALT-2026-741",
    timestamp: "2 hours ago",
    type: "HOTSPOT_SPIKE",
    title: "Cyber Extortion Cluster Spike",
    message: "12 high-value WhatsApp voice deepfake extortion reports filed in Whitefield & Bellandur IT corridor in last 24 hours.",
    caseReference: "FIR/WFD/2026/3012",
    district: "Bengaluru East",
    severity: "HIGH"
  }
];

export const MOCK_HOTSPOTS: HotspotLocation[] = [
  {
    id: "HS-01",
    areaName: "Koramangala & Indiranagar",
    district: "Bengaluru City",
    crimeCount: 384,
    dominantCrime: "Cyber Fraud & Night Robbery",
    riskLevel: "VERY_HIGH",
    coordinates: [12.9352, 77.6245]
  },
  {
    id: "HS-02",
    areaName: "Whitefield & Electronic City",
    district: "Bengaluru City",
    crimeCount: 298,
    dominantCrime: "Deepfake Financial Extortion",
    riskLevel: "HIGH",
    coordinates: [12.9698, 77.7499]
  },
  {
    id: "HS-03",
    areaName: "Panambur Port Jetty",
    district: "Mangaluru",
    crimeCount: 142,
    dominantCrime: "Maritime Narcotics Transit",
    riskLevel: "VERY_HIGH",
    coordinates: [12.9520, 74.8080]
  },
  {
    id: "HS-04",
    areaName: "Lashkar & Chamundi Corridor",
    district: "Mysuru City",
    crimeCount: 189,
    dominantCrime: "Targeted Extortion & Firearms",
    riskLevel: "HIGH",
    coordinates: [12.3052, 76.6552]
  }
];

export const MOCK_ANALYTICS_DATA = {
  monthlyTrends: [
    { month: "Jan", solved: 940, pending: 180, total: 1120 },
    { month: "Feb", solved: 1020, pending: 150, total: 1170 },
    { month: "Mar", solved: 1180, pending: 210, total: 1390 },
    { month: "Apr", solved: 1250, pending: 190, total: 1440 },
    { month: "May", solved: 1310, pending: 220, total: 1530 },
    { month: "Jun", solved: 1420, pending: 160, total: 1580 },
    { month: "Jul", solved: 1540, pending: 140, total: 1680 }
  ],
  crimeDistribution: [
    { name: "Cyber Crime & FinTech Fraud", value: 38, color: "#06b6d4" },
    { name: "Armed Robbery & Heists", value: 22, color: "#3b82f6" },
    { name: "Narcotics Trafficking", value: 18, color: "#8b5cf6" },
    { name: "Homicide & Syndicate Strikes", value: 12, color: "#ef4444" },
    { name: "Vehicle & Fleet Theft", value: 10, color: "#f59e0b" }
  ],
  districtBreakdown: [
    { district: "Bengaluru Urban", cases: 5420, clearance: 88.2 },
    { district: "Mysuru City", cases: 2100, clearance: 85.4 },
    { district: "Mangaluru / Dakshina Kannada", cases: 1890, clearance: 82.1 },
    { district: "Hubballi-Dharwad", cases: 1650, clearance: 86.9 },
    { district: "Belagavi", cases: 1420, clearance: 84.0 },
    { district: "Kalaburagi", cases: 1180, clearance: 80.5 }
  ]
};

export const INITIAL_SUGGESTED_PROMPTS = [
  "Show all robbery cases from Bengaluru.",
  "Find crimes involving the same suspect modus operandi.",
  "Summarize FIR number 2401.",
  "List cybercrime cases from this week.",
  "Find similar murder cases with 7.65mm weapon match.",
  "Generate investigation summary for Case #FIR/CCB/2026/2401."
];
