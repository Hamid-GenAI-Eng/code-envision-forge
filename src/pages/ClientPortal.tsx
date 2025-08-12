import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  FileText, 
  Image,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Phone,
  DollarSign,
  PieChart,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Bell,
  Activity,
  Video,
  FileVideo,
  FileImage,
  File,
  Upload,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Zap
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ClientPortal = () => {
  const [selectedProject, setSelectedProject] = useState("1");
  const { toast } = useToast();

  // Mock data for the client portal
  const clientData = {
    name: "TechCorp Inc.",
    contactPerson: "John Anderson",
    avatar: "",
    projects: [
      {
        id: "1",
        name: "E-commerce Platform Redesign",
        status: "In Progress",
        progress: 75,
        budget: 145000,
        budgetUsed: 108750,
        deadline: "2024-03-15",
        startDate: "2024-01-01",
        description: "Complete redesign of the e-commerce platform with modern UI/UX",
        milestones: [
          { id: 1, name: "Research & Planning", status: "completed", date: "2024-01-15", progress: 100 },
          { id: 2, name: "UI/UX Design", status: "completed", date: "2024-02-01", progress: 100 },
          { id: 3, name: "Frontend Development", status: "in-progress", date: "2024-02-28", progress: 80 },
          { id: 4, name: "Backend Integration", status: "upcoming", date: "2024-03-10", progress: 0 },
          { id: 5, name: "Testing & Launch", status: "upcoming", date: "2024-03-15", progress: 0 }
        ],
        deliverables: [
          { id: 1, name: "Design System", type: "design", status: "approved", file: "design-system.figma", size: "2.5 MB", uploadDate: "2024-01-20" },
          { id: 2, name: "Homepage Mockup", type: "design", status: "pending", file: "homepage-v2.png", size: "1.2 MB", uploadDate: "2024-02-05" },
          { id: 3, name: "Product Catalog", type: "development", status: "approved", file: "catalog-component.zip", size: "850 KB", uploadDate: "2024-02-15" },
          { id: 4, name: "User Authentication", type: "development", status: "in-review", file: "auth-system.zip", size: "1.1 MB", uploadDate: "2024-02-20" }
        ],
        timeline: [
          { id: 1, task: "Initial consultation", status: "completed", date: "2024-01-01", assignee: "Sarah Wilson" },
          { id: 2, task: "Requirements gathering", status: "completed", date: "2024-01-05", assignee: "Mike Chen" },
          { id: 3, task: "Wireframe creation", status: "completed", date: "2024-01-15", assignee: "Lisa Garcia" },
          { id: 4, task: "UI design implementation", status: "completed", date: "2024-02-01", assignee: "Lisa Garcia" },
          { id: 5, task: "Component development", status: "in-progress", date: "2024-02-15", assignee: "David Park" },
          { id: 6, task: "API integration", status: "upcoming", date: "2024-03-01", assignee: "Mike Chen" },
          { id: 7, task: "Testing & QA", status: "upcoming", date: "2024-03-10", assignee: "Tom Rodriguez" }
        ]
      }
    ],
    teamMembers: [
      { id: 1, name: "Sarah Wilson", role: "Project Manager", email: "sarah@codeenvision.com", phone: "+1 (555) 123-4567", avatar: "", skills: ["Project Management", "Client Relations"] },
      { id: 2, name: "Mike Chen", role: "Lead Developer", email: "mike@codeenvision.com", phone: "+1 (555) 234-5678", avatar: "", skills: ["React", "Node.js", "Database Design"] },
      { id: 3, name: "Lisa Garcia", role: "UI/UX Designer", email: "lisa@codeenvision.com", phone: "+1 (555) 345-6789", avatar: "", skills: ["Figma", "User Research", "Prototyping"] },
      { id: 4, name: "David Park", role: "Frontend Developer", email: "david@codeenvision.com", phone: "+1 (555) 456-7890", avatar: "", skills: ["React", "TypeScript", "CSS"] },
      { id: 5, name: "Tom Rodriguez", role: "QA Engineer", email: "tom@codeenvision.com", phone: "+1 (555) 567-8901", avatar: "", skills: ["Testing", "Automation", "Bug Tracking"] }
    ],
    activityLog: [
      { id: 1, type: "deliverable", message: "User Authentication component uploaded for review", timestamp: "2024-02-20 14:30", user: "Mike Chen" },
      { id: 2, type: "milestone", message: "UI/UX Design milestone completed", timestamp: "2024-02-01 09:15", user: "Lisa Garcia" },
      { id: 3, type: "feedback", message: "Design System approved with minor revisions", timestamp: "2024-01-25 16:45", user: "John Anderson" },
      { id: 4, type: "meeting", message: "Weekly progress meeting scheduled", timestamp: "2024-01-22 11:00", user: "Sarah Wilson" },
      { id: 5, type: "budget", message: "Budget milestone reached - 75% utilized", timestamp: "2024-02-18 10:20", user: "System" }
    ]
  };

  const currentProject = clientData.projects.find(p => p.id === selectedProject) || clientData.projects[0];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
      case "in-review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "upcoming":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "design": return <FileImage className="h-4 w-4" />;
      case "video": return <FileVideo className="h-4 w-4" />;
      case "document": return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const handleFeedback = (deliverableId: number, feedback: string, approval: 'approve' | 'reject') => {
    toast({
      title: "Feedback Submitted",
      description: `Your ${approval === 'approve' ? 'approval' : 'feedback'} has been sent to the team.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={clientData.avatar} alt={clientData.name} />
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xl">
                  {clientData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{clientData.name}</h1>
                <p className="text-muted-foreground">Welcome back, {clientData.contactPerson}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Video className="h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="default" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Contact Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Selector */}
        {clientData.projects.length > 1 && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <label className="font-medium">Current Project:</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {clientData.projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="deliverables" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Files</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Project Progress Dashboard */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                      <p className="text-3xl font-bold text-primary">{currentProject.progress}%</p>
                    </div>
                  </div>
                  <Progress value={currentProject.progress} className="mt-4" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Days Remaining</p>
                      <p className="text-3xl font-bold text-accent">23</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
                      <p className="text-3xl font-bold text-green-600">12/16</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                      <p className="text-3xl font-bold text-orange-600">4</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Milestone Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Project Milestones
                </CardTitle>
                <CardDescription>Track major project milestones and their completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentProject.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                          milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {milestone.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                           milestone.status === 'in-progress' ? <Clock className="h-4 w-4" /> :
                           <AlertCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{milestone.name}</h4>
                          <p className="text-sm text-muted-foreground">Due: {milestone.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="w-24">
                          <Progress value={milestone.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1 text-center">
                            {milestone.progress}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>{currentProject.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Start Date</p>
                    <p className="text-lg font-semibold">{currentProject.startDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Deadline</p>
                    <p className="text-lg font-semibold">{currentProject.deadline}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Status</p>
                    <Badge className={getStatusColor(currentProject.status)}>
                      {currentProject.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deliverables Tab */}
          <TabsContent value="deliverables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Deliverables Library
                </CardTitle>
                <CardDescription>View and download completed project deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentProject.deliverables.map((deliverable) => (
                    <div key={deliverable.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          {getFileIcon(deliverable.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{deliverable.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {deliverable.size} • Uploaded {deliverable.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(deliverable.status)}>
                          {deliverable.status.replace('-', ' ')}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownload(deliverable.file)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback & Approval System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Pending Approvals
                </CardTitle>
                <CardDescription>Review and provide feedback on pending deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentProject.deliverables.filter(d => d.status === 'pending' || d.status === 'in-review').map((deliverable) => (
                    <div key={deliverable.id} className="p-4 rounded-lg border bg-yellow-50/50 dark:bg-yellow-900/10">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{deliverable.name}</h4>
                        <Badge className={getStatusColor(deliverable.status)}>
                          {deliverable.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <Textarea 
                        placeholder="Share your feedback or approval notes..."
                        className="mb-3"
                      />
                      <div className="flex gap-2">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleFeedback(deliverable.id, "", 'approve')}
                          className="gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFeedback(deliverable.id, "", 'reject')}
                          className="gap-1"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          Request Changes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Timeline
                </CardTitle>
                <CardDescription>Track completed, ongoing, and upcoming project tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                  <div className="space-y-6">
                    {currentProject.timeline.map((task, index) => (
                      <div key={task.id} className="relative flex items-start gap-4">
                        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                          task.status === 'completed' ? 'bg-green-100 border-green-600 text-green-600' :
                          task.status === 'in-progress' ? 'bg-blue-100 border-blue-600 text-blue-600' :
                          'bg-gray-100 border-gray-300 text-gray-400'
                        }`}>
                          {task.status === 'completed' ? <CheckCircle className="h-5 w-5" /> :
                           task.status === 'in-progress' ? <Clock className="h-5 w-5" /> :
                           <AlertCircle className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{task.task}</h4>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.date} • Assigned to {task.assignee}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Budget</span>
                      <span className="font-semibold">${currentProject.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Used</span>
                      <span className="font-semibold text-primary">${currentProject.budgetUsed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Remaining</span>
                      <span className="font-semibold text-green-600">${(currentProject.budget - currentProject.budgetUsed).toLocaleString()}</span>
                    </div>
                    <Progress value={(currentProject.budgetUsed / currentProject.budget) * 100} className="mt-4" />
                    <p className="text-xs text-muted-foreground text-center">
                      {Math.round((currentProject.budgetUsed / currentProject.budget) * 100)}% of budget utilized
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Resource Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Development</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Design</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Testing</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Management</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Project Team
                </CardTitle>
                <CardDescription>Meet the professionals working on your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {clientData.teamMembers.map((member) => (
                    <Card key={member.id} className="border-muted hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <Avatar className="h-16 w-16 mx-auto">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {member.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Mail className="h-3 w-3" />
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Phone className="h-3 w-3" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Log
                </CardTitle>
                <CardDescription>Real-time updates on your project's progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card/50">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'deliverable' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'milestone' ? 'bg-green-100 text-green-600' :
                        activity.type === 'feedback' ? 'bg-purple-100 text-purple-600' :
                        activity.type === 'meeting' ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.type === 'deliverable' ? <Upload className="h-4 w-4" /> :
                         activity.type === 'milestone' ? <CheckCircle className="h-4 w-4" /> :
                         activity.type === 'feedback' ? <MessageSquare className="h-4 w-4" /> :
                         activity.type === 'meeting' ? <Video className="h-4 w-4" /> :
                         <Bell className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp} • by {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientPortal;