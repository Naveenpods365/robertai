import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageSkeleton, ErrorState } from "@/components/loading-skeleton";
import { Leaf, TrendingUp, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import type { CropPerformance, Crop } from "@shared/schema";

export default function CropPerformancePage() {
  const { data: cropPerformance, isLoading, error } = useQuery<CropPerformance[]>({
    queryKey: ["/api/dashboard/crop-performance"],
  });

  const { data: allCrops } = useQuery<Crop[]>({
    queryKey: ["/api/crops"],
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorState message="Failed to load crop performance data. Please try again." />;
  }

  const COLORS = {
    fruits: "hsl(var(--chart-5))",
    grains: "hsl(var(--chart-1))",
    vegetables: "hsl(var(--chart-3))",
  };

  const getCategoryColor = (category: string) => {
    return COLORS[category.toLowerCase() as keyof typeof COLORS] || "hsl(var(--primary))";
  };

  const getHealthStatus = (maturity: number) => {
    if (maturity >= 90) return { label: "Excellent", color: "text-primary" };
    if (maturity >= 70) return { label: "Good", color: "text-accent" };
    if (maturity >= 50) return { label: "Fair", color: "text-chart-3" };
    return { label: "Needs Attention", color: "text-destructive" };
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Crop Performance</h1>
        <p className="text-muted-foreground">Monitor crop health and maturity across all farms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Crops</p>
              <p className="text-2xl font-bold font-mono text-foreground">{allCrops?.length || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Maturity</p>
              <p className="text-2xl font-bold font-mono text-foreground">
                {allCrops ? Math.round(allCrops.reduce((sum, crop) => sum + crop.maturity, 0) / allCrops.length) : 0}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-chart-3/5 to-chart-3/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Needs Attention</p>
              <p className="text-2xl font-bold font-mono text-foreground">
                {allCrops?.filter(c => c.maturity < 50).length || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="category">
          <TabsList className="mb-6">
            <TabsTrigger value="category" data-testid="tab-category-view">By Category</TabsTrigger>
            <TabsTrigger value="health" data-testid="tab-health-view">By Health</TabsTrigger>
            <TabsTrigger value="farm" data-testid="tab-farm-view">By Farm</TabsTrigger>
          </TabsList>

          <TabsContent value="category" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cropPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="percentage"
                      label={(entry) => `${entry.category} ${entry.percentage}%`}
                    >
                      {cropPerformance?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Maturity Progress</h3>
                <div className="space-y-4">
                  {cropPerformance?.map((category) => (
                    <div key={category.category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">{category.category}</span>
                        <Badge style={{ backgroundColor: getCategoryColor(category.category), color: 'white' }}>
                          {category.percentage}%
                        </Badge>
                      </div>
                      <div className="space-y-3 ml-4">
                        {category.crops.map((crop, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{crop.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-foreground">{crop.maturity}%</span>
                                <Badge variant="outline" className="text-xs">{crop.status}</Badge>
                              </div>
                            </div>
                            <Progress value={crop.maturity} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="space-y-4">
              {allCrops?.sort((a, b) => b.maturity - a.maturity).map((crop) => {
                const health = getHealthStatus(crop.maturity);
                return (
                  <Card key={crop.id} className="p-4 hover-elevate">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Leaf className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-foreground">{crop.name}</h4>
                          <p className="text-sm text-muted-foreground">{crop.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${health.color}`}>{health.label}</p>
                        <p className="text-2xl font-bold font-mono text-foreground">{crop.maturity}%</p>
                      </div>
                    </div>
                    <Progress value={crop.maturity} className="h-2" />
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="farm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cropPerformance?.map((category) => (
                <Card key={category.category} className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">{category.category}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={category.crops}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar 
                        dataKey="maturity" 
                        fill={getCategoryColor(category.category)} 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
