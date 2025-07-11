export const siteContent = {
  company: {
    name: "BehindTheClick",
    tagline: "The Magic Happens",
    taglineHighlight: "Behind The Click",
    description: "We bring AI automation to your fingertips and streamline tasks"
  },
  
  hero: {
    title: "The Magic Happens",
    titleHighlight: "Behind The Click",
    subtitle: "We bring AI automation to your fingertips and streamline tasks",
    buttons: {
      primary: "Get in Touch",
      secondary: "View Services"
    }
  },
  
  services: {
    title: "AI Solutions That Take Your Business to the Next Level",
    subtitle: "We design, develop, and implement automation tools that help you work smarter, not harder.",
    items: [
      {
        title: "Effortless Workflow Automation",
        description: "Streamline your business processes with intelligent automation that handles repetitive tasks, freeing your team to focus on what matters most.",
        image: "/placeholder-workflow.jpg",
        ctas: ["See Automations", "How it Works"]
      },
      {
        title: "Leads—Generated, Tracked, Nurtured",
        description: "Transform your lead generation with AI-powered systems that identify, capture, and nurture prospects automatically.",
        image: "/placeholder-leads.jpg",
        ctas: ["Lead Automation", "View Results"]
      },
      {
        title: "Appointments, Handled Seamlessly",
        description: "Never miss a booking again with smart scheduling systems that manage calendars, send reminders, and handle rescheduling.",
        image: "/placeholder-appointments.jpg",
        ctas: ["Schedule Demo", "See Features"]
      },
      {
        title: "Social Media, On Autopilot",
        description: "Maintain consistent social presence with AI that creates, schedules, and optimizes content across all your platforms.",
        image: "/placeholder-social.jpg",
        ctas: ["Social Automation", "Content Strategy"]
      },
      {
        title: "Smart Websites & Custom Automation",
        description: "Build intelligent websites that adapt, learn, and automate customer interactions for maximum conversion and engagement.",
        image: "/placeholder-websites.jpg",
        ctas: ["Custom Solutions", "Portfolio"]
      }
    ]
  },
  
  benefits: {
    title: "The Key Benefits of BehindTheClick Automation",
    items: [
      {
        title: "Increased Productivity",
        description: "Automate routine tasks and watch your team's productivity soar by up to 300%.",
        icon: "Zap"
      },
      {
        title: "Better Customer Experience",
        description: "Provide 24/7 support and instant responses that delight your customers.",
        icon: "Heart"
      },
      {
        title: "24/7 Availability",
        description: "Your business never sleeps with automation that works around the clock.",
        icon: "Clock"
      },
      {
        title: "Cost Reduction",
        description: "Cut operational costs by up to 60% while improving service quality.",
        icon: "TrendingDown"
      },
      {
        title: "Data-Driven Insights",
        description: "Make smarter decisions with AI-powered analytics and reporting.",
        icon: "BarChart3"
      },
      {
        title: "Scalability & Growth",
        description: "Scale your operations effortlessly without proportional increases in costs.",
        icon: "TrendingUp"
      }
    ]
  },
  
  pricing: {
    title: "The Best AI Automation, at the Right Price",
    plans: [
      {
        name: "Starter",
        price: "$497",
        period: "/month",
        description: "Perfect for small businesses ready to automate their first processes",
        features: [
          "Basic workflow automation",
          "Email integration",
          "Simple chatbot setup",
          "Basic analytics",
          "Email support"
        ],
        cta: "Choose Starter",
        popular: false
      },
      {
        name: "Professional",
        price: "$1,497",
        period: "/month",
        description: "Advanced automation for growing businesses that need comprehensive solutions",
        features: [
          "Advanced workflow automation",
          "Multi-platform integration",
          "AI-powered lead nurturing",
          "Custom chatbots",
          "Advanced analytics & reporting",
          "Priority support",
          "Monthly strategy calls"
        ],
        cta: "Choose Professional",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "Tailored automation solutions for large organizations with complex needs",
        features: [
          "Fully custom automation",
          "Unlimited integrations",
          "Dedicated AI specialists",
          "24/7 priority support",
          "Advanced security features",
          "Custom training & onboarding",
          "White-label solutions"
        ],
        cta: "Schedule a Call",
        popular: false
      }
    ]
  },
  
  footer: {
    links: {
      company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" }
      ],
      social: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Facebook", href: "#" }
      ]
    },
    copyright: `© ${new Date().getFullYear()} BehindTheClick. All rights reserved.`
  }
};