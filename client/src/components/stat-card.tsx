import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "yellow" | "red";
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: "border-l-4 border-[#4285F4] text-[#4285F4]",
    green: "border-l-4 border-[#34A853] text-[#34A853]",
    yellow: "border-l-4 border-[#FBBC05] text-[#FBBC05]",
    red: "border-l-4 border-[#EA4335] text-[#EA4335]",
  };

  return (
    <Card className={`shadow-sm ${colorClasses[color]}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <span className="material-icons">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}
