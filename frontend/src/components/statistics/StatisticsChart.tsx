import React from "react";
import { statisticsData } from "../../data/StatisticsData.ts";

interface StatisticsChartProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const periods = ["D", "W", "M", "Y", "ALL"];
  const currentData = statisticsData[selectedPeriod];
  const chartData = currentData.chartData;

  // Generate SVG points for lines with proper scaling
  const generatePoints = (key: "correctAnswers" | "completionSpeed") => {
    if (chartData.length === 0) return "";

    // Find min and max values for better scaling
    const values = chartData.map((point) => point[key]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Add some padding (10% on each side)
    const padding = (maxValue - minValue) * 0.1;
    const scaledMin = Math.max(0, minValue - padding);
    const scaledMax = maxValue + padding;

    return chartData
      .map((point, index) => {
        const x =
          chartData.length === 1 ? 50 : (index / (chartData.length - 1)) * 100;
        const normalizedValue =
          (point[key] - scaledMin) / (scaledMax - scaledMin);
        const y = 100 - normalizedValue * 100;
        return `${x},${Math.max(0, Math.min(100, y))}`;
      })
      .join(" ");
  };

  const blueLinePoints = generatePoints("correctAnswers");
  const greenLinePoints = generatePoints("completionSpeed");

  return (
    <div className="bg-[#2a3f5f]/40 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 p-4">
      {/* Chart header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-400 text-sm">Frame 1000001802</div>
        <div className="flex bg-[#1a2332] rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => onPeriodChange(period)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                selectedPeriod === period
                  ? "bg-[#4e6b8c] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="relative h-64 bg-[#1a2332] rounded-lg p-4">
        {/* Left Y-axis labels */}
        <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-xs text-gray-400">
          <span>%</span>
          <span>100</span>
          <span>90</span>
          <span>80</span>
          <span>70</span>
          <span>60</span>
          <span>50</span>
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>

        {/* Right Y-axis labels */}
        <div className="absolute right-2 top-4 bottom-8 flex flex-col justify-between text-xs text-gray-400">
          <span>min</span>
          <span>30</span>
          <span>25</span>
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Chart SVG */}
        <div className="absolute inset-4">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Horizontal grid lines */}
            {Array.from({ length: 11 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="#374151"
                strokeWidth="0.2"
                strokeDasharray="1,1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Vertical grid lines */}
            {chartData.map((_, i) => {
              const x =
                chartData.length === 1
                  ? 50
                  : (i / (chartData.length - 1)) * 100;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="100"
                  stroke="#374151"
                  strokeWidth="0.2"
                  strokeDasharray="1,1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {/* Blue line (% of correct answers) */}
            {blueLinePoints && (
              <polyline
                fill="none"
                stroke="#4a90e2"
                strokeWidth="1"
                points={blueLinePoints}
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* Green line (task completion speed) */}
            {greenLinePoints && (
              <polyline
                fill="none"
                stroke="#50c878"
                strokeWidth="1"
                points={greenLinePoints}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-1 left-8 right-8 flex justify-between text-xs text-gray-400">
          {chartData.map((point, index) => (
            <span key={index} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#4a90e2] rounded-sm"></div>
          <span className="text-gray-400">% of correct answers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#50c878] rounded-sm"></div>
          <span className="text-gray-400">task completion speed</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
