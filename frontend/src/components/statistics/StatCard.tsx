import React from "react";

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="bg-[#1e2939] backdrop-blur-sm rounded-xl border border-[#3a4a5c] p-8 hover:border-[#4e6b8c] transition-colors duration-300">
      <div className="text-5xl font-light text-almost-white mb-4 font-mono tracking-wider">
        {value}
      </div>
      <div className="text-gray-400 text-sm leading-relaxed font-light">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
