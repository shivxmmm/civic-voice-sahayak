import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const supportedLanguages: Language[] = [
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'en-IN', name: 'English', nativeName: 'English' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onValueChange,
  className
}) => {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-white/80 border-2 border-primary/20 hover:border-primary/40 transition-smooth">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <SelectValue placeholder="भाषा चुनें / Select Language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-muted-foreground text-sm">({lang.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};