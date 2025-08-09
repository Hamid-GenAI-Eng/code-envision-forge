import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import Meetings from "./pages/Meetings";
import Attendance from "./pages/Attendance";
import Communication from "./pages/Communication";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="clients" element={<Clients />} />
            <Route path="employees" element={<Employees />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="notes" element={<Notes />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="communication" element={<Communication />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
