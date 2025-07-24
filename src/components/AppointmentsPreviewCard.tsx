// AppointmentsPreviewCard.tsx
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, MapPin, CheckCircle } from "lucide-react";

/** -----------------------------------------------------------------------
 *  1.  Data ----------------------------------------------------------------
 *  Appointment cards with different clients and appointment details
 *  --------------------------------------------------------------------- */
interface Appointment {
  name: string;
  title: string;
  email: string;
  company: string;
  time: string;
  type: string;
  verified: boolean;
}

const appointments: Appointment[] = [
  {
    name: "Sarah Wilson",
    title: "Marketing Director",
    email: "sarah@techcorp.com",
    company: "TechCorp Solutions",
    time: "10:00 AM",
    type: "Consultation",
    verified: true,
  },
  {
    name: "Michael Chen",
    title: "CEO",
    email: "m.chen@innovate.co",
    company: "Innovate Co",
    time: "2:30 PM", 
    type: "Strategy Meeting",
    verified: true,
  },
  {
    name: "Emily Rodriguez",
    title: "Operations Manager",
    email: "emily@globaltech.net",
    company: "Global Tech Inc",
    time: "11:15 AM",
    type: "Follow-up",
    verified: false,
  },
];

const statusStages = [
  { label: "Draft", progress: 33 },
  { label: "Scheduled", progress: 66 },
  { label: "Sent", progress: 100 },
];

/** -----------------------------------------------------------------------
 *  2.  Main component -----------------------------------------------------
 *  Appointment cards that cycle with synchronized status progression
 *  --------------------------------------------------------------------- */
const AppointmentsPreviewCard: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % appointments.length);
      setCurrentStage((prev) => (prev + 1) % statusStages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentAppointment = appointments[currentIndex];
  const currentStatus = statusStages[currentStage];

  return (
    <div className="w-full max-w-[320px] rounded-md border border-muted-foreground/30 bg-black/40 backdrop-blur relative overflow-hidden">
      {/* Top bar */}
      <div className="flex text-[11px] border-b border-neutral-800 px-3 py-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-purple-400" />
          <span className="text-white/90">Appointment Sending</span>
        </div>
      </div>

      {/* Tags */}
      <div className="px-3 py-2 border-b border-neutral-800">
        <div className="flex gap-1 flex-wrap">
          <span className="px-2 py-1 text-[9px] bg-neutral-800 text-white/80 rounded">
            Business
          </span>
          <span className="px-2 py-1 text-[9px] bg-neutral-800 text-white/80 rounded">
            Meetings
          </span>
          <span className="px-2 py-1 text-[9px] bg-neutral-800 text-white/80 rounded">
            Clients
          </span>
        </div>
      </div>

      {/* Appointment Card - Animated */}
      <div className="p-4 h-32 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-4"
          >
            {/* Profile Section */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-white truncate">
                    {currentAppointment.name}
                  </h3>
                  {currentAppointment.verified && (
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 truncate">
                  {currentAppointment.title}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-neutral-400">Email</span>
                <span className="text-white/80 truncate ml-2">
                  {currentAppointment.email}
                </span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-neutral-400">Company</span>
                <span className="text-white/80 truncate ml-2">
                  {currentAppointment.company}
                </span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-neutral-400">Time</span>
                <span className="text-purple-400 font-medium">
                  {currentAppointment.time}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="border-t border-neutral-800 px-3 py-2">
        <div className="flex justify-between text-[9px] text-neutral-400 mb-1">
          {statusStages.map((stage, index) => (
            <span
              key={stage.label}
              className={`transition-colors duration-500 ${
                index === currentStage ? "text-purple-400 font-medium" : ""
              }`}
            >
              {stage.label}
            </span>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            animate={{ width: `${currentStatus.progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPreviewCard; 