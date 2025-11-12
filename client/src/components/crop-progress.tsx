import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface CropProgressProps {
  name: string;
  maturity: number;
  status: string;
  testId: string;
}

export function CropProgress({ name, maturity, status, testId }: CropProgressProps) {
  const [displayMaturity, setDisplayMaturity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayMaturity(maturity);
    }, 100);
    return () => clearTimeout(timer);
  }, [maturity]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "matured":
        return "text-primary";
      case "ripening":
        return "text-accent";
      case "growing":
        return "text-chart-3";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="space-y-2" data-testid={testId}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-semibold text-foreground">{maturity}%</span>
          <span className={`text-xs ${getStatusColor(status)}`}>{status}</span>
        </div>
      </div>
      <Progress 
        value={displayMaturity} 
        className="h-2"
      />
    </div>
  );
}
