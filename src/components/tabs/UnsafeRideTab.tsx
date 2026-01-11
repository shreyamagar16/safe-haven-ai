import { useState } from 'react';
import { AlertTriangle, User, Navigation, Eye, MapPin, Mic, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const UnsafeRideTab = () => {
  const { t } = useLanguage();
  const [alertSent, setAlertSent] = useState(false);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const handleAlert = (type: string) => {
    setActiveAlert(type);
    setAlertSent(true);
  };

  const alertButtons = [
    { id: 'unsafe', icon: AlertTriangle, label: t('iFeelUnsafe'), variant: 'emergency' as const },
    { id: 'driver', icon: User, label: t('driverWeird'), variant: 'warning' as const },
    { id: 'route', icon: Navigation, label: t('wrongRoute'), variant: 'secondary' as const },
    { id: 'followed', icon: Eye, label: t('beingFollowed'), variant: 'destructive' as const },
  ];

  if (alertSent) {
    return (
      <div className="p-4 pb-8 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center animate-scale-in">
        <div className="w-24 h-24 rounded-full gradient-safe flex items-center justify-center mb-6 animate-pulse-soft">
          <CheckCircle2 className="w-12 h-12 text-safe-foreground" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-3 text-center">{t('alertSent')}</h2>
        
        <div className="bg-muted rounded-2xl p-4 w-full max-w-sm mb-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-safe/10 rounded-xl">
            <MapPin className="w-5 h-5 text-safe" />
            <div>
              <p className="text-sm font-medium text-foreground">GPS Tracking</p>
              <p className="text-xs text-muted-foreground">Live location shared</p>
            </div>
            <span className="ml-auto w-2 h-2 bg-safe rounded-full animate-pulse" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-xl">
            <Mic className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-foreground">Audio Recording</p>
              <p className="text-xs text-muted-foreground">Recording in progress</p>
            </div>
            <span className="ml-auto w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">Emergency Contacts</p>
              <p className="text-xs text-muted-foreground">Notified automatically</p>
            </div>
            <CheckCircle2 className="ml-auto w-4 h-4 text-safe" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mb-6">
          Emergency services and your contacts have been notified of your location.
        </p>
        
        <Button 
          variant="quiet" 
          size="lg" 
          onClick={() => {
            setAlertSent(false);
            setActiveAlert(null);
          }}
        >
          I'm Safe Now
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('unsafeRide')}</h2>
        <p className="text-sm text-muted-foreground">
          Tap any button to alert emergency contacts and start recording
        </p>
      </div>

      <div className="space-y-3">
        {alertButtons.map(({ id, icon: Icon, label, variant }) => (
          <Button
            key={id}
            variant={variant}
            size="emergency"
            onClick={() => handleAlert(id)}
            className="w-full"
          >
            <Icon className="w-6 h-6 mr-3" />
            {label}
          </Button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-2xl border border-border">
        <h3 className="font-semibold text-foreground mb-3">What happens when you alert?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Live GPS location shared with contacts
          </li>
          <li className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            Audio recording starts automatically
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            Emergency contacts receive instant alert
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UnsafeRideTab;
