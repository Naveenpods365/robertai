import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { TopBar } from "./components/top-bar";
import { RobbyAssistant } from "./components/robby-assistant";
import { useState } from "react";
import Dashboard from "./pages/dashboard";
import MyFarms from "./pages/my-farms";
import CropPerformancePage from "./pages/crop-performance";
import FinancePage from "./pages/finance";
import WeatherPage from "./pages/weather";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/my-farms" component={MyFarms} />
      <Route path="/crop-performance" component={CropPerformancePage} />
      <Route path="/finance" component={FinancePage} />
      <Route path="/weather" component={WeatherPage} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [showRobby, setShowRobby] = useState(false);

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar onOpenRobby={() => setShowRobby(true)} />
              <main className="flex-1 overflow-y-auto bg-background">
                <Router />
              </main>
            </div>
          </div>
          <RobbyAssistant isOpen={showRobby} onClose={() => setShowRobby(false)} />
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
