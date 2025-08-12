import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [brandColor, setBrandColor] = useState("#4f46e5");

  useEffect(() => {
    document.title = "Settings – Code Envision CRM";
  }, []);

  const handleSave = (section: string) =>
    toast({ title: "Saved", description: `${section} updated successfully.` });

  return (
    <main>
      <header className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your workspace preferences and policies.</p>
      </header>

      <Tabs defaultValue="admin" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Meeting preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm">Default meeting duration</Label>
                <Select defaultValue="30">
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex-1">
                  <Label className="block text-sm">Enable recordings</Label>
                  <p className="text-xs text-muted-foreground">Allow users to record meetings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 md:col-span-2">
                <div className="flex-1">
                  <Label className="block text-sm">Allow screen sharing</Label>
                  <p className="text-xs text-muted-foreground">Permit screen sharing for participants</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => handleSave("Meeting preferences")} variant="gradient" className="w-full md:w-auto">Save changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance rules</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Work hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="time" defaultValue="09:00" />
                  <Input type="time" defaultValue="17:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Grace period (minutes)</Label>
                <Input type="number" defaultValue={10} />
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select defaultValue="hybrid">
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button onClick={() => handleSave("Attendance rules")} variant="gradient">Save changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication permissions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label className="block">Allow client messaging</Label>
                  <p className="text-xs text-muted-foreground">Clients can message project teams</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label className="block">Allow cross-team chats</Label>
                  <p className="text-xs text-muted-foreground">Members can chat across departments</p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("Communication permissions")} variant="gradient">Save changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label className="block">Email notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive updates by email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label className="block">In-app alerts</Label>
                  <p className="text-xs text-muted-foreground">Show alerts in the app</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => handleSave("Notifications")} variant="gradient">Save changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company name</Label>
                <Input placeholder="Code Envision" defaultValue="Code Envision" />
              </div>
              <div className="space-y-2">
                <Label>Theme color</Label>
                <Input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Company details</Label>
                <Textarea placeholder="Short company description" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => handleSave("Branding")} variant="gradient">Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Full name</Label>
                <Input placeholder="Jane Doe" defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="admin@codeenvision.com" defaultValue="admin@codeenvision.com" />
              </div>
              <div className="space-y-2">
                <Label>Change password</Label>
                <Input type="password" placeholder="New password" />
              </div>
              <div className="space-y-2">
                <Label>Notification preferences</Label>
                <Select defaultValue="all">
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="mentions">Mentions only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => handleSave("User settings")} variant="gradient">Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
