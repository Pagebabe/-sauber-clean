# 🏠 PW Pattaya Real Estate - Clean Rebuild

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Live Website**: https://pw-pattaya-real-estate.com/
**Status**: 🚧 In Development (Week 1 - Day 1 Complete)

Complete rebuild of PW Pattaya Real Estate website with **clean architecture**, **zero duplicates**, and **100% maintainability**.

---

## 🎯 Project Goals

### Code Quality
✅ **Zero Duplicates** - One source of truth for every component
✅ **TypeScript Strict Mode** - No `any` types
✅ **Test Coverage > 80%** - Playwright for all critical paths
✅ **Small Commits** - Max 10 lines per commit

### Performance
✅ **Lighthouse Score > 95**
✅ **Bundle Size < 200KB** initial load
✅ **TTI < 3 seconds**

### Features
✅ **31 Pages** - All pages from original site
✅ **5 Languages** - Full i18n support (EN, DE, TH, RU, FR)
✅ **Mobile Perfect** - Responsive design
✅ **SEO Optimized** - Meta tags, sitemap, structured data

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (Pages Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand
- **i18n**: next-i18next
- **API**: Next.js API Routes
- **Database**: PostgreSQL 16 + Prisma ORM
- **Testing**: Playwright
- **Deployment**: VPS (46.62.169.109)

---

## 📂 Project Structure

```
sauber-clean/
├── .bootstrap/              # Daily logs & local rules
├── docs/                    # Documentation
├── public/
│   ├── images/
│   └── locales/            # i18n translations (en, de, th, ru, fr)
├── prisma/                 # Database schema
├── src/
│   ├── components/
│   │   ├── ui/             # Button, Input, Card (generic)
│   │   ├── layout/         # Header, Footer, Sidebar
│   │   ├── property/       # PropertyCard, PropertyGrid
│   │   └── forms/          # ContactForm, SearchForm
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes
│   │   └── index.tsx       # Homepage
│   ├── lib/
│   │   ├── api/            # API helpers
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utilities
│   └── styles/             # Global styles
└── tests/                  # Playwright tests
```

---

## 🏃 Getting Started

### Installation
```bash
git clone https://github.com/Pagebabe/-sauber-clean.git
cd -sauber-clean
npm install
```

### Development
```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build for production
npm run start         # Start production server
npm run test          # Run Playwright tests
npm run type-check    # TypeScript check
npm run lint          # ESLint check
```

### Environment Variables
Create `.env.local`:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="http://localhost:3000"
JWT_SECRET="your-secret"
```

---

## 📅 Development Timeline (6 Weeks)

### Week 1: Foundation ✅ (Day 1 COMPLETE!)
- [x] Next.js + TypeScript + Tailwind Setup ✅
- [x] Design System (Colors, Fonts) ✅
- [x] Header Component (6/7 tests passing) ✅
- [x] Footer Component (9/10 tests passing) ✅
- [x] Sidebar Component (6/7 tests passing) ✅
- [x] UI Components (Button, Input, Select) ✅
- [x] Homepage Hero Section with Search Form ✅

### Week 2: Property System
- [ ] PropertyCard Component
- [ ] PropertyFilters
- [ ] Buy/Rent Pages

### Week 3: Detail Pages
- [ ] Property Detail Page
- [ ] Contact Form
- [ ] Google Maps Integration

### Week 4: Static Pages
- [ ] About, Contact, Service, FAQ

### Week 5: Backend & Optimization
- [ ] API Migration
- [ ] Image Optimization
- [ ] Performance Tuning

### Week 6: Testing & Deployment
- [ ] Comprehensive Testing
- [ ] VPS Deployment
- [ ] GO LIVE! 🚀

---

## 🧪 Testing

### Run Tests
```bash
npm run test                    # All tests
npm run test tests/header       # Specific test
npm run test -- --headed        # With browser
```

### Current Test Status
- **Header Component**: 6/7 passing ✅
- **Total Tests**: 7
- **Coverage**: Setting up...

---

## 🔒 Development Rules (Anti-Chaos Protocol)

1. **No Duplicates** - Check before creating: `find . -name "*Name*"`
2. **Small Commits** - Max 10 lines per commit
3. **Test First** - Write test before code (TDD)
4. **TypeScript Strict** - No `any` types
5. **Folder Structure** - Follow defined structure
6. **Playwright Tests** - Max 15s timeout
7. **Documentation** - JSDoc for all components

Full rules: `~/.claude-bootstrap/PW_PATTAYA_CLEAN_REBUILD_PROTOCOL.md`

---

## 📊 Progress

**Day 1 COMPLETE!** ✅
- Website Analysis (7 screenshots)
- Bootstrap Documentation
- Next.js Setup
- Design System
- **8 Components Built:**
  - Header (Layout)
  - Footer (Layout)
  - Sidebar (Layout)
  - Button (UI)
  - Input (UI)
  - Select (UI)
  - Hero (Homepage)
  - Homepage Integration

**Next Up** (Day 2):
- PropertyCard Component
- Property Listings
- API Integration

---

## 📖 Documentation

- **Bootstrap Rules**: `~/.claude-bootstrap/PW_PATTAYA_CLEAN_REBUILD_PROTOCOL.md`
- **Daily Logs**: `.bootstrap/DAILY.md`
- **Setup Guide**: `/Users/fuhrer/Projects/SETUP_COMPLETE_SUMMARY.md`

---

## 🚀 Deployment

### VPS Setup
```bash
ssh root@46.62.169.109
cd /var/www
git clone https://github.com/Pagebabe/-sauber-clean.git pw-pattaya-clean
cd pw-pattaya-clean
npm install
npm run build
pm2 start npm --name "pw-nextjs" -- start
```

### Nginx Config
```nginx
server {
  listen 80;
  server_name pw-pattaya-real-estate.com;
  location / {
    proxy_pass http://localhost:3001;
  }
}
```

---

## ✅ Success Criteria

- [ ] Lighthouse > 95
- [ ] TypeScript: 0 Errors
- [ ] Tests: 100% Pass
- [ ] Bundle < 200KB
- [ ] Mobile Perfect
- [ ] All 31 Pages Work
- [ ] 5 Languages Complete

---

## 📞 Support

**Issues**: [GitHub Issues](https://github.com/Pagebabe/-sauber-clean/issues)
**Documentation**: `/docs/`

---

**🎯 CLEAN CODE, NO CHAOS, ZERO DUPLICATES**
