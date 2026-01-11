import { 
  AlertTriangle, 
  Heart, 
  Baby, 
  Stethoscope, 
  Car, 
  Shield, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

const HomeTab = ({ onTabChange }: HomeTabProps) => {
  const { t } = useLanguage();

  const handleEmergency = (type: string) => {
    toast.success(`${type} alert activated`, {
      description: 'Help is being contacted...',
    });
  };

  const emergencyButtons = [
    { 
      id: 'emergency', 
      icon: AlertTriangle, 
      label: t('emergencySOS'), 
      variant: 'emergency' as const,
      action: () => handleEmergency('Emergency SOS')
    },
    { 
      id: 'women', 
      icon: Heart, 
      label: t('womenSOS'), 
      variant: 'destructive' as const,
      action: () => handleEmergency('Women SOS')
    },
    { 
      id: 'child', 
      icon: Baby, 
      label: t('childSOS'), 
      variant: 'warning' as const,
      action: () => handleEmergency('Child SOS')
    },
    { 
      id: 'medical', 
      icon: Stethoscope, 
      label: t('medicalSOS'), 
      variant: 'medical' as const,
      action: () => handleEmergency('Medical SOS')
    },
    { 
      id: 'ride', 
      icon: Car, 
      label: t('unsafeRide'), 
      variant: 'secondary' as const,
      action: () => onTabChange('ride')
    },
    { 
      id: 'quiet', 
      icon: Shield, 
      label: t('quietHelp'), 
      variant: 'calm' as const,
      action: () => onTabChange('quiet')
    },
    { 
      id: 'track', 
      icon: MapPin, 
      label: t('trackMe'), 
      variant: 'safe' as const,
      action: () => handleEmergency('Location tracking')
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      label: t('talkToMe'), 
      variant: 'warm' as const,
      action: () => onTabChange('chat')
    },
  ];

  return (
    <div className="p-4 pb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">{t('youAreSafe')}</h2>
        <p className="text-sm text-muted-foreground">{t('privacy')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {emergencyButtons.map(({ id, icon: Icon, label, variant, action }) => (
          <Button
            key={id}
            variant={variant}
            size="tile"
            onClick={action}
            className="safe-touch"
          >
            <Icon className="w-8 h-8" />
            <span className="text-center leading-tight">{label}</span>
          </Button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-calm flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Anonymous Mode Active</p>
            <p className="text-xs text-muted-foreground">Your identity is always protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
