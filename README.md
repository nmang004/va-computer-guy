# VA Computer Guy Website

A modern, responsive website for VA Computer Guy - Virginia Beach's trusted computer repair and IT support specialists.

## 🚀 Live Demo

**Production:** [https://va-computer-g2iufb9ez-nick-mangubats-projects.vercel.app](https://va-computer-g2iufb9ez-nick-mangubats-projects.vercel.app)

## 📋 Project Overview

This is the complete redevelopment of the VA Computer Guy website, transforming it from a basic brochure into a modern, trust-building, and highly efficient customer acquisition tool. The website provides a seamless digital experience that integrates booking, provides valuable customer tools, and drives long-term revenue.

### Key Features

- **Modern Design**: Clean, professional interface that builds trust and credibility
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Service Categorization**: Clear separation between Home and Business services
- **Contact Integration**: Real business contact information and hours
- **Future-Ready**: Built to accommodate upcoming features like:
  - Instant Quote Generator
  - Integrated Square API booking system
  - Live Repair Status Tracker
  - Protection Plans with subscription management

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📁 Project Structure

```
va-computer-guy/
├── docs/                        # Project documentation
│   ├── srs-requirements.docx    # Software Requirements Specification
│   ├── project-roadmap.docx     # Project timeline and milestones
│   └── tech-breakdown.docx      # Technical architecture details
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── about/               # About us page
│   │   ├── blog/                # Tech tips blog (placeholder)
│   │   ├── booking/             # Appointment booking
│   │   ├── protection-plans/    # Service plans
│   │   ├── repair-status/       # Status tracker (placeholder)
│   │   ├── services/            # Service pages
│   │   │   ├── home-services/   # Residential services
│   │   │   └── business-services/ # Commercial services
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── layout/              # Header, Footer, Navigation
│   │   ├── ui/                  # Shadcn/UI components
│   │   ├── home/                # Homepage-specific components
│   │   └── shared/              # Reusable components
│   ├── lib/                     # Utilities and helpers
│   └── types/                   # TypeScript type definitions
└── public/                      # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd va-computer-guy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏢 Business Information

**VA Computer Guy**
- **Phone**: (757) 375-6764
- **Address**: 355 Independence Blvd., Virginia Beach, VA 23462
- **Hours**: 
  - Monday: 9:00 AM - 5:00 PM
  - Tuesday: 9:00 AM - 7:00 PM
  - Wednesday: 9:00 AM - 5:00 PM
  - Thursday: 9:00 AM - 7:00 PM
  - Friday: 9:00 AM - 5:00 PM
  - Saturday: 10:00 AM - 4:00 PM
  - Sunday: Closed

## 📋 Development Roadmap

### Phase 1: Foundation (Week 1) ✅ COMPLETE
- [x] Project setup and basic structure
- [x] Responsive Header and Footer
- [x] Homepage with service categories
- [x] All main page placeholders
- [x] Vercel deployment

### Phase 2: Core Features (Weeks 2-6)
- [ ] Instant Quote Generator implementation
- [ ] Square API integration for booking
- [ ] Live Repair Status Tracker
- [ ] Protection Plans subscription system
- [ ] CMS integration for content management

### Phase 3: Advanced Features (Weeks 7-10)
- [ ] SEO optimization and content migration
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] User testing and refinement

### Phase 4: Launch (Weeks 11-12)
- [ ] Final testing and QA
- [ ] Domain setup and go-live
- [ ] Staff training and handoff

## 🚀 Deployment

The project is automatically deployed to Vercel on every push to the main branch.

To manually deploy:
```bash
vercel --prod
```

## 📝 Environment Variables

Create a `.env.local` file for local development:

```env
# Future API keys will go here
# SQUARE_API_KEY=your_square_api_key
# SQUARE_ENVIRONMENT=sandbox_or_production
# DATABASE_URL=your_database_url
```

## 🤝 Contributing

This is a client project. For development team members:

1. Follow the existing code style and conventions
2. Test all changes locally before committing
3. Use descriptive commit messages
4. Update documentation as needed

## 📞 Support

For technical questions or support:
- Contact the development team
- Review the SRS document in `/docs/srs-requirements.docx`
- Check the project roadmap in `/docs/project-roadmap.docx`

---

Built with ❤️ for VA Computer Guy by the development team.