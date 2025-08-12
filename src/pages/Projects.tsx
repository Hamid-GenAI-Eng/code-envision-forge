import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Users,
  DollarSign,
  MoreVertical,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewProjectForm } from "@/components/forms/NewProjectForm";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      client: "TechCorp Inc.",
      description: "Full-stack e-commerce solution with React and Node.js",
      progress: 75,
      status: "In Progress",
      budget: "$45,000",
      startDate: "2024-01-15",
      deadline: "2024-02-15",
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      priority: "High"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "FinanceX",
      description: "iOS and Android banking application with secure transactions",
      progress: 60,
      status: "In Progress",
      budget: "$80,000",
      startDate: "2024-01-20",
      deadline: "2024-03-01",
      team: ["Sarah Wilson", "David Brown", "Lisa Garcia"],
      priority: "High"
    },
    {
      id: 3,
      name: "Healthcare Portal",
      client: "MedLife",
      description: "Patient management system with appointment scheduling",
      progress: 90,
      status: "Review",
      budget: "$35,000",
      startDate: "2023-12-01",
      deadline: "2024-01-30",
      team: ["Alex Chen", "Maria Rodriguez"],
      priority: "Medium"
    },
    {
      id: 4,
      name: "Restaurant Management System",
      client: "FoodChain Ltd.",
      description: "POS system with inventory management and analytics",
      progress: 100,
      status: "Completed",
      budget: "$25,000",
      startDate: "2023-11-15",
      deadline: "2024-01-15",
      team: ["Tom Wilson", "Emma Davis"],
      priority: "Low"
    },
    {
      id: 5,
      name: "Real Estate Platform",
      client: "PropertyPro",
      description: "Property listing and management platform",
      progress: 30,
      status: "Planning",
      budget: "$65,000",
      startDate: "2024-02-01",
      deadline: "2024-04-15",
      team: ["Chris Anderson", "Nina Patel", "Ryan Lee"],
      priority: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-gray-100 text-gray-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "border-l-4 border-red-500";
      case "Medium": return "border-l-4 border-yellow-500";
      case "Low": return "border-l-4 border-green-500";
      default: return "border-l-4 border-gray-500";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewProject = (data: any) => {
    console.log("New project created:", data);
    toast({
      title: "Project Created",
      description: "New project has been successfully created.",
    });
    setIsNewProjectOpen(false);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage and track all your projects in one place
          </p>
        </div>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2 w-full md:w-auto">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <NewProjectForm
              onSubmit={handleNewProject}
              onCancel={() => setIsNewProjectOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className={`hover:shadow-md transition-shadow ${getPriorityColor(project.priority)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.client}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover z-50" align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.team.length} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{project.deadline}</span>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <p className="text-sm font-medium mb-2">Team:</p>
                <div className="flex flex-wrap gap-1">
                  {project.team.slice(0, 3).map((member, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                  {project.team.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.team.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(project)}>
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or create a new project
                </p>
              </div>
              <Button variant="gradient" onClick={() => setIsNewProjectOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Name:</p>
                      <p className="text-muted-foreground">{selectedProject.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Client:</p>
                      <p className="text-muted-foreground">{selectedProject.client}</p>
                    </div>
                    <div>
                      <p className="font-medium">Description:</p>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <Badge className={getStatusColor(selectedProject.status)}>
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Project Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Budget:</p>
                      <p className="text-muted-foreground">{selectedProject.budget}</p>
                    </div>
                    <div>
                      <p className="font-medium">Progress:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>{selectedProject.progress}%</span>
                        </div>
                        <Progress value={selectedProject.progress} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Start Date:</p>
                      <p className="text-muted-foreground">{selectedProject.startDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Deadline:</p>
                      <p className="text-muted-foreground">{selectedProject.deadline}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.team.map((member: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;