import React from "react";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-[#18181b] border border-[#27272a] rounded-2xl w-full min-w-[240px] shadow-sm">
      {/* Icon Wrapper */}
      {Icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#27272a] text-zinc-300">
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-1.5 mt-2">
        <span className="text-sm font-medium text-zinc-400 tracking-wide">
          {title}
        </span>
        <span className="text-3xl font-bold text-white tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}
