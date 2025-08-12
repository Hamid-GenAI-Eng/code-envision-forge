import { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  UserCheck, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  Bell,
  Search,
  Menu,
  X,
  Video,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Employees", url: "/employees", icon: UserCheck },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Meetings", url: "/meetings", icon: Video },
  { title: "Attendance", url: "/attendance", icon: Clock },
  { title: "Communication", url: "/communication", icon: MessageSquare },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-14 md:h-16 items-center px-2 md:px-4 gap-2 md:gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">CE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm md:text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Code Envision CRM
              </h1>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs md:max-w-md">
            <div className="relative">
              <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 md:h-4 md:w-4" />
              <Input
                placeholder="Search..."
                className="pl-7 md:pl-10 h-8 md:h-10 text-sm"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 p-0 text-xs bg-destructive">
                3
              </Badge>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 md:h-10 md:w-10 rounded-full">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs md:text-sm">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover z-50" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@codeenvision.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`${
          sidebarOpen 
            ? "translate-x-0 w-64 fixed md:relative z-50 md:z-auto" 
            : "-translate-x-full md:translate-x-0 w-0 md:w-16"
        } h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] transition-all duration-300 border-r bg-card/95 md:bg-card/30 backdrop-blur-sm overflow-y-auto`}>
          <nav className="p-2 md:p-4 space-y-1 md:space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className={({ isActive: navIsActive }) =>
                  `flex items-center gap-3 px-2 md:px-3 py-2 rounded-lg transition-all duration-200 ${
                    navIsActive || isActive(item.url)
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20"
                      : "hover:bg-muted/50"
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={`${sidebarOpen ? "block" : "hidden md:hidden"} font-medium text-sm md:text-base`}>
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-3 md:p-6 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}