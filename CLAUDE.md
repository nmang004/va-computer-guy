# VA Computer Guy Website - AI Assistant Context

This document provides context for AI assistants working on the VA Computer Guy website project.

## Project Overview

**Client**: VA Computer Guy  
**Business**: Computer repair and IT support services  
**Location**: Virginia Beach, VA (serving Hampton Roads area)  
**Project Type**: Complete website redevelopment  
**Timeline**: 12-week phased approach  

## Business Details

### Contact Information
- **Phone**: (757) 375-6764
- **Address**: 355 Independence Blvd., Virginia Beach, VA 23462
- **Email**: info@vacomputerguy.com

### Business Hours
- Monday: 9:00 AM - 5:00 PM
- Tuesday: 9:00 AM - 7:00 PM  
- Wednesday: 9:00 AM - 5:00 PM
- Thursday: 9:00 AM - 7:00 PM
- Friday: 9:00 AM - 5:00 PM
- Saturday: 10:00 AM - 4:00 PM
- Sunday: Closed

### Services Offered
**Home Services:**
- PC & Mac Repair
- Virus & Malware Removal
- Data Recovery
- In-Home Setup & Support

**Business Services:**
- Managed IT Support
- Network & Server Solutions
- Data Backup & Security
- Business Consulting

**Protection Plans:**
- Residential Protection: $19.99/month
- Business Protection: $99.99/month

## Technical Architecture

### Current Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Version Control**: Git

### Key File Locations
- **Components**: `src/components/`
  - Layout components: `src/components/layout/`
  - UI components: `src/components/ui/`
- **Pages**: `src/app/`
- **Utilities**: `src/lib/`
- **Documentation**: `docs/`

### Important Files
- `src/components/layout/header.tsx` - Main navigation
- `src/components/layout/footer.tsx` - Footer with contact info
- `src/app/layout.tsx` - Root layout
- `src/app/page.tsx` - Homepage
- `src/app/globals.css` - Global styles

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing naming conventions
- Implement responsive design patterns
- Use Shadcn/UI components when possible
- Keep components modular and reusable

### Brand Guidelines

#### Visual Identity & Core Colors
- Professional, trustworthy appearance with clean, modern design
- WCAG 2.1 AA compliant, mobile-first responsive design
- **VA Primary**: `#0170B9` - Main brand blue for CTAs, links
- **VA Secondary**: `#4054B2` - Secondary blue for accents  
- **VA Accent**: `#61CE70` - Green for success/positive actions
- **Text Colors**: `#4B4F58` (primary), `#7A7A7A` (secondary), `#808285` (muted)
- **Neutrals**: `#FFFFFF`, `#F5F5F5`, `#E5E5E5`, `#DDDDDD`, `#424242`, `#3A3A3A`, `#000000`

#### Typography & Layout
**Fonts**: Montserrat (headings, 600), Montserrat Alternates (navigation), Roboto (body, 400)
**Containers**: 1200px (normal), 750px (narrow) | **Spacing**: 8px-48px scale | **Radius**: 10px

#### Components & Classes
**Buttons**: `.va-btn-primary` (blue), `.va-btn-accent` (green), `.va-btn-secondary` (neutral)
**Layout**: `.va-container`, `.va-card`, `.va-section-*` | **Typography**: `.font-montserrat`, `.font-roboto`
**Colors**: `.text-va-primary`, `.bg-va-primary`, `.border-va-neutral-200`

#### Key CSS Variables
```css
/* Core Brand Colors */
--va-primary: #0170B9; --va-secondary: #4054B2; --va-accent: #61CE70;
--va-text-primary: #4B4F58; --va-text-secondary: #7A7A7A; --va-text-muted: #808285;
--va-neutral-50: #FFFFFF; --va-neutral-100: #F5F5F5; --va-neutral-200: #E5E5E5;

/* Typography & Layout */
--font-montserrat: 'Montserrat', system-ui; --font-roboto: 'Roboto', system-ui;
--va-container-width: 1200px; --va-spacing-md: 1rem; --va-spacing-xl: 2rem;
```

**Accessibility**: Maintain 4.5:1 contrast ratios, semantic HTML, ARIA labels, keyboard navigation
**Dark Mode**: CSS variables automatically handle theme switching across all components

### Key User Flows
1. **Service Discovery**: Home → Service Category → Specific Service → Contact/Booking
2. **Quote Process**: Home → Quote Generator → Results → Booking
3. **Status Check**: Home → Repair Status → Enter Details → View Status
4. **Protection Plans**: Home → Protection Plans → Compare Plans → Sign Up

## Development Phases

### Phase 1: Foundation (COMPLETED)
- [x] Project setup and structure
- [x] Basic layout components (Header/Footer)
- [x] Homepage with service categories
- [x] Placeholder pages for all routes
- [x] Vercel deployment

### Phase 2: Core Features (IN PROGRESS)
- [ ] Instant Quote Generator
- [ ] Square API integration for booking
- [ ] Live Repair Status Tracker
- [ ] Protection Plans with subscription
- [ ] Content Management System integration

### Phase 3: Advanced Features
- [ ] SEO optimization
- [ ] Performance optimization  
- [ ] Analytics integration
- [ ] Content migration from old site

### Phase 4: Launch
- [ ] Final testing and QA
- [ ] Domain configuration
- [ ] Staff training
- [ ] Go-live and monitoring

## Future Integrations

### Planned APIs
- **Square API**: For appointment booking and subscription payments
- **Database**: Firestore/Supabase for repair status tracking
- **CMS**: Sanity.io for content management
- **Analytics**: Google Analytics for tracking
- **Live Chat**: Tawk.to or similar service

### Environment Variables (Future)
```env
SQUARE_API_KEY=
SQUARE_ENVIRONMENT=
DATABASE_URL=
SANITY_PROJECT_ID=
SANITY_DATASET=
GOOGLE_ANALYTICS_ID=
```

## Common Tasks

### Adding New Components
1. Create component in appropriate folder
2. Use TypeScript for props
3. Implement responsive design
4. Follow accessibility guidelines
5. Test on mobile and desktop

### Updating Contact Information
- Update in `src/components/layout/header.tsx`
- Update in `src/components/layout/footer.tsx`
- Update in relevant page content
- Update in this CLAUDE.md file

### Adding New Pages
1. Create page in `src/app/` directory
2. Add to navigation if needed
3. Update sitemap/routes
4. Test navigation flows

## Important Notes

### Do NOT Change
- Real business contact information
- Actual business hours
- Company name and branding
- Existing file structure without discussion

### Always Consider
- Mobile responsiveness
- Accessibility (WCAG guidelines)
- Performance optimization
- SEO best practices
- User experience flow

### Testing Requirements
- Test on multiple screen sizes
- Verify all links work
- Check contact information accuracy
- Validate forms and interactions
- Test loading performance

## Resources

### Documentation
- `docs/srs-requirements.docx` - Detailed project requirements
- `docs/project-roadmap.docx` - Timeline and milestones  
- `docs/tech-breakdown.docx` - Technical architecture details
- `README.md` - Setup and development guide

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Build & Deployment Guidelines

### Pre-Deployment Checklist
**ALWAYS run these commands before deploying:**

1. **Clean Build Test**:
   ```bash
   npm run build
   ```
   - This MUST complete without errors
   - Fix any TypeScript errors immediately
   - Remove unused imports that cause warnings
   - Ensure all components render properly

2. **Local Testing**:
   ```bash
   npm run dev
   ```
   - Test all navigation links
   - Verify responsive design on mobile/desktop
   - Check contact information accuracy
   - Validate all forms and interactions

3. **Code Quality**:
   ```bash
   npm run lint
   ```
   - Fix any linting errors
   - Address accessibility issues
   - Clean up console warnings

### Deployment Process

#### Current URLs
- **Live Site**: https://va-computer-g2iufb9ez-nick-mangubats-projects.vercel.app
- **GitHub Repository**: https://github.com/nmang004/va-computer-guy.git

#### Deployment Steps
1. **Test Build Locally**:
   ```bash
   npm run build
   # If this fails, DO NOT deploy - fix errors first
   ```

2. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

3. **Push to GitHub**:
   ```bash
   git push origin main
   # This triggers automatic Vercel deployment
   ```

4. **Manual Deployment (if needed)**:
   ```bash
   vercel --prod
   ```

### Build Error Handling

#### Common Build Issues & Solutions

**TypeScript Errors**:
- Unused imports: Remove them immediately
- Type mismatches: Fix type definitions
- Missing props: Add required props or make them optional

**Component Errors**:
- Missing exports: Ensure all components are properly exported
- Import paths: Use correct relative/absolute paths
- Missing dependencies: Install required packages

**Styling Issues**:
- Tailwind classes: Verify class names are correct
- CSS conflicts: Check for conflicting styles
- Responsive breakpoints: Test on all screen sizes

#### Error Priority
1. **Critical**: TypeScript compilation errors (MUST fix)
2. **High**: ESLint errors (SHOULD fix)
3. **Medium**: Warnings about unused variables (CLEAN UP)
4. **Low**: Performance suggestions (OPTIMIZE when time allows)

### Quality Assurance

#### Before Every Deployment
- [ ] `npm run build` passes without errors
- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Contact information is accurate
- [ ] Forms are functional (even if placeholder)
- [ ] No console errors in browser
- [ ] Images load properly
- [ ] Responsive design works across devices

#### Performance Targets
- Build time: < 30 seconds
- Page load: < 3 seconds
- Lighthouse score: > 90
- No critical accessibility issues

---

Last Updated: August 16, 2025  
Phase: 1 (Foundation) - COMPLETE  
Next Phase: 2 (Core Features) - Starting Week 2