import React from "react";
import { useTranslation } from 'react-i18next';
import StatCard from "./StatCard.tsx";
import PeriodSelector from "./PeriodSelector.tsx";
import {statisticsData} from "../../data/statisticsData.ts";

interface GeneralStatisticsProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const GeneralStatistics: React.FC<GeneralStatisticsProps> = ({
                                                               selectedPeriod,
                                                               onPeriodChange,
                                                             }) => {
  const { t } = useTranslation();
  const currentData = statisticsData[selectedPeriod];

  const statsData = [
    {
      value: currentData.vacantGarages.toString(),
      label: t('statistics.general.vacantGarages'),
    },
    {
      value: currentData.totalDebt.toLocaleString(),
      label: t('statistics.general.totalDebt'),
    },
    {
      value: `${currentData.activeMembers}%`,
      label: t('statistics.general.activeMembers'),
    },
    {
      value: currentData.membersWithDebts.toString(),
      label: t('statistics.general.membersWithDebts'),
    },
  ];

  return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium text-[#87d7de] font-mono tracking-wide">
            {t('statistics.general.title')}
          </h2>
          <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={onPeriodChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statsData.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
  );
};

export default GeneralStatistics;