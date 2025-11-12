import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Sprout, LayoutDashboard, MapPin, TrendingUp, DollarSign, Cloud, Settings, Plus } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "My Farms",
    url: "/my-farms",
    icon: MapPin,
  },
  {
    title: "Crop Performance",
    url: "/crop-performance",
    icon: TrendingUp,
  },
  {
    title: "Finance & Lease",
    url: "/finance",
    icon: DollarSign,
  },
  {
    title: "Weather",
    url: "/weather",
    icon: Cloud,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-semibold text-sidebar-foreground">Angelic Land</h1>
            <p className="text-xs text-muted-foreground">Tenant Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="mb-6 p-4 rounded-lg bg-card border border-card-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-sm text-card-foreground truncate">John Mason</p>
              <p className="text-xs text-muted-foreground">Tenant Farmer</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "bg-sidebar-accent" : ""}
                      data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          className="w-full bg-accent hover:bg-accent text-accent-foreground animate-pulse-glow" 
          data-testid="button-add-farm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Farm
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
