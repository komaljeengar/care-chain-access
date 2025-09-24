import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  User, 
  Stethoscope, 
  ArrowLeft,
  CheckCircle,
  Loader2,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [worldIdVerifying, setWorldIdVerifying] = useState(false);
  const [worldIdComplete, setWorldIdComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    medicalLicense: '',
    specialization: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWorldIdVerify = async () => {
    setWorldIdVerifying(true);
    // Simulate iris scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setWorldIdVerifying(false);
    setWorldIdComplete(true);
    toast({
      title: "Identity Verified",
      description: "Your World ID verification is complete.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.termsAccepted || !formData.privacyAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept all terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        role: userType,
        specialization: userType === 'doctor' ? formData.specialization : undefined,
      }, formData.password);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to MedVault!",
      });
      
      navigate(userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Choose Your Role</h2>
              <p className="text-muted-foreground">
                Select how you'll be using MedVault
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                  userType === 'patient' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setUserType('patient')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Patient</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Store, manage, and control access to your medical records
                  </p>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      Control your medical data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      AI health insights
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      Permission management
                    </li>
                  </ul>
                </div>
              </Card>

              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                  userType === 'doctor' ? 'border-secondary bg-secondary/5' : 'border-border'
                }`}
                onClick={() => setUserType('doctor')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Doctor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access patient records with permission-based security
                  </p>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      Access authorized records
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      AI clinical support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      Patient insights
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            <Button onClick={() => setStep(2)} className="w-full">
              Continue as {userType === 'patient' ? 'Patient' : 'Doctor'}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">World ID Verification</h2>
              <p className="text-muted-foreground">
                Secure your account with biometric authentication
              </p>
            </div>

            <Card className="p-8 text-center">
              {!worldIdComplete ? (
                <>
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className={`w-full h-full rounded-full border-4 ${worldIdVerifying ? 'border-primary animate-iris-scan' : 'border-muted'} flex items-center justify-center bg-primary/5`}>
                      <Eye className={`w-16 h-16 ${worldIdVerifying ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                    </div>
                    {worldIdVerifying && (
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                    )}
                  </div>

                  {worldIdVerifying ? (
                    <>
                      <h3 className="text-xl font-semibold mb-2">Scanning Your Identity...</h3>
                      <p className="text-muted-foreground mb-6">
                        Please look directly at the sensor and keep your eyes open
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing biometric data...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-2">Biometric Verification</h3>
                      <p className="text-muted-foreground mb-6">
                        World ID uses iris scanning to create a unique, privacy-preserving identity proof
                      </p>
                      <Button onClick={handleWorldIdVerify} className="gradient-primary">
                        Start Iris Scan
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="w-32 h-32 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-16 h-16 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">Identity Verified!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your World ID verification is complete and secure
                  </p>
                  <Badge className="bg-secondary/10 text-secondary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    World ID Verified
                  </Badge>
                </>
              )}
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!worldIdComplete} 
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Account Details</h2>
              <p className="text-muted-foreground">
                Complete your MedVault registration
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            {userType === 'doctor' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicalLicense">Medical License Number</Label>
                  <Input
                    id="medicalLicense"
                    name="medicalLicense"
                    type="text"
                    value={formData.medicalLicense}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Cardiologist"
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and End User License Agreement
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privacy" 
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
                  }
                />
                <Label htmlFor="privacy" className="text-sm">
                  I acknowledge the Privacy Policy and HIPAA compliance
                </Label>
              </div>
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start space-x-3">
                <Wallet className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Blockchain Wallet Connection</h4>
                  <p className="text-xs text-muted-foreground">
                    A Flow blockchain wallet will be created for you automatically. You can connect your own wallet later in settings.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" className="flex-1 gradient-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create MedVault Account'
                )}
              </Button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">MedVault</span>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stepNumber <= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNumber < step ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNumber < step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <Card className="p-8">
            {renderStepContent()}
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/auth/login')}>
                Sign in here
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;