import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Calendar, 
  Share, 
  Download,
  Search,
  Filter,
  QrCode,
  Clipboard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  TestTube,
  Pill,
  Heart,
  Eye,
  Stethoscope
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Records = () => {
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

  const recordCategories = [
    { id: 'all', label: 'All Records', count: 47 },
    { id: 'labs', label: 'Lab Results', count: 12, icon: <TestTube className="w-4 h-4" /> },
    { id: 'imaging', label: 'Imaging', count: 8, icon: <Eye className="w-4 h-4" /> },
    { id: 'prescriptions', label: 'Prescriptions', count: 15, icon: <Pill className="w-4 h-4" /> },
    { id: 'consultations', label: 'Consultations', count: 9, icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'vitals', label: 'Vitals', count: 3, icon: <Activity className="w-4 h-4" /> }
  ];

  const medicalRecords = [
    {
      id: '1',
      title: 'Complete Blood Count (CBC)',
      category: 'labs',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-01-20',
      status: 'normal',
      description: 'Routine blood work showing normal values across all parameters',
      fileType: 'PDF',
      shared: true,
      ipfsHash: 'QmX4f2yQ...',
      tags: ['routine', 'annual-checkup']
    },
    {
      id: '2',
      title: 'Chest X-Ray',
      category: 'imaging',
      doctor: 'Dr. Sarah Wilson',
      date: '2024-01-18',
      status: 'normal',
      description: 'Clear lungs, normal heart size and position',
      fileType: 'DICOM',
      shared: false,
      ipfsHash: 'QmY5g3rR...',
      tags: ['chest', 'preventive']
    },
    {
      id: '3',
      title: 'Lisinopril Prescription',
      category: 'prescriptions',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-01-15',
      status: 'active',
      description: '10mg daily for blood pressure management',
      fileType: 'PDF',
      shared: true,
      ipfsHash: 'QmZ6h4sT...',
      tags: ['hypertension', 'daily-medication']
    },
    {
      id: '4',
      title: 'Cardiology Consultation',
      category: 'consultations',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-01-10',
      status: 'review',
      description: 'Follow-up for blood pressure management and lifestyle modifications',
      fileType: 'PDF',
      shared: true,
      ipfsHash: 'QmA7i5uV...',
      tags: ['follow-up', 'cardiology']
    },
    {
      id: '5',
      title: 'Blood Pressure Monitoring',
      category: 'vitals',
      doctor: 'Self-Recorded',
      date: '2024-01-22',
      status: 'improving',
      description: 'Home blood pressure readings over 7 days',
      fileType: 'CSV',
      shared: false,
      ipfsHash: 'QmB8j6wW...',
      tags: ['home-monitoring', 'bp']
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = medicalRecords.filter(record => {
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'active':
        return <Activity className="w-4 h-4 text-primary" />;
      case 'review':
        return <AlertTriangle className="w-4 h-4 text-accent" />;
      case 'improving':
        return <Activity className="w-4 h-4 text-secondary" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'active':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'review':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'improving':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const fileId = Math.random().toString(36).substr(2, 9);
      setUploadingFiles(prev => [...prev, fileId]);
      
      // Simulate file upload to IPFS
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(id => id !== fileId));
      }, 3000);
    });
  };

  const handleShareRecord = (recordId: string) => {
    // Generate shareable QR code
    console.log('Sharing record:', recordId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
            <p className="text-muted-foreground">
              Securely stored on Flow blockchain with IPFS decentralized storage
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.dicom,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button className="gradient-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Records
                </Button>
              </Label>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadingFiles.length > 0 && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center space-x-3">
              <Upload className="w-5 h-5 text-primary animate-pulse" />
              <div className="flex-1">
                <p className="font-medium text-sm">Uploading to IPFS...</p>
                <p className="text-xs text-muted-foreground">
                  {uploadingFiles.length} file(s) being processed and encrypted
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records, doctors, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {recordCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-2 text-sm"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid gap-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusIcon(record.status)}
                        <h3 className="text-lg font-semibold">{record.title}</h3>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        {record.shared && (
                          <Badge variant="outline" className="text-xs">
                            <QrCode className="w-3 h-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {record.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Stethoscope className="w-4 h-4" />
                          <span>{record.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{record.fileType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        {record.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 p-2 bg-muted/30 rounded text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clipboard className="w-3 h-3" />
                          <span>IPFS: {record.ipfsHash}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShareRecord(record.id)}
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No records found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? 'Try adjusting your search terms' : 'Upload your first medical record to get started'}
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button className="gradient-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Records
                  </Button>
                </Label>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Records;