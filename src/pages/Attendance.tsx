import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCode from "react-qr-code";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: number;
  user: string;
  mode: "remote" | "onsite";
  status: "in" | "out";
  timestamp: string;
  location?: { lat: number; lng: number } | null;
  method?: "geo" | "qrcode";
}

export default function Attendance() {
  const { toast } = useToast();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isIn, setIsIn] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Attendance – Code Envision CRM"; }, []);

  const userId = useMemo(() => `user-${Math.floor(Math.random()*10000)}`, []);

  const getGeo = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err.message),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });

  const clock = async (status: "in" | "out") => {
    try {
      const loc = await getGeo().catch(() => null);
      setCoords(loc);
      const rec: AttendanceRecord = {
        id: Date.now(),
        user: "You",
        mode: "remote",
        status,
        timestamp: new Date().toLocaleString(),
        location: loc,
        method: "geo",
      };
      setRecords((r) => [rec, ...r]);
      setIsIn(status === "in");
      toast({ title: `Clocked ${status}`, description: loc ? `Location captured` : `Location unavailable` });
    } catch (e) {
      toast({ title: "Error", description: String(e) });
    }
  };

  const exportCSV = () => {
    const rows = [
      ["User", "Mode", "Status", "Timestamp", "Lat", "Lng", "Method"],
      ...records.map((r) => [
        r.user,
        r.mode,
        r.status,
        r.timestamp,
        r.location?.lat ?? "",
        r.location?.lng ?? "",
        r.method ?? "",
      ]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPDF = () => {
    if (!areaRef.current) return;
    const w = window.open("", "print");
    if (!w) return;
    w.document.write(`<html><head><title>Attendance</title></head><body>${areaRef.current.innerHTML}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Attendance</h1>
        <p className="text-sm text-muted-foreground">Track remote and onsite attendance. Frontend-only demo.</p>
      </header>

      <Tabs defaultValue="remote" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="remote">Remote</TabsTrigger>
          <TabsTrigger value="onsite">Onsite (QR)</TabsTrigger>
        </TabsList>

        <TabsContent value="remote" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Remote check-in</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button variant="gradient" onClick={() => clock("in")} disabled={isIn}>Clock In</Button>
                <Button variant="outline" onClick={() => clock("out")} disabled={!isIn}>Clock Out</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {coords ? (
                  <p>Last location: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>
                ) : (
                  <p>Location not captured yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onsite" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onsite QR attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-md flex items-center justify-center">
                  <QRCode value={`attend:${userId}`} size={160} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Present this QR to be scanned at the office kiosk.</p>
                  <div className="flex gap-3">
                    <Button variant="gradient" onClick={() => {
                      const rec: AttendanceRecord = { id: Date.now(), user: "You", mode: "onsite", status: "in", timestamp: new Date().toLocaleString(), method: "qrcode" } as AttendanceRecord;
                      setRecords((r) => [rec, ...r]);
                      toast({ title: "Checked in", description: "QR attendance recorded (demo)." });
                    }}>Simulate Check-in</Button>
                    <Button variant="outline" onClick={() => {
                      const rec: AttendanceRecord = { id: Date.now(), user: "You", mode: "onsite", status: "out", timestamp: new Date().toLocaleString(), method: "qrcode" } as AttendanceRecord;
                      setRecords((r) => [rec, ...r]);
                      toast({ title: "Checked out", description: "QR attendance recorded (demo)." });
                    }}>Simulate Check-out</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Real-time attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-3 mb-3">
            <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
            <Button variant="outline" onClick={printPDF}>Export PDF</Button>
          </div>
          <div ref={areaRef}>
            <Table>
              <TableCaption>Recent attendance records</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.user}</TableCell>
                    <TableCell className="capitalize">{r.mode}</TableCell>
                    <TableCell className="uppercase">{r.status}</TableCell>
                    <TableCell>{r.timestamp}</TableCell>
                    <TableCell>{r.location ? `${r.location.lat.toFixed(3)}, ${r.location.lng.toFixed(3)}` : "—"}</TableCell>
                    <TableCell>{r.method || "—"}</TableCell>
                  </TableRow>
                ))}
                {records.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No records yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
