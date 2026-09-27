import React from "react";

export default function ScoreGauge({ score, label, size = 120 }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color;
  if (score >= 90) color = "#10b981";
  else if (score >= 75) color = "#3b82f6";
  else if (score >= 60) color = "#f59e0b";
  else color = "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-navy">{Math.round(score)}</span>
          <span className="text-[9px] text-muted-foreground uppercase">/ 100</span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-muted-foreground mt-1">{label}</span>}
    </div>
  );
}