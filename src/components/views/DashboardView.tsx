import React from 'react';
import { StatsOverview } from '../dashboard/StatsOverview';
import { SmartAlertsBanner } from '../dashboard/SmartAlertsBanner';
import { InvestigationAssistant } from '../chat/InvestigationAssistant';
import { TimelineView } from '../dashboard/TimelineView';
import { AnalyticsCharts } from '../dashboard/AnalyticsCharts';
import { FIRRecord, SuspectProfile } from '../../types';

interface DashboardViewProps {
  onOpenVoiceInput: () => void;
  onOpenUploader: () => void;
  onSelectCase: (fir: FIRRecord) => void;
  onSelectSuspect: (suspect: SuspectProfile) => void;
  searchQuery?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenVoiceInput,
  onOpenUploader,
  onSelectCase,
  onSelectSuspect,
  searchQuery
}) => {
  return (
    <div className="space-y-5 pb-10">
      {/* Top Smart Alert Ticker */}
      <SmartAlertsBanner onSelectAlert={() => {}} />

      {/* Key Metric Cards */}
      <StatsOverview />

      {/* Primary Centerpiece: Conversational Investigation Assistant */}
      <div className="h-[600px] my-6">
        <InvestigationAssistant
          onOpenVoiceInput={onOpenVoiceInput}
          onOpenUploader={onOpenUploader}
          onSelectCase={onSelectCase}
          onSelectSuspect={onSelectSuspect}
          initialQuery={searchQuery}
        />
      </div>

      {/* Recharts Analytics Charts */}
      <AnalyticsCharts />

      {/* Chronological Investigation Timeline */}
      <TimelineView />
    </div>
  );
};
