import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Brain, 
  Globe, 
  Users, 
  Lock, 
  Zap, 
  Eye, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { setDemoMode } = useAuth();

  const handleGetStarted = () => {
    navigate('/auth/register');
  };

  const handleDemoAccess = (role: 'patient' | 'doctor') => {
    setDemoMode(role);
    navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Blockchain Security",
      description: "Your medical data is secured on Flow blockchain with immutable records and cryptographic protection."
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "World ID Authentication",
      description: "Biometric verification ensures only you can access your medical records with iris scanning technology."
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI Health Assistant",
      description: "Hedera AI analyzes your medical history to provide personalized health insights and recommendations."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Permission Control",
      description: "Grant granular access to doctors and revoke permissions instantly. You control who sees your data."
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Universal Access",
      description: "Access your medical records anywhere in the world. Emergency care without borders."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Instant Updates",
      description: "Real-time synchronization across all authorized healthcare providers and devices."
    }
  ];

  const stats = [
    { number: "250K+", label: "Patients Protected" },
    { number: "50K+", label: "Healthcare Providers" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "0", label: "Data Breaches" }
  ];

  const technologies = [
    { name: "Flow Blockchain", color: "bg-primary text-primary-foreground" },
    { name: "World ID", color: "bg-secondary text-secondary-foreground" },
    { name: "Hedera AI", color: "bg-accent text-accent-foreground" },
    { name: "IPFS Storage", color: "bg-muted text-muted-foreground" }
  ];

  return (
    <div className="min-h-screen bg-background animated-bg floating-particles">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow animate-glow-pulse">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">MedVault</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/auth/login')} className="text-foreground hover:bg-primary/10">
              Sign In
            </Button>
            <Button onClick={handleGetStarted} className="glass-button">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Own Your
              <span className="block text-gradient-secondary animate-glow-pulse">Medical Data</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              The first Web3 platform that gives patients complete control over their medical records with blockchain security, AI insights, and biometric authentication.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-up">
            <Button size="lg" onClick={handleGetStarted} className="glass-button text-lg px-8 py-4">
              Create Your Vault
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 text-white hover:bg-primary/10 backdrop-blur-sm" onClick={() => handleDemoAccess('patient')}>
              <Smartphone className="mr-2 w-5 h-5" />
              Try Demo
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mt-12">
            {technologies.map((tech, index) => (
              <Badge key={index} className={`${tech.color} px-4 py-2 text-sm font-medium animate-slide-in backdrop-blur-sm`} style={{ animationDelay: `${index * 0.1}s` }}>
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 animate-fade-up hover:shadow-glow-blue transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Medical Data is <span className="text-gradient">Fragmented</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Today's healthcare system traps your medical data in isolated silos. Patients lose control, doctors lack complete information, and emergency care suffers from incomplete records.
            </p>
            
            <Card className="glass-card p-8 max-w-2xl mx-auto animate-scale-in hover:shadow-glow-purple transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-secondary animate-glow-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4">MedVault Changes Everything</h3>
              <p className="text-muted-foreground">
                One unified, secure, patient-controlled medical record that follows you everywhere. Powered by blockchain, protected by biometrics, enhanced by AI.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Revolutionary <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Cutting-edge technology meets healthcare innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 hover:shadow-glow transition-all duration-300 animate-fade-up border-l-4 border-l-primary hover:border-l-secondary" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4 animate-glow-pulse">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience MedVault
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Try our platform with demo accounts and see how Web3 technology transforms healthcare data management.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-300 cursor-pointer group animate-fade-up" onClick={() => handleDemoAccess('patient')}>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform animate-glow-pulse">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Patient Experience</h3>
              <p className="text-muted-foreground mb-6">
                Control your medical records, manage permissions, and chat with AI health assistant.
              </p>
              <Button className="w-full glass-button group-hover:shadow-glow-purple">
                Try Patient Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="glass-card p-8 hover:shadow-glow-blue transition-all duration-300 cursor-pointer group animate-fade-up" style={{ animationDelay: '0.1s' }} onClick={() => handleDemoAccess('doctor')}>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform animate-glow-pulse">
                  <Star className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Doctor Experience</h3>
              <p className="text-muted-foreground mb-6">
                Access patient records, request permissions, and leverage AI clinical support.
              </p>
              <Button className="w-full glass-button-secondary group-hover:shadow-glow">
                Try Doctor Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust MedVault with their most important data.
          </p>
          <Button size="lg" onClick={handleGetStarted} className="glass-button text-lg px-8 py-4">
            Create Your MedVault
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-header py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow animate-glow-pulse">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">MedVault</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 MedVault. Securing healthcare data with Web3 technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;