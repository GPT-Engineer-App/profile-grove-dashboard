import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Home, MessageSquare, Settings, HelpCircle } from "lucide-react";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
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
        {/* Sidebar */}
        <aside className={`bg-gray-100 p-4 ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
          <Button variant="ghost" onClick={toggleSidebar} className="mb-4">
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
          <nav>
            <ul className="space-y-2">
              {[
                { icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
                { icon: <MessageSquare className="h-5 w-5" />, label: 'Messages' },
                { icon: <Settings className="h-5 w-5" />, label: 'Settings' },
                { icon: <HelpCircle className="h-5 w-5" />, label: 'Help' },
              ].map((item, index) => (
                <li key={index}>
                  <Button variant="ghost" className="w-full justify-start">
                    {item.icon}
                    {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p>A passionate developer with a love for creating amazing user experiences.</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Here you'll see your recent activities.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Friends List</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect with your friends here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage your profile settings here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center">
        <nav>
          <ul className="flex justify-center space-x-4">
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