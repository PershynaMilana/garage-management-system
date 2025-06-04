import React, { useState } from "react";
import PageLayout from "../../components/layout/PageLayout.tsx";
import StatisticsHeader from "../../components/statistics/StatisticsHeader.tsx";
import GeneralStatistics from "../../components/statistics/GeneralStatistics.tsx";
import StatisticsChart from "../../components/statistics/StatisticsChart.tsx";

const StatisticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("ALL");
  const [selectedChart, setSelectedChart] = useState<string>("Y");

  return (
    <PageLayout>
      <div className="min-h-screen text-almost-white">
        {/* Header */}
        <div className="px-4 md:px-8 pt-12 pb-8">
          <StatisticsHeader />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Statistics cards */}
            <div className="flex-1">
              <GeneralStatistics
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            </div>

            {/* Right side - Chart */}
            <div className="lg:w-[500px]">
              <StatisticsChart
                selectedPeriod={selectedChart}
                onPeriodChange={setSelectedChart}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StatisticsPage;
