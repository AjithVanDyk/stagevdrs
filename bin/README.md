# 🏭 Van Dyk Recycling Solutions - Staging Website

**Environment**: Staging  
**Version**: 5.0  
**Developer**: Ajith Srikanth  
**Repository**: https://github.com/AjithVanDyk/stagingvdrs.git

---

## 📋 **Project Overview**

This is the **staging environment** for the Van Dyk Recycling Solutions website. This repository contains the latest development version of the website for testing and review before production deployment.

### **🎯 Purpose**
- **Testing Environment** - Test new features and changes before production
- **Staging Deployment** - Preview changes in a production-like environment
- **Quality Assurance** - Review and validate functionality before release
- **Client Review** - Share preview links for stakeholder approval

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git for version control

### **Installation**

```bash
# Clone the staging repository
git clone https://github.com/AjithVanDyk/stagingvdrs.git
cd stagingvdrs

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server on localhost:5173 |
| **Build** | `npm run build` | Build for production |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Run ESLint for code quality |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |

---

## 🛠️ **Tech Stack**

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router DOM** - Client-side routing

---

## 📁 **Key Features**

- ✅ **Responsive Design** - Optimized for all devices
- ✅ **Modern UI/UX** - Glass morphism design with animations
- ✅ **Interactive Navigation** - Smart dropdowns with search
- ✅ **Equipment Showcase** - Detailed equipment cards
- ✅ **Solutions Portfolio** - Comprehensive recycling solutions
- ✅ **News & Media** - Latest company news and updates
- ✅ **Contact Forms** - Quote request and contact forms
- ✅ **Performance Optimized** - Core Web Vitals compliant

---

## 🔄 **Staging Workflow**

### **1. Making Changes**
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make your changes
# Test locally
npm run dev

# Build and verify
npm run build
npm run preview
```

### **2. Committing Changes**
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature"

# Push to staging
git push origin main
```

### **3. Deployment**
- Changes pushed to `main` branch automatically deploy to staging
- Staging URL will be available after deployment
- Review changes in staging environment before production

---

## 🧪 **Testing Checklist**

Before pushing to staging, verify:

- [ ] **Responsive Design** - Test on mobile, tablet, desktop
- [ ] **Browser Compatibility** - Chrome, Firefox, Safari, Edge
- [ ] **Navigation** - All links and routes working
- [ ] **Forms** - Quote and contact forms functional
- [ ] **Performance** - Page load times acceptable
- [ ] **No Console Errors** - Check browser console
- [ ] **Type Checking** - `npm run type-check` passes
- [ ] **Linting** - `npm run lint` passes

---

## 📊 **Recent Updates**

### **News & Media Page**
- ✅ Removed newsletter popup feature
- ✅ Fixed article rendering issues
- ✅ Improved filtering and search functionality
- ✅ Enhanced article display with grid/list views

---

## 🔒 **Security & Best Practices**

- ✅ **Type Safety** - TypeScript for all components
- ✅ **Code Quality** - ESLint for code standards
- ✅ **Error Handling** - Error boundaries implemented
- ✅ **Form Validation** - Input validation and sanitization
- ✅ **Security Headers** - CSP and security headers configured

---

## 📞 **Support**

### **Technical Support**
- **Developer**: Ajith Srikanth
- **Email**: ajithsrikanth.f@northeastern.edu
- **Role**: Intern
- **Organization**: Van Dyk Recycling Solutions

### **Repository**
- **Staging Repo**: https://github.com/AjithVanDyk/stagingvdrs.git
- **Main Repo**: https://github.com/AjithVanDyk/vdrsnewv1.git

---

## 📄 **Important Notes**

⚠️ **This is a staging environment** - Do not use production data or credentials

⚠️ **Testing Only** - This environment is for testing and review purposes

⚠️ **Not for Production** - Changes here are not live on the main website

---

## 🔄 **Deployment Status**

- **Environment**: Staging
- **Auto-Deploy**: Enabled on push to main branch
- **Build Tool**: Vite
- **Framework**: React 18 + TypeScript

---

**Last Updated**: January 2025  
**Version**: 5.0  
**Status**: Active Development
