import React from 'react';
import StatCard from '../common/StatCard';

interface StatGridProps {
  statistics: {
    total_records: number;
    crime_types: number;
    districts: number;
    stations: number;
    convictions: number;
  } | null;
}

export default function StatGrid({ statistics }: StatGridProps) {
  const cards = [
    {
      title: "Total FIRs",
      value: statistics?.total_records?.toLocaleString() || "0",
      change: "+12%",
      trend: "up" as const,
      color: "blue",
    },
    {
      title: "Crime Types",
      value: statistics?.crime_types?.toString() || "0",
      change: "+3%",
      trend: "up" as const,
      color: "cyan",
    },
    {
      title: "Districts",
      value: statistics?.districts?.toString() || "0",
      change: "0%",
      trend: "neutral" as const,
      color: "green",
    },
    {
      title: "Convictions",
      value: statistics?.convictions?.toLocaleString() || "0",
      change: "+5%",
      trend: "up" as const,
      color: "emerald",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </div>
  );
}
