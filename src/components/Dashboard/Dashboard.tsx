"use client";

import DataStatsOne from "@/components/DataStats/DataStatsOne";

interface DashboardProps {
  param: string;
}

export default function Dashboard({ param }: DashboardProps) {
  return (
    <div>
      <DataStatsOne param={param} />
    </div>
  );
}
