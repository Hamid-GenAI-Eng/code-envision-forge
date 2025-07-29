import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FolderOpen, 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: FolderOpen,
      color: "text-blue-600"
    },
    {
      title: "Total Clients",
      value: "48",
      change: "+5 new this month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new hires",
      icon: UserCheck,
      color: "text-purple-600"
    },
    {
      title: "Monthly Revenue",
      value: "$125,400",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      client: "TechCorp Inc.",
      progress: 75,
      status: "In Progress",
      deadline: "2024-02-15"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "FinanceX",
      progress: 60,
      status: "In Progress",
      deadline: "2024-03-01"
    },
    {
      id: 3,
      name: "Healthcare Portal",
      client: "MedLife",
      progress: 90,
      status: "Review",
      deadline: "2024-01-30"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Client meeting with TechCorp",
      time: "2:00 PM Today",
      priority: "High"
    },
    {
      id: 2,
      title: "Code review for Banking App",
      time: "Tomorrow 10:00 AM",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Deploy Healthcare Portal",
      time: "Jan 30, 3:00 PM",
      priority: "High"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at Code Envision today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Recent Projects
            </CardTitle>
            <CardDescription>
              Your active projects and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Due: {project.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="w-full">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Your tasks and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                      <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="w-full">
                View All Tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions to speed up your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="gradient" className="h-20 flex-col gap-2">
              <FolderOpen className="h-5 w-5" />
              New Project
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-5 w-5" />
              Add Client
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UserCheck className="h-5 w-5" />
              Add Employee
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;