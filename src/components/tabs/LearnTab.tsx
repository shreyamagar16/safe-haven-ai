import { useState } from 'react';
import { ChevronRight, Heart, BookOpen, Newspaper, Scale, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const LearnTab = () => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'consent',
      icon: Heart,
      title: t('whatIsConsent'),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      content: {
        title: t('consentTitle'),
        description: t('consentDesc'),
        points: [
          'Freely Given: No pressure, manipulation, or influence',
          'Reversible: Can be withdrawn at any time',
          'Informed: Based on full understanding',
          'Enthusiastic: An eager and excited "yes"',
          'Specific: Permission for one thing is not permission for everything',
        ],
      },
    },
    {
      id: 'stories',
      icon: Users,
      title: t('survivorStories'),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      content: {
        title: 'Stories of Strength',
        description: 'Real stories from survivors who found their voice and their path to healing.',
        points: [
          '"I thought I was alone. Finding help changed everything." - Anonymous',
          '"Speaking up was the hardest and bravest thing I ever did." - Survivor',
          '"Recovery is not linear, but every step forward counts." - Healing Journey',
        ],
      },
    },
    {
      id: 'news',
      icon: Newspaper,
      title: t('safetyNews'),
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      content: {
        title: 'Stay Informed',
        description: 'Latest updates on women\'s safety initiatives and rights.',
        points: [
          'New helpline numbers and support services',
          'Safety apps and technology updates',
          'Policy changes and legal updates',
          'Community safety initiatives',
        ],
      },
    },
    {
      id: 'laws',
      icon: Scale,
      title: t('simpleLaws'),
      color: 'text-medical',
      bgColor: 'bg-medical/10',
      content: {
        title: 'Your Legal Rights',
        description: 'Understanding your rights in simple terms.',
        points: [
          'Protection of Women from Domestic Violence Act, 2005',
          'Sexual Harassment of Women at Workplace Act, 2013',
          'POCSO Act for child protection',
          'Right to file FIR at any police station',
          'Right to free legal aid',
        ],
      },
    },
    {
      id: 'sons',
      icon: BookOpen,
      title: t('raiseYourSons'),
      color: 'text-safe',
      bgColor: 'bg-safe/10',
      content: {
        title: 'Raising Respectful Sons',
        description: 'Teaching consent, empathy, and respect from an early age.',
        points: [
          'Teach emotional expression and healthy communication',
          'Model respectful relationships at home',
          'Discuss consent in age-appropriate ways',
          'Challenge harmful stereotypes together',
          'Encourage empathy through diverse friendships',
          'Talk about media messages critically',
        ],
      },
    },
  ];

  return (
    <div className="p-4 pb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('learn')}</h2>
        <p className="text-sm text-muted-foreground">Knowledge is protection</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {sections.map(({ id, icon: Icon, title, color, bgColor, content }) => (
          <AccordionItem
            key={id}
            value={id}
            className="border-none"
          >
            <AccordionTrigger className="bg-card rounded-2xl px-4 py-4 hover:no-underline shadow-soft hover:shadow-card transition-shadow">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bgColor)}>
                  <Icon className={cn("w-5 h-5", color)} />
                </div>
                <span className="font-semibold text-foreground text-left">{title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-muted/50 rounded-2xl mt-2 p-4">
              <h3 className="font-semibold text-foreground mb-2">{content.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{content.description}</p>
              <ul className="space-y-2">
                {content.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <ChevronRight className={cn("w-4 h-4 mt-0.5 shrink-0", color)} />
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default LearnTab;
