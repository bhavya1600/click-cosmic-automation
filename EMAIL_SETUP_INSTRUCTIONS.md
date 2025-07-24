# Email Setup Instructions for Contact Form

Your contact form is now ready to send emails! Follow these steps to set up EmailJS:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (you'll need this later)

## 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Content:**
```
Hello Bhavya,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}

---
This message was sent from your BehindTheClick website contact form.
```

4. Save the template and note your **Template ID**

## 4. Get Public Key
1. Go to "Account" > "General" in EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## 5. Update Configuration
Edit the file `src/config/email.ts` and replace:
- `YOUR_SERVICE_ID` with your actual Service ID
- `YOUR_TEMPLATE_ID` with your actual Template ID  
- `YOUR_PUBLIC_KEY` with your actual Public Key

Example:
```typescript
export const emailConfig = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789', 
  publicKey: 'user_def456',
};
```

## 6. Test the Form
1. Deploy your website to GitHub Pages
2. Fill out the contact form on your live site
3. Check that you receive the email at bhavyac@behindtheclick.io

## Troubleshooting
- Make sure all IDs are correct and match your EmailJS dashboard
- Check browser console for any error messages
- Verify your email service is properly connected in EmailJS
- Test from your live site (not localhost) as EmailJS has CORS restrictions

## Security Note
The EmailJS configuration is client-side visible, which is normal for static sites. EmailJS handles rate limiting and spam protection on their end.

---

Your contact form will now send emails directly to **bhavyac@behindtheclick.io** whenever someone submits the form! 📧 