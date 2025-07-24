# 🚀 GitHub Pages Deployment Guide

Your BehindTheClick website is now ready for GitHub Pages deployment! Follow these steps:

## 📋 Prerequisites

1. **GitHub Repository**: Make sure your code is in a GitHub repository
2. **EmailJS Account**: You should have already set up EmailJS with your credentials

## 🔧 Setup Steps

### 1. Repository Settings
1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 2. Add GitHub Secrets (IMPORTANT!)
To keep your EmailJS credentials secure, add them as GitHub Secrets:

1. In your repository, go to **Settings** → **Secrets and Variables** → **Actions**
2. Click **New repository secret** and add these three secrets:

   ```
   Name: VITE_EMAILJS_SERVICE_ID
   Value: behindtheclick_website
   
   Name: VITE_EMAILJS_TEMPLATE_ID  
   Value: template_1lcuu9p
   
   Name: VITE_EMAILJS_PUBLIC_KEY
   Value: FEPDnTxj6luh0oozA
   ```

### 3. Update Repository Name (if needed)
If your repository is NOT named exactly as your desired domain, you may need to update the base path:

- **For custom domain**: Keep vite.config.ts as is
- **For project pages** (like `username.github.io/repository-name`): 
  - Update `vite.config.ts` and change `base: './'` to `base: '/repository-name/`

### 4. Commit and Push
1. Make sure all your changes are committed
2. Push to the `main` branch:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

### 5. Monitor Deployment
1. Go to **Actions** tab in your GitHub repository
2. Watch the deployment workflow run
3. Once complete, your site will be available at:
   - **Custom domain**: `https://your-domain.com`
   - **GitHub Pages**: `https://username.github.io/repository-name`

## 🔒 Security Notes

### EmailJS Credentials
- ✅ **Safe**: Your EmailJS credentials are now stored as GitHub Secrets
- ✅ **Development**: Still works locally with fallback values in `email.ts`
- ✅ **Production**: Uses secure environment variables during build

### Why This Approach?
- EmailJS is designed for client-side use
- The "public key" is meant to be public
- Real security is handled by EmailJS dashboard settings:
  - Domain restrictions
  - Rate limiting  
  - Template validation

## 🛠️ Local Development

For local development, you can either:
1. **Use existing values**: The fallback values in `email.ts` will work
2. **Use environment variables**: Create `.env.local` file:
   ```
   VITE_EMAILJS_SERVICE_ID=behindtheclick_website
   VITE_EMAILJS_TEMPLATE_ID=template_1lcuu9p
   VITE_EMAILJS_PUBLIC_KEY=FEPDnTxj6luh0oozA
   ```

## 🐛 Troubleshooting

### Deployment Fails
- Check **Actions** tab for error details
- Ensure all GitHub Secrets are set correctly
- Verify repository name matches base path in `vite.config.ts`

### Contact Form Not Working
- Check browser console for errors
- Verify EmailJS credentials in GitHub Secrets
- Test EmailJS service in their dashboard
- Ensure domain is whitelisted in EmailJS settings

### 404 Errors on Refresh
This is normal for single-page applications on GitHub Pages. The routing is handled client-side.

## 🎉 Success!

Once deployed, your website will:
- ✨ Load fast with optimized builds
- 📧 Send emails securely via EmailJS
- 🔒 Keep credentials safe in GitHub Secrets
- 📱 Work perfectly on all devices
- 🌐 Be accessible worldwide via GitHub Pages

## 🔄 Future Updates

To update your website:
1. Make changes to your code
2. Commit and push to `main` branch
3. GitHub Actions will automatically redeploy

---

**Need help?** Check the Actions tab for deployment logs or contact support.

Your BehindTheClick website is ready to go live! 🚀 