import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ScheduleMeetingForm } from "@/components/forms/ScheduleMeetingForm";
import { CalendarIcon, Mic, MicOff, Video, VideoOff, MonitorUp, MonitorPause, Circle, CircleOff } from "lucide-react";

interface MeetingData {
  title: string;
  description?: string;
  attendees: string;
  location?: string;
  meetingType?: string;
  date: Date;
  time: string;
  duration: string;
}

export default function Meetings() {
  const { toast } = useToast();
  const [scheduled, setScheduled] = useState<MeetingData | null>(null);
  const [roomOpen, setRoomOpen] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; author: string; at: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => { document.title = "Meetings – Code Envision CRM"; }, []);

  const joinLink = useMemo(() => {
    if (!scheduled) return "";
    const slug = encodeURIComponent(scheduled.title.toLowerCase().replace(/\s+/g, "-"));
    return `${window.location.origin}/meet/${slug}-${Date.now().toString().slice(-5)}`;
  }, [scheduled]);

  const googleCalLink = useMemo(() => {
    if (!scheduled) return "";
    const start = new Date(scheduled.date);
    const [hh, mm] = scheduled.time.split(":");
    start.setHours(Number(hh), Number(mm), 0, 0);
    const durMin = Number(scheduled.duration || 30);
    const end = new Date(start.getTime() + durMin * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: scheduled.title,
      details: scheduled.description || "",
      location: scheduled.location || "",
      dates: `${fmt(start)}/${fmt(end)}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [scheduled]);

  const handleSchedule = (data: MeetingData) => {
    setScheduled(data);
    toast({ title: "Meeting scheduled", description: "Joining link generated and ready to share." });
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), text: chatInput.trim(), author: "You", at: new Date().toLocaleTimeString() }]);
    setChatInput("");
  };

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Meetings</h1>
        <p className="text-sm text-muted-foreground">Schedule and host meetings. Frontend-only demo (no backend).</p>
      </header>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Schedule a meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleMeetingForm onSubmit={handleSchedule} onCancel={() => setScheduled(null)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Details & integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduled ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Joining link</p>
                  <Input readOnly value={joinLink} aria-label="Join link" />
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline"><a href={googleCalLink} target="_blank" rel="noreferrer"><CalendarIcon className="mr-2 h-4 w-4" /> Add to Google Calendar</a></Button>
                  <Dialog open={roomOpen} onOpenChange={setRoomOpen}>
                    <DialogTrigger asChild>
                      <Button variant="gradient">Start meeting</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <DialogTitle>{scheduled.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            {["You", "Sarah"].map((name) => (
                              <div key={name} className="aspect-video rounded-md bg-muted flex items-center justify-center">
                                <span className="text-sm text-muted-foreground">{camOn ? `${name} – Camera On` : `${name} – Camera Off`}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Button variant={micOn ? "default" : "outline"} onClick={() => setMicOn((v) => !v)}>{micOn ? <Mic className="mr-2 h-4 w-4"/> : <MicOff className="mr-2 h-4 w-4"/>}{micOn ? "Mute" : "Unmute"}</Button>
                            <Button variant={camOn ? "default" : "outline"} onClick={() => setCamOn((v) => !v)}>{camOn ? <Video className="mr-2 h-4 w-4"/> : <VideoOff className="mr-2 h-4 w-4"/>}{camOn ? "Stop Video" : "Start Video"}</Button>
                            <Button variant={sharing ? "default" : "outline"} onClick={() => setSharing((v) => !v)}>{sharing ? <MonitorPause className="mr-2 h-4 w-4"/> : <MonitorUp className="mr-2 h-4 w-4"/>}{sharing ? "Stop Share" : "Share Screen"}</Button>
                            <Button variant={recording ? "destructive" : "outline"} onClick={() => setRecording((v) => !v)}>{recording ? <CircleOff className="mr-2 h-4 w-4"/> : <Circle className="mr-2 h-4 w-4"/>}{recording ? "Stop Rec" : "Record"}</Button>
                          </div>
                        </div>
                        <div className="border rounded-md flex flex-col">
                          <div className="p-3 border-b font-medium">Chat</div>
                          <ScrollArea className="flex-1 p-3 h-64">
                            <div className="space-y-2">
                              {messages.map((m) => (
                                <div key={m.id} className="text-sm">
                                  <span className="font-medium">{m.author}:</span> {m.text}
                                  <span className="ml-2 text-xs text-muted-foreground">{m.at}</span>
                                </div>
                              ))}
                              {messages.length === 0 && (
                                <p className="text-sm text-muted-foreground">No messages yet.</p>
                              )}
                            </div>
                          </ScrollArea>
                          <div className="p-3 border-t flex gap-2">
                            <Input placeholder="Type a message" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} />
                            <Button onClick={sendChat}>Send</Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Fill the form to generate links and controls.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
