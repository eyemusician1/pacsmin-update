"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Mail, Globe, Shield, Database, Key, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "PACSMIN",
    siteDescription: "Philippine Association of Chemistry Students",
    contactEmail: "info@pacsmin.org",
    supportEmail: "support@pacsmin.org",
    enableRegistration: true,
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application settings and configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Site Logo</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>User Registration</Label>
                  <p className="text-sm text-gray-500">Allow new users to register</p>
                </div>
                <Switch
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => handleSettingChange("enableRegistration", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications to users</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics</Label>
                  <p className="text-sm text-gray-500">Enable website analytics tracking</p>
                </div>
                <Switch
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => handleSettingChange("enableAnalytics", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" placeholder="587" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input id="smtpUsername" placeholder="your-email@gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input id="smtpPassword" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div>
                <Label htmlFor="fromEmail">From Email</Label>
                <Input id="fromEmail" placeholder="noreply@pacsmin.org" />
              </div>

              <div>
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" placeholder="PACSMIN" />
              </div>

              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
                <p className="text-sm text-gray-500 mt-1">How long users stay logged in</p>
              </div>

              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                <p className="text-sm text-gray-500 mt-1">Number of failed attempts before lockout</p>
              </div>

              <div>
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input id="passwordMinLength" type="number" defaultValue="8" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Force 2FA for all admin users</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Google Analytics ID</Label>
                <Input placeholder="G-XXXXXXXXXX" />
              </div>

              <div>
                <Label>reCAPTCHA Site Key</Label>
                <Input placeholder="6Lc..." />
              </div>

              <div>
                <Label>reCAPTCHA Secret Key</Label>
                <Input type="password" placeholder="6Lc..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Database Backup</Label>
                <p className="text-sm text-gray-500">Create a backup of your database</p>
                <Button variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Clear Cache</Label>
                <p className="text-sm text-gray-500">Clear application cache and temporary files</p>
                <Button variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Application Version</Label>
                  <p className="text-gray-600">v1.0.0</p>
                </div>
                <div>
                  <Label>Database Version</Label>
                  <p className="text-gray-600">PostgreSQL 14.2</p>
                </div>
                <div>
                  <Label>Node.js Version</Label>
                  <p className="text-gray-600">v18.17.0</p>
                </div>
                <div>
                  <Label>Last Backup</Label>
                  <p className="text-gray-600">2024-01-20 14:30</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
