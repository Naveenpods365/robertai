import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Cloud, Droplets, TrendingUp } from "lucide-react";

interface RobbyAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RobbyAssistant({ isOpen, onClose }: RobbyAssistantProps) {
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const quickActions = [
    { label: "Weather Forecast", icon: Cloud },
    { label: "Soil Advice", icon: Droplets },
    { label: "Price Trends", icon: TrendingUp },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in" data-testid="panel-robby-assistant">
      <Card className="w-80 p-6 shadow-xl border-primary/20">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Robby AI</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="w-6 h-6"
            data-testid="button-close-robby"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-foreground">Hey John! Need to know which crop to plant next?</p>
        </div>

        {isListening && (
          <div className="mb-4 p-4 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Quick Actions</p>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsListening(!isListening)}
              data-testid={`button-robby-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <action.icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
