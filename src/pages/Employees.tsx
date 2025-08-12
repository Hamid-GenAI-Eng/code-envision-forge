import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  MessageSquare,
  User
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
import { AddEmployeeForm } from "@/components/forms/AddEmployeeForm";
import { useToast } from "@/hooks/use-toast";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@codeenvision.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Full Stack Developer",
      department: "Development",
      location: "San Francisco, CA",
      status: "Active",
      joinDate: "2023-03-15",
      salary: "$85,000",
      skills: ["React", "Node.js", "Python", "AWS"],
      currentProjects: 2,
      completedProjects: 12,
      performance: 4.8,
      avatar: ""
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@codeenvision.com",
      phone: "+1 (555) 234-5678",
      position: "UI/UX Designer",
      department: "Design",
      location: "New York, NY",
      status: "Active",
      joinDate: "2023-05-20",
      salary: "$70,000",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      currentProjects: 3,
      completedProjects: 8,
      performance: 4.9,
      avatar: ""
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@codeenvision.com",
      phone: "+1 (555) 345-6789",
      position: "Project Manager",
      department: "Management",
      location: "Austin, TX",
      status: "Active",
      joinDate: "2022-11-10",
      salary: "$90,000",
      skills: ["Agile", "Scrum", "JIRA", "Leadership"],
      currentProjects: 5,
      completedProjects: 25,
      performance: 4.7,
      avatar: ""
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@codeenvision.com",
      phone: "+1 (555) 456-7890",
      position: "Backend Developer",
      department: "Development",
      location: "Seattle, WA",
      status: "Active",
      joinDate: "2023-07-01",
      salary: "$80,000",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      currentProjects: 1,
      completedProjects: 6,
      performance: 4.6,
      avatar: ""
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@codeenvision.com",
      phone: "+1 (555) 567-8901",
      position: "DevOps Engineer",
      department: "Operations",
      location: "Denver, CO",
      status: "On Leave",
      joinDate: "2023-01-15",
      salary: "$95,000",
      skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
      currentProjects: 0,
      completedProjects: 10,
      performance: 4.5,
      avatar: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleAddEmployee = (data: any) => {
    console.log("New employee added:", data);
    toast({
      title: "Employee Added",
      description: "New employee has been successfully added.",
    });
    setIsAddEmployeeOpen(false);
  };

  const handleViewProfile = (employee: any) => {
    setSelectedEmployee(employee);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your team members and track their performance
          </p>
        </div>
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2 w-full md:w-auto">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <AddEmployeeForm
              onSubmit={handleAddEmployee}
              onCancel={() => setIsAddEmployeeOpen(false)}
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.position}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover z-50" align="end">
                    <DropdownMenuItem onClick={() => handleViewProfile(employee)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Employee
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Remove Employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
                <Badge variant="secondary">
                  {employee.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.location}</span>
                </div>
              </div>

              {/* Performance */}
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{employee.performance}</span>
                <span className="text-muted-foreground text-sm">Performance Rating</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{employee.currentProjects}</div>
                  <div className="text-xs text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{employee.completedProjects}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {employee.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{employee.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Join Date */}
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Joined: {employee.joinDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(employee)}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No employees found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or add a new employee
                </p>
              </div>
              <Button variant="gradient" onClick={() => setIsAddEmployeeOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Employee
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employee Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg">
                          {selectedEmployee.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                        <p className="text-muted-foreground">{selectedEmployee.position}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEmployee.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined: {selectedEmployee.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Work Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Department:</p>
                      <Badge variant="secondary">{selectedEmployee.department}</Badge>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <Badge className={getStatusColor(selectedEmployee.status)}>
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">Salary:</p>
                      <p className="text-muted-foreground">{selectedEmployee.salary}</p>
                    </div>
                    <div>
                      <p className="font-medium">Performance Rating:</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{selectedEmployee.performance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{selectedEmployee.currentProjects}</div>
                      <div className="text-sm text-muted-foreground">Active Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">{selectedEmployee.completedProjects}</div>
                      <div className="text-sm text-muted-foreground">Completed Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-3">
                <Button variant="default">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Employee
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;