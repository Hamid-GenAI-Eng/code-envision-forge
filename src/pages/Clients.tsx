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
  Building,
  Calendar,
  DollarSign,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  MessageSquare
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
import { AddClientForm } from "@/components/forms/AddClientForm";
import { useToast } from "@/hooks/use-toast";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const clients = [
    {
      id: 1,
      name: "TechCorp Inc.",
      contactPerson: "John Anderson",
      email: "john@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      status: "Active",
      totalProjects: 3,
      totalRevenue: "$145,000",
      lastContact: "2024-01-25",
      joinDate: "2023-08-15",
      avatar: ""
    },
    {
      id: 2,
      name: "FinanceX",
      contactPerson: "Sarah Williams",
      email: "sarah@financex.com",
      phone: "+1 (555) 234-5678",
      company: "FinanceX Solutions",
      location: "New York, NY",
      status: "Active",
      totalProjects: 2,
      totalRevenue: "$95,000",
      lastContact: "2024-01-23",
      joinDate: "2023-10-01",
      avatar: ""
    },
    {
      id: 3,
      name: "MedLife",
      contactPerson: "Dr. Michael Chen",
      email: "michael@medlife.com",
      phone: "+1 (555) 345-6789",
      company: "MedLife Healthcare",
      location: "Boston, MA",
      status: "Active",
      totalProjects: 1,
      totalRevenue: "$35,000",
      lastContact: "2024-01-20",
      joinDate: "2023-11-15",
      avatar: ""
    },
    {
      id: 4,
      name: "FoodChain Ltd.",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@foodchain.com",
      phone: "+1 (555) 456-7890",
      company: "FoodChain Ltd.",
      location: "Chicago, IL",
      status: "Completed",
      totalProjects: 1,
      totalRevenue: "$25,000",
      lastContact: "2024-01-15",
      joinDate: "2023-09-20",
      avatar: ""
    },
    {
      id: 5,
      name: "PropertyPro",
      contactPerson: "David Thompson",
      email: "david@propertypro.com",
      phone: "+1 (555) 567-8901",
      company: "PropertyPro Real Estate",
      location: "Miami, FL",
      status: "Prospect",
      totalProjects: 0,
      totalRevenue: "$0",
      lastContact: "2024-01-28",
      joinDate: "2024-01-28",
      avatar: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Prospect": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = (data: any) => {
    console.log("New client added:", data);
    toast({
      title: "Client Added",
      description: "New client has been successfully added.",
    });
    setIsAddClientOpen(false);
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships and track project history
          </p>
        </div>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <AddClientForm
              onSubmit={handleAddClient}
              onCancel={() => setIsAddClientOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      {client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.contactPerson}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover z-50" align="end">
                    <DropdownMenuItem onClick={() => handleViewClient(client)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{client.totalProjects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{client.totalRevenue}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
              </div>

              {/* Dates */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Joined: {client.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3 w-3" />
                  <span>Last contact: {client.lastContact}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleViewClient(client)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No clients found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or add a new client
                </p>
              </div>
              <Button variant="gradient" onClick={() => setIsAddClientOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedClient.avatar} alt={selectedClient.name} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg">
                          {selectedClient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{selectedClient.name}</h3>
                        <p className="text-muted-foreground">{selectedClient.contactPerson}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Status:</p>
                      <Badge className={getStatusColor(selectedClient.status)}>
                        {selectedClient.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">Total Projects:</p>
                      <p className="text-muted-foreground">{selectedClient.totalProjects}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Revenue:</p>
                      <p className="text-muted-foreground">{selectedClient.totalRevenue}</p>
                    </div>
                    <div>
                      <p className="font-medium">Join Date:</p>
                      <p className="text-muted-foreground">{selectedClient.joinDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Last Contact:</p>
                      <p className="text-muted-foreground">{selectedClient.lastContact}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-3">
                <Button variant="default">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;