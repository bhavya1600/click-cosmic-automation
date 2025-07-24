// EmailJS Configuration
// These values are loaded from environment variables during build time
// For development, you can use the values directly below
// For production (GitHub Pages), these are loaded from GitHub Secrets

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ,
};

// Debug: Log config and environment status (detailed debugging)
console.log('=== EMAILJS DEBUG START ===');
console.log('Environment Info:', {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
});

console.log('Raw Environment Variables:', {
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

console.log('Environment Variables Status:', {
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'SET' : 'NOT SET',
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? 'SET' : 'NOT SET', 
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'SET' : 'NOT SET'
});

console.log('Final EmailJS Config:', {
  serviceId: emailConfig.serviceId,
  templateId: emailConfig.templateId,
  publicKey: emailConfig.publicKey ? `${emailConfig.publicKey.substring(0, 8)}...` : 'NOT SET'
});

console.log('Config Values Check:', {
  serviceIdType: typeof emailConfig.serviceId,
  templateIdType: typeof emailConfig.templateId,
  publicKeyType: typeof emailConfig.publicKey,
  serviceIdValue: emailConfig.serviceId || 'UNDEFINED',
  templateIdValue: emailConfig.templateId || 'UNDEFINED',
  publicKeyValue: emailConfig.publicKey ? 'HAS_VALUE' : 'UNDEFINED'
});
console.log('=== EMAILJS DEBUG END ===');
  
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