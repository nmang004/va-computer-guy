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
- Professional, trustworthy appearance
- Clean, modern design
- Accessible to all users
- Mobile-first responsive design
- Use real business information (not placeholder data)

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

## Deployment

### Current URLs
- **Live Site**: https://va-computer-g2iufb9ez-nick-mangubats-projects.vercel.app
- **Git Repository**: [Current local repository]

### Deployment Process
- Automatic deployment on push to main branch
- Manual deployment: `vercel --prod`
- Preview deployments for feature branches

---

Last Updated: August 16, 2025  
Phase: 1 (Foundation) - COMPLETE  
Next Phase: 2 (Core Features) - Starting Week 2