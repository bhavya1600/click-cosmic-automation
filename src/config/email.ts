// EmailJS Configuration
// These values are loaded from environment variables during build time
// For development, you can use the values directly below
// For production (GitHub Pages), these are loaded from GitHub Secrets

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'behindtheclick_website',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1lcuu9p',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'FEPDnTxj6luh0oozA',
};

// Debug: Log config and environment status
console.log('Environment Info:', {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
});

console.log('Environment Variables Check:', {
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'SET' : 'NOT SET',
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? 'SET' : 'NOT SET', 
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'SET' : 'NOT SET'
});

console.log('Final EmailJS Config:', {
  serviceId: emailConfig.serviceId,
  templateId: emailConfig.templateId,
  publicKey: emailConfig.publicKey ? `${emailConfig.publicKey.substring(0, 8)}...` : 'NOT SET'
});
  
// Example template for EmailJS:
/*
Subject: New Contact Form Message from {{from_name}}

Hello Bhavya,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}

---
This message was sent from your BehindTheClick website contact form.
*/ 