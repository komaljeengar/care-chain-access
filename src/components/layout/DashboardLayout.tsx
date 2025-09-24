import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Shield,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Stethoscope,
  User,
  Bell,
  ChevronDown,
  Heart,
  Search
} from 'lucide-react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const patientNavItems = [
    { title: 'Dashboard', url: '/patient/dashboard', icon: LayoutDashboard },
    { title: 'Medical Records', url: '/patient/records', icon: FileText },
    { title: 'Permissions', url: '/patient/permissions', icon: Users },
    { title: 'AI Health Chat', url: '/patient/ai-chat', icon: MessageSquare },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  const doctorNavItems = [
    { title: 'Dashboard', url: '/doctor/dashboard', icon: LayoutDashboard },
    { title: 'Patients', url: '/doctor/patients', icon: User },
    { title: 'Clinical Support', url: '/doctor/ai-support', icon: MessageSquare },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const AppSidebar = () => {
    const currentPath = location.pathname;

    const isActive = (path: string) => currentPath === path;
    const getNavCls = (path: string) =>
      isActive(path) 
        ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90" 
        : "hover:bg-muted/50";

    return (
      <Sidebar className="w-64" collapsible="icon">
        <SidebarContent>
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">MedVault</span>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>
              {user?.role === 'doctor' ? 'Clinical Tools' : 'Your Health'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls(item.url)}>
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {user?.role === 'patient' && (
            <SidebarGroup>
              <SidebarGroupLabel>
                Emergency
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-red-600 hover:bg-red-50">
                      <Heart className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span>Emergency Access</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search medical records..."
                      className="pl-10 pr-4 py-2 w-80 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* User Role Badge */}
                <Badge className={`${
                  user?.role === 'doctor' 
                    ? 'bg-secondary/10 text-secondary border-secondary/20' 
                    : 'bg-primary/10 text-primary border-primary/20'
                }`}>
                  {user?.role === 'doctor' ? (
                    <><Stethoscope className="w-3 h-3 mr-1" /> Doctor</>
                  ) : (
                    <><User className="w-3 h-3 mr-1" /> Patient</>
                  )}
                </Badge>

                {/* Notifications */}
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {user?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.specialization || user?.email}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;