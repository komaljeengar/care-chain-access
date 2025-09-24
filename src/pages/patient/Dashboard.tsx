import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  Users, 
  Brain, 
  Calendar, 
  Heart, 
  Activity, 
  Phone, 
  Settings,
  Upload,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickStats = [
    { label: 'Total Records', value: '47', icon: <FileText className="w-5 h-5" />, color: 'text-primary' },
    { label: 'Active Permissions', value: '3', icon: <Users className="w-5 h-5" />, color: 'text-secondary' },
    { label: 'AI Chats', value: '12', icon: <Brain className="w-5 h-5" />, color: 'text-accent' },
    { label: 'Appointments', value: '2', icon: <Calendar className="w-5 h-5" />, color: 'text-medical-info' },
  ];

  const recentRecords = [
    {
      id: '1',
      title: 'Blood Test Results',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-01-20',
      type: 'Lab Results',
      status: 'normal',
      badge: 'Lab'
    },
    {
      id: '2',
      title: 'Cardiology Consultation',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-01-18',
      type: 'Consultation',
      status: 'review',
      badge: 'Visit'
    },
    {
      id: '3',
      title: 'Prescription Update',
      doctor: 'Dr. Michael Chen',
      date: '2024-01-15',
      type: 'Medication',
      status: 'active',
      badge: 'Rx'
    }
  ];

  const activePermissions = [
    {
      doctor: 'Dr. Emily Rodriguez',
      specialization: 'Cardiologist',
      access: 'Full Access',
      expires: '2024-06-20',
      lastAccess: '2 hours ago'
    },
    {
      doctor: 'Dr. Michael Chen',
      specialization: 'Primary Care',
      access: 'Limited Access',
      expires: '2024-12-31',
      lastAccess: '1 day ago'
    },
    {
      doctor: 'Dr. Sarah Williams',
      specialization: 'Endocrinologist',
      access: 'Lab Results Only',
      expires: '2024-04-15',
      lastAccess: '1 week ago'
    }
  ];

  const healthInsights = [
    {
      title: 'Blood Pressure Trend',
      description: 'Your blood pressure has improved by 8% over the last 3 months.',
      type: 'improvement',
      action: 'Continue current medication regimen'
    },
    {
      title: 'Medication Reminder',
      description: 'Consider discussing vitamin D supplementation with Dr. Rodriguez.',
      type: 'suggestion',
      action: 'Schedule consultation'
    },
    {
      title: 'Lab Follow-up',
      description: 'Your cholesterol levels need monitoring. Next test due in 2 weeks.',
      type: 'reminder',
      action: 'Book lab appointment'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'review':
        return <Eye className="w-4 h-4 text-accent" />;
      case 'active':
        return <Activity className="w-4 h-4 text-primary" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'improvement':
        return <TrendingUp className="w-5 h-5 text-secondary" />;
      case 'suggestion':
        return <Brain className="w-5 h-5 text-primary" />;
      case 'reminder':
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      default:
        return <Heart className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">
              Your health data is secure and up to date
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                <Shield className="w-3 h-3 mr-1" />
                World ID Verified
              </Badge>
            </div>
            <Button onClick={() => navigate('/patient/records')} className="gradient-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload Records
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medical Records Overview */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Medical Records</h2>
                <Button variant="outline" onClick={() => navigate('/patient/records')}>
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <Badge variant="secondary" className="text-xs">
                          {record.badge}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {record.doctor} • {record.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Health Insights */}
            <Card className="p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Health Insights</h2>
                <Button variant="outline" onClick={() => navigate('/patient/ai-chat')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI
                </Button>
              </div>
              
              <div className="space-y-4">
                {healthInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="mt-0.5">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <Button variant="link" className="p-0 text-sm h-auto">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-red-900">Emergency Access</h3>
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm text-red-800 mb-4">
                In case of emergency, authorized medical staff can access your critical medical information instantly.
              </p>
              <Button variant="outline" size="sm" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                Emergency Settings
              </Button>
            </Card>

            {/* Active Permissions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Active Permissions</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/patient/permissions')}>
                  Manage
                </Button>
              </div>
              
              <div className="space-y-3">
                {activePermissions.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{permission.doctor}</p>
                        <Badge variant="outline" className="text-xs">
                          {permission.access}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {permission.specialization}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last access: {permission.lastAccess}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Upcoming Appointments</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">Dr. Emily Rodriguez</p>
                    <Badge variant="outline" className="text-xs">
                      Tomorrow
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cardiology Follow-up • 2:30 PM
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">Lab Appointment</p>
                    <Badge variant="outline" className="text-xs">
                      Jan 25
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Blood Work • 9:00 AM
                  </p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                Schedule New
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;