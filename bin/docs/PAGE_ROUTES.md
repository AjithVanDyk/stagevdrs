# Page Routes Documentation

**Van Dyk Recycling Solutions - Complete Page Routes Reference**

This document provides a comprehensive overview of all page routes in the application, their purposes, navigation structure, and language support.

---

## Table of Contents

1. [Route Structure](#route-structure)
2. [Main Navigation Pages](#main-navigation-pages)
3. [Equipment Pages](#equipment-pages)
4. [Solution Pages](#solution-pages)
5. [Support & Services Pages](#support--services-pages)
6. [News & Media Pages](#news--media-pages)
7. [Company Pages](#company-pages)
8. [Legal & Compliance Pages](#legal--compliance-pages)
9. [Language Support](#language-support)
10. [Navigation Structure](#navigation-structure)

---

## Route Structure

### Base Routes

All routes support language prefixes:
- `/` - English (default)
- `/en/` - English (explicit)
- `/fr/` - French
- `/es/` - Spanish

### Route Pattern

```
/{lang}/{page-path}
```

Example:
- `/en/equipment` - Equipment page in English
- `/fr/equipment` - Equipment page in French
- `/es/equipment` - Equipment page in Spanish

---

## Main Navigation Pages

### Home

**Route**: `/` or `/en/`, `/fr/`, `/es/`  
**Component**: `Home.tsx`  
**Purpose**: Main landing page with hero section, services overview, statistics, and training information  
**Navigation**: Primary navigation (logo click)  
**Features**:
- Hero section with call-to-action
- Services overview
- Company statistics
- Training information
- Equipment highlights
- Solution highlights

---

### Equipment

**Route**: `/equipment`  
**Component**: `Equipment.tsx`  
**Purpose**: Complete equipment catalog overview with all available equipment types  
**Navigation**: Main navigation → Equipment  
**Features**:
- Equipment category grid
- Equipment cards with images
- Filter/search functionality
- Links to individual equipment pages

---

### Solutions

**Route**: `/solutions`  
**Component**: `Solutions.tsx`  
**Purpose**: Complete solutions portfolio with all recycling solution types  
**Navigation**: Main navigation → Solutions  
**Features**:
- Solution category grid
- Solution cards with descriptions
- Filter/search functionality
- Links to individual solution pages

---

### Services & Support

**Route**: `/support`  
**Component**: `ServicesSupport.tsx`  
**Purpose**: Comprehensive support services information  
**Navigation**: Main navigation → Services  
**Legacy Route**: `/services` (redirects to `/support`)  
**Features**:
- Support services overview
- PMI (Preventive Maintenance Inspection)
- Training services
- Test center information
- Remote troubleshooting
- Parts in stock

---

### News & Media

**Route**: `/news-media`  
**Component**: `NewsMedia.tsx`  
**Purpose**: Latest news, articles, and media content  
**Navigation**: Main navigation → News & Media  
**Legacy Route**: `/our-customers-in-the-news` (redirects to `/news-media`)  
**Features**:
- News article listings
- Article cards with images
- Filter by category
- Links to individual articles

---

### Contact

**Route**: `/contact`  
**Component**: `ContactUs.tsx`  
**Purpose**: Contact form and company contact information  
**Navigation**: Main navigation → Contact  
**Features**:
- Contact form (name, company, email, phone, message)
- Company address and phone
- Business hours
- Map/location information
- reCAPTCHA protection

---

### About

**Route**: `/about`  
**Component**: `About.tsx`  
**Purpose**: Company information, history, and leadership team  
**Navigation**: Main navigation → About Us  
**Features**:
- Company history
- Leadership team
- Company values
- Mission statement

---

### Careers

**Route**: `/careers`  
**Component**: `Careers.tsx`  
**Purpose**: Job openings, company culture, and benefits  
**Navigation**: Main navigation → About Us → Careers  
**Features**:
- Job listings
- Company culture information
- Benefits overview
- Application process

---

## Equipment Pages

All equipment pages follow the pattern: `/equipment/{equipment-slug}`

### Bollegraaf Recycling Solutions

**Route**: `/equipment/bollegraaf`  
**Component**: `BollegraafPage.tsx`  
**Purpose**: High production single ram balers  
**Features**: Specifications, features, comparison tables

### TOMRA Optical Sorting

**Route**: `/equipment/tomra`  
**Component**: `TOMRAPage.tsx`  
**Purpose**: Advanced optical sorting technology  
**Features**: Technology overview, applications, benefits

### Pellenc ST Optical Sorting

**Route**: `/equipment/pellenc-st`  
**Component**: `PellencSTPage.tsx`  
**Purpose**: Precision optical sorting systems  
**Features**: Technical specifications, use cases

### Lubo Screening

**Route**: `/equipment/lubo-screening`  
**Component**: `LuboScreeningPage.tsx`  
**Purpose**: Advanced screening technology  
**Features**: Screen types, applications, benefits

### Günther Screens

**Route**: `/equipment/gunther-screens`  
**Component**: `GuntherScreensPage.tsx`  
**Purpose**: High-performance screening equipment  
**Features**: Screen configurations, specifications

### Smicon Food Waste Depackagers

**Route**: `/equipment/smicon-depackager`  
**Component**: `SmiconDepackagerPage.tsx`  
**Purpose**: Food waste depackaging systems  
**Features**: System types, capacity, applications

### Walair Density Separation Technology

**Route**: `/equipment/walair-density-separation`  
**Component**: `WalairDensitySeparationPage.tsx`  
**Purpose**: Density-based separation technology  
**Features**: Technology overview, benefits

### Centriair Odor Control

**Route**: `/equipment/centriair-odor-control`  
**Component**: `CentriairOdorControlPage.tsx`  
**Purpose**: Industrial odor control systems  
**Features**: System types, applications, effectiveness

### Greyparrot AI

**Route**: `/equipment/greyparrot-ai`  
**Component**: `GreyparrotAIPage.tsx`  
**Purpose**: AI-powered waste analysis  
**Features**: AI capabilities, analytics, reporting

### Densimetric Table

**Route**: `/equipment/densimetric-table`  
**Component**: `DensimetricTablePage.tsx`  
**Purpose**: Density separation technology  
**Features**: Table configurations, applications

### BeeFoam Dust Suppression System

**Route**: `/equipment/beefoam-dust-suppression`  
**Component**: `BeeFoamDustSuppressionPage.tsx`  
**Purpose**: Dust suppression systems  
**Features**: System types, effectiveness, applications

### Reckelberg Environmental Technologies

**Route**: `/equipment/reckelberg-environmental`  
**Component**: `ReckelbergEnvironmentalPage.tsx`  
**Purpose**: Environmental technology solutions  
**Features**: Product range, applications

### Certified Pre-Owned Equipment

**Route**: `/equipment/certified-pre-owned`  
**Component**: `CertifiedPreOwnedPage.tsx`  
**Purpose**: Certified pre-owned equipment listings  
**Features**: Available equipment, certification process

### Glass Cleanup Systems

**Route**: `/equipment/glass-cleanup-systems`  
**Component**: `GlassCleanupSystemsPage.tsx`  
**Purpose**: Glass cleanup and processing systems  
**Features**: System types, applications, benefits

---

## Solution Pages

All solution pages follow the pattern: `/solutions/{solution-slug}`

### Single Stream Recycling

**Route**: `/solutions/single-stream-recycling`  
**Component**: `SingleStreamRecyclingPage.tsx`  
**Purpose**: Comprehensive single stream recycling solutions  
**Features**: Process flow, equipment, benefits

### Plastics Recycling

**Route**: `/solutions/plastics-recycling`  
**Component**: `PlasticsRecyclingPage.tsx`  
**Purpose**: Plastic recycling solutions and processes  
**Features**: Plastic types, sorting technology, applications

### Organics Processing

**Route**: `/solutions/organics-processing`  
**Component**: `OrganicsProcessingPage.tsx`  
**Purpose**: Organic waste processing solutions  
**Features**: Processing methods, equipment, end products

### MSW Processing

**Route**: `/solutions/msw-processing`  
**Component**: `MSWProcessingPage.tsx`  
**Purpose**: Municipal solid waste processing solutions  
**Features**: Processing flow, equipment, recovery rates

### Waste to Energy

**Route**: `/solutions/waste-to-energy`  
**Component**: `WasteToEnergyPage.tsx`  
**Purpose**: Waste-to-energy conversion solutions  
**Features**: Technology, process, benefits

### Glass Cleanup

**Route**: `/solutions/glass-cleanup`  
**Component**: `GlassCleanupPage.tsx`  
**Purpose**: Glass cleanup and processing solutions  
**Features**: Cleanup process, equipment, applications

### Electronics Waste Recycling

**Route**: `/solutions/electronics-waste-recycling`  
**Component**: `ElectronicsWasteRecyclingPage.tsx`  
**Purpose**: E-waste recycling solutions  
**Features**: Processing methods, material recovery, compliance

### Battery Recycling Systems

**Route**: `/solutions/battery-recycling-systems`  
**Component**: `BatteryRecyclingSystemsPage.tsx`  
**Purpose**: Battery recycling solutions  
**Features**: Battery types, processing, material recovery

### Composting & Densimetric Tables

**Route**: `/solutions/composting-densimetric-tables`  
**Component**: `CompostingDensimetricTablesPage.tsx`  
**Purpose**: Composting solutions with density separation  
**Features**: Composting process, density separation, applications

### AI Waste Analysis

**Route**: `/solutions/ai-waste-analysis`  
**Component**: `AIWasteAnalysisPage.tsx`  
**Purpose**: AI-powered waste analysis solutions  
**Features**: AI capabilities, analytics, reporting, optimization

### Centriair Odor Control (Solution)

**Route**: `/solutions/centriair-odor-control`  
**Component**: `CentriairOdorControlSolutionPage.tsx`  
**Purpose**: Odor control solutions for recycling facilities  
**Features**: System types, applications, effectiveness

### Food Waste Depackaging

**Route**: `/solutions/food-waste-depackaging`  
**Component**: `FoodWasteDepackagingPage.tsx`  
**Purpose**: Food waste depackaging solutions  
**Features**: Depackaging process, equipment, applications

### Commercial Waste

**Route**: `/solutions/commercial-waste`  
**Component**: `CommercialWastePage.tsx`  
**Purpose**: Commercial waste processing solutions  
**Features**: Waste types, processing methods, equipment

### C&D Recycling

**Route**: `/solutions/cd-recycling`  
**Component**: `CDRecyclingPage.tsx`  
**Purpose**: Construction and demolition waste recycling  
**Features**: Material types, processing, recovery rates

### Multi-MRF Systems

**Route**: `/solutions/multi-mrf-systems`  
**Component**: `MultiMRFSystemsPage.tsx`  
**Purpose**: Multi-material recovery facility systems  
**Features**: System design, equipment, throughput

### Bollegraaf Balers (Solution)

**Route**: `/solutions/bollegraaf-balers`  
**Component**: `BollegraafBalersSolutionPage.tsx`  
**Purpose**: Baler solutions for various applications  
**Features**: Baler types, applications, benefits

---

## Support & Services Pages

### PMI (Preventive Maintenance Inspection)

**Route**: `/pmi`  
**Component**: `PMI.tsx`  
**Purpose**: Preventive maintenance inspection services  
**Navigation**: Services & Support → PMI  
**Features**:
- PMI service overview
- Inspection checklist
- Service benefits
- Request PMI form

### Test Center

**Route**: `/test-center`  
**Component**: `TestCenter.tsx`  
**Purpose**: Material testing center services  
**Navigation**: Services & Support → Test Center  
**Features**:
- Testing services overview
- Material types tested
- Test request form
- Test results information

### Support

**Route**: `/support`  
**Component**: `Support.tsx`  
**Purpose**: Technical support and troubleshooting  
**Navigation**: Services & Support → Support  
**Features**:
- Support services
- Troubleshooting guides
- Contact support
- Remote support options

### Remote Troubleshooting

**Route**: `/remote-troubleshooting`  
**Component**: `RemoteTroubleshooting.tsx`  
**Purpose**: Remote troubleshooting services  
**Navigation**: Services & Support → Remote Troubleshooting  
**Features**:
- Remote support overview
- Connection requirements
- Request remote support
- Security information

### Parts In Stock

**Route**: `/parts-in-stock`  
**Component**: `PartsInStock.tsx`  
**Purpose**: Available parts inventory  
**Navigation**: Services & Support → Parts In Stock  
**Features**:
- Parts catalog
- Search functionality
- Order parts
- Parts availability

### Van Dyk University

**Route**: `/van-dyk-university`  
**Component**: `VanDykUniversity.tsx`  
**Purpose**: Training and education services  
**Navigation**: Services & Support → Training  
**Features**:
- Training programs
- Course catalog
- Training request form
- Certification information

### Quote Request

**Route**: `/quote`  
**Component**: `QuoteForm.tsx`  
**Purpose**: Equipment and solution quote request form  
**Navigation**: Equipment/Solutions pages → Get Quote button  
**Features**:
- Quote form (firstName, email, phone, company)
- Equipment selection
- Solution selection
- Additional details

---

## News & Media Pages

### Videos

**Route**: `/videos`  
**Component**: `Videos.tsx`  
**Purpose**: Video content library  
**Navigation**: News & Media → Videos  
**Features**:
- Video gallery
- Video categories
- Video player
- Video metadata

### Expert Tips

**Route**: `/expert-tips`  
**Component**: `ExpertTips.tsx`  
**Purpose**: Expert tips and best practices  
**Navigation**: News & Media → Expert Tips  
**Features**:
- Tips articles
- Categories
- Search functionality
- View counts

---

## Company Pages

### Job Application

**Route**: `/job-application`  
**Component**: `JobApplication.tsx`  
**Purpose**: Job application form  
**Navigation**: Careers → Apply Now  
**Features**:
- Application form
- Resume upload
- Cover letter
- Position selection

### FAQ

**Route**: `/faq`  
**Component**: `FAQ.tsx`  
**Purpose**: Frequently asked questions  
**Navigation**: Footer → FAQ  
**Features**:
- Question categories
- Search functionality
- Expandable answers
- Related questions

### Sitemap

**Route**: `/sitemap`  
**Component**: `Sitemap.tsx`  
**Purpose**: Complete site structure and navigation  
**Navigation**: Footer → Sitemap  
**Features**:
- Hierarchical site structure
- All pages listed
- Category organization
- Direct links to all pages

---

## Legal & Compliance Pages

### Privacy Policy

**Route**: `/privacy-policy`  
**Component**: `PrivacyPolicy.tsx`  
**Purpose**: Privacy policy and data protection information  
**Navigation**: Footer → Privacy Policy  
**Features**:
- Data collection practices
- Data usage
- User rights
- Contact information

### Cookie Policy

**Route**: `/cookie-policy`  
**Component**: `CookiePolicy.tsx`  
**Purpose**: Cookie usage and management information  
**Navigation**: Footer → Cookie Policy  
**Features**:
- Cookie types
- Cookie purposes
- Management options
- Third-party cookies

### GDPR Rights

**Route**: `/gdpr-rights`  
**Component**: `GDPRRights.tsx`  
**Purpose**: GDPR data protection rights information  
**Navigation**: Footer → GDPR Rights  
**Features**:
- GDPR rights overview
- Request data access
- Request data deletion
- Request data export

### CCPA Rights

**Route**: `/ccpa-rights`  
**Component**: `CCPARights.tsx`  
**Purpose**: California Consumer Privacy Act rights  
**Navigation**: Footer → CCPA Rights  
**Features**:
- CCPA/CPRA rights
- Do not sell my information
- Data access requests
- Data deletion requests

### Terms of Service

**Route**: `/terms` or `/terms-of-service`  
**Component**: `TermsOfService.tsx`  
**Purpose**: Terms of service and usage agreement  
**Navigation**: Footer → Terms of Service  
**Features**:
- Usage terms
- Liability limitations
- Intellectual property
- Dispute resolution

### Accessibility Statement

**Route**: `/accessibility`  
**Component**: `Accessibility.tsx`  
**Purpose**: Accessibility statement and WCAG compliance  
**Navigation**: Footer → Accessibility  
**Features**:
- WCAG compliance information
- Accessibility features
- Feedback form
- Contact information

---

## Language Support

### Supported Languages

- **English (en)** - Default language
- **French (fr)** - Français
- **Spanish (es)** - Español

### Language Routing

All pages support language prefixes:
- `/en/{page}` - English version
- `/fr/{page}` - French version
- `/es/{page}` - Spanish version

### Language Detection

1. Checks `localStorage` for saved preference
2. Falls back to browser language (`navigator.language`)
3. Uses timezone detection for French/Spanish regions
4. Defaults to English if detection fails

### Language Switching

- Language selector in navbar
- Persists selection in `localStorage`
- Updates all page content immediately
- Maintains current page when switching languages

---

## Navigation Structure

### Main Navigation (Navbar)

```
Home
├── Equipment
│   ├── All Equipment
│   ├── Bollegraaf
│   ├── TOMRA
│   ├── Pellenc ST
│   └── ... (all equipment pages)
├── Solutions
│   ├── All Solutions
│   ├── Single Stream Recycling
│   ├── Plastics Recycling
│   └── ... (all solution pages)
├── Services
│   ├── Services & Support
│   ├── PMI
│   ├── Test Center
│   ├── Training (Van Dyk University)
│   └── Remote Troubleshooting
├── News & Media
│   ├── News & Media
│   ├── Videos
│   └── Expert Tips
├── About Us
│   ├── About
│   └── Careers
└── Contact
```

### Footer Navigation

```
Company
├── About
├── Careers
└── Contact

Resources
├── FAQ
├── Sitemap
└── Accessibility

Legal
├── Privacy Policy
├── Cookie Policy
├── Terms of Service
├── GDPR Rights
└── CCPA Rights
```

### Breadcrumb Navigation

Most pages include breadcrumb navigation showing:
- Home → Category → Page

Example:
- Home → Equipment → Bollegraaf
- Home → Solutions → Single Stream Recycling

---

## Route Patterns

### Equipment Routes

Pattern: `/equipment/{equipment-slug}`

Examples:
- `/equipment/bollegraaf`
- `/equipment/tomra`
- `/equipment/pellenc-st`

### Solution Routes

Pattern: `/solutions/{solution-slug}`

Examples:
- `/solutions/single-stream-recycling`
- `/solutions/plastics-recycling`
- `/solutions/msw-processing`

### Support Routes

Pattern: `/support/{service-slug}` or direct routes

Examples:
- `/support` (main services page)
- `/pmi`
- `/test-center`
- `/remote-troubleshooting`

---

## Redirects & Legacy Routes

### Active Redirects

- `/services` → `/support`
- `/our-customers-in-the-news` → `/news-media`
- `/terms-of-service` → `/terms` (both work)

### 404 Handling

- All unmatched routes → `NotFound` component
- Shows helpful error message
- Provides navigation back to home
- Includes search suggestions

---

## Page Features

### Common Features Across Pages

1. **SEO Optimization**
   - Dynamic meta tags
   - Open Graph tags
   - Structured data
   - Language-specific URLs

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - WCAG 2.1 AA compliance

3. **Performance**
   - Lazy loading
   - Image optimization
   - Code splitting
   - Caching strategies

4. **Multi-language**
   - All content translated
   - Language-specific URLs
   - Browser language detection
   - Persistent language preference

---

## Statistics

- **Total Pages**: 50+ pages
- **Equipment Pages**: 14 pages
- **Solution Pages**: 16 pages
- **Support Pages**: 6 pages
- **News & Media Pages**: 3 pages
- **Company Pages**: 4 pages
- **Legal Pages**: 6 pages
- **Languages Supported**: 3 (English, French, Spanish)
- **Total Routes**: 150+ (including language variants)

---

## Maintenance Notes

### Adding New Pages

1. Create page component in `src/pages/`
2. Add lazy import in `src/App.tsx`
3. Add route in `AppRoutes` component
4. Add translations in `src/config/translations.ts`
5. Update sitemap in `src/pages/Sitemap.tsx`
6. Add navigation link if needed

### Updating Routes

- Routes are defined in `src/App.tsx`
- Language routing handled automatically
- Redirects can be added using `<Navigate>` component
- 404 handling via catch-all route

---

**Last Updated**: January 2025  
**Total Pages**: 50+  
**Languages**: 3 (EN, FR, ES)
