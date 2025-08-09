import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Mic, StopCircle } from "lucide-react";

interface Message { id: number; author: string; text?: string; at: string; attachmentUrl?: string; attachmentName?: string; audioUrl?: string }

const demoThreads = [
  { id: "proj-1001", name: "Project: Alpha Website" },
  { id: "client-42", name: "Client: TechCorp" },
  { id: "team-design", name: "Team: Design" },
  { id: "dm-sarah", name: "DM: Sarah Johnson" },
];

export default function Communication() {
  const [active, setActive] = useState(demoThreads[0].id);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [text, setText] = useState("");
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [term, setTerm] = useState("");
  const chunksRef = useRef<Blob[]>([]);
  useEffect(() => { document.title = "Communication – Code Envision CRM"; }, []);

  const list = useMemo(() => messages[active] || [], [messages, active]);

  const sendText = () => {
    if (!text.trim()) return;
    const msg: Message = { id: Date.now(), author: "You", text: text.trim(), at: new Date().toLocaleTimeString() };
    setMessages((m) => ({ ...m, [active]: [...(m[active] || []), msg] }));
    setText("");
  };

  const attachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const msg: Message = { id: Date.now(), author: "You", at: new Date().toLocaleTimeString(), attachmentUrl: url, attachmentName: file.name };
    setMessages((m) => ({ ...m, [active]: [...(m[active] || []), msg] }));
    e.currentTarget.value = "";
  };

  const startRecord = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      const msg: Message = { id: Date.now(), author: "You", at: new Date().toLocaleTimeString(), audioUrl: url };
      setMessages((m) => ({ ...m, [active]: [...(m[active] || []), msg] }));
    };
    recorder.start();
    setRec(recorder);
  };

  const stopRecord = () => {
    rec?.stop();
    setRec(null);
  };

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Communication Hub</h1>
        <p className="text-sm text-muted-foreground">Threads for projects, teams, clients. Frontend-only demo.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Threads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoThreads.map((t) => (
              <Button key={t.id} variant={active === t.id ? "default" : "outline"} className="w-full justify-start" onClick={() => setActive(t.id)}>
                {t.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{demoThreads.find((t) => t.id === active)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ScrollArea className="h-80 border rounded-md p-3">
              <div className="space-y-3">
                {list.map((m) => (
                  <div key={m.id} className="text-sm">
                    <div className="font-medium">{m.author} <span className="ml-2 text-xs text-muted-foreground">{m.at}</span></div>
                    {m.text && <p className="whitespace-pre-wrap">{m.text}</p>}
                    {m.attachmentUrl && (
                      <div className="mt-1">
                        <a className="text-primary underline" href={m.attachmentUrl} download>
                          {m.attachmentName || "Attachment"}
                        </a>
                      </div>
                    )}
                    {m.audioUrl && (
                      <audio className="mt-1" controls src={m.audioUrl} />
                    )}
                  </div>
                ))}
                {list.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
              </div>
            </ScrollArea>

            <div className="flex items-center gap-2">
              <Input placeholder="Write a message" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendText()} />
              <div>
                <input id="file" type="file" className="hidden" onChange={attachFile} />
                <Button variant="outline" asChild>
                  <label htmlFor="file" className="cursor-pointer"><Paperclip className="h-4 w-4" /></label>
                </Button>
              </div>
              {rec ? (
                <Button variant="destructive" onClick={stopRecord}><StopCircle className="mr-2 h-4 w-4" />Stop</Button>
              ) : (
                <Button variant="outline" onClick={startRecord}><Mic className="mr-2 h-4 w-4" />Voice</Button>
              )}
              <Button onClick={sendText}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
