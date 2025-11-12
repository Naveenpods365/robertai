import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import { StatCard } from "@/components/stat-card";
import { CropProgress } from "@/components/crop-progress";
import { DashboardSkeleton, ErrorState } from "@/components/loading-skeleton";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, TrendingUp, Calendar, DollarSign, Thermometer, Droplets, Leaf, CloudRain } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";
import type { DashboardMetrics, CropPerformance, Lease, YieldData, LandUseData, ProfitData, LoanEligibility, FarmStats } from "@shared/schema";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: farmStats, isLoading: statsLoading, error: statsError } = useQuery<FarmStats>({
    queryKey: ["/api/dashboard/farm-stats"],
  });

  const { data: cropPerformance, isLoading: cropPerfLoading, error: cropPerfError } = useQuery<CropPerformance[]>({
    queryKey: ["/api/dashboard/crop-performance"],
  });

  const { data: leases, isLoading: leasesLoading, error: leasesError } = useQuery<Lease[]>({
    queryKey: ["/api/leases"],
  });

  const { data: yieldData, isLoading: yieldLoading, error: yieldError } = useQuery<YieldData[]>({
    queryKey: ["/api/dashboard/yield-data"],
  });

  const { data: landUseData, isLoading: landUseLoading, error: landUseError } = useQuery<LandUseData[]>({
    queryKey: ["/api/dashboard/land-use"],
  });

  const { data: profitData, isLoading: profitLoading, error: profitError } = useQuery<ProfitData[]>({
    queryKey: ["/api/dashboard/profit-data"],
  });

  const { data: loanEligibility, isLoading: loanLoading, error: loanError } = useQuery<LoanEligibility>({
    queryKey: ["/api/dashboard/loan-eligibility"],
  });

  const isLoading = metricsLoading || statsLoading || cropPerfLoading || leasesLoading || 
                    yieldLoading || landUseLoading || profitLoading || loanLoading;
  
  const error = metricsError || statsError || cropPerfError || leasesError || 
                yieldError || landUseError || profitError || loanError;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorState message="Failed to load dashboard data. Please try again." />;
  }

  const COLORS = {
    fruits: "hsl(var(--chart-5))",
    grains: "hsl(var(--chart-1))",
    vegetables: "hsl(var(--chart-3))",
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here's your farm overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Acreage Managed"
          value={metrics?.totalAcreage || 0}
          suffix=" acres"
          icon={MapPin}
          gradient="bg-gradient-to-br from-primary to-primary/80"
          testId="card-metric-acreage"
        />
        <MetricCard
          title="Crop Yield this Season"
          value={metrics?.cropYield || 0}
          suffix=" tons"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-chart-2 to-chart-2/80"
          testId="card-metric-yield"
        />
        <MetricCard
          title="Lease Term Remaining"
          value={metrics?.leaseTermRemaining || 0}
          suffix=" years"
          icon={Calendar}
          gradient="bg-gradient-to-br from-chart-3 to-chart-3/80"
          testId="card-metric-lease"
        />
        <MetricCard
          title="Active Loans / Credit"
          value={metrics?.activeLoans || 0}
          suffix=""
          icon={DollarSign}
          gradient="bg-gradient-to-br from-chart-4 to-chart-4/80"
          testId="card-metric-loans"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Farm Overview</h2>
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0003_1px,transparent_1px),linear-gradient(to_bottom,#0003_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Saskatchewan Farm Map</p>
              <p className="text-xs text-muted-foreground mt-1">Interactive field markers</p>
            </div>
            <div className="absolute top-4 left-4 w-3 h-3 bg-accent rounded-full animate-pulse" data-tooltip="Field A"></div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" data-tooltip="Field B"></div>
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-chart-3 rounded-full animate-pulse" data-tooltip="Field C"></div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Air Temperature"
            value={`${farmStats?.temperature || 28}°C`}
            icon={Thermometer}
            testId="card-stat-temperature"
          />
          <StatCard
            title="Moisture"
            value={`${farmStats?.moisture || 34}%`}
            status="Good"
            statusColor="text-primary"
            icon={Droplets}
            testId="card-stat-moisture"
          />
          <StatCard
            title="pH Level"
            value={farmStats?.ph || 7.3}
            status="Balanced"
            statusColor="text-primary"
            icon={Leaf}
            testId="card-stat-ph"
          />
          <StatCard
            title="Rain Forecast"
            value={farmStats?.rainForecast || 3}
            status="days this week"
            statusColor="text-muted-foreground"
            icon={CloudRain}
            testId="card-stat-rain"
          />
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Yield Growth Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="yield" fill="hsl(var(--chart-1))" name="Yield (tons)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Crop Performance</h2>
        
        <Tabs defaultValue="category" className="mb-6">
          <TabsList>
            <TabsTrigger value="category" data-testid="tab-by-category">By Category</TabsTrigger>
            <TabsTrigger value="health" data-testid="tab-by-health">By Health</TabsTrigger>
          </TabsList>
          
          <TabsContent value="category" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={cropPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="percentage"
                      label={(entry) => `${entry.category} ${entry.percentage}%`}
                    >
                      {cropPerformance?.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[entry.category.toLowerCase() as keyof typeof COLORS] || "hsl(var(--chart-1))"} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {cropPerformance?.flatMap(cat => 
                  cat.crops.map((crop, idx) => (
                    <CropProgress
                      key={`${cat.category}-${idx}`}
                      name={crop.name}
                      maturity={crop.maturity}
                      status={crop.status}
                      testId={`progress-${crop.name.toLowerCase()}`}
                    />
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="health">
            <div className="space-y-4">
              {cropPerformance?.flatMap(cat => 
                cat.crops.map((crop, idx) => (
                  <CropProgress
                    key={`health-${cat.category}-${idx}`}
                    name={crop.name}
                    maturity={crop.maturity}
                    status={crop.status}
                    testId={`health-${crop.name.toLowerCase()}`}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Finance & Lease</h2>
          
          <div className="rounded-lg border border-border overflow-hidden mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm ID</TableHead>
                  <TableHead>Lease Term</TableHead>
                  <TableHead>Rent Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leases?.map((lease) => (
                  <TableRow key={lease.id}>
                    <TableCell className="font-mono font-medium">{lease.farmId}</TableCell>
                    <TableCell>{lease.startYear} - {lease.endYear}</TableCell>
                    <TableCell className="font-mono">${lease.rentDue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        className={lease.status === "Active" ? "bg-primary/20 text-primary" : ""}
                        data-testid={`badge-status-${lease.farmId}`}
                      >
                        {lease.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {loanEligibility?.eligible && (
            <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <p className="text-sm text-foreground mb-3">
                {loanEligibility.reason}
              </p>
              <Button 
                className="w-full bg-accent hover:bg-accent text-accent-foreground animate-pulse-glow"
                data-testid="button-apply-credit"
              >
                Apply for Credit
              </Button>
            </Card>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Reports & Analytics</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Rainfall vs Yield</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="yield" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Yield" />
                  <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Rainfall" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Monthly Profit Trend</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={profitData}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="profit" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Land Use Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={landUseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.category}: ${entry.acreage} acres`}
              outerRadius={100}
              dataKey="acreage"
            >
              {landUseData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">FAQ & Support</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="accordion-renew-lease">How do I renew my lease?</AccordionTrigger>
            <AccordionContent>
              You can renew your lease by navigating to the Finance & Lease section and clicking on the "Renew Lease" button next to your active lease. Our team will review your application within 3-5 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger data-testid="accordion-upload-receipts">How to upload warehouse receipts?</AccordionTrigger>
            <AccordionContent>
              Go to the Finance & Lease page, select "Upload Documents," and choose your warehouse receipts. Supported formats include PDF, JPG, and PNG. Maximum file size is 10MB per document.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger data-testid="accordion-update-crop">What if I need to update my crop info?</AccordionTrigger>
            <AccordionContent>
              Visit the Crop Performance page and click "Edit" next to any crop you'd like to update. You can modify crop type, acreage, and expected yield. Changes are saved automatically.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-foreground mb-2">Need more help?</p>
          <Button variant="outline" data-testid="button-contact-support">Contact Tenant Support</Button>
        </div>
      </Card>

      <footer className="text-center py-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">
          Powered by Angelic AI — Helping Canadian farmers grow with confidence
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary" data-testid="link-footer-help">Help</a>
          <span>•</span>
          <a href="#" className="hover:text-primary" data-testid="link-footer-contact">Contact</a>
          <span>•</span>
          <a href="#" className="hover:text-primary" data-testid="link-footer-terms">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-primary" data-testid="link-footer-privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
