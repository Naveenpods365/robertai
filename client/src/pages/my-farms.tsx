import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/loading-skeleton";
import { MapPin, TrendingUp } from "lucide-react";
import { Plus } from "lucide-react";
import type { Farm, Crop } from "@shared/schema";

export default function MyFarms() {
  const { data: farms, isLoading, error } = useQuery<Farm[]>({
    queryKey: ["/api/farms"],
  });

  const { data: crops } = useQuery<Crop[]>({
    queryKey: ["/api/crops"],
  });

  const getCropsForFarm = (farmId: string) => {
    return crops?.filter(crop => crop.farmId === farmId) || [];
  };

  if (error) {
    return <ErrorState message="Failed to load farms. Please try again." />;
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">My Farms</h1>
          <p className="text-muted-foreground">Manage your farmland and crop fields</p>
        </div>
        <Button className="bg-accent hover:bg-accent text-accent-foreground" data-testid="button-add-new-farm">
          <Plus className="w-4 h-4 mr-2" />
          Add New Farm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms?.map((farm) => {
          const farmCrops = getCropsForFarm(farm.id);
          return (
            <Card key={farm.id} className="overflow-hidden hover-elevate group" data-testid={`card-farm-${farm.id}`}>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0003_1px,transparent_1px),linear-gradient(to_bottom,#0003_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary/30" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {farm.acreage} acres
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{farm.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {farm.location}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{farmCrops.length} active crops</span>
                </div>

                {farmCrops.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {farmCrops.slice(0, 3).map((crop) => (
                      <div key={crop.id} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{crop.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {crop.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-view-${farm.id}`}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-edit-${farm.id}`}>
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
