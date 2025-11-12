import { SidebarTrigger } from "./ui/sidebar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bell, Search, Mic, Cloud, Sun } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Weather } from "@shared/schema";

interface TopBarProps {
  onOpenRobby: () => void;
}

export function TopBar({ onOpenRobby }: TopBarProps) {
  const { data: weather } = useQuery<Weather>({
    queryKey: ["/api/weather"],
  });

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 py-3 border-b border-border bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        
        {weather && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-card-border">
            {weather.condition === "Sunny" ? (
              <Sun className="w-4 h-4 text-accent animate-bounce-subtle" />
            ) : (
              <Cloud className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-mono font-semibold text-foreground">{weather.temperature}°C</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-sm text-foreground">{weather.condition} in {weather.location}</span>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search crop or field..." 
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
          <Badge 
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs"
          >
            3
          </Badge>
        </Button>

        <Button 
          className="bg-primary text-primary-foreground animate-pulse-glow"
          onClick={onOpenRobby}
          data-testid="button-talk-to-robby"
        >
          <Mic className="w-4 h-4 mr-2" />
          Talk to Robby
        </Button>
      </div>
    </header>
  );
}
