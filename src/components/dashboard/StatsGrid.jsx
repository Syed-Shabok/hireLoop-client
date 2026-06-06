import React from "react";
import StatCard from "./StatCard";
// Importing standard icon equivalents from Gravity UI based on your image
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

export default function StatsGrid() {
  // This data array can come from a database fetch or an API call later
  const statsData = [
    {
      id: "total-posts",
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      id: "total-applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      id: "jobs-closed",
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div className="w-full py-6">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
