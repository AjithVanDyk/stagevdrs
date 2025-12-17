# Deployment Guide

**Van Dyk Recycling Solutions - Step-by-Step Deployment Instructions**

This guide provides beginner-friendly instructions for deploying the Van Dyk Recycling Solutions website to various hosting platforms.

---

## Table of Contents

1. [Vercel Deployment](#vercel-deployment) (Recommended)
2. [Netlify Deployment](#netlify-deployment)
3. [AWS Deployment](#aws-deployment)
4. [Traditional Hosting](#traditional-hosting)
5. [Environment Variables Setup](#environment-variables-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Vercel Deployment

**Recommended for this project** - Vercel is optimized for React + serverless functions.

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git installed locally

### Step 1: Prepare Your Repository

1. **Push code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify `package.json` scripts**:
   ```json
   {
     "scripts": {
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

### Step 2: Connect to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import your repository**:
   - Select your GitHub repository
   - Click "Import"

### Step 3: Configure Project

Vercel should auto-detect settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables

1. **In Vercel project settings**, go to "Environment Variables"
2. **Add each variable** for Production, Preview, and Development:

   ```
   EMAIL_SERVICE=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   FROM_EMAIL=noreply@vdrs.com
   REPLY_TO_EMAIL=info@vdrs.com
   CONTACT_EMAIL=info@vdrs.com
   QUOTE_EMAIL=info@vdrs.com
   TRAINING_EMAIL=training@vdrs.com
   TEST_CENTER_EMAIL=info@vdrs.com
   RECAPTCHA_SECRET_KEY=your_secret_key (optional)
   ```

3. **Click "Save"** for each variable

### Step 5: Deploy

1. **Click "Deploy"**
2. **Wait for build** (2-5 minutes)
3. **View deployment** - Vercel provides a URL like `https://your-project.vercel.app`

### Step 6: Custom Domain (Optional)

1. **Go to Project Settings → Domains**
2. **Add your domain**: `vdrs.com`
3. **Follow DNS instructions**:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel IP (provided)
4. **Wait for DNS propagation** (up to 48 hours)

### Automatic Deployments

- **Push to `main` branch** → Auto-deploys to production
- **Create Pull Request** → Auto-creates preview deployment
- **Merge PR** → Auto-deploys to production

### Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Netlify Deployment

### Prerequisites

- GitHub account
- Netlify account (free tier available)
- Git installed locally

### Step 1: Prepare Build

1. **Verify build command** in `package.json`:
   ```json
   {
     "scripts": {
       "build": "vite build"
     }
   }
   ```

2. **Create `netlify.toml`** in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     NODE_VERSION = "18"
   ```

### Step 2: Connect to Netlify

1. **Go to Netlify**: https://app.netlify.com
2. **Sign in** with GitHub
3. **Click "Add new site" → "Import an existing project"**
4. **Select your repository**

### Step 3: Configure Build Settings

Netlify should auto-detect, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Base directory**: (leave empty)

### Step 4: Set Environment Variables

1. **Go to Site Settings → Environment Variables**
2. **Add variables** (same as Vercel):
   ```
   EMAIL_SERVICE=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ...
   ```

### Step 5: Configure Serverless Functions

**Note**: Netlify Functions work differently than Vercel. You may need to:

1. **Move API functions** to `netlify/functions/` directory
2. **Update function format** for Netlify:
   ```typescript
   // netlify/functions/contact.ts
   import { Handler } from '@netlify/functions';
   
   export const handler: Handler = async (event, context) => {
     // Function logic
     return {
       statusCode: 200,
       body: JSON.stringify({ success: true })
     };
   };
   ```

3. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   netlify dev  # Test locally
   ```

### Step 6: Deploy

1. **Click "Deploy site"**
2. **Wait for build** (2-5 minutes)
3. **View deployment**: `https://your-site.netlify.app`

### Custom Domain

1. **Go to Domain Settings**
2. **Add custom domain**
3. **Follow DNS instructions**

---

## AWS Deployment

### Option 1: AWS Amplify (Easiest)

#### Step 1: Prepare Repository

1. **Push code to GitHub** (or AWS CodeCommit)

#### Step 2: Connect to Amplify

1. **Go to AWS Amplify Console**: https://console.aws.amazon.com/amplify
2. **Click "New app" → "Host web app"**
3. **Connect repository** (GitHub, CodeCommit, or Bitbucket)

#### Step 3: Configure Build

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Base directory**: (leave empty)

#### Step 4: Set Environment Variables

1. **Go to App Settings → Environment Variables**
2. **Add all required variables**

#### Step 5: Deploy

1. **Click "Save and deploy"**
2. **Wait for build** (5-10 minutes)
3. **View deployment**: `https://your-app.amplifyapp.com`

### Option 2: AWS S3 + CloudFront (Static Only)

**Note**: This option doesn't support serverless functions. You'll need to deploy API separately (Lambda, API Gateway).

#### Step 1: Build Project

```bash
npm run build
```

#### Step 2: Create S3 Bucket

1. **Go to S3 Console**: https://console.aws.amazon.com/s3
2. **Create bucket**:
   - Name: `vdrs-website` (or your choice)
   - Region: Choose closest to users
   - **Uncheck "Block all public access"** (for static hosting)
   - Enable "Static website hosting"

#### Step 3: Upload Files

1. **Upload `dist/` contents** to S3 bucket root
2. **Set permissions**: Make files public

#### Step 4: Configure CloudFront

1. **Go to CloudFront Console**: https://console.aws.amazon.com/cloudfront
2. **Create distribution**:
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Enable HTTPS
3. **Wait for deployment** (15-30 minutes)

#### Step 5: Deploy API (Lambda + API Gateway)

1. **Create Lambda functions** for each API endpoint
2. **Create API Gateway** REST API
3. **Connect Lambda functions** to API Gateway
4. **Update frontend** to use API Gateway URLs

**This is complex** - consider using AWS Amplify or Serverless Framework instead.

### Option 3: AWS EC2 (Traditional Server)

#### Step 1: Launch EC2 Instance

1. **Go to EC2 Console**: https://console.aws.amazon.com/ec2
2. **Launch instance**:
   - AMI: Ubuntu Server 22.04 LTS
   - Instance type: t2.micro (free tier) or t3.small
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

#### Step 2: Connect to Server

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Step 3: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### Step 4: Deploy Application

```bash
# Clone repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "vdrs-app" -- start
pm2 save
pm2 startup  # Follow instructions
```

#### Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/vdrs
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /home/ubuntu/your-repo/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/vdrs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: Set Up SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Traditional Hosting

### Shared Hosting (cPanel, etc.)

**Note**: Traditional hosting may not support serverless functions. You'll need to:
1. Deploy frontend to hosting
2. Deploy API to separate service (Vercel, Netlify, or separate server)

#### Step 1: Build Project

```bash
npm run build
```

#### Step 2: Upload Files

1. **Connect via FTP** (FileZilla, etc.)
2. **Upload `dist/` contents** to `public_html/` or `www/`

#### Step 3: Configure .htaccess (Apache)

Create `.htaccess` in `dist/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Step 4: Update API URLs

Update frontend to use external API URLs (Vercel, Netlify, etc.):

```typescript
// src/utils/formSubmission.ts
const API_ENDPOINTS = {
  contact: 'https://your-api.vercel.app/api/contact',
  quote: 'https://your-api.vercel.app/api/quote',
  // ...
};
```

---

## Environment Variables Setup

### Required Variables

All hosting platforms need these environment variables:

```bash
# Email Service
EMAIL_SERVICE=resend                    # or 'sendgrid' or 'smtp'
RESEND_API_KEY=re_xxxxxxxxxxxxx         # If using Resend
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx       # If using SendGrid

# Email Addresses
FROM_EMAIL=noreply@vdrs.com
REPLY_TO_EMAIL=info@vdrs.com
CONTACT_EMAIL=info@vdrs.com
QUOTE_EMAIL=info@vdrs.com
TRAINING_EMAIL=training@vdrs.com
TEST_CENTER_EMAIL=info@vdrs.com

# Security (Optional)
RECAPTCHA_SECRET_KEY=your_secret_key
```

### How to Set

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **AWS Amplify**: App Settings → Environment Variables
- **AWS EC2**: Create `.env` file (use PM2 to load it)
- **Traditional Hosting**: Set in hosting control panel or `.env` file

---

## Post-Deployment Checklist

### Functionality Tests

- [ ] **Homepage loads** correctly
- [ ] **Navigation works** (all links)
- [ ] **Forms submit** successfully:
  - [ ] Contact form
  - [ ] Quote form
  - [ ] Job application
  - [ ] Newsletter subscription
- [ ] **Emails received**:
  - [ ] Notification emails to business
  - [ ] Confirmation emails to users
- [ ] **Images load** correctly (check URL encoding)
- [ ] **Translations work** (language switching)
- [ ] **API endpoints respond** correctly

### Performance Tests

- [ ] **Page load time** < 3 seconds
- [ ] **Images optimized** and loading
- [ ] **Mobile responsive** (test on phone)
- [ ] **Browser compatibility** (Chrome, Firefox, Safari, Edge)

### Security Tests

- [ ] **HTTPS enabled** (SSL certificate)
- [ ] **Security headers** present (check with securityheaders.com)
- [ ] **Forms protected** by rate limiting
- [ ] **No console errors** in production

### SEO Tests

- [ ] **Meta tags** present on all pages
- [ ] **Sitemap accessible** at `/sitemap.xml`
- [ ] **Robots.txt** configured at `/robots.txt`
- [ ] **Structured data** (if implemented)

---

## Troubleshooting

### Build Fails

**Error**: `npm run build` fails

**Solutions**:
1. Check Node.js version (should be 18+)
2. Delete `node_modules` and `package-lock.json`, then `npm install`
3. Check for TypeScript errors: `npm run type-check`
4. Check for linting errors: `npm run lint`

### Images Not Loading

**Error**: Images return 404

**Solutions**:
1. Verify images are in `public/Images/` directory
2. Check image paths are URL-encoded (spaces → `%20`)
3. Verify case sensitivity (Linux servers are case-sensitive)
4. Check `vercel.json` rewrite rules exclude static files

### API Endpoints Not Working

**Error**: API returns 404 or 500

**Solutions**:
1. Verify environment variables are set correctly
2. Check function logs in hosting dashboard
3. Verify API routes are in correct directory (`/api/` for Vercel)
4. Test API endpoints directly with curl or Postman

### Email Not Sending

**Error**: Forms submit but no emails received

**Solutions**:
1. Verify email service API key is correct
2. Check email service dashboard for delivery status
3. Verify `FROM_EMAIL` is verified in email service
4. Check spam folder
5. Review function logs for email errors

### Rate Limiting Issues

**Error**: Getting 429 errors frequently

**Solutions**:
1. Check rate limit configuration (10 requests per 10 seconds)
2. Implement Redis/Upstash for distributed rate limiting
3. Consider increasing rate limit for production
4. Add rate limit headers to responses

### SSL Certificate Issues

**Error**: HTTPS not working

**Solutions**:
1. **Vercel/Netlify**: SSL is automatic, wait for DNS propagation
2. **AWS**: Use Certificate Manager (ACM) for CloudFront/ALB
3. **EC2**: Use Let's Encrypt (certbot)
4. **Traditional Hosting**: Use hosting provider's SSL tool

---

## Quick Reference

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

### Important Files

- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `vercel.json` - Vercel deployment config
- `netlify.toml` - Netlify deployment config (if using)
- `.env.example` - Environment variable template
- `dist/` - Build output directory

### Support

- **Developer**: Ajith Srikanth
- **Email**: asrikanth@vdrs.com
- **Repository**: https://github.com/AjithVanDyk/stagevdrs.git

---

**Last Updated**: January 2025  
**Deployment Guide Version**: 1.0.0
