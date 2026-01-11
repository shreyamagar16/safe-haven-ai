import { useState, useRef, useEffect } from 'react';
import { Send, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatTabProps {
  onTabChange: (tab: string) => void;
}

const ChatTab = ({ onTabChange }: ChatTabProps) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('chatWelcome'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simple keyword-based responses (placeholder for AI)
    setTimeout(() => {
      let response = "I hear you. That sounds really difficult. Would you like to tell me more about how you're feeling?";
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('scared') || lowerMessage.includes('afraid') || lowerMessage.includes('fear')) {
        response = "It's okay to feel scared. You're being very brave by reaching out. Would you like me to help you connect with someone who can help? We have Quiet Help available if you need discreet assistance.";
      } else if (lowerMessage.includes('hurt') || lowerMessage.includes('pain') || lowerMessage.includes('hit')) {
        response = "I'm so sorry you're going through this. Your safety matters. If you're in immediate danger, please tap the Emergency SOS button. If you need discreet help, our Quiet Help feature can connect you with support without anyone knowing.";
      } else if (lowerMessage.includes('help') || lowerMessage.includes('need')) {
        response = "I'm here to help you. You have several options: Quiet Help for discreet assistance, Emergency SOS if you're in immediate danger, or we can just keep talking if that's what you need right now.";
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('okay') || lowerMessage.includes('better')) {
        response = "I'm glad I could help. Remember, you can come back here anytime. You're stronger than you know. 💚";
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateResponse(input.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Chat Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center">
            <Shield className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">SafeNest Support</h3>
            <p className="text-xs text-muted-foreground">Here to listen, never to judge</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-border flex gap-2 overflow-x-auto">
        <Button 
          variant="quiet" 
          size="sm" 
          className="shrink-0"
          onClick={() => onTabChange('quiet')}
        >
          <Shield className="w-4 h-4 mr-1" />
          {t('quietHelp')}
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          className="shrink-0"
        >
          <AlertTriangle className="w-4 h-4 mr-1" />
          {t('emergencySOS')}
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex animate-slide-up",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                message.role === 'user'
                  ? 'gradient-calm text-primary-foreground rounded-br-md'
                  : 'bg-muted text-foreground rounded-bl-md'
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('typeMessage')}
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
          <Button 
            variant="calm" 
            size="icon" 
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
