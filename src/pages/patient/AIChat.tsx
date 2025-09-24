import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Send, 
  Mic, 
  FileText, 
  TestTube, 
  Pill, 
  AlertTriangle, 
  TrendingUp,
  MessageSquare,
  Clock,
  Sparkles,
  Download,
  Share,
  Bot,
  User,
  Heart,
  Activity
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const AIChat = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversations]);

  const quickActions = [
    {
      icon: <TestTube className="w-4 h-4" />,
      label: "Analyze Recent Labs",
      query: "Can you analyze my recent blood test results and explain what they mean?"
    },
    {
      icon: <Pill className="w-4 h-4" />,
      label: "Drug Interactions",
      query: "Check my current medications for potential interactions or side effects."
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: "Symptom Checker",
      query: "I've been experiencing some symptoms. Can you help me understand what might be causing them?"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Health Trends",
      query: "Show me trends in my health data over the past 3 months."
    }
  ];

  const initialMessages = [
    {
      id: 1,
      type: 'ai',
      content: `Hello ${user?.name}! I'm your AI Health Assistant powered by Hedera AI. I have access to your medical history and can help you understand your health data, check for drug interactions, analyze symptoms, and provide personalized health insights.

**Important:** I complement but don't replace professional medical advice. Always consult your healthcare providers for medical decisions.

How can I help you today?`,
      timestamp: new Date(),
      suggestions: quickActions
    }
  ];

  const [chatMessages, setChatMessages] = useState<any[]>(initialMessages);

  const sampleResponses = {
    labs: {
      content: `I've analyzed your recent Complete Blood Count (CBC) from January 20th. Here's what I found:

**🟢 Normal Values:**
- White Blood Cell Count: 6.8 K/μL (Normal: 4.0-11.0)
- Red Blood Cell Count: 4.5 M/μL (Normal: 4.2-5.4)
- Hemoglobin: 14.2 g/dL (Normal: 12.0-16.0)
- Platelet Count: 285 K/μL (Normal: 150-450)

**Key Insights:**
✅ Your blood counts are all within healthy ranges
✅ No signs of anemia or infection
✅ Good overall blood health

**Recommendations:**
- Continue your current diet and exercise routine
- Your iron levels look good - keep up the leafy greens!
- Next routine labs can be scheduled in 6-12 months unless Dr. Rodriguez advises otherwise

Would you like me to compare this with your previous lab results to show trends?`,
      relatedRecords: ['CBC Results - Jan 20, 2024', 'Previous CBC - Oct 15, 2023']
    },
    drugs: {
      content: `I've reviewed your current medications for interactions and side effects:

**Current Medications:**
1. **Lisinopril 10mg daily** (Blood pressure)
2. **Metformin 500mg twice daily** (Diabetes management)
3. **Vitamin D3 1000IU daily** (Supplement)

**🟢 No Major Interactions Found**

**Minor Considerations:**
- Lisinopril may cause a dry cough in some patients (monitor)
- Take Metformin with food to reduce stomach upset
- Vitamin D3 is safe with your current medications

**Lifestyle Interactions:**
⚠️ Limit alcohol consumption (can affect both medications)
⚠️ Monitor blood sugar if starting new exercise routines
✅ Stay hydrated, especially in hot weather (Lisinopril effect)

**Next Steps:**
- Your medication combination is well-tolerated
- Consider discussing potassium levels at next Dr. Rodriguez visit
- Set reminders for consistent timing

Any specific concerns about your medications?`,
      relatedRecords: ['Current Prescriptions', 'Medication History']
    },
    symptoms: {
      content: `I can help you assess symptoms, but let's approach this systematically. 

**Symptom Assessment Framework:**
1. **Primary symptoms** - What's bothering you most?
2. **Duration** - How long have you experienced this?
3. **Severity** - Scale of 1-10
4. **Triggers** - What makes it better/worse?
5. **Associated symptoms** - Anything else you've noticed?

**Based on Your Medical History:**
- Your recent cardiology follow-up was normal
- Blood pressure is well-controlled on Lisinopril
- No recent concerning lab values

**Red Flag Symptoms (Seek Immediate Care):**
🚨 Chest pain or pressure
🚨 Severe shortness of breath
🚨 Sudden severe headache
🚨 Signs of stroke (FAST)

**Common Symptoms I Can Help Assess:**
• Headaches • Fatigue • Digestive issues
• Sleep problems • Joint pain • Skin changes

Please describe your symptoms in detail, and I'll provide personalized guidance based on your health profile.`,
      relatedRecords: ['Recent Cardiology Visit', 'Blood Pressure Log']
    },
    trends: {
      content: `Here's your 3-month health trend analysis:

**📈 Blood Pressure Trends (Oct 2023 - Jan 2024)**
- **Average**: Decreased from 145/92 to 128/78 mmHg
- **Improvement**: 12% systolic, 15% diastolic reduction
- **Trend**: Excellent control since starting Lisinopril

**🩸 Lab Value Trends**
- **Cholesterol**: Stable (Total: 185 mg/dL)
- **HbA1c**: Improved from 6.8% to 6.2%
- **Kidney function**: Stable and normal

**💊 Medication Adherence**
- **Lisinopril**: 95% adherence (excellent!)
- **Metformin**: 92% adherence
- **Missing doses**: Mainly weekends

**🏃‍♂️ Lifestyle Factors**
- **Exercise**: Increased from 2x to 4x weekly
- **Weight**: Lost 8 lbs (great progress!)
- **Sleep**: Average 7.2 hours (improved)

**🎯 Key Achievements**
✅ Blood pressure control achieved
✅ Diabetes management improving
✅ Cardiovascular risk reduced

**Next Focus Areas**
🎯 Aim for 7.5+ hours sleep consistently
🎯 Continue current exercise routine
🎯 Maintain medication schedule on weekends

Your health trajectory is very positive! Keep up the excellent work.`,
      relatedRecords: ['BP Monitoring Log', 'HbA1c Trends', 'Exercise Data']
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      relatedRecords: [],
      suggestions: []
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      let aiResponse;
      
      // Simple keyword matching for demo responses
      if (message.toLowerCase().includes('lab') || message.toLowerCase().includes('blood')) {
        aiResponse = sampleResponses.labs;
      } else if (message.toLowerCase().includes('medication') || message.toLowerCase().includes('drug')) {
        aiResponse = sampleResponses.drugs;
      } else if (message.toLowerCase().includes('symptom') || message.toLowerCase().includes('pain')) {
        aiResponse = sampleResponses.symptoms;
      } else if (message.toLowerCase().includes('trend') || message.toLowerCase().includes('progress')) {
        aiResponse = sampleResponses.trends;
      } else {
        aiResponse = {
          content: `I understand you're asking about: "${message}"

I can help you with various health-related questions using your medical data. Here are some things I excel at:

🩺 **Medical Record Analysis** - Lab results, imaging reports, vital signs
💊 **Medication Management** - Drug interactions, side effects, reminders  
📊 **Health Trends** - Track changes in your health metrics over time
🎯 **Symptom Assessment** - Help evaluate symptoms (not a replacement for medical care)
⚡ **Preventive Insights** - Personalized recommendations based on your data

Could you be more specific about what you'd like to know? Or try one of the quick actions below!`,
          relatedRecords: []
        };
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        relatedRecords: aiResponse.relatedRecords || [],
        suggestions: quickActions
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (query: string) => {
    setMessage(query);
  };

  const exportConversation = () => {
    console.log('Exporting conversation as PDF...');
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-200px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Brain className="w-8 h-8 text-primary mr-3" />
              AI Health Assistant
            </h1>
            <p className="text-muted-foreground">
              Powered by Hedera AI • Analyzing your personal health data
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
            <Button variant="outline" onClick={exportConversation}>
              <Download className="w-4 h-4 mr-2" />
              Export Chat
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {msg.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {msg.type === 'ai' ? 'AI Assistant' : 'You'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    msg.type === 'ai' 
                      ? 'bg-muted/50 border' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">
                      {msg.content}
                    </div>
                    
                    {msg.relatedRecords && msg.relatedRecords.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-2">Related Records:</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.relatedRecords.map((record, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              {record}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {msg.suggestions && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-3">Quick Actions:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {msg.suggestions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(action.query)}
                              className="justify-start text-left h-auto py-2"
                            >
                              {action.icon}
                              <span className="ml-2 text-xs">{action.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-muted-foreground">AI Assistant</span>
                  </div>
                  <div className="bg-muted/50 border p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Analyzing your health data...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your health data, symptoms, medications, or request analysis..."
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      AI responses are for informational purposes only
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!message.trim() || isTyping}
                  className="gradient-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIChat;