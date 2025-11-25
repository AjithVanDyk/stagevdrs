# Van Dyk Recycling Solutions - Website

**Official website for Van Dyk Recycling Solutions** - Showcasing cutting-edge recycling equipment, innovative solutions, and comprehensive services.

[![Deployment Status](https://img.shields.io/badge/deployment-vercel-blue)](https://stagevdrs.vercel.app)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple)](https://vitejs.dev/)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/AjithVanDyk/stagevdrs.git
cd staging_vdrs

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173`

## 📋 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server with hot reload |
| **Build** | `npm run build` | Build for production (outputs to `dist/`) |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Run ESLint for code quality checks |
| **Type Check** | `npm run type-check` | Run TypeScript compiler without emitting files |
| **Vercel Build** | `npm run build:vercel` | Type check + build (optimized for Vercel) |
| **Image Analysis** | `npm run analyze:images` | Analyze unused images |
| **Translation Audit** | `npm run audit:translations` | Audit translation coverage |

## 🛠️ Tech Stack

- **React 18.3** - Latest React with concurrent features
- **TypeScript 5.5** - Type-safe development
- **Vite 6.3** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.5** - Smooth animations with reduced motion support
- **React Router DOM 6.26** - Client-side routing
- **React Hook Form 7.52** - Form handling with validation
- **Zod 3.23** - Schema validation
- **Sentry 10.20** - Error monitoring and tracking
- **React Helmet Async 2.0** - SEO management
- **Vercel Analytics** - Web analytics and visitor tracking
- **Vercel Speed Insights** - Real-time performance metrics

## 📁 Project Structure

```
staging_vdrs/
├── public/                 # Static assets
│   ├── Images/             # Image assets (252+ files)
│   │   ├── Equipment/      # Equipment images
│   │   ├── Logos/          # Brand logos
│   │   └── ...             # Other image categories
│   ├── favicon.ico         # Site favicon
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # Site map
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   ├── Modal.tsx       # Modal component
│   │   ├── CookieConsentBanner.tsx
│   │   └── ...             # Other components
│   ├── config/             # Configuration files
│   │   ├── images.ts       # Centralized image paths (URL-encoded)
│   │   └── translations.ts # Multi-language translations (EN/FR/ES)
│   ├── contexts/           # React contexts
│   │   └── LanguageContext.tsx # Language management
│   ├── data/               # Static data
│   │   ├── equipmentData.ts
│   │   └── solutionsData.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useTranslation.ts
│   │   ├── usePrefersReducedMotion.ts
│   │   └── useScrollAnimation.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Equipment.tsx
│   │   ├── Solutions.tsx
│   │   └── ...             # 40+ page components
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
│       ├── animations.ts   # Animation configurations
│       ├── imageLoader.ts  # Image loading utilities
│       └── ...             # Other utilities
├── vercel.json             # Vercel deployment configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🌐 Features

### Core Features
- ✅ **Multi-language Support** - English, French, and Spanish with browser-based detection
- ✅ **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- ✅ **Modern UI/UX** - Glass morphism design with smooth animations
- ✅ **SEO Optimized** - Meta tags, structured data, and sitemap
- ✅ **Performance Optimized** - Code splitting, lazy loading, image optimization
- ✅ **Accessibility (WCAG 2 AA)** - Keyboard navigation, screen reader support, ARIA labels
- ✅ **Error Handling** - Comprehensive error boundaries and monitoring
- ✅ **Cookie Consent** - GDPR-compliant cookie management
- ✅ **Newsletter Popup** - Email subscription functionality
- ✅ **Vercel Analytics** - Real-time visitor tracking and page view analytics
- ✅ **Vercel Speed Insights** - Performance metrics and Core Web Vitals tracking

### Pages & Sections
- **Home** - Hero section, services overview, statistics, training info
- **Equipment** - Equipment catalog with detailed modal pages (12+ equipment types)
- **Solutions** - Recycling solutions portfolio (15+ solution types)
- **Services & Support** - Support services, PMI, training, test center
- **News & Media** - Latest news, articles, videos, expert tips
- **About** - Company information, leadership team, history
- **Careers** - Job openings, company culture, benefits
- **Contact** - Contact forms, location, business hours
- **Privacy Policy** - Comprehensive privacy policy
- **Cookie Policy** - Detailed cookie policy

## 🎨 Styling & Design

### Design System
- **Primary Color**: Van Dyk Blue (`#154B7F`)
- **Secondary Color**: Van Dyk Orange (`#E66538`)
- **Typography**: Franklin Gothic & Helvetica
- **Spacing**: Tailwind's spacing scale
- **Breakpoints**: Mobile-first responsive design

### Animations
- All animations respect `prefers-reduced-motion` preference
- Smooth page transitions with Framer Motion
- Scroll-triggered animations using Intersection Observer
- Hover effects on interactive elements
- Modal and dropdown animations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (see `env.example` for template):

```env
# Environment
NODE_ENV=production

# Build Configuration
VITE_APP_NAME=Van Dyk Recycling Solutions
VITE_APP_VERSION=1.0.0
```

### Image Management

All images are managed through `src/config/images.ts`:
- Centralized image paths with URL encoding for spaces
- Fallback images for error handling
- Organized by page/section
- All paths URL-encoded for Vercel compatibility (case-sensitive Linux)

**Important**: All image paths with spaces are URL-encoded (e.g., `Product image_baler.jpg` → `Product%20image_baler.jpg`) to work correctly on Vercel's case-sensitive file system.

### Translations

Translations are managed in `src/config/translations.ts`:
- English (en) - Default
- French (fr)
- Spanish (es)

**Language Detection**:
- Checks `localStorage` for saved preference
- Falls back to browser language (`navigator.language`)
- Uses timezone detection for French/Spanish regions
- Defaults to English if detection fails

To add a new translation:
1. Add the key to all language objects in `src/config/translations.ts`
2. Use `useTranslation()` hook in components
3. Access translations with `t('key.path')`

## 🚢 Deployment

### Automatic Vercel Deployment

This project uses **GitHub Actions** for automatic deployment to Vercel with status checks.

#### Setup Instructions

1. **Vercel Token** (Required):
   - Go to [Vercel Settings > Tokens](https://vercel.com/account/tokens)
   - Create a new token
   - Add it to GitHub Secrets: `Settings > Secrets and variables > Actions`
   - Secret name: `VERCEL_TOKEN`

2. **Vercel Project**:
   - Connect your GitHub repository to Vercel
   - Project name: `stagevdrs`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Automatic Deployment**:
   - **Push to `main`**: Automatically deploys to production
   - **Pull Requests**: Automatically creates preview deployments
   - **Status Checks**: All checks must pass before deployment

#### GitHub Actions Workflows

The project includes two workflows:

1. **`.github/workflows/ci.yml`** - Code quality checks:
   - ESLint validation
   - TypeScript type checking
   - Build verification
   - Image path validation
   - Console.log detection

2. **`.github/workflows/vercel-deploy.yml`** - Vercel deployment:
   - Lint check with Vercel status update
   - Type check with Vercel status update
   - Build check with Vercel status update
   - Preview deployment for PRs
   - Production deployment for main branch

#### Status Checks

All workflows send status updates to Vercel:
- ✅ `Vercel - stagevdrs: lint`
- ✅ `Vercel - stagevdrs: type-check`
- ✅ `Vercel - stagevdrs: build`
- ✅ `Vercel - stagevdrs: quality-checks`
- ✅ `Vercel - stagevdrs: deploy-preview` (PRs only)
- ✅ `Vercel - stagevdrs: deploy-production` (main only)

#### Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Build Configuration

The `vercel.json` file includes:
- SPA routing rewrites (excludes static files)
- Cache headers for static assets (Images, CSS, JS)
- Security headers (XSS, Frame Options, etc.)
- Proper handling of file extensions

### GitHub Actions Integration

The project uses GitHub Actions for:
- **Automatic CI/CD**: Runs on every push and PR
- **Quality Checks**: Lint, type-check, and build verification
- **Vercel Integration**: Status checks sent to Vercel dashboard
- **Preview Deployments**: Automatic preview URLs for PRs
- **Production Deployments**: Automatic deployment on merge to main

**Required GitHub Secrets**:
- `VERCEL_TOKEN` - Vercel authentication token (get from [Vercel Settings](https://vercel.com/account/tokens))

### Image Deployment

**Critical**: All images in `public/Images/` are tracked in git and deployed to Vercel. The `.gitignore` has been updated to ensure images are included.

### Pre-deployment Checklist

- [x] Run `npm run type-check` - No TypeScript errors
- [x] Run `npm run lint` - No linting errors
- [x] Run `npm run build` - Successful build
- [x] All images URL-encoded for spaces
- [x] All translations complete (EN/FR/ES)
- [x] Accessibility fixes applied (WCAG 2 AA)
- [x] All modals have proper ARIA labels
- [x] Main landmark added to document structure
- [x] Color contrast meets WCAG standards

## 🧪 Testing

### Manual Testing Checklist

- [x] **Navigation** - All links and routes working
- [x] **Forms** - Quote and contact forms functional
- [x] **Images** - All images load correctly (URL-encoded paths)
- [x] **Translations** - Language switching works (3 languages)
- [x] **Responsive** - Test on mobile, tablet, desktop
- [x] **Browser Compatibility** - Chrome, Firefox, Safari, Edge
- [x] **Performance** - Page load times acceptable
- [x] **Accessibility** - Keyboard navigation, screen readers, ARIA labels
- [x] **Animations** - Smooth and respect reduced motion
- [x] **Error Handling** - Error boundaries work correctly
- [x] **Cookie Consent** - Banner appears and functions correctly
- [x] **Newsletter Popup** - Subscription functionality works

## 📝 Code Quality

### TypeScript
- Strict type checking enabled
- All components properly typed
- No `any` types (where possible)
- Type-safe translations and configurations

### ESLint
- React hooks rules
- TypeScript rules
- Best practices enforced

### Code Style
- Consistent formatting
- Component-based architecture
- Reusable utilities and hooks
- Centralized configurations

## 🔒 Security

- **Security Headers** - Configured in `vercel.json`
- **Content Security Policy** - Implemented
- **XSS Protection** - Enabled
- **HTTPS Only** - Enforced in production
- **Input Validation** - Zod schemas for all forms
- **Cookie Consent** - GDPR-compliant cookie management

## 📊 Performance

### Optimizations
- Code splitting by route and vendor
- Lazy loading for images and components
- Asset optimization and minification
- CSS code splitting
- Tree shaking
- Image path optimization for Vercel

### Core Web Vitals
- **LCP** (Largest Contentful Paint): Optimized with eager loading for hero images
- **FID** (First Input Delay): < 100ms target
- **CLS** (Cumulative Layout Shift): < 0.1 target

## ♿ Accessibility

### WCAG 2 AA Compliance
- ✅ Color contrast ratios meet minimum thresholds
- ✅ Keyboard navigation support
- ✅ Screen reader announcements
- ✅ ARIA labels on all interactive elements
- ✅ Modal dialogs have proper titles and descriptions
- ✅ Main landmark in document structure
- ✅ Reduced motion support
- ✅ Focus management

### Accessibility Features
- Screen reader announcements for page changes
- Keyboard navigation for all interactive elements
- Focus traps in modals
- Skip to main content links
- Alt text for all images
- Semantic HTML structure

## 🐛 Troubleshooting

### Common Issues

**Images not loading on Vercel**
- ✅ Fixed: All image paths are URL-encoded for spaces
- ✅ Fixed: Images folder is tracked in git
- ✅ Fixed: Vercel rewrite rules exclude static files
- Check browser console for 404 errors
- Verify image exists in `public/Images/` with exact case

**Build fails with TypeScript errors**
```bash
npm run type-check
# Fix any reported errors
```

**Translations not working**
- Verify translation keys exist in `src/config/translations.ts`
- Check language context is properly set up
- Clear browser cache and localStorage

**Animations not respecting reduced motion**
- Verify `usePrefersReducedMotion` hook is used
- Check `getMotionConfig` utility is used for animations

**Accessibility warnings**
- ✅ Fixed: All modals have proper ARIA labels
- ✅ Fixed: Color contrast issues resolved
- ✅ Fixed: Main landmark added

## 📞 Support

### Development Team
- **Developer**: Ajith Srikanth
- **Organization**: Van Dyk Recycling Solutions

### Resources
- **Repository**: https://github.com/AjithVanDyk/stagevdrs.git
- **Live Site**: https://stagevdrs.vercel.app
- **Documentation**: See inline code comments
- **Issues**: Report via GitHub Issues

## 📄 License

UNLICENSED - Proprietary code for Van Dyk Recycling Solutions

## 🔄 Recent Updates

### v1.0.0 (Current)
- ✅ Complete multi-language support (EN/FR/ES)
- ✅ Browser-based language detection
- ✅ All images URL-encoded for Vercel compatibility
- ✅ Comprehensive accessibility fixes (WCAG 2 AA)
- ✅ Cookie consent banner with GDPR compliance
- ✅ Newsletter popup functionality
- ✅ All modals have proper ARIA labels
- ✅ Color contrast improvements
- ✅ Main landmark added to document
- ✅ Performance optimizations
- ✅ Error boundaries and monitoring
- ✅ Vercel deployment ready

### Key Fixes
- **Images**: All paths URL-encoded, Images folder added to git
- **Accessibility**: WCAG 2 AA compliance, ARIA labels, color contrast
- **Translations**: Complete coverage for all pages
- **Deployment**: Vercel configuration optimized

---

**Last Updated**: January 2025  
**Status**: Production Ready ✅  
**Environment**: Staging → Production  
**Deployment**: Vercel (https://stagevdrs.vercel.app)
