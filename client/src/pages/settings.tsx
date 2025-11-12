import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">Security</TabsTrigger>
          <TabsTrigger value="preferences" data-testid="tab-preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">JM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">John Mason</h3>
                <p className="text-sm text-muted-foreground mb-3">Tenant Farmer</p>
                <Button variant="outline" size="sm" data-testid="button-change-photo">Change Photo</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="John Mason" data-testid="input-full-name" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.mason@example.com" data-testid="input-email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (306) 555-0123" data-testid="input-phone" />
              </div>
              <div>
                <Label htmlFor="location">Primary Location</Label>
                <Input id="location" defaultValue="Saskatchewan, Canada" data-testid="input-location" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button data-testid="button-save-profile">Save Changes</Button>
              <Button variant="outline" data-testid="button-cancel-profile">Cancel</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weather Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about weather changes</p>
                </div>
                <Switch defaultChecked data-testid="switch-weather-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Crop Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about crop maturity milestones</p>
                </div>
                <Switch defaultChecked data-testid="switch-crop-updates" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Lease Reminders</p>
                  <p className="text-sm text-muted-foreground">Reminders for rent payments and lease renewals</p>
                </div>
                <Switch defaultChecked data-testid="switch-lease-reminders" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Financial Updates</p>
                  <p className="text-sm text-muted-foreground">Loan approvals and credit availability notifications</p>
                </div>
                <Switch data-testid="switch-financial-updates" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Robby AI Suggestions</p>
                  <p className="text-sm text-muted-foreground">Receive AI-powered farming recommendations</p>
                </div>
                <Switch defaultChecked data-testid="switch-ai-suggestions" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" data-testid="input-current-password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" data-testid="input-new-password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" data-testid="input-confirm-password" />
              </div>
            </div>
            <Button className="mt-6" data-testid="button-update-password">Update Password</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-foreground">Enable 2FA</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch data-testid="switch-2fa" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Display Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                </div>
                <Switch data-testid="switch-dark-mode" />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input id="language" defaultValue="English" data-testid="input-language" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="Central Time (Saskatchewan)" data-testid="input-timezone" />
              </div>
              <div>
                <Label htmlFor="units">Measurement Units</Label>
                <Input id="units" defaultValue="Metric (°C, km)" data-testid="input-units" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Data & Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Share Data with AI</p>
                  <p className="text-sm text-muted-foreground">Allow Robby AI to learn from your farming patterns</p>
                </div>
                <Switch defaultChecked data-testid="switch-share-data" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Marketing Communications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about new features and services</p>
                </div>
                <Switch data-testid="switch-marketing" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
