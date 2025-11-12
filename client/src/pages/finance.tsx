import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageSkeleton, ErrorState } from "@/components/loading-skeleton";
import { DollarSign, FileText, TrendingUp, AlertCircle } from "lucide-react";
import type { Lease, LoanEligibility } from "@shared/schema";

export default function FinancePage() {
  const { data: leases, isLoading, error } = useQuery<Lease[]>({
    queryKey: ["/api/leases"],
  });

  const { data: loanEligibility } = useQuery<LoanEligibility>({
    queryKey: ["/api/dashboard/loan-eligibility"],
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorState message="Failed to load finance data. Please try again." />;
  }

  const totalRentDue = leases?.reduce((sum, lease) => sum + lease.rentDue, 0) || 0;
  const activeLeases = leases?.filter(l => l.status === "Active").length || 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Finance & Lease</h1>
        <p className="text-muted-foreground">Manage your lease agreements and financial records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Leases</p>
              <p className="text-2xl font-bold font-mono text-foreground">{activeLeases}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Rent Due</p>
              <p className="text-2xl font-bold font-mono text-foreground">${totalRentDue.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-chart-2/5 to-chart-2/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Available</p>
              <p className="text-2xl font-bold font-mono text-foreground">
                ${loanEligibility?.eligible ? loanEligibility.amount.toLocaleString() : 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="leases">
        <TabsList>
          <TabsTrigger value="leases" data-testid="tab-leases">Lease Agreements</TabsTrigger>
          <TabsTrigger value="payments" data-testid="tab-payments">Payment History</TabsTrigger>
          <TabsTrigger value="credit" data-testid="tab-credit">Credit & Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="leases" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-foreground">Current Lease Agreements</h2>
              <Button variant="outline" data-testid="button-new-lease">Add New Lease</Button>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farm ID</TableHead>
                    <TableHead>Lease Term</TableHead>
                    <TableHead>Rent Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leases?.map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-mono font-medium" data-testid={`cell-farm-${lease.farmId}`}>
                        {lease.farmId}
                      </TableCell>
                      <TableCell>{lease.startYear} - {lease.endYear}</TableCell>
                      <TableCell className="font-mono font-semibold">${lease.rentDue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            lease.status === "Active" 
                              ? "bg-primary/20 text-primary" 
                              : lease.status === "Pending"
                              ? "bg-accent/20 text-accent"
                              : "bg-muted/20 text-muted-foreground"
                          }
                          data-testid={`badge-${lease.id}-status`}
                        >
                          {lease.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" data-testid={`button-view-${lease.id}`}>
                            View
                          </Button>
                          {lease.status === "Active" && (
                            <Button variant="ghost" size="sm" data-testid={`button-renew-${lease.id}`}>
                              Renew
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="p-6">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Payment History</h2>
            <div className="space-y-4">
              {[
                { date: "Nov 1, 2024", amount: 1850, status: "Paid", farm: "RM 125" },
                { date: "Oct 1, 2024", amount: 2100, status: "Paid", farm: "RM 233" },
                { date: "Sep 1, 2024", amount: 1850, status: "Paid", farm: "RM 125" },
                { date: "Aug 1, 2024", amount: 2100, status: "Paid", farm: "RM 233" },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover-elevate">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{payment.farm}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-foreground">${payment.amount.toLocaleString()}</p>
                    <Badge className="bg-primary/20 text-primary">{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="space-y-6">
          {loanEligibility?.eligible && (
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Credit Pre-Approval</h3>
                  <p className="text-foreground mb-4">{loanEligibility.reason}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold font-mono text-foreground">
                      ${loanEligibility.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">CAD available</span>
                  </div>
                  <Button 
                    className="bg-accent hover:bg-accent text-accent-foreground animate-pulse-glow"
                    data-testid="button-apply-loan"
                  >
                    Apply for Credit Now
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Loan Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Upload Warehouse Receipts</h4>
                  <p className="text-sm text-muted-foreground">Provide proof of stored grain or crop receipts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Active Lease Agreement</h4>
                  <p className="text-sm text-muted-foreground">Must have at least one active lease in good standing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Financial Documentation</h4>
                  <p className="text-sm text-muted-foreground">Recent tax returns and income statements</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Our financial advisors are here to help you understand your options and guide you through the application process.
                </p>
                <Button variant="outline" size="sm" data-testid="button-contact-advisor">
                  Contact Financial Advisor
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
