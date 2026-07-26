import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { RightPanel } from './components/layout/RightPanel';
import { MobileNav } from './components/layout/MobileNav';
import { ParticleBackground } from './components/layout/ParticleBackground';
import { DashboardView } from './components/views/DashboardView';
import { DatabaseView } from './components/views/DatabaseView';
import { EvidenceSearchView } from './components/views/EvidenceSearchView';
import { ActiveCasesView } from './components/views/ActiveCasesView';
import { SuspectsView } from './components/views/SuspectsView';
import { ReportsView } from './components/views/ReportsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { InvestigationAssistant } from './components/chat/InvestigationAssistant';
import { VoiceInputDialog } from './components/chat/VoiceInputDialog';
import { EvidenceUploaderModal } from './components/chat/EvidenceUploaderModal';
import { PoliceLoginModal } from './components/auth/PoliceLoginModal';
import { NavigationTab, FIRRecord, SuspectProfile, PoliceOfficer } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CURRENT_OFFICER } from './data/mockData';

function AppContent() {
  const { config } = useTheme();
  const [currentOfficer, setCurrentOfficer] = useState<PoliceOfficer | null>(() => {
    const saved = localStorage.getItem('ksp_officer_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CURRENT_OFFICER;
      }
    }
    return CURRENT_OFFICER;
  });

  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Mobile drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileRightPanelOpen, setMobileRightPanelOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeQueryForAi, setActiveQueryForAi] = useState<string>('');

  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);

  const handleLoginSuccess = (officer: PoliceOfficer, startFresh: boolean) => {
    setCurrentOfficer(officer);
    setIsLoggedOut(false);
    localStorage.setItem('ksp_officer_session', JSON.stringify(officer));

    if (startFresh) {
      setActiveQueryForAi('');
      setSearchQuery('');
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
    localStorage.removeItem('ksp_officer_session');
  };

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveQueryForAi(searchQuery);
    setActiveTab('assistant');
  };

  const handleAskAi = (query: string) => {
    setActiveQueryForAi(query);
    setActiveTab('assistant');
  };

  const handleSelectCase = (fir: FIRRecord) => {
    setActiveQueryForAi(`Summarize FIR ${fir.firNumber} and list primary suspects and evidence collected.`);
    setActiveTab('assistant');
  };

  const handleSelectSuspect = (suspect: SuspectProfile) => {
    setActiveQueryForAi(`Find all crimes, FIRs, and modus operandi linked to suspect ${suspect.fullName} (${suspect.alias}).`);
    setActiveTab('assistant');
  };

  const handleVoiceSubmit = (transcript: string) => {
    setActiveQueryForAi(transcript);
    setActiveTab('assistant');
  };

  const handleUploadProcessed = (summaryText: string) => {
    setActiveQueryForAi(summaryText);
    setActiveTab('assistant');
  };

  const officerToDisplay = currentOfficer || CURRENT_OFFICER;

  return (
    <div className={`relative min-h-screen flex font-sans overflow-hidden antialiased transition-colors duration-300 ${
      config.isDark ? 'bg-[#090d16] text-slate-100 dark' : 'bg-slate-50/80 text-slate-900'
    }`}>
      {/* Visual Background Canvas */}
      <ParticleBackground />

      {/* Police Auth Login Screen Modal Overlay */}
      <AnimatePresence>
        {(isLoggedOut || !currentOfficer) && (
          <PoliceLoginModal onLoginSuccess={handleLoginSuccess} />
        )}
      </AnimatePresence>

      {/* Left Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        currentOfficer={officerToDisplay}
        onLogout={handleLogout}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Center Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden z-10">
        {/* Top Header */}
        <Header
          onOpenVoiceInput={() => setIsVoiceOpen(true)}
          onOpenUploader={() => setIsUploaderOpen(true)}
          onOpenNewReport={() => {
            setActiveQueryForAi("Generate a blank FIR registration template for Karnataka State Police.");
            setActiveTab('assistant');
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleGlobalSearchSubmit}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenMobileRightPanel={() => setMobileRightPanelOpen(true)}
        />

        {/* Content View Container with Animated Transitions */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 pb-20 md:pb-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'dashboard' && (
                <DashboardView
                  onOpenVoiceInput={() => setIsVoiceOpen(true)}
                  onOpenUploader={() => setIsUploaderOpen(true)}
                  onSelectCase={handleSelectCase}
                  onSelectSuspect={handleSelectSuspect}
                  searchQuery={activeQueryForAi}
                />
              )}

              {activeTab === 'assistant' && (
                <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
                  <InvestigationAssistant
                    onOpenVoiceInput={() => setIsVoiceOpen(true)}
                    onOpenUploader={() => setIsUploaderOpen(true)}
                    onSelectCase={handleSelectCase}
                    onSelectSuspect={handleSelectSuspect}
                    initialQuery={activeQueryForAi}
                  />
                </div>
              )}

              {activeTab === 'database' && (
                <DatabaseView onSelectCase={handleSelectCase} onAskAi={handleAskAi} />
              )}

              {activeTab === 'evidence' && (
                <EvidenceSearchView />
              )}

              {activeTab === 'cases' && (
                <ActiveCasesView onSelectCase={handleSelectCase} onAskAi={handleAskAi} />
              )}

              {activeTab === 'suspects' && (
                <SuspectsView onSelectSuspect={handleSelectSuspect} />
              )}

              {activeTab === 'reports' && (
                <ReportsView />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView />
              )}

              {activeTab === 'settings' && (
                <SettingsView />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Right Intelligence Panel (Desktop + Mobile Drawer) */}
      <RightPanel
        onSelectCase={handleSelectCase}
        onSelectSuspect={handleSelectSuspect}
        mobileOpen={mobileRightPanelOpen}
        setMobileOpen={setMobileRightPanelOpen}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Voice Assistant Modal */}
      <VoiceInputDialog
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceSubmit={handleVoiceSubmit}
      />

      {/* FIR Evidence Scanner Modal */}
      <EvidenceUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUploadProcessed={handleUploadProcessed}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
