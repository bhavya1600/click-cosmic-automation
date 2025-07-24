// LeadsPreviewCard.tsx
import { FC, ReactElement, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Target, TrendingUp, Award } from "lucide-react";

/** -----------------------------------------------------------------------
 *  1.  Data ----------------------------------------------------------------
 *  Lead pipeline stages with different leads in various stages
 *  --------------------------------------------------------------------- */
interface Lead {
  icon: ReactElement;
  name: string;
  stage: string;
  value: string;
  progress: number; // 0-100
}

const leads: Lead[] = [
  {
    icon: <User className="w-full h-full text-white/90" />,
    name: "Sarah Johnson",
    stage: "New Lead",
    value: "$5,200",
    progress: 15,
  },
  {
    icon: <Mail className="w-full h-full text-white/90" />,
    name: "Tech Solutions Inc",
    stage: "Contacted",
    value: "$12,500",
    progress: 35,
  },
  {
    icon: <Phone className="w-full h-full text-white/90" />,
    name: "David Martinez",
    stage: "Qualified",
    value: "$8,900",
    progress: 60,
  },
  {
    icon: <Target className="w-full h-full text-white/90" />,
    name: "Global Retail Co",
    stage: "Proposal Sent",
    value: "$25,000",
    progress: 80,
  },
  {
    icon: <TrendingUp className="w-full h-full text-white/90" />,
    name: "Marina Chen",
    stage: "Negotiating",
    value: "$7,800",
    progress: 90,
  },
  {
    icon: <Award className="w-full h-full text-white/90" />,
    name: "Enterprise Hub",
    stage: "Closing Soon",
    value: "$18,400",
    progress: 95,
  },
];

/** -----------------------------------------------------------------------
 *  2.  Helper component ---------------------------------------------------
 *  One lead row in the pipeline
 *  --------------------------------------------------------------------- */
const LeadRow: FC<Lead> = ({ icon, name, stage, value, progress }) => (
  <li className="w-full flex shrink-0 rounded border border-neutral-800 bg-white/5 px-3 py-2 gap-3 items-center">
    {/* lead icon */}
    <div className="h-7 w-7 rounded bg-white/5 grid place-items-center flex-shrink-0">
      {icon}
    </div>

    {/* lead info */}
    <div className="flex-grow min-w-0">
      <p className="text-xs leading-none text-white truncate">{name}</p>
      <p className="text-[10px] leading-none text-neutral-400">{stage}</p>
    </div>

    {/* value */}
    <div className="text-right flex-shrink-0">
      <p className="text-xs leading-none text-purple-400 font-medium">{value}</p>
      <div className="w-12 h-1 bg-neutral-700 rounded-full mt-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  </li>
);

/** -----------------------------------------------------------------------
 *  3.  Main component -----------------------------------------------------
 *  Leads pipeline with infinite scroll and progress animations
 *  --------------------------------------------------------------------- */
const LeadsPreviewCard: FC = () => {
  // Duplicate items for seamless scrolling
  const loopItems = useMemo(() => [...leads, ...leads], []);

  return (
    <div className="w-full max-w-[320px] rounded-md border border-muted-foreground/30 bg-black/40 backdrop-blur relative overflow-hidden">
      {/* Top bar */}
      <div className="flex text-[11px] border-b border-neutral-800">
        <button className="flex-1 py-1.5 border-r border-neutral-800 bg-white/5 rounded-tl-md">
          Pipeline
        </button>
        <button className="flex-1 py-1.5 rounded-tr-md">Hot Leads</button>
      </div>

      {/* Pipeline header */}
      <div className="px-3 py-2 border-b border-neutral-800 bg-purple-900/20">
        <div className="flex justify-between text-[10px]">
          <span className="text-white/80">Total Value</span>
          <span className="text-purple-400 font-medium">$77,800</span>
        </div>
      </div>

      {/* Scrolling leads list */}
      <div
        className="h-40 relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)",
        }}
      >
        <motion.ul
          className="absolute left-0 top-0 w-full flex flex-col gap-2 p-2"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18, // slightly slower for leads
            repeat: Infinity,
          }}
        >
          {loopItems.map((lead, idx) => (
            <LeadRow key={idx} {...lead} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default LeadsPreviewCard; 