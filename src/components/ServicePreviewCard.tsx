// ServicePreviewCard.tsx
import { FC, ReactElement, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, ListChecks, Bell, Clock, Check, X, Circle } from "lucide-react";

/** -----------------------------------------------------------------------
 *  1.  Data ----------------------------------------------------------------
 *  You can pull this in from props or context; hard‑coded here for clarity.
 *  Each task carries a left‑icon, a title, a subtitle, and a right‑icon.
 *  Replace the SVGs with your own (Heroicons, Lucide, etc.).
 *  --------------------------------------------------------------------- */
interface Task {
  leftIcon: ReactElement;
  title: string;
  subtitle: string;
  rightIcon: ReactElement;
}

const tasks: Task[] = [
  {
    leftIcon: <DollarSign className="w-full h-full text-white/90" />,
    title: "Payroll management",
    subtitle: "Due on 2 Jul",
    rightIcon: <Clock className="w-full h-full text-purple-400" />,
  },
  {
    leftIcon: <Users className="w-full h-full text-white/90" />,
    title: "Employee tracking",
    subtitle: "2 days ago",
    rightIcon: <Check className="w-full h-full text-purple-400" />,
  },
  {
    leftIcon: <ListChecks className="w-full h-full text-white/90" />,
    title: "Lead list",
    subtitle: "70 % prepared",
    rightIcon: <Circle className="w-full h-full text-purple-400 opacity-60" style={{strokeDasharray: "2,2"}} />,
  },
  {
    leftIcon: <Bell className="w-full h-full text-white/90" />,
    title: "Payment reminder",
    subtitle: "Sent to clients",
    rightIcon: <Check className="w-full h-full text-purple-400" />,
  },
];

/** -----------------------------------------------------------------------
 *  2.  Helper component ---------------------------------------------------
 *  One visual row in the list.
 *  --------------------------------------------------------------------- */
const TaskRow: FC<Task> = ({ leftIcon, title, subtitle, rightIcon }) => (
  <li className="w-full flex shrink-0 rounded border border-neutral-800 bg-white/5 px-3 py-2 gap-3">
    {/* left icon */}
    <div className="h-7 w-7 rounded bg-white/5 grid place-items-center">{leftIcon}</div>

    {/* text */}
    <div className="flex-grow">
      <p className="text-xs leading-none text-white">{title}</p>
      <p className="text-[10px] leading-none text-neutral-400">{subtitle}</p>
    </div>

    {/* right icon */}
    <div className="h-7 w-7 rounded border border-neutral-800 bg-white/5 grid place-items-center">
      {rightIcon}
    </div>
  </li>
);

/** -----------------------------------------------------------------------
 *  3.  Main card ----------------------------------------------------------
 *  **Infinite vertical scroll** achieved by doubling the list and letting
 *  Framer Motion translateY from 0 → ‑100 %.
 *  --------------------------------------------------------------------- */
const ServicePreviewCard: FC = () => {
  // Duplicate items so the list can scroll seamlessly
  const loopItems = useMemo(() => [...tasks, ...tasks], []);

  return (
    <div className="w-full max-w-[320px] rounded-md border border-muted-foreground/30 bg-black/40 backdrop-blur relative overflow-hidden">
      {/* Top bar */}
      <div className="flex text-[11px] border-b border-neutral-800">
        <button className="flex-1 py-1.5 border-r border-neutral-800 bg-white/5 rounded-tl-md">
          All Tasks
        </button>
        <button className="flex-1 py-1.5 rounded-tr-md">Waiting for approval</button>
      </div>

      {/* Scrolling list */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          // 12.5 % fade top & bottom, same as Framer
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)",
        }}
      >
        <motion.ul
          className="absolute left-0 top-0 w-full flex flex-col gap-2"
          animate={{ y: ["0%", "-50%"] }} // ‑50 %= list height / 2
          transition={{
            ease: "linear",
            duration: 16, // adjust speed here
            repeat: Infinity,
          }}
        >
          {loopItems.map((item, idx) => (
            /* key can repeat because list repeats, Framer handles it */
            <TaskRow key={idx} {...item} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default ServicePreviewCard;
