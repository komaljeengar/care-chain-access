import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  User, 
  FileText, 
  Calendar, 
  Heart, 
  TestTube,
  Pill,
  Eye,
  Stethoscope,
  Brain,
  Plus,
  Download,
  Printer,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity,
  Clock,
  Save,
  Send
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const PatientRecords = () => {
  const { id } = useParams();
  const [consultationNote, setConsultationNote] = useState('');

  // Mock patient data
  const patient = {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    dateOfBirth: '1978-08-15',
    bloodType: 'A+',
    avatar: 'JS',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, Anytown, ST 12345'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    conditions: [
      { name: 'Type 2 Diabetes', status: 'Controlled', since: '2020-03-15' },
      { name: 'Hypertension', status: 'Stable', since: '2019-11-22' },
      { name: 'Hyperlipidemia', status: 'Improving', since: '2021-06-08' }
    ],
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: [
      { name: 'Metformin', dosage: '500mg twice daily', prescribedBy: 'Dr. Emily Rodriguez' },
      { name: 'Lisinopril', dosage: '10mg once daily', prescribedBy: 'Dr. Emily Rodriguez' },
      { name: 'Atorvastatin', dosage: '20mg once daily', prescribedBy: 'Dr. Emily Rodriguez' }
    ]
  };

  const medicalRecords = [
    {
      id: '1',
      date: '2024-01-20',
      type: 'Lab Results',
      title: 'Complete Blood Count (CBC)',
      doctor: 'Dr. Emily Rodriguez',
      status: 'normal',
      summary: 'All values within normal range. HbA1c: 6.2% (improved from 6.8%)',
      category: 'labs'
    },
    {
      id: '2',
      date: '2024-01-18',
      type: 'Consultation',
      title: 'Cardiology Follow-up',
      doctor: 'Dr. Emily Rodriguez',
      status: 'stable',
      summary: 'Blood pressure well controlled. Continue current medications. Exercise tolerance improved.',
      category: 'consultations'
    },
    {
      id: '3',
      date: '2024-01-15',
      type: 'Prescription',
      title: 'Medication Renewal',
      doctor: 'Dr. Emily Rodriguez',
      status: 'active',
      summary: 'Renewed Metformin and Lisinopril. Added Atorvastatin for cholesterol management.',
      category: 'prescriptions'
    },
    {
      id: '4',
      date: '2024-01-10',
      type: 'Imaging',
      title: 'Chest X-Ray',
      doctor: 'Dr. Sarah Wilson',
      status: 'normal',
      summary: 'Clear lungs, normal heart size. No acute findings.',
      category: 'imaging'
    }
  ];

  const vitals = [
    { date: '2024-01-20', bp: '128/78', hr: '72', temp: '98.6°F', weight: '185 lbs', bmi: '27.1' },
    { date: '2024-01-15', bp: '132/82', hr: '74', temp: '98.4°F', weight: '187 lbs', bmi: '27.4' },
    { date: '2024-01-10', bp: '135/85', hr: '76', temp: '98.7°F', weight: '189 lbs', bmi: '27.7' }
  ];

  const aiInsights = [
    {
      type: 'trend',
      title: 'Blood Pressure Improvement',
      description: 'Patient shows consistent improvement in blood pressure control over the past 3 months (15% reduction).',
      recommendation: 'Continue current ACE inhibitor therapy. Consider lifestyle modifications reinforcement.',
      confidence: 'High'
    },
    {
      type: 'risk',
      title: 'Cardiovascular Risk Assessment',
      description: 'Current 10-year CVD risk: 12% (moderate). Improved from 18% six months ago.',
      recommendation: 'Maintain statin therapy. Consider increasing exercise intensity if tolerated.',
      confidence: 'High'
    },
    {
      type: 'medication',
      title: 'HbA1c Target Achievement',
      description: 'Patient has reached target HbA1c <7%. Current level 6.2% represents excellent control.',
      recommendation: 'Consider diabetes remission protocols. Maintain current Metformin dose.',
      confidence: 'Medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
      case 'stable':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'active':
        return <Activity className="w-4 h-4 text-primary" />;
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-secondary" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getConditionStatusColor = (status: string) => {
    switch (status) {
      case 'Controlled':
      case 'Stable':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Improving':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Monitoring':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-secondary" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case 'medication':
        return <Pill className="w-5 h-5 text-primary" />;
      default:
        return <Brain className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleSaveNote = () => {
    console.log('Saving consultation note:', consultationNote);
    // Save to backend
  };

  const handleSendToPatient = () => {
    console.log('Sending consultation summary to patient');
    // Send notification to patient
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Patient Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                  {patient.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                  </div>
                  <div>
                    <p><strong>DOB:</strong> {patient.dateOfBirth}</p>
                    <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                  </div>
                  <div>
                    <p><strong>Phone:</strong> {patient.contact.phone}</p>
                    <p><strong>Email:</strong> {patient.contact.email}</p>
                  </div>
                  <div>
                    <p><strong>Insurance:</strong> {patient.insurance.provider}</p>
                    <p><strong>Policy:</strong> {patient.insurance.policyNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Print Summary
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Records
              </Button>
            </div>
          </div>
        </Card>

        {/* Medical Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Active Conditions
            </h3>
            <div className="space-y-3">
              {patient.conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{condition.name}</span>
                  <Badge className={getConditionStatusColor(condition.status)}>
                    {condition.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Allergies
            </h3>
            <div className="space-y-2">
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {allergy}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-blue-500" />
              Current Medications
            </h3>
            <div className="space-y-3">
              {patient.currentMedications.slice(0, 2).map((medication, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-muted-foreground">{medication.dosage}</p>
                </div>
              ))}
              {patient.currentMedications.length > 2 && (
                <p className="text-sm text-muted-foreground">
                  +{patient.currentMedications.length - 2} more medications
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="timeline">Medical Timeline</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="consultation">Add Notes</TabsTrigger>
            <TabsTrigger value="summary">Patient Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Medical History Timeline</h2>
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getStatusIcon(record.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{record.title}</h3>
                        <Badge variant="outline">{record.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{record.summary}</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <span>{record.date}</span>
                        <span>•</span>
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Vital Signs History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Blood Pressure</th>
                      <th className="text-left p-3">Heart Rate</th>
                      <th className="text-left p-3">Temperature</th>
                      <th className="text-left p-3">Weight</th>
                      <th className="text-left p-3">BMI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitals.map((vital, index) => (
                      <tr key={index} className="border-b hover:bg-muted/30">
                        <td className="p-3">{vital.date}</td>
                        <td className="p-3">{vital.bp}</td>
                        <td className="p-3">{vital.hr} bpm</td>
                        <td className="p-3">{vital.temp}</td>
                        <td className="p-3">{vital.weight}</td>
                        <td className="p-3">{vital.bmi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Clinical Insights</h2>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Brain className="w-3 h-3 mr-1" />
                  Powered by Hedera AI
                </Badge>
              </div>
              
              <div className="space-y-6">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        {getInsightTypeIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence} Confidence
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{insight.description}</p>
                        <div className="p-4 bg-primary/5 border-l-4 border-l-primary rounded">
                          <p className="text-sm"><strong>Recommendation:</strong> {insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consultation" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Add Consultation Notes</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="consultation-note">Consultation Notes</Label>
                  <Textarea
                    id="consultation-note"
                    value={consultationNote}
                    onChange={(e) => setConsultationNote(e.target.value)}
                    placeholder="Enter your consultation notes, observations, treatment plans, and follow-up instructions..."
                    className="min-h-[200px] mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 bg-muted/30">
                    <h4 className="font-medium mb-3">Quick Templates</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        Follow-up Visit Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        Medication Review Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        Diagnostic Assessment Template
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4 bg-muted/30">
                    <h4 className="font-medium mb-3">AI Suggestions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        <Brain className="w-4 h-4 mr-2" />
                        Drug Interaction Check
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        <Brain className="w-4 h-4 mr-2" />
                        Differential Diagnosis
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        <Brain className="w-4 h-4 mr-2" />
                        Treatment Guidelines
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="flex items-center space-x-4">
                  <Button onClick={handleSaveNote} className="gradient-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save Notes
                  </Button>
                  <Button variant="outline" onClick={handleSendToPatient}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Summary to Patient
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Complete Patient Summary</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Patient Demographics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Patient Demographics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p><strong>Name:</strong> {patient.name}</p>
                      <p><strong>Age:</strong> {patient.age}</p>
                      <p><strong>Gender:</strong> {patient.gender}</p>
                      <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                    </div>
                    <div>
                      <p><strong>Emergency Contact:</strong> {patient.emergencyContact.name} ({patient.emergencyContact.relationship})</p>
                      <p><strong>Phone:</strong> {patient.emergencyContact.phone}</p>
                      <p><strong>Insurance:</strong> {patient.insurance.provider}</p>
                    </div>
                  </div>
                </div>

                {/* Current Health Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Current Health Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Active Conditions:</h4>
                      {patient.conditions.map((condition, index) => (
                        <p key={index} className="text-sm">• {condition.name} - {condition.status}</p>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Current Medications:</h4>
                      {patient.currentMedications.map((medication, index) => (
                        <p key={index} className="text-sm">• {medication.name} {medication.dosage}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Medical Activity</h3>
                  <div className="space-y-2">
                    {medicalRecords.slice(0, 3).map((record) => (
                      <p key={record.id} className="text-sm">
                        <strong>{record.date}:</strong> {record.title} - {record.summary}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;