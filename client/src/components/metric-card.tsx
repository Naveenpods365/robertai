import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  gradient: string;
  testId: string;
}

export function MetricCard({ title, value, suffix = "", icon: Icon, gradient, testId }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className={`p-6 hover-elevate ${gradient}`} data-testid={testId}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold font-mono text-white animate-count-up">
            {displayValue.toLocaleString()}
          </span>
          {suffix && <span className="text-xl font-semibold text-white/90">{suffix}</span>}
        </div>
        <p className="text-sm font-medium text-white/80">{title}</p>
      </div>
    </Card>
  );
}
