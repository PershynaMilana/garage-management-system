import React from "react";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const periods = ["D", "W", "M", "Y", "ALL"];

  return (
    <div className="flex bg-[#1a2332] rounded-lg p-1">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            selectedPeriod === period
              ? "bg-[#4e6b8c] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
