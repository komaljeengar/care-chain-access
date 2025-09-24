import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Clock, 
  Calendar, 
  Brain, 
  MessageSquare,
  Search,
  Plus,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  UserPlus,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickStats = [
    { label: 'Active Patients', value: '42', icon: <Users className="w-5 h-5" />, color: 'text-primary' },
    { label: 'Pending Requests', value: '7', icon: <Clock className="w-5 h-5" />, color: 'text-accent' },
    { label: 'Today\'s Appointments', value: '8', icon: <Calendar className="w-5 h-5" />, color: 'text-secondary' },
    { label: 'AI Consultations', value: '15', icon: <Brain className="w-5 h-5" />, color: 'text-medical-info' },
  ];

  const pendingRequests = [
    {
      id: '1',
      patient: 'Sarah Johnson',
      patientId: 'PT-001',
      condition: 'Heart Condition Follow-up',
      requestedAccess: ['Lab Results', 'Imaging', 'Consultations'],
      urgency: 'routine',
      requestDate: '2024-01-22',
      reason: 'Quarterly cardiology follow-up appointment scheduled for next week'
    },
    {
      id: '2',
      patient: 'Michael Brown',
      patientId: 'PT-002',
      condition: 'Post-Surgery Monitoring',
      requestedAccess: ['Full Access'],
      urgency: 'urgent',
      requestDate: '2024-01-21',
      reason: 'Post-operative complications monitoring after cardiac procedure'
    },
    {
      id: '3',
      patient: 'Emma Davis',
      patientId: 'PT-003',
      condition: 'Hypertension Management',
      requestedAccess: ['Lab Results', 'Prescriptions'],
      urgency: 'routine',
      requestDate: '2024-01-20',
      reason: 'Medication adjustment consultation for blood pressure management'
    }
  ];

  const recentPatients = [
    {
      id: '1',
      name: 'John Smith',
      patientId: 'PT-004',
      lastVisit: '2024-01-20',
      condition: 'Diabetes Type 2',
      status: 'stable',
      nextAppointment: '2024-02-15',
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Lisa Wilson',
      patientId: 'PT-005',
      lastVisit: '2024-01-18',
      condition: 'Hypertension',
      status: 'improving',
      nextAppointment: '2024-01-25',
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'David Chen',
      patientId: 'PT-006',
      lastVisit: '2024-01-15',
      condition: 'Post-MI Recovery',
      status: 'monitoring',
      nextAppointment: '2024-01-24',
      riskLevel: 'high'
    }
  ];

  const todaysAppointments = [
    {
      time: '09:00 AM',
      patient: 'Sarah Johnson',
      type: 'Follow-up',
      duration: '30 min',
      status: 'confirmed'
    },
    {
      time: '10:00 AM',
      patient: 'Michael Brown',
      type: 'Post-Op Check',
      duration: '45 min',
      status: 'confirmed'
    },
    {
      time: '11:30 AM',
      patient: 'Emma Davis',
      type: 'Consultation',
      duration: '30 min',
      status: 'pending'
    },
    {
      time: '02:00 PM',
      patient: 'Robert Taylor',
      type: 'Initial Visit',
      duration: '60 min',
      status: 'confirmed'
    }
  ];

  const clinicalInsights = [
    {
      title: 'Drug Interaction Alert',
      description: 'Patient John Smith: Potential interaction between Lisinopril and new NSAID prescription',
      type: 'warning',
      patient: 'John Smith',
      action: 'Review medication list'
    },
    {
      title: 'Lab Results Follow-up',
      description: 'Lisa Wilson: HbA1c improved to 6.8% - consider medication adjustment',
      type: 'success',
      patient: 'Lisa Wilson',
      action: 'Schedule consultation'
    },
    {
      title: 'Risk Assessment Update',
      description: 'David Chen: Cardiovascular risk score increased based on latest vitals',
      type: 'alert',
      patient: 'David Chen',
      action: 'Urgent review needed'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'routine':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-secondary" />;
      case 'monitoring':
        return <Eye className="w-4 h-4 text-accent" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Brain className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good morning, {user?.name}!</h1>
            <p className="text-muted-foreground">
              {user?.specialization} • Managing patient care with AI insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              <Star className="w-3 h-3 mr-1" />
              4.9 Patient Rating
            </Badge>
            <Button className="gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Patient
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
          {/* Pending Access Requests */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Patient Access Requests</h2>
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  {pendingRequests.length} Pending
                </Badge>
              </div>
              
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{request.patient}</h3>
                        <p className="text-sm text-muted-foreground">ID: {request.patientId}</p>
                        <Badge className={`mt-2 ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Deny
                        </Button>
                        <Button size="sm" className="gradient-secondary">
                          Approve
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Condition:</strong> {request.condition}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Reason:</strong> {request.reason}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {request.requestedAccess.map((access) => (
                        <Badge key={access} variant="outline" className="text-xs">
                          {access}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Clinical Insights */}
            <Card className="p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Clinical Insights</h2>
                <Button variant="outline" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  View All Insights
                </Button>
              </div>
              
              <div className="space-y-4">
                {clinicalInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="mt-0.5">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button variant="link" className="p-0 text-sm h-auto">
                          {insight.action}
                        </Button>
                        <Button variant="link" className="p-0 text-sm h-auto" onClick={() => navigate(`/doctor/patient/${insight.patient.replace(' ', '-').toLowerCase()}`)}>
                          View Patient
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Today's Schedule</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-3">
                {todaysAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{appointment.time}</p>
                        <Badge variant="outline" className={`text-xs ${
                          appointment.status === 'confirmed' 
                            ? 'bg-secondary/10 text-secondary' 
                            : 'bg-accent/10 text-accent'
                        }`}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.type} • {appointment.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Appointment
              </Button>
            </Card>

            {/* Recent Patients */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Patients</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentPatients.map((patient) => (
                  <div 
                    key={patient.id} 
                    className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{patient.name}</p>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(patient.status)}
                        <Badge className={getRiskColor(patient.riskLevel)}>
                          {patient.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {patient.condition}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last visit: {patient.lastVisit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Next: {patient.nextAppointment}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Search Patient Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Clinical Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Medical Knowledge Base
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Drug Alerts & Updates
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;