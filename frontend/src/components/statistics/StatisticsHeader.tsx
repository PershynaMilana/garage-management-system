import React from "react";

const StatisticsHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-almost-white mb-6 font-mono">
        Statistics section
      </h1>
      <p className="text-[#87d7de] text-base max-w-3xl leading-relaxed font-light">
        In this section, you can view your statistics for your garage
        cooperative. You will be able to track number of debts, total amount of
        vacant garages, and other statistics for convenient and comfortable
        administration. For convenience, the statistics are provided in the form
        of graphs and cards, making it easy to analyze performance across
        different criteria.
      </p>
    </div>
  );
};

export default StatisticsHeader;
