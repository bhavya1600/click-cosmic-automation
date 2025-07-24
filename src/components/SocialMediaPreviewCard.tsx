// SocialMediaPreviewCard.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Facebook, Twitter, Bot, Send, User } from "lucide-react";

/** -----------------------------------------------------------------------
 *  1.  Data ----------------------------------------------------------------
 *  Social media interactions across different platforms with AI responses
 *  --------------------------------------------------------------------- */
interface SocialMessage {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  customerName: string;
  customerMessage: string;
  aiResponse: string;
  timestamp: string;
  isResponded: boolean;
}

const socialMessages: SocialMessage[] = [
  {
    id: '1',
    platform: 'instagram',
    customerName: 'jenny_styles',
    customerMessage: 'Hi! Do you offer custom automation for e-commerce?',
    aiResponse: 'Yes! We specialize in e-commerce automation. Let me schedule a consultation for you.',
    timestamp: '2 min ago',
    isResponded: false,
  },
  {
    id: '2',
    platform: 'facebook',
    customerName: 'Mike Rodriguez',
    customerMessage: 'What are your pricing plans?',
    aiResponse: 'Great question! Our plans start at $99/month. Would you like me to send you a detailed breakdown?',
    timestamp: '5 min ago',
    isResponded: true,
  },
  {
    id: '3',
    platform: 'twitter',
    customerName: '@tech_startup_co',
    customerMessage: 'Can you help with lead generation automation?',
    aiResponse: 'Absolutely! Our lead automation increased clients\' conversions by 40%. DM us for a free audit!',
    timestamp: '8 min ago',
    isResponded: true,
  },
  {
    id: '4',
    platform: 'instagram',
    customerName: 'business_owner_sarah',
    customerMessage: 'How long does setup take?',
    aiResponse: 'Most setups are completed within 24-48 hours. We\'ll guide you through everything!',
    timestamp: '12 min ago',
    isResponded: false,
  },
];

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
};

const platformColors = {
  instagram: 'text-pink-400',
  facebook: 'text-blue-400',
  twitter: 'text-cyan-400',
};

/** -----------------------------------------------------------------------
 *  2.  Helper component ---------------------------------------------------
 *  Individual message thread
 *  --------------------------------------------------------------------- */
const MessageThread: FC<SocialMessage> = ({ 
  platform, 
  customerName, 
  customerMessage, 
  aiResponse, 
  timestamp, 
  isResponded 
}) => {
  const PlatformIcon = platformIcons[platform];
  const platformColor = platformColors[platform];

  return (
    <div className="w-full flex-shrink-0 border border-neutral-800 rounded-lg bg-white/5 p-3 mb-2">
      {/* Platform Header */}
      <div className="flex items-center gap-2 mb-2">
        <PlatformIcon className={`w-4 h-4 ${platformColor}`} />
        <span className="text-xs text-white/80 font-medium">{customerName}</span>
        <span className="text-[10px] text-neutral-400 ml-auto">{timestamp}</span>
      </div>

      {/* Customer Message */}
      <div className="mb-2">
        <div className="flex items-start gap-2">
          <User className="w-3 h-3 text-neutral-400 mt-1 flex-shrink-0" />
          <p className="text-[11px] text-white/90 leading-relaxed">{customerMessage}</p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex items-start gap-2">
        <Bot className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <p className="text-[11px] text-purple-200 leading-relaxed mb-1">{aiResponse}</p>
          <div className="flex items-center gap-1">
            {isResponded ? (
              <span className="text-[9px] text-green-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Sent
              </span>
            ) : (
              <span className="text-[9px] text-orange-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                Sending...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** -----------------------------------------------------------------------
 *  3.  Main component -----------------------------------------------------
 *  Social media management dashboard with AI responses
 *  --------------------------------------------------------------------- */
const SocialMediaPreviewCard: FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % socialMessages.length);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[350px] rounded-md border border-muted-foreground/30 bg-black/40 backdrop-blur relative overflow-hidden">
      {/* Top bar */}
      <div className="flex text-[11px] border-b border-neutral-800 px-3 py-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-3 h-3 text-purple-400" />
          <span className="text-white/90">Social Hub</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Instagram className="w-3 h-3 text-pink-400" />
          <Facebook className="w-3 h-3 text-blue-400" />
          <Twitter className="w-3 h-3 text-cyan-400" />
        </div>
      </div>

      {/* Stats Header */}
      <div className="px-3 py-2 border-b border-neutral-800 bg-purple-900/10">
        <div className="flex justify-between text-[10px]">
          <div>
            <span className="text-white/80">Active Conversations</span>
            <span className="text-purple-400 font-medium ml-1">12</span>
          </div>
          <div>
            <span className="text-white/80">Response Rate</span>
            <span className="text-green-400 font-medium ml-1">98%</span>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 p-3">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-white/90 font-medium">AI Assistant</span>
            <span className="text-[9px] text-green-400 bg-green-400/20 px-2 py-0.5 rounded-full">Online</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <MessageThread {...socialMessages[currentMessageIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Quick Response Options */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex gap-1 mb-2">
              <button className="text-[9px] bg-neutral-800 text-white/80 px-2 py-1 rounded-full">
                Schedule Call
              </button>
              <button className="text-[9px] bg-neutral-800 text-white/80 px-2 py-1 rounded-full">
                Send Pricing
              </button>
              <button className="text-[9px] bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full">
                Auto-Reply On
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-neutral-800 p-2">
        <div className="flex items-center gap-2">
          <div className="flex-grow bg-neutral-800 rounded-full px-3 py-1">
            <input 
              type="text" 
              placeholder="AI is handling responses..."
              className="bg-transparent text-[10px] text-white/60 w-full outline-none"
              disabled
            />
          </div>
          <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center">
            <Send className="w-3 h-3 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPreviewCard; 