import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Clock, FolderOpen,
  Calendar, Target, Award, AlertCircle, Download, Filter
} from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 85000, projects: 12, clients: 8 },
  { month: "Feb", revenue: 92000, projects: 14, clients: 10 },
  { month: "Mar", revenue: 78000, projects: 11, clients: 7 },
  { month: "Apr", revenue: 105000, projects: 16, clients: 12 },
  { month: "May", revenue: 118000, projects: 18, clients: 14 },
  { month: "Jun", revenue: 134000, projects: 20, clients: 16 }
];

const projectStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "On Hold", value: 8, color: "#f59e0b" },
  { name: "Planning", value: 12, color: "#8b5cf6" },
  { name: "Cancelled", value: 5, color: "#ef4444" }
];

const teamProductivityData = [
  { name: "John Doe", tasksCompleted: 42, hoursWorked: 168, efficiency: 85 },
  { name: "Sarah Wilson", tasksCompleted: 38, hoursWorked: 160, efficiency: 92 },
  { name: "Mike Davis", tasksCompleted: 35, hoursWorked: 155, efficiency: 78 },
  { name: "Alex Johnson", tasksCompleted: 41, hoursWorked: 172, efficiency: 88 },
  { name: "Emma Brown", tasksCompleted: 39, hoursWorked: 164, efficiency: 90 }
];

const clientSatisfactionData = [
  { month: "Jan", satisfaction: 4.2, reviews: 15 },
  { month: "Feb", satisfaction: 4.4, reviews: 18 },
  { month: "Mar", satisfaction: 4.1, reviews: 12 },
  { month: "Apr", satisfaction: 4.6, reviews: 22 },
  { month: "May", satisfaction: 4.5, reviews: 25 },
  { month: "Jun", satisfaction: 4.7, reviews: 28 }
];

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$612,000",
    change: "+15.2%",
    changeType: "positive",
    icon: DollarSign,
    description: "vs last 6 months"
  },
  {
    title: "Active Projects",
    value: "23",
    change: "+12%",
    changeType: "positive",
    icon: FolderOpen,
    description: "currently in progress"
  },
  {
    title: "Team Members",
    value: "15",
    change: "+3",
    changeType: "positive",
    icon: Users,
    description: "total team size"
  },
  {
    title: "Avg. Project Duration",
    value: "8.2 weeks",
    change: "-5.8%",
    changeType: "positive",
    icon: Clock,
    description: "delivery time"
  }
];

export default function AnalyticsPage() {
  const getChangeColor = (type: string) => {
    return type === "positive" ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (type: string) => {
    return type === "positive" ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground">
            Business insights, performance metrics, and data-driven decisions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const ChangeIcon = getChangeIcon(kpi.changeType);
          
          return (
            <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <ChangeIcon className={`h-4 w-4 ${getChangeColor(kpi.changeType)}`} />
                  <span className={`text-sm ${getChangeColor(kpi.changeType)}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {kpi.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#colorRevenue)" 
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Project Status */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Project Status Distribution
                </CardTitle>
                <CardDescription>Current status of all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Projects"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {projectStatusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Revenue */}
            <Card className="border-border/50 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Monthly Revenue & Client Growth
                </CardTitle>
                <CardDescription>Revenue and client acquisition trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === "revenue" ? `$${value.toLocaleString()}` : value,
                        name === "revenue" ? "Revenue" : "Clients"
                      ]}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="clients" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Client Satisfaction */}
            <Card className="border-border/50 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Client Satisfaction Score
                </CardTitle>
                <CardDescription>Average satisfaction rating and review count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clientSatisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[0, 5]} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === "satisfaction" ? `${value}/5.0` : value,
                        name === "satisfaction" ? "Rating" : "Reviews"
                      ]}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="reviews" 
                      fill="hsl(var(--muted))" 
                      opacity={0.6}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Productivity Analytics
              </CardTitle>
              <CardDescription>Individual performance metrics and efficiency ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamProductivityData.map((member, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-card/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge 
                        className={
                          member.efficiency >= 90 
                            ? "bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-600/20"
                            : member.efficiency >= 80
                            ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
                            : "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-600 border-yellow-600/20"
                        }
                      >
                        {member.efficiency}% Efficiency
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tasks Completed</p>
                        <p className="font-semibold text-lg">{member.tasksCompleted}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hours Worked</p>
                        <p className="font-semibold text-lg">{member.hoursWorked}h</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg. per Task</p>
                        <p className="font-semibold text-lg">
                          {(member.hoursWorked / member.tasksCompleted).toFixed(1)}h
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{member.efficiency}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all" 
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}