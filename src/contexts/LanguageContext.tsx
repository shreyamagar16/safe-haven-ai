import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

const translations: Translations = {
  // App General
  appName: { en: 'SafeNest', hi: 'सेफनेस्ट', mr: 'सेफनेस्ट' },
  youAreSafe: { en: 'You are not alone', hi: 'आप अकेले नहीं हैं', mr: 'तुम्ही एकटे नाही आहात' },
  privacy: { en: 'Your privacy is protected', hi: 'आपकी गोपनीयता सुरक्षित है', mr: 'तुमची गोपनीयता सुरक्षित आहे' },
  
  // Navigation
  home: { en: 'Home', hi: 'होम', mr: 'होम' },
  quietHelp: { en: 'Quiet Help', hi: 'शांत मदद', mr: 'शांत मदत' },
  talkToMe: { en: 'Talk to Me', hi: 'मुझसे बात करो', mr: 'माझ्याशी बोला' },
  unsafeRide: { en: 'Unsafe Ride', hi: 'असुरक्षित सवारी', mr: 'असुरक्षित प्रवास' },
  learn: { en: 'Learn', hi: 'सीखें', mr: 'शिका' },
  
  // Emergency Buttons
  emergencySOS: { en: 'Emergency SOS', hi: 'आपातकालीन SOS', mr: 'आणीबाणी SOS' },
  womenSOS: { en: 'Women SOS', hi: 'महिला SOS', mr: 'महिला SOS' },
  childSOS: { en: 'Child SOS', hi: 'बाल SOS', mr: 'बाल SOS' },
  medicalSOS: { en: 'Medical SOS', hi: 'चिकित्सा SOS', mr: 'वैद्यकीय SOS' },
  trackMe: { en: 'Track Me', hi: 'मुझे ट्रैक करें', mr: 'माझा मागोवा घ्या' },
  
  // Quiet Help
  areYouSafe: { en: 'Are you safe right now?', hi: 'क्या आप अभी सुरक्षित हैं?', mr: 'तुम्ही आत्ता सुरक्षित आहात का?' },
  yes: { en: 'Yes', hi: 'हाँ', mr: 'होय' },
  no: { en: 'No', hi: 'नहीं', mr: 'नाही' },
  notSure: { en: 'Not sure', hi: 'पता नहीं', mr: 'माहीत नाही' },
  whatIsHappening: { en: 'What is happening?', hi: 'क्या हो रहा है?', mr: 'काय होत आहे?' },
  touching: { en: 'Unwanted touching', hi: 'अवांछित स्पर्श', mr: 'अवांछित स्पर्श' },
  watching: { en: 'Being watched', hi: 'देखा जा रहा है', mr: 'पाहिले जात आहे' },
  forcing: { en: 'Being forced', hi: 'मजबूर किया जा रहा है', mr: 'जबरदस्ती होत आहे' },
  threats: { en: 'Receiving threats', hi: 'धमकियाँ मिल रही हैं', mr: 'धमक्या मिळत आहेत' },
  unsure: { en: 'I\'m not sure', hi: 'मुझे पता नहीं', mr: 'मला माहीत नाही' },
  whatDoYouWant: { en: 'What would you like?', hi: 'आप क्या चाहते हैं?', mr: 'तुम्हाला काय हवे आहे?' },
  stopIt: { en: 'I want it to stop', hi: 'मैं चाहती हूँ कि यह रुके', mr: 'मला हे थांबवायचे आहे' },
  familyHelp: { en: 'Family intervention', hi: 'परिवार की मदद', mr: 'कुटुंबाची मदत' },
  silentHelp: { en: 'Silent help only', hi: 'केवल मूक सहायता', mr: 'फक्त शांत मदत' },
  anonymousMode: { en: 'Anonymous mode is ON', hi: 'गुमनाम मोड चालू है', mr: 'अनामिक मोड चालू आहे' },
  protectMessage: { en: 'We can protect you without exposing you', hi: 'हम आपको बिना उजागर किए सुरक्षित कर सकते हैं', mr: 'आम्ही तुम्हाला उघड न करता संरक्षित करू शकतो' },
  submitSilently: { en: 'Submit Silently', hi: 'चुपचाप जमा करें', mr: 'शांतपणे सबमिट करा' },
  helpOnWay: { en: 'Help is on the way', hi: 'मदद आ रही है', mr: 'मदत येत आहे' },
  back: { en: 'Back', hi: 'वापस', mr: 'मागे' },
  next: { en: 'Next', hi: 'आगे', mr: 'पुढे' },
  
  // Unsafe Ride
  iFeelUnsafe: { en: 'I feel unsafe', hi: 'मुझे असुरक्षित लगता है', mr: 'मला असुरक्षित वाटते' },
  driverWeird: { en: 'Driver acting weird', hi: 'ड्राइवर अजीब व्यवहार कर रहा है', mr: 'ड्रायव्हर विचित्र वागतोय' },
  wrongRoute: { en: 'Wrong route', hi: 'गलत रास्ता', mr: 'चुकीचा मार्ग' },
  beingFollowed: { en: 'Being followed', hi: 'पीछा किया जा रहा है', mr: 'पाठलाग होतोय' },
  alertSent: { en: 'Alert sent! GPS tracking active', hi: 'अलर्ट भेजा गया! GPS ट्रैकिंग सक्रिय', mr: 'अलर्ट पाठवला! GPS ट्रॅकिंग सक्रिय' },
  
  // Chat
  typeMessage: { en: 'Type your message...', hi: 'अपना संदेश लिखें...', mr: 'तुमचा संदेश टाइप करा...' },
  chatWelcome: { en: 'Hi, I\'m here to listen. You can share anything with me - I won\'t judge. How are you feeling today?', hi: 'नमस्ते, मैं सुनने के लिए यहाँ हूँ। आप मुझसे कुछ भी साझा कर सकते हैं - मैं कोई फैसला नहीं करूँगी। आज आप कैसा महसूस कर रहे हैं?', mr: 'नमस्कार, मी ऐकण्यासाठी येथे आहे. तुम्ही माझ्याशी काहीही शेअर करू शकता - मी न्याय करणार नाही. आज तुम्हाला कसे वाटते?' },
  
  // Learn
  whatIsConsent: { en: 'What is Consent?', hi: 'सहमति क्या है?', mr: 'संमती म्हणजे काय?' },
  survivorStories: { en: 'Survivor Stories', hi: 'बचे लोगों की कहानियाँ', mr: 'वाचलेल्यांच्या कथा' },
  safetyNews: { en: 'Women\'s Safety News', hi: 'महिला सुरक्षा समाचार', mr: 'महिला सुरक्षा बातम्या' },
  simpleLaws: { en: 'Know Your Rights', hi: 'अपने अधिकार जानें', mr: 'तुमचे हक्क जाणून घ्या' },
  raiseYourSons: { en: 'How to Raise Your Sons', hi: 'अपने बेटों को कैसे पालें', mr: 'तुमच्या मुलांना कसे वाढवावे' },
  
  // Consent Content
  consentTitle: { en: 'Understanding Consent', hi: 'सहमति को समझना', mr: 'संमती समजून घेणे' },
  consentDesc: { en: 'Consent means freely given, reversible, informed, enthusiastic, and specific agreement.', hi: 'सहमति का मतलब है स्वतंत्र रूप से दी गई, वापस लेने योग्य, सूचित, उत्साही और विशिष्ट सहमति।', mr: 'संमती म्हणजे मुक्तपणे दिलेला, परत घेता येणारा, माहितीपूर्ण, उत्साही आणि विशिष्ट करार.' },
  
  // Language
  language: { en: 'Language', hi: 'भाषा', mr: 'भाषा' },
  english: { en: 'English', hi: 'अंग्रेज़ी', mr: 'इंग्रजी' },
  hindi: { en: 'Hindi', hi: 'हिंदी', mr: 'हिंदी' },
  marathi: { en: 'Marathi', hi: 'मराठी', mr: 'मराठी' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
