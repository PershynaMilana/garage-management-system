import React from "react";
import {ChartPoint, statisticsData} from "../../data/statisticsData.ts";


interface ChartAreaProps {
  selectedPeriod: string;
}

const ChartArea: React.FC<ChartAreaProps> = ({ selectedPeriod }) => {
  const currentData = statisticsData[selectedPeriod];
  const chartData = currentData.chartData;

  // Generate SVG path for lines
  const generatePath = (
    data: ChartPoint[],
    key: "correctAnswers" | "completionSpeed"
  ) => {
    const maxValue = key === "correctAnswers" ? 100 : 30;
    const points = data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (point[key] / maxValue) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return points;
  };

  const blueLinePoints = generatePath(chartData, "correctAnswers");
  const greenLinePoints = generatePath(chartData, "completionSpeed");

  return (
    <div className="relative h-64 bg-[#1a2332] rounded-lg p-4">
      {/* Y-axis labels */}
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

      {/* Grid lines and chart */}
      <div className="absolute inset-4">
        <svg className="w-full h-full">
          {/* Horizontal grid lines */}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={`${(i * 100) / 10}%`}
              x2="100%"
              y2={`${(i * 100) / 10}%`}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Vertical grid lines */}
          {Array.from({ length: chartData.length }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={`${(i * 100) / (chartData.length - 1)}%`}
              y1="0"
              x2={`${(i * 100) / (chartData.length - 1)}%`}
              y2="100%"
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Blue line (% of correct answers) */}
          <polyline
            fill="none"
            stroke="#4a90e2"
            strokeWidth="2"
            points={blueLinePoints}
          />

          {/* Green line (task completion speed) */}
          <polyline
            fill="none"
            stroke="#50c878"
            strokeWidth="2"
            points={greenLinePoints}
          />
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-1 left-8 right-8 flex justify-between text-xs text-gray-400">
        {chartData.map((point, index) => (
          <span key={index}>{point.label}</span>
        ))}
      </div>
    </div>
  );
};

export default ChartArea;
