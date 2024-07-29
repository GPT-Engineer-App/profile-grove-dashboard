import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MessageSquare, Settings, HelpCircle, Menu, Plus, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "", link: "", environment: "", tags: [] });
  const [skills, setSkills] = useState([
    { name: "React", level: 80, description: "Building modern web applications", projects: ["Portfolio Dashboard"] },
    { name: "JavaScript", level: 85, description: "Core language for web development", projects: ["Interactive Web Apps"] },
    { name: "Node.js", level: 75, description: "Server-side JavaScript runtime", projects: ["RESTful API"] },
    { name: "CSS", level: 70, description: "Styling web applications", projects: ["Responsive Layouts"] },
  ]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [activeSection, setActiveSection] = useState("basic");
  const [activities, setActivities] = useState([
    { type: "Portfolio Update", date: "2023-03-15", description: "Added new React project" },
    { type: "Skill Improvement", date: "2023-03-10", description: "Completed Advanced JavaScript course" },
    { type: "Networking", date: "2023-03-05", description: "Attended local tech meetup" },
  ]);
  const [activityFilter, setActivityFilter] = useState("all");

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Messages' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help' },
  ];

  const handleAddPortfolioItem = () => {
    if (newItem.title && newItem.description) {
      setPortfolioItems([...portfolioItems, { ...newItem, id: Date.now() }]);
      setNewItem({ title: "", description: "", link: "", environment: "", tags: [] });
    }
  };

  useEffect(() => {
    // Calculate profile completion percentage
    const totalSections = 4; // Basic, Skills, Portfolio, Activity
    const completedSections = [
      true, // Basic info is always present
      skills.length > 0,
      portfolioItems.length > 0,
      activities.length > 0,
    ].filter(Boolean).length;

    setProfileCompletion((completedSections / totalSections) * 100);
  }, [skills, portfolioItems, activities]);

  const skillProgressData = skills.map((skill, index) => ({
    name: skill.name,
    level: skill.level,
    previousLevel: Math.max(0, skill.level - 10 + Math.floor(Math.random() * 5)), // Simulated previous level
  }));

  const renderProfileSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <Textarea
              placeholder="A passionate developer with a love for creating amazing user experiences."
              className="w-full"
            />
            <Button onClick={() => setActiveSection("skills")}>Next: Skills <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            {skills.map((skill, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={`skill-${index}`}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Progress value={skill.level} className="w-full" />
                      <p><strong>Description:</strong> {skill.description}</p>
                      <p><strong>Related Projects:</strong> {skill.projects.join(", ")}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Button onClick={() => setActiveSection("portfolio")}>Next: Portfolio <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        );
      case "portfolio":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Portfolio</h3>
            {portfolioItems.map((item) => (
              <Accordion type="single" collapsible key={item.id}>
                <AccordionItem value={`item-${item.id}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.description}</p>
                    {item.environment && (
                      <p className="mt-2"><strong>Environment:</strong> {item.environment}</p>
                    )}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                        View Project
                      </a>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2">
                        <strong>Tags:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Portfolio Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Portfolio Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="environment" className="text-right">
                      Environment
                    </Label>
                    <Textarea
                      id="environment"
                      value={newItem.environment}
                      onChange={(e) => setNewItem({ ...newItem, environment: e.target.value })}
                      className="col-span-3"
                      placeholder="Describe the environment (e.g., technologies, frameworks used)"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link" className="text-right">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={newItem.link}
                      onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={newItem.tags.join(", ")}
                      onChange={(e) => setNewItem({ ...newItem, tags: e.target.value.split(",").map(tag => tag.trim()) })}
                      className="col-span-3"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </div>
                <Button onClick={handleAddPortfolioItem}>Add to Portfolio</Button>
              </DialogContent>
            </Dialog>
            <Button onClick={() => setActiveSection("activity")}>Next: Activity <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        );
      case "activity":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="flex justify-between items-center">
              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter activities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="Portfolio Update">Portfolio Updates</SelectItem>
                  <SelectItem value="Skill Improvement">Skill Improvements</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ul className="space-y-2">
              {activities
                .filter(activity => activityFilter === "all" || activity.type === activityFilter)
                .map((activity, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{activity.description}</span>
                    <Badge>{new Date(activity.date).toLocaleDateString()}</Badge>
                  </li>
                ))}
            </ul>
            <Button onClick={() => setActiveSection("basic")}>Back to Basic Info <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item, index) => (
                  <Button key={index} variant="ghost" className="justify-start">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="text-2xl font-bold ml-2">DevProfile</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <aside className="hidden md:block bg-gray-100 w-64 p-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Button variant="ghost" className="w-full justify-start">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to showcase your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompletion} className="w-full" />
              <p className="mt-2 text-sm text-gray-500">{Math.round(profileCompletion)}% complete</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skill Progress Over Time</CardTitle>
              <CardDescription>Track your skill improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={skillProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="previousLevel" stroke="#8884d8" name="Previous Level" />
                  <Line type="monotone" dataKey="level" stroke="#82ca9d" name="Current Level" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Developer Profile</CardTitle>
              <CardDescription>Manage and showcase your professional information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeSection} onValueChange={setActiveSection}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value={activeSection}>
                  {renderProfileSection()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center">
        <nav>
          <ul className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-x-4 sm:space-y-0">
            <li><a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Terms of Service</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Contact Us</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Index;