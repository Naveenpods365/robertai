import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  status?: string;
  icon: LucideIcon;
  statusColor?: string;
  testId: string;
}

export function StatCard({ title, value, status, icon: Icon, statusColor = "text-primary", testId }: StatCardProps) {
  return (
    <Card className="p-4 hover-elevate" data-testid={testId}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
            {status && <span className={`text-sm font-medium ${statusColor}`}>{status}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}
