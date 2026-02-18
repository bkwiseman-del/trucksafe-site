# Trucksafe Website - Homepage

This is your complete Next.js homepage with all requested sections.

## What's Included

✅ **All requested sections:**
- Hero with value proposition
- Industry stats (DOT fines, violations, etc.)
- Services overview with links
- Compliance Plus preview
- Trucksafe LIVE preview  
- Bootcamp preview
- Testimonials
- Trucksafe Network preview
- Recent blog posts
- Newsletter signup
- Complete footer

✅ **Your actual assets:**
- Trucksafe logos (dark, light, badge)
- All truck images from project files
- Your brand colors (#363b57, #dd8157)

✅ **Real content:**
- Copy from your current website
- Actual service descriptions
- Industry statistics

## Setup Instructions

### 1. Install Dependencies
```bash
npm install --break-system-packages
```

### 2. Run Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 3. Deploy to Vercel

Option A: Via CLI
```bash
npm install -g vercel
vercel
```

Option B: Via GitHub
1. Push this folder to a GitHub repo
2. Connect the repo to Vercel
3. Deploy automatically

## File Structure

```
trucksafe-site/
├── page.tsx           # Main homepage component
├── globals.css        # Tailwind styles
├── package.json       # Dependencies
├── tailwind.config.ts # Tailwind config with brand colors
├── next.config.js     # Next.js config
└── public/            # Images and logos
    ├── Horizontal_TM_Dark.svg
    ├── Horizontal_TM_Light.svg
    ├── Badge_2.svg
    └── [truck images].jpg
```

## Next Steps

1. Review the homepage - tell me what you want changed
2. Once you approve the design, we'll:
   - Build additional pages (services, bootcamp, etc.)
   - Set up Sanity CMS for blog
   - Implement Compliance Plus subscription logic
   - Add authentication for member portal

## Notes

- All images are optimized with Next.js Image component
- Fully responsive design
- Tailwind CSS for easy styling changes
- TypeScript for type safety
- Ready for production deployment
