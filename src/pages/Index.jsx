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
import { Home, MessageSquare, Settings, HelpCircle, Menu, Plus, ChevronRight, Filter, Clock, Award, Briefcase, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    link: "",
    environment: "",
    tags: [],
    technologies: [],
    challenges: "",
    outcomes: "",
    startDate: "",
    endDate: "",
  });
  const [skills, setSkills] = useState([
    { name: "React", level: 80, description: "Building modern web applications", projects: ["Portfolio Dashboard"], timeSpent: 500, certifications: ["React Developer Certificate"] },
    { name: "JavaScript", level: 85, description: "Core language for web development", projects: ["Interactive Web Apps"], timeSpent: 1000, certifications: ["JavaScript Advanced"] },
    { name: "Node.js", level: 75, description: "Server-side JavaScript runtime", projects: ["RESTful API"], timeSpent: 300, certifications: [] },
    { name: "CSS", level: 70, description: "Styling web applications", projects: ["Responsive Layouts"], timeSpent: 200, certifications: ["CSS Mastery"] },
  ]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [activeSection, setActiveSection] = useState("basic");
  const [activities, setActivities] = useState([
    { type: "Portfolio Update", date: "2023-03-15", description: "Added new React project" },
    { type: "Skill Improvement", date: "2023-03-10", description: "Completed Advanced JavaScript course" },
    { type: "Networking", date: "2023-03-05", description: "Attended local tech meetup" },
  ]);
  const [activityFilter, setActivityFilter] = useState("all");
  const [profileSteps, setProfileSteps] = useState([
    { id: "basic", label: "Basic Info", completed: false },
    { id: "skills", label: "Skills", completed: false },
    { id: "portfolio", label: "Portfolio", completed: false },
    { id: "activity", label: "Activity", completed: false },
  ]);
  const [portfolioSort, setPortfolioSort] = useState("dateAdded");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [currentStep, setCurrentStep] = useState(0);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Messages' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help' },
  ];

  const handleAddPortfolioItem = () => {
    if (newItem.title && newItem.description) {
      setPortfolioItems([...portfolioItems, { ...newItem, id: Date.now(), dateAdded: new Date() }]);
      setNewItem({
        title: "",
        description: "",
        link: "",
        environment: "",
        tags: [],
        technologies: [],
        challenges: "",
        outcomes: "",
        startDate: "",
        endDate: "",
      });
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    // Calculate profile completion percentage
    const totalSections = profileSteps.length;
    const completedSections = profileSteps.filter(step => step.completed).length;
    setProfileCompletion((completedSections / totalSections) * 100);
  }, [profileSteps]);

  const skillProgressData = skills.map((skill, index) => ({
    name: skill.name,
    level: skill.level,
    previousLevel: Math.max(0, skill.level - 10 + Math.floor(Math.random() * 5)), // Simulated previous level
    projectedLevel: Math.min(100, skill.level + 5 + Math.floor(Math.random() * 10)), // Projected future level
  }));

  const handleSkillUpdate = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(portfolioItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPortfolioItems(items);
  };

  const sortedAndFilteredPortfolioItems = portfolioItems
    .filter(item => {
      if (portfolioFilter === "all") return true;
      return item.tags.includes(portfolioFilter) || item.technologies.includes(portfolioFilter);
    })
    .sort((a, b) => {
      if (portfolioSort === "dateAdded") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (portfolioSort === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const extrapolateProject = () => {
    const technologies = portfolioItems.flatMap(item => item.technologies);
    const mostUsedTech = technologies.reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {});
    const suggestedTech = Object.keys(mostUsedTech).sort((a, b) => mostUsedTech[b] - mostUsedTech[a]).slice(0, 3);

    return {
      title: "Suggested Future Project",
      description: "Based on your current portfolio, you might consider a project that combines your top skills.",
      technologies: suggestedTech,
      challenges: "Integrating multiple technologies seamlessly",
      outcomes: "Showcase advanced skills and create a unique solution"
    };
  };

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
            <Button onClick={() => {
              setActiveSection("skills");
              setProfileSteps(steps => steps.map(step => step.id === "basic" ? { ...step, completed: true } : step));
            }}>Next: Skills <ChevronRight className="ml-2 h-4 w-4" /></Button>
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
                      <Input
                        value={skill.description}
                        onChange={(e) => handleSkillUpdate(index, "description", e.target.value)}
                        placeholder="Skill description"
                      />
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <Input
                          type="number"
                          value={skill.timeSpent}
                          onChange={(e) => handleSkillUpdate(index, "timeSpent", parseInt(e.target.value))}
                          placeholder="Time spent (hours)"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <Input
                          value={skill.certifications.join(", ")}
                          onChange={(e) => handleSkillUpdate(index, "certifications", e.target.value.split(", "))}
                          placeholder="Certifications (comma-separated)"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4" />
                        <Input
                          value={skill.projects.join(", ")}
                          onChange={(e) => handleSkillUpdate(index, "projects", e.target.value.split(", "))}
                          placeholder="Related projects (comma-separated)"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Button onClick={() => {
              setActiveSection("portfolio");
              setProfileSteps(steps => steps.map(step => step.id === "skills" ? { ...step, completed: true } : step));
            }}>Next: Portfolio <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        );
      case "portfolio":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Portfolio</h3>
            <div className="flex justify-between items-center space-x-2">
              <Select value={portfolioSort} onValueChange={setPortfolioSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Select value={portfolioFilter} onValueChange={setPortfolioFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {Array.from(new Set(portfolioItems.flatMap(item => [...item.tags, ...item.technologies]))).map((filter, index) => (
                    <SelectItem key={index} value={filter}>{filter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="portfolio">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sortedAndFilteredPortfolioItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Accordion type="single" collapsible className="mb-4">
                              <AccordionItem value={`item-${item.id}`}>
                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-2">
                                    <p><strong>Description:</strong> {item.description}</p>
                                    <p><strong>Environment:</strong> {item.environment}</p>
                                    <p><strong>Technologies:</strong> {item.technologies.join(", ")}</p>
                                    <p><strong>Challenges:</strong> {item.challenges}</p>
                                    <p><strong>Outcomes:</strong> {item.outcomes}</p>
                                    <p><strong>Date:</strong> {item.startDate} - {item.endDate}</p>
                                    {item.link && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                                        View Project
                                      </a>
                                    )}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {item.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">{tag}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
                  {currentStep === 0 && (
                    <>
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
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
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
                        <Label htmlFor="technologies" className="text-right">
                          Technologies
                        </Label>
                        <Input
                          id="technologies"
                          value={newItem.technologies.join(", ")}
                          onChange={(e) => setNewItem({ ...newItem, technologies: e.target.value.split(",").map(tech => tech.trim()) })}
                          className="col-span-3"
                          placeholder="Enter technologies separated by commas"
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="challenges" className="text-right">
                          Challenges
                        </Label>
                        <Textarea
                          id="challenges"
                          value={newItem.challenges}
                          onChange={(e) => setNewItem({ ...newItem, challenges: e.target.value })}
                          className="col-span-3"
                          placeholder="Describe the challenges faced"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="outcomes" className="text-right">
                          Outcomes
                        </Label>
                        <Textarea
                          id="outcomes"
                          value={newItem.outcomes}
                          onChange={(e) => setNewItem({ ...newItem, outcomes: e.target.value })}
                          className="col-span-3"
                          placeholder="Describe the project outcomes"
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newItem.startDate}
                          onChange={(e) => setNewItem({ ...newItem, startDate: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newItem.endDate}
                          onChange={(e) => setNewItem({ ...newItem, endDate: e.target.value })}
                          className="col-span-3"
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
                    </>
                  )}
                </div>
                <div className="flex justify-between">
                  {currentStep > 0 && (
                    <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
                  )}
                  {currentStep < 3 ? (
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
                  ) : (
                    <Button onClick={handleAddPortfolioItem}>Add to Portfolio</Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Suggested Future Project</CardTitle>
                <CardDescription>Based on your current portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                {portfolioItems.length > 0 ? (
                  <div>
                    <p><strong>Title:</strong> {extrapolateProject().title}</p>
                    <p><strong>Description:</strong> {extrapolateProject().description}</p>
                    <p><strong>Suggested Technologies:</strong> {extrapolateProject().technologies.join(", ")}</p>
                    <p><strong>Potential Challenges:</strong> {extrapolateProject().challenges}</p>
                    <p><strong>Expected Outcomes:</strong> {extrapolateProject().outcomes}</p>
                  </div>
                ) : (
                  <p>Add some portfolio items to get project suggestions!</p>
                )}
              </CardContent>
            </Card>
            <Button onClick={() => {
              setActiveSection("activity");
              setProfileSteps(steps => steps.map(step => step.id === "portfolio" ? { ...step, completed: true } : step));
            }}>Next: Activity <ChevronRight className="ml-2 h-4 w-4" /></Button>
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
            <Button onClick={() => {
              setActiveSection("basic");
              setProfileSteps(steps => steps.map(step => step.id === "activity" ? { ...step, completed: true } : step));
            }}>Back to Basic Info <ChevronRight className="ml-2 h-4 w-4" /></Button>
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
              <div className="mt-4 flex flex-wrap gap-2">
                {profileSteps.map((step) => (
                  <Badge key={step.id} variant={step.completed ? "default" : "outline"}>
                    {step.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skill Progress Over Time</CardTitle>
              <CardDescription>Track your skill improvement and projected growth</CardDescription>
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
                  <Line type="monotone" dataKey="projectedLevel" stroke="#ffc658" name="Projected Level" strokeDasharray="5 5" />
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