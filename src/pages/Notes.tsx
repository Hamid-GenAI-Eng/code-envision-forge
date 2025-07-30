import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Search, Filter, Tag, Folder, Star, Clock, Users, Edit, Trash2, Share } from "lucide-react";
import { format } from "date-fns";

const notes = [
  {
    id: 1,
    title: "Project Requirements - TechCorp Mobile App",
    content: "Key requirements discussed in client meeting: iOS and Android native apps, offline capability, user authentication via OAuth, payment gateway integration...",
    tags: ["TechCorp", "Mobile", "Requirements"],
    category: "project",
    project: "TechCorp Mobile App",
    author: "John Doe",
    lastModified: new Date(2024, 0, 15),
    isStarred: true,
    shared: true
  },
  {
    id: 2,
    title: "Code Review Checklist",
    content: "Standard checklist for all code reviews: Security vulnerabilities, Performance optimization, Code readability, Documentation, Test coverage...",
    tags: ["Development", "Process", "Quality"],
    category: "internal",
    project: "General",
    author: "Sarah Wilson",
    lastModified: new Date(2024, 0, 14),
    isStarred: false,
    shared: false
  },
  {
    id: 3,
    title: "Client Feedback - StartupX Dashboard",
    content: "Feedback from client meeting: Dashboard needs better data visualization, user wants dark mode option, mobile responsiveness improvements needed...",
    tags: ["StartupX", "Feedback", "UI/UX"],
    category: "project",
    project: "StartupX Dashboard",
    author: "Mike Davis",
    lastModified: new Date(2024, 0, 13),
    isStarred: true,
    shared: true
  },
  {
    id: 4,
    title: "Team Meeting Notes - Q1 Planning",
    content: "Q1 objectives discussed: Team expansion plans, new client acquisition targets, technology stack updates, training programs...",
    tags: ["Planning", "Team", "Q1"],
    category: "meeting",
    project: "General",
    author: "Alex Johnson",
    lastModified: new Date(2024, 0, 12),
    isStarred: false,
    shared: false
  }
];

const categories = [
  { value: "all", label: "All Notes", count: notes.length },
  { value: "project", label: "Project Notes", count: notes.filter(n => n.category === "project").length },
  { value: "meeting", label: "Meeting Notes", count: notes.filter(n => n.category === "meeting").length },
  { value: "internal", label: "Internal Docs", count: notes.filter(n => n.category === "internal").length },
  { value: "starred", label: "Starred", count: notes.filter(n => n.isStarred).length }
];

const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "starred" && note.isStarred) ||
                           note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "project":
        return "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20";
      case "meeting":
        return "bg-gradient-to-r from-secondary/10 to-muted/10 text-secondary-foreground border-secondary/20";
      case "internal":
        return "bg-gradient-to-r from-muted/10 to-border/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Notes & Documentation
          </h1>
          <p className="text-muted-foreground">
            Organize project notes, meeting minutes, and internal documentation
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>
                  Add a new note or documentation to your knowledge base.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Note Title</Label>
                  <Input id="title" placeholder="Enter note title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project">Project Notes</SelectItem>
                        <SelectItem value="meeting">Meeting Notes</SelectItem>
                        <SelectItem value="internal">Internal Docs</SelectItem>
                        <SelectItem value="personal">Personal Notes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Related Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techcorp">TechCorp Mobile App</SelectItem>
                        <SelectItem value="startupx">StartupX Dashboard</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Write your note content here..." 
                    className="min-h-[200px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategory === category.value 
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className="font-medium">{category.label}</span>
                  <Badge variant="outline">{category.count}</Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Popular Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/20"
                    onClick={() => setSearchTerm(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes List */}
        <div className="lg:col-span-3">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Notes & Documentation
                  <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent/10">
                    {filteredNotes.length} notes
                  </Badge>
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <CardDescription>
                {selectedCategory === "all" ? "All notes" : `${selectedCategory} notes`}
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="p-4 rounded-lg border border-border/50 hover:shadow-md transition-all cursor-pointer bg-card/50"
                  onClick={() => setSelectedNote(selectedNote === note.id ? null : note.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        {note.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        <Badge className={getCategoryColor(note.category)}>
                          {note.category}
                        </Badge>
                        {note.shared && (
                          <Badge variant="outline" className="text-green-600 border-green-600/20">
                            <Share className="h-3 w-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {note.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{note.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{format(note.lastModified, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Folder className="h-3 w-3" />
                          <span>{note.project}</span>
                        </div>
                      </div>
                      
                      {selectedNote === note.id && (
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}