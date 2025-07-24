// EmailJS Configuration
// These values are loaded from environment variables during build time
// For development, you can use the values directly below
// For production (GitHub Pages), these are loaded from GitHub Secrets

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'FEPDnTxj6luh0oozA',
};

// Debug: Log config in development (values will be undefined in production if secrets not set)
if (import.meta.env.DEV) {
  console.log('EmailJS Config:', {
    serviceId: emailConfig.serviceId,
    templateId: emailConfig.templateId,
    publicKey: emailConfig.publicKey ? 'SET' : 'NOT SET'
  });
}
  
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