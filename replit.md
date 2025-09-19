# TrendifyGo - React Vite Frontend

## Project Overview
- **Project**: TrendifyGo - A comprehensive TikTok analytics and marketing collaboration platform website
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, React Router DOM, Framer Motion
- **Environment**: Replit with Bun package manager, configured for proxy support

## Theme, Style, and Vibe
- **Theme**: Modern gradient color scheme with pink and purple accents
- **Style**: Clean, professional landing page with modern components
- **Vibe**: Tech-forward, analytics-focused, marketing platform aesthetic

## Implementation Status
### Current State
- **Active Feature**: Fully functional React frontend with routing
- **Progress**: Complete setup for Replit environment with proper proxy support
- **Status**: Running successfully on port 5000

### Recent Changes (Sept 19, 2025)
- Created Vite configuration with host settings for Replit proxy support (0.0.0.0:5000)
- Configured workflow to run development server on port 5000
- Set up deployment configuration for production with autoscale
- Fixed dependency installation issues with bun

## Requirements
### Implemented
- React frontend with TypeScript
- Tailwind CSS styling
- React Router for navigation (Home, Features, Pricing, About)
- Modern UI components (Header, Footer, Hero, Features, Pricing, Testimonials)
- Replit environment compatibility
- Production deployment configuration

### Technical Setup
- **Development**: `bun run dev` on port 5000
- **Build**: `bun run build` (TypeScript compilation + Vite build)
- **Preview**: `bun run preview` for production testing
- **Deployment**: Configured for autoscale with proper build/run commands

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route-based page components
├── App.tsx        # Main app with routing
├── main.tsx       # Entry point
└── index.css      # Global styles with Tailwind
```

## Configuration Files
- `vite.config.ts` - Vite configuration with Replit proxy support
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration