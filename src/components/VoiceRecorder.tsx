import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
  language?: string;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscript,
  language = 'hi-IN',
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        if (onTranscript && fullTranscript) {
          onTranscript(fullTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscript]);

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Card className={cn("p-6 bg-gradient-hero border-2", className)}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className={cn(
            "relative p-4 rounded-full transition-all duration-300",
            isRecording 
              ? "bg-gradient-primary shadow-glow animate-pulse" 
              : "bg-muted hover:bg-gradient-primary hover:shadow-elegant"
          )}>
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="lg"
              variant="ghost"
              className={cn(
                "p-8 rounded-full transition-smooth",
                isRecording 
                  ? "text-white hover:bg-white/20" 
                  : "text-primary hover:text-white"
              )}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {isRecording ? 
              "🎤 सुन रहा हूँ... अपनी समस्या बताएं" : 
              "🗣️ अपनी शिकायत दर्ज करने के लिए बोलें"
            }
          </p>
          
          {transcript && (
            <div className="p-3 bg-white/50 rounded-lg border">
              <p className="text-sm text-foreground">{transcript}</p>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className={cn(
              "w-2 h-2 rounded-full transition-smooth",
              isListening ? "bg-success animate-pulse" : "bg-muted"
            )} />
            {isListening ? "Connected" : "Ready"}
          </div>
        </div>
      </div>
    </Card>
  );
};