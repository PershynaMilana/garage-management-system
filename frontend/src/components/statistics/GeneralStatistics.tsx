import React from "react";
import StatCard from "./StatCard.tsx";
import PeriodSelector from "./PeriodSelector.tsx";
import { statisticsData } from "../../data/StatisticsData.ts";

interface GeneralStatisticsProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const GeneralStatistics: React.FC<GeneralStatisticsProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const currentData = statisticsData[selectedPeriod];

  const statsData = [
    {
      value: currentData.vacantGarages.toString(),
      label: "Total amount of vacant garages",
    },
    {
      value: currentData.totalDebt.toLocaleString(),
      label: "Total number of debt",
    },
    {
      value: `${currentData.activeMembers}%`,
      label: "Percentage of active members",
    },
    {
      value: currentData.membersWithDebts.toString(),
      label: "Number of members with debts",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-[#87d7de] font-mono tracking-wide">
          general statistics
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
