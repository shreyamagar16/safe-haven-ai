import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import HomeTab from '@/components/tabs/HomeTab';
import QuietHelpTab from '@/components/tabs/QuietHelpTab';
import ChatTab from '@/components/tabs/ChatTab';
import UnsafeRideTab from '@/components/tabs/UnsafeRideTab';
import LearnTab from '@/components/tabs/LearnTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onTabChange={setActiveTab} />;
      case 'quiet':
        return <QuietHelpTab />;
      case 'chat':
        return <ChatTab onTabChange={setActiveTab} />;
      case 'ride':
        return <UnsafeRideTab />;
      case 'learn':
        return <LearnTab />;
      default:
        return <HomeTab onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 pb-20 max-w-lg mx-auto">
        {renderTab()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
