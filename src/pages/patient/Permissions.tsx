import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Shield, 
  Clock, 
  Calendar, 
  Search,
  UserPlus,
  Settings,
  Eye,
  FileText,
  TestTube,
  Pill,
  Heart,
  AlertTriangle,
  CheckCircle,
  X,
  QrCode,
  History
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Permissions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const activePermissions = [
    {
      id: '1',
      doctor: 'Dr. Emily Rodriguez',
      specialization: 'Cardiologist',
      avatar: 'ER',
      accessLevel: 'Full Access',
      permissions: {
        labResults: true,
        imaging: true,
        prescriptions: true,
        consultations: true,
        vitals: true
      },
      grantedDate: '2023-06-15',
      expirationDate: '2024-06-15',
      lastAccess: '2 hours ago',
      accessCount: 47,
      status: 'active'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialization: 'Primary Care Physician',
      avatar: 'MC',
      accessLevel: 'Limited Access',
      permissions: {
        labResults: true,
        imaging: false,
        prescriptions: true,
        consultations: true,
        vitals: true
      },
      grantedDate: '2024-01-10',
      expirationDate: '2024-12-31',
      lastAccess: '1 day ago',
      accessCount: 12,
      status: 'active'
    },
    {
      id: '3',
      doctor: 'Dr. Sarah Williams',
      specialization: 'Endocrinologist',
      avatar: 'SW',
      accessLevel: 'Lab Results Only',
      permissions: {
        labResults: true,
        imaging: false,
        prescriptions: false,
        consultations: false,
        vitals: false
      },
      grantedDate: '2024-01-05',
      expirationDate: '2024-04-15',
      lastAccess: '1 week ago',
      accessCount: 3,
      status: 'expiring'
    }
  ];

  const permissionRequests = [
    {
      id: '1',
      doctor: 'Dr. James Wilson',
      specialization: 'Orthopedic Surgeon',
      avatar: 'JW',
      requestedAccess: ['imaging', 'consultations'],
      reason: 'Evaluate knee pain and recommend treatment options',
      requestDate: '2024-01-22',
      urgency: 'routine'
    },
    {
      id: '2',
      doctor: 'Dr. Lisa Brown',
      specialization: 'Neurologist',
      avatar: 'LB',
      requestedAccess: ['labResults', 'imaging', 'consultations'],
      reason: 'Investigate recurring headaches and neurological symptoms',
      requestDate: '2024-01-21',
      urgency: 'urgent'
    }
  ];

  const emergencyContacts = [
    {
      id: '1',
      name: 'Emergency Department - General Hospital',
      type: 'hospital',
      accessLevel: 'Critical Info Only',
      alwaysActive: true
    },
    {
      id: '2',
      name: 'Dr. Emily Rodriguez (Emergency)',
      type: 'doctor',
      accessLevel: 'Full Access',
      alwaysActive: true
    }
  ];

  const permissionCategories = [
    { id: 'labResults', label: 'Lab Results', icon: <TestTube className="w-4 h-4" /> },
    { id: 'imaging', label: 'Medical Imaging', icon: <Eye className="w-4 h-4" /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="w-4 h-4" /> },
    { id: 'consultations', label: 'Consultation Notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'vitals', label: 'Vital Signs', icon: <Heart className="w-4 h-4" /> }
  ];

  const handlePermissionToggle = (doctorId: string, permission: string, enabled: boolean) => {
    console.log(`Toggling ${permission} for doctor ${doctorId}: ${enabled}`);
    // Update permission in backend
  };

  const handleApproveRequest = (requestId: string) => {
    console.log('Approving request:', requestId);
    // Process approval
  };

  const handleDenyRequest = (requestId: string) => {
    console.log('Denying request:', requestId);
    // Process denial
  };

  const handleRevokeAccess = (doctorId: string) => {
    console.log('Revoking access for doctor:', doctorId);
    // Revoke all permissions
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'expiring':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Permission Management</h1>
            <p className="text-muted-foreground">
              Control who can access your medical records and what they can see
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <QrCode className="w-4 h-4 mr-2" />
              Generate Share Code
            </Button>
            <Button className="gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Grant New Access
            </Button>
          </div>
        </div>

        {/* Pending Requests */}
        {permissionRequests.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Permission Requests</h2>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                {permissionRequests.length} Pending
              </Badge>
            </div>
            
            <div className="space-y-4">
              {permissionRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{request.avatar}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{request.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{request.specialization}</p>
                        <Badge className={`mt-2 ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDenyRequest(request.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Deny
                      </Button>
                      <Button 
                        size="sm" 
                        className="gradient-secondary"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Reason:</strong> {request.reason}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Requested:</strong> {request.requestDate}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Requested Access:</p>
                    <div className="flex flex-wrap gap-2">
                      {request.requestedAccess.map((access) => {
                        const category = permissionCategories.find(cat => cat.id === access);
                        return (
                          <Badge key={access} variant="outline" className="flex items-center space-x-1">
                            {category?.icon}
                            <span>{category?.label}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search active permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Active Permissions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Active Permissions</h2>
            <Badge variant="outline">
              {activePermissions.length} Active
            </Badge>
          </div>
          
          <div className="space-y-6">
            {activePermissions.map((permission) => (
              <div key={permission.id} className="p-6 border rounded-lg">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">{permission.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{permission.doctor}</h3>
                      <p className="text-muted-foreground">{permission.specialization}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>Granted: {permission.grantedDate}</span>
                        <span>•</span>
                        <span>Expires: {permission.expirationDate}</span>
                        <span>•</span>
                        <span>Last access: {permission.lastAccess}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(permission.status)}>
                      {permission.status === 'expiring' ? (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      ) : (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {permission.accessLevel}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRevokeAccess(permission.id)}
                    >
                      Revoke Access
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-4">Granular Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {permissionCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            {category.icon}
                            <span className="text-sm">{category.label}</span>
                          </div>
                          <Switch
                            checked={permission.permissions[category.id as keyof typeof permission.permissions]}
                            onCheckedChange={(enabled) => 
                              handlePermissionToggle(permission.id, category.id, enabled)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Access Statistics</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-sm text-muted-foreground">Total Access Count</p>
                        <p className="text-xl font-semibold">{permission.accessCount}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <History className="w-4 h-4 mr-2" />
                        View Access Log
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emergency Access Settings */}
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-red-900">Emergency Access</h2>
              <p className="text-sm text-red-700">
                Pre-authorized access for emergency medical situations
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-red-300 text-red-700">
              <Settings className="w-4 h-4 mr-2" />
              Manage Emergency Settings
            </Button>
          </div>
          
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-red-900">{contact.name}</h3>
                    <p className="text-sm text-red-700">{contact.accessLevel}</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-300">
                  Always Active
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Permissions;