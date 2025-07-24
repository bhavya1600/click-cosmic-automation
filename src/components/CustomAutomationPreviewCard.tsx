// CustomAutomationPreviewCard.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe, Zap, Settings, ChevronRight, Play, Check } from "lucide-react";

/** -----------------------------------------------------------------------
 *  1.  Data ----------------------------------------------------------------
 *  Different automation workflows and website building processes
 *  --------------------------------------------------------------------- */
interface AutomationStep {
  id: string;
  type: 'website' | 'api' | 'integration' | 'deployment';
  title: string;
  description: string;
  status: 'pending' | 'building' | 'completed';
  code: string;
  progress: number;
}

const automationSteps: AutomationStep[] = [
  {
    id: '1',
    type: 'website',
    title: 'Building Landing Page',
    description: 'Creating responsive hero section',
    status: 'building',
    code: '<div class="hero-section">\n  <h1>Welcome</h1>\n  <button>Get Started</button>\n</div>',
    progress: 75,
  },
  {
    id: '2',
    type: 'api',
    title: 'API Integration',
    description: 'Connecting payment gateway',
    status: 'completed',
    code: 'const stripe = require("stripe");\nstripe.paymentIntents.create({...})',
    progress: 100,
  },
  {
    id: '3',
    type: 'integration',
    title: 'Email Automation',
    description: 'Setting up welcome sequence',
    status: 'building',
    code: 'function sendWelcomeEmail(user) {\n  emailService.send({...})\n}',
    progress: 60,
  },
  {
    id: '4',
    type: 'deployment',
    title: 'Smart Deployment',
    description: 'Auto-deploying to production',
    status: 'pending',
    code: 'deploy: {\n  platform: "vercel",\n  auto: true\n}',
    progress: 25,
  },
];

const typeIcons = {
  website: Globe,
  api: Code2,
  integration: Zap,
  deployment: Settings,
};

const typeColors = {
  website: 'text-blue-400',
  api: 'text-green-400',
  integration: 'text-purple-400',
  deployment: 'text-orange-400',
};

/** -----------------------------------------------------------------------
 *  2.  Helper component ---------------------------------------------------
 *  Individual automation step
 *  --------------------------------------------------------------------- */
const AutomationStep: FC<AutomationStep> = ({ 
  type, 
  title, 
  description, 
  status, 
  code, 
  progress 
}) => {
  const TypeIcon = typeIcons[type];
  const typeColor = typeColors[type];

  return (
    <div className="w-full border border-neutral-800 rounded-lg bg-white/5 p-3 mb-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <TypeIcon className={`w-4 h-4 ${typeColor}`} />
        <div className="flex-grow">
          <h4 className="text-xs text-white/90 font-medium">{title}</h4>
          <p className="text-[10px] text-neutral-400">{description}</p>
        </div>
        <div className="flex items-center gap-1">
          {status === 'completed' && (
            <Check className="w-3 h-3 text-green-400" />
          )}
          {status === 'building' && (
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          )}
          {status === 'pending' && (
            <div className="w-2 h-2 bg-neutral-500 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Code Preview */}
      <div className="bg-black/40 rounded border border-neutral-700 p-2 mb-2">
        <pre className="text-[9px] text-green-300 font-mono overflow-hidden">
          {code}
        </pre>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="flex-grow h-1 bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              status === 'completed' ? 'bg-green-400' : 
              status === 'building' ? 'bg-purple-400' : 'bg-neutral-500'
            }`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <span className="text-[9px] text-neutral-400">{progress}%</span>
      </div>
    </div>
  );
};

/** -----------------------------------------------------------------------
 *  3.  Main component -----------------------------------------------------
 *  Custom automation and website building dashboard
 *  --------------------------------------------------------------------- */
const CustomAutomationPreviewCard: FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setCurrentStepIndex((prev) => (prev + 1) % automationSteps.length);
        setIsGenerating(false);
      }, 1000);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[360px] rounded-md border border-muted-foreground/30 bg-black/40 backdrop-blur relative overflow-hidden">
      {/* Top bar */}
      <div className="flex text-[11px] border-b border-neutral-800 px-3 py-2">
        <div className="flex items-center gap-2">
          <Code2 className="w-3 h-3 text-purple-400" />
          <span className="text-white/90">Smart Builder</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[9px] text-green-400">AI Active</span>
        </div>
      </div>

      {/* Project Header */}
      <div className="px-3 py-2 border-b border-neutral-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="flex justify-between items-center text-[10px]">
          <div>
            <span className="text-white/80">Project:</span>
            <span className="text-purple-400 font-medium ml-1">E-commerce Site</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="w-3 h-3 text-purple-400" />
            <span className="text-white/80">Auto-Build</span>
          </div>
        </div>
      </div>

      {/* Generation Status */}
      <div className="px-3 py-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-white/90">
            {isGenerating ? 'Generating code...' : 'Ready for next step'}
          </span>
          {isGenerating && (
            <motion.div
              className="w-3 h-0.5 bg-yellow-400 rounded-full"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Automation Steps */}
      <div className="h-44 relative overflow-hidden">
        <div className="absolute inset-0 p-3">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-white/90 font-medium">Automation Pipeline</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AutomationStep {...automationSteps[currentStepIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Quick Stats */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="grid grid-cols-3 gap-2 text-[9px]">
              <div className="text-center">
                <div className="text-purple-400 font-medium">4</div>
                <div className="text-neutral-400">Components</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-medium">2</div>
                <div className="text-neutral-400">APIs</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-medium">1</div>
                <div className="text-neutral-400">Deploy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-neutral-800 p-2">
        <div className="flex items-center gap-2">
          <div className="flex-grow flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-purple-200">Building your vision...</span>
          </div>
          <div className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-purple-400" />
            <span className="text-[9px] text-white/60">Next: Testing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAutomationPreviewCard; 