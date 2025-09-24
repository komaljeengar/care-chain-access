import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Eye, 
  ArrowLeft,
  Loader2,
  User,
  Stethoscope,
  Mail,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, setDemoMode } = useAuth();
  const { toast } = useToast();
  
  const [loginMethod, setLoginMethod] = useState<'email' | 'worldid'>('email');
  const [worldIdScanning, setWorldIdScanning] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Login Successful",
        description: "Welcome back to MedVault!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  const handleWorldIdLogin = async () => {
    setWorldIdScanning(true);
    // Simulate iris scanning
    await new Promise(resolve => setTimeout(resolve, 2500));
    setWorldIdScanning(false);
    
    // Auto-login as patient for demo
    setDemoMode('patient');
    navigate('/patient/dashboard');
    
    toast({
      title: "World ID Login Successful",
      description: "Biometric authentication complete!",
    });
  };

  const handleDemoLogin = (role: 'patient' | 'doctor') => {
    setDemoMode(role);
    navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    toast({
      title: "Demo Mode Active",
      description: `Logged in as demo ${role}.`,
    });
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your MedVault account
              </p>
            </div>

            {/* Login Method Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('email')}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={loginMethod === 'worldid' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('worldid')}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                World ID
              </Button>
            </div>

            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  
                  <Button variant="link" className="p-0 text-sm">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className={`w-full h-full rounded-full border-4 ${worldIdScanning ? 'border-primary animate-iris-scan' : 'border-muted'} flex items-center justify-center bg-primary/10`}>
                      <Eye className={`w-12 h-12 ${worldIdScanning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                    </div>
                    {worldIdScanning && (
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                    )}
                  </div>

                  {worldIdScanning ? (
                    <>
                      <h3 className="text-lg font-semibold mb-2">Authenticating...</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Please look directly at the sensor
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-primary text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing biometric data...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">Biometric Login</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Secure access with iris recognition
                      </p>
                      <Button onClick={handleWorldIdLogin} className="gradient-primary">
                        <Eye className="w-4 h-4 mr-2" />
                        Start Iris Scan
                      </Button>
                    </>
                  )}
                </Card>
              </div>
            )}

            <Separator className="my-6" />

            {/* Demo Access */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Quick Demo Access
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleDemoLogin('patient')}
                  className="w-full"
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient Demo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDemoLogin('doctor')}
                  className="w-full"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor Demo
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/auth/register')}>
                Create one here
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;