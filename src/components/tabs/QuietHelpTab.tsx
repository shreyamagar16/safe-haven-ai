import { useState } from 'react';
import { ChevronLeft, Shield, Eye, Hand, Lock, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const QuietHelpTab = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    isSafe: '',
    happening: '',
    wants: '',
  });

  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    toast.success(t('helpOnWay'), {
      description: 'A counselor will reach out silently.',
    });
    setStep(6);
  };

  const happeningOptions = [
    { value: 'touching', label: t('touching'), icon: Hand },
    { value: 'watching', label: t('watching'), icon: Eye },
    { value: 'forcing', label: t('forcing'), icon: Lock },
    { value: 'threats', label: t('threats'), icon: Shield },
    { value: 'unsure', label: t('unsure'), icon: HelpCircle },
  ];

  const wantsOptions = [
    { value: 'stop', label: t('stopIt') },
    { value: 'family', label: t('familyHelp') },
    { value: 'silent', label: t('silentHelp') },
    { value: 'unsure', label: t('unsure') },
  ];

  return (
    <div className="p-4 pb-8 min-h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              s <= step ? "gradient-calm" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step 1: Are you safe? */}
      {step === 1 && (
        <div className="flex-1 flex flex-col animate-slide-up">
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('areYouSafe')}</h2>
            <p className="text-muted-foreground mb-8">Take your time. There's no rush.</p>
            
            <div className="w-full space-y-3">
              {[
                { value: 'yes', label: t('yes'), variant: 'safe' as const },
                { value: 'no', label: t('no'), variant: 'destructive' as const },
                { value: 'notSure', label: t('notSure'), variant: 'quiet' as const },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={option.variant}
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    handleAnswer('isSafe', option.value);
                    nextStep();
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: What is happening? */}
      {step === 2 && (
        <div className="flex-1 flex flex-col animate-slide-up">
          <Button variant="ghost" size="sm" onClick={prevStep} className="self-start mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('back')}
          </Button>
          
          <h2 className="text-xl font-bold text-foreground mb-2">{t('whatIsHappening')}</h2>
          <p className="text-sm text-muted-foreground mb-6">Select what applies to you</p>
          
          <div className="space-y-3">
            {happeningOptions.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant={answers.happening === value ? 'calm' : 'quiet'}
                size="lg"
                className="w-full justify-start gap-4"
                onClick={() => {
                  handleAnswer('happening', value);
                  nextStep();
                }}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: What do you want? */}
      {step === 3 && (
        <div className="flex-1 flex flex-col animate-slide-up">
          <Button variant="ghost" size="sm" onClick={prevStep} className="self-start mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('back')}
          </Button>
          
          <h2 className="text-xl font-bold text-foreground mb-2">{t('whatDoYouWant')}</h2>
          <p className="text-sm text-muted-foreground mb-6">We're here to help, not judge</p>
          
          <div className="space-y-3">
            {wantsOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={answers.wants === value ? 'calm' : 'quiet'}
                size="lg"
                className="w-full"
                onClick={() => {
                  handleAnswer('wants', value);
                  nextStep();
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Anonymous mode */}
      {step === 4 && (
        <div className="flex-1 flex flex-col animate-slide-up">
          <Button variant="ghost" size="sm" onClick={prevStep} className="self-start mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('back')}
          </Button>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 rounded-full gradient-calm flex items-center justify-center mb-6 animate-pulse-soft">
              <ShieldCheck className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">{t('protectMessage')}</h2>
            
            <div className="bg-safe/10 border border-safe/20 rounded-2xl p-4 mb-6 w-full">
              <div className="flex items-center justify-center gap-2 text-safe font-semibold">
                <Shield className="w-5 h-5" />
                {t('anonymousMode')}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-8">
              Your identity will never be shared. Help will come silently.
            </p>
            
            <Button variant="calm" size="xl" className="w-full" onClick={nextStep}>
              {t('next')}
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Confirm submission */}
      {step === 5 && (
        <div className="flex-1 flex flex-col animate-slide-up">
          <Button variant="ghost" size="sm" onClick={prevStep} className="self-start mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('back')}
          </Button>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-xl font-bold text-foreground mb-6">Ready to submit?</h2>
            
            <div className="bg-muted rounded-2xl p-4 mb-8 w-full text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Safety status:</span>
                <span className="font-medium">{answers.isSafe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Situation:</span>
                <span className="font-medium">{answers.happening}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Request:</span>
                <span className="font-medium">{answers.wants}</span>
              </div>
            </div>
            
            <Button variant="calm" size="xl" className="w-full" onClick={handleSubmit}>
              <Shield className="w-5 h-5 mr-2" />
              {t('submitSilently')}
            </Button>
          </div>
        </div>
      )}

      {/* Step 6: Success */}
      {step === 6 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-scale-in">
          <div className="w-24 h-24 rounded-full gradient-safe flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-safe-foreground" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-3">{t('helpOnWay')}</h2>
          <p className="text-muted-foreground mb-8">
            A trained counselor will contact you safely and discreetly.
          </p>
          
          <Button variant="quiet" size="lg" onClick={() => setStep(1)}>
            Return Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuietHelpTab;
