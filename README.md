# Van Dyk Recycling Solutions - Website

**Official website for Van Dyk Recycling Solutions** - Showcasing cutting-edge recycling equipment, innovative solutions, and comprehensive services.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/AjithVanDyk/vdrsnewv1.git
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

## 🛠️ Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite 6** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations with reduced motion support
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Sentry** - Error monitoring and tracking

## 📁 Project Structure

```
staging_vdrs/
├── public/                 # Static assets
│   ├── Images/             # Image assets
│   ├── favicon.ico         # Site favicon
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # Site map
├── src/
│   ├── components/         # Reusable React components
│   ├── config/             # Configuration files
│   │   ├── images.ts       # Centralized image paths
│   │   └── translations.ts # Multi-language translations
│   ├── contexts/           # React contexts
│   │   └── LanguageContext.tsx
│   ├── data/               # Static data
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── vercel.json             # Vercel deployment configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🌐 Features

### Core Features
- ✅ **Multi-language Support** - English, French, and Spanish
- ✅ **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- ✅ **Modern UI/UX** - Glass morphism design with smooth animations
- ✅ **SEO Optimized** - Meta tags, structured data, and sitemap
- ✅ **Performance Optimized** - Code splitting, lazy loading, image optimization
- ✅ **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- ✅ **Error Handling** - Comprehensive error boundaries and monitoring

### Pages & Sections
- **Home** - Hero section, services overview, statistics
- **Equipment** - Equipment catalog with detailed pages
- **Solutions** - Recycling solutions portfolio
- **Services & Support** - Support services, PMI, training
- **News & Media** - Latest news, articles, and updates
- **About** - Company information and leadership
- **Careers** - Job openings and company culture
- **Contact** - Contact forms and information

## 🎨 Styling & Design

### Design System
- **Primary Color**: Van Dyk Orange (`#F97316`)
- **Secondary Color**: Van Dyk Blue (`#1E40AF`)
- **Typography**: System font stack with fallbacks
- **Spacing**: Tailwind's spacing scale
- **Breakpoints**: Mobile-first responsive design

### Animations
- All animations respect `prefers-reduced-motion` preference
- Smooth page transitions with Framer Motion
- Scroll-triggered animations
- Hover effects on interactive elements

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (see `env.example` for template):

```env
# Environment
NODE_ENV=production

# Build Configuration
VITE_APP_NAME=Van Dyk Recycling Solutions
VITE_APP_VERSION=2.0.0

# Analytics (optional)
# VITE_GA_TRACKING_ID=your_ga_id_here
# VITE_GTM_ID=your_gtm_id_here
```

### Image Management

All images are managed through `src/config/images.ts`:
- Centralized image paths
- Fallback images for error handling
- Organized by page/section

### Translations

Translations are managed in `src/config/translations.ts`:
- English (en) - Default
- French (fr)
- Spanish (es)

To add a new translation:
1. Add the key to all language objects
2. Use `useTranslation()` hook in components
3. Access translations with `t('key.path')`

## 🚢 Deployment

### Vercel Deployment

This project is configured for Vercel deployment:

1. **Connect Repository** to Vercel
2. **Build Settings**:
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Environment Variables**: Add any required env vars in Vercel dashboard
4. **Deploy**: Push to main branch for automatic deployment

### Build Configuration

The `vercel.json` file includes:
- SPA routing rewrites
- Cache headers for static assets
- Security headers
- Image optimization settings

### Pre-deployment Checklist

- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run lint` - No linting errors
- [ ] Run `npm run build` - Successful build
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check image paths and loading
- [ ] Test forms and interactions
- [ ] Verify translations in all languages
- [ ] Check mobile responsiveness
- [ ] Test accessibility features

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Navigation** - All links and routes working
- [ ] **Forms** - Quote and contact forms functional
- [ ] **Images** - All images load correctly
- [ ] **Translations** - Language switching works
- [ ] **Responsive** - Test on mobile, tablet, desktop
- [ ] **Browser Compatibility** - Chrome, Firefox, Safari, Edge
- [ ] **Performance** - Page load times acceptable
- [ ] **Accessibility** - Keyboard navigation, screen readers
- [ ] **Animations** - Smooth and respect reduced motion
- [ ] **Error Handling** - Error boundaries work correctly

## 📝 Code Quality

### TypeScript
- Strict type checking enabled
- All components properly typed
- No `any` types (where possible)

### ESLint
- React hooks rules
- TypeScript rules
- Best practices enforced

### Code Style
- Consistent formatting
- Component-based architecture
- Reusable utilities and hooks

## 🔒 Security

- **Security Headers** - Configured in `vercel.json`
- **Content Security Policy** - Implemented
- **XSS Protection** - Enabled
- **HTTPS Only** - Enforced in production
- **Input Validation** - Zod schemas for all forms
- **reCAPTCHA** - Form spam protection

## 📊 Performance

### Optimizations
- Code splitting by route
- Lazy loading for images
- Asset optimization
- CSS code splitting
- Tree shaking
- Minification

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
npm run type-check
# Fix any reported errors
```

**Images not loading**
- Check image paths in `src/config/images.ts`
- Verify images exist in `public/Images/`
- Check browser console for 404 errors

**Translations not working**
- Verify translation keys exist in `src/config/translations.ts`
- Check language context is properly set up
- Clear browser cache and localStorage

**Animations not respecting reduced motion**
- Verify `usePrefersReducedMotion` hook is used
- Check `getMotionConfig` utility is used for animations

## 📞 Support

### Development Team
- **Developer**: Ajith Srikanth
- **Organization**: Van Dyk Recycling Solutions

### Resources
- **Repository**: https://github.com/AjithVanDyk/vdrsnewv1
- **Documentation**: See inline code comments
- **Issues**: Report via GitHub Issues

## 📄 License

UNLICENSED - Proprietary code for Van Dyk Recycling Solutions

## 🔄 Version History

- **v2.0.0** - Current version
  - Multi-language support
  - Performance optimizations
  - Accessibility improvements
  - Vercel deployment ready

---

**Last Updated**: January 2025  
**Status**: Production Ready  
**Environment**: Staging → Production
