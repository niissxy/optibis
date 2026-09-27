import React from "react";

export default function SkeletonGrid({ count = 6, className = "" }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100" />
            <div className="flex-1">
              <div className="h-3 bg-slate-100 rounded w-3/4 mb-1.5" />
              <div className="h-2 bg-slate-50 rounded w-1/2" />
            </div>
          </div>
          <div className="h-2 bg-slate-50 rounded w-full mb-1.5" />
          <div className="h-2 bg-slate-50 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}