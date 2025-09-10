import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, User, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplaintData {
  description: string;
  category: string;
  location?: string;
}

interface ComplaintFormProps {
  complaintData: ComplaintData | null;
  onSubmit?: (ticketId: string) => void;
}

const categories = {
  'road': { label: 'सड़क/Road', color: 'bg-orange-500', icon: '🛣️' },
  'water': { label: 'पानी/Water', color: 'bg-blue-500', icon: '💧' },
  'electricity': { label: 'बिजली/Electricity', color: 'bg-yellow-500', icon: '⚡' },
  'garbage': { label: 'कचरा/Garbage', color: 'bg-green-500', icon: '🗑️' },
  'other': { label: 'अन्य/Other', color: 'bg-gray-500', icon: '📝' }
};

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  complaintData,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!complaintData) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTicketId = `CVC${Date.now().toString().slice(-6)}`;
    setTicketId(generatedTicketId);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "शिकायत दर्ज हो गई / Complaint Registered",
      description: `Ticket ID: ${generatedTicketId}`,
    });
    
    if (onSubmit) {
      onSubmit(generatedTicketId);
    }
  };

  if (!complaintData) {
    return (
      <Card className="bg-gradient-hero border-dashed border-2 border-primary/30">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🎤</div>
          <p className="text-muted-foreground">
            अपनी शिकायत रिकॉर्ड करने के लिए ऊपर माइक बटन दबाएं
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Press the mic button above to record your complaint
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-r from-success/10 to-success/5 border-success/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <CardTitle className="text-success">शिकायत सफलतापूर्वक दर्ज हुई!</CardTitle>
          <p className="text-sm text-muted-foreground">Complaint Successfully Registered!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              Ticket ID: {ticketId}
            </div>
            <p className="text-sm text-muted-foreground">
              इस नंबर को सेव करें / Save this number for tracking
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>अनुमानित समय / Expected resolution: 3-5 working days</span>
          </div>
          
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-sm font-medium mb-1">SMS भेजा गया / SMS Sent:</p>
            <p className="text-xs text-muted-foreground">
              आपको अपडेट SMS से मिलेगा / You will receive updates via SMS
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const categoryKey = complaintData.category.toLowerCase();
  const categoryInfo = categories[categoryKey as keyof typeof categories] || categories.other;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>शिकायत विवरण / Complaint Details</span>
          <Badge className={`${categoryInfo.color} text-white`}>
            {categoryInfo.icon} {categoryInfo.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <User className="h-4 w-4" />
            विवरण / Description:
          </h4>
          <p className="text-sm">{complaintData.description}</p>
        </div>

        {complaintData.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">स्थान / Location:</span>
            <span>{complaintData.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>SMS updates will be sent to your registered mobile number</span>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSubmit} 
            className="flex-1 bg-gradient-primary hover:shadow-elegant transition-smooth"
            disabled={isSubmitting}
          >
            {isSubmitting ? "भेजा जा रहा है..." : "शिकायत दर्ज करें / Submit Complaint"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};