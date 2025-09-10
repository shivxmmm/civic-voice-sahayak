import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ComplaintForm } from '@/components/ComplaintForm';
import { Dashboard } from '@/components/Dashboard';
import { 
  Phone, 
  Clock, 
  Globe, 
  Shield, 
  Headphones,
  BarChart3,
  ArrowRight,
  Mic
} from 'lucide-react';
import heroImage from '@/assets/hero-civic-ai.jpg';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [complaintData, setComplaintData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'home' | 'voice' | 'dashboard'>('home');

  const handleVoiceTranscript = (transcript: string) => {
    // Simple keyword detection for demo
    let category = 'other';
    const text = transcript.toLowerCase();
    
    if (text.includes('road') || text.includes('सड़क') || text.includes('पोथोल')) {
      category = 'road';
    } else if (text.includes('water') || text.includes('पानी') || text.includes('leak')) {
      category = 'water';
    } else if (text.includes('electricity') || text.includes('बिजली') || text.includes('power')) {
      category = 'electricity';
    } else if (text.includes('garbage') || text.includes('कचरा') || text.includes('waste')) {
      category = 'garbage';
    }

    setComplaintData({
      description: transcript,
      category: category,
      location: 'Auto-detected from GPS' // Mock location
    });
  };

  if (currentView === 'voice') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                ← Back to Home
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-civic bg-clip-text text-transparent">
                Voice AI Assistant
              </h1>
              <p className="text-xl text-muted-foreground">
                अपनी शिकायत अपनी भाषा में दर्ज करें / File your complaint in your language
              </p>
            </div>

            {/* Language Selector */}
            <div className="max-w-md mx-auto">
              <LanguageSelector 
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              />
            </div>

            {/* Voice Recorder */}
            <div className="max-w-lg mx-auto">
              <VoiceRecorder 
                language={selectedLanguage}
                onTranscript={handleVoiceTranscript}
              />
            </div>

            {/* Complaint Form */}
            <div className="max-w-2xl mx-auto">
              <ComplaintForm 
                complaintData={complaintData}
                onSubmit={(ticketId) => {
                  console.log('Ticket submitted:', ticketId);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-8"
            >
              ← Back to Home
            </Button>
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-primary text-white">
                  🇮🇳 Digital India Initiative
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  <span className="bg-gradient-civic bg-clip-text text-transparent">
                    Voice AI for
                  </span>
                  <br />
                  <span className="text-foreground">
                    Indian Civic Services
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  24/7 multilingual voice assistant for filing civic complaints. 
                  Speak in Hindi, English, Tamil, Marathi or any Indian language. 
                  Get instant ticket numbers and SMS updates.
                </p>
                <p className="text-lg text-primary font-medium">
                  🗣️ बोलें • दर्ज करें • ट्रैक करें • हल करें
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-smooth text-lg px-8"
                  onClick={() => setCurrentView('voice')}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Voice Complaint
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary/30 hover:border-primary transition-smooth text-lg px-8"
                  onClick={() => setCurrentView('dashboard')}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Voice AI for Indian Civic Services"
                  className="w-full h-auto rounded-2xl shadow-elegant"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl blur-3xl transform scale-95" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              सुविधाएं / Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing how citizens interact with government services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-2 border-primary/20 hover:border-primary/40 transition-smooth hover:shadow-elegant">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">24/7 Available</h3>
                <p className="text-muted-foreground">
                  Call anytime, day or night. No office hours, no waiting.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-secondary/20 hover:border-secondary/40 transition-smooth hover:shadow-elegant">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Multilingual</h3>
                <p className="text-muted-foreground">
                  Speak in Hindi, English, Tamil, Marathi & 8+ Indian languages.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-success/20 hover:border-success/40 transition-smooth hover:shadow-elegant">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Instant Tickets</h3>
                <p className="text-muted-foreground">
                  Get complaint number immediately. Track via SMS updates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-500/20 hover:border-orange-500/40 transition-smooth hover:shadow-elegant">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Smart Routing</h3>
                <p className="text-muted-foreground">
                  AI automatically routes to correct department & priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              कैसे काम करता है / How it Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Speak / बोलें</h3>
                <p className="text-muted-foreground">
                  Call the number or use voice recorder. Describe your problem in any language.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">AI Processes / AI समझता है</h3>
                <p className="text-muted-foreground">
                  Voice AI understands, categorizes and creates complaint ticket automatically.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Get Updates / अपडेट पाएं</h3>
                <p className="text-muted-foreground">
                  Receive ticket number and SMS updates until problem is resolved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-civic text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Transform Civic Services?
            </h2>
            <p className="text-xl text-white/90">
              Join the digital revolution. Make government services accessible to every citizen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary text-lg px-8"
                onClick={() => setCurrentView('voice')}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Try Voice Assistant
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary text-lg px-8"
                onClick={() => setCurrentView('dashboard')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;