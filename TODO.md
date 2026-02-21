# Trucksafe Platform - TODO

## Network (Remaining)
- [ ] Image uploads in forum posts/comments
- [ ] Direct messaging between members
- [ ] Member profile pages (clickable from directory/posts)

## Integrations
- [ ] SendGrid transactional email (welcome emails, notifications, password resets)
- [x] Stripe subscriptions for Compliance+ tiers (code complete)
- [ ] Calendly embed for consulting bookings
- [ ] FreshBooks OAuth flow + client sync for Client Portal
- [ ] Thinkific webhook-driven enrollment sync for Academy
- [ ] Dropbox document sync for Client Portal
- [ ] Mailchimp audience sync (event-driven + nightly)
- [ ] YouTube API for Trucksafe LIVE! episodes + transcripts

## Stripe Setup (manual — Brandon)
- [x] Add test API keys to .env.local (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
- [ ] Create 3 Products in Stripe sandbox (Basic $95/mo, Pro $295/mo, Premium $595/mo)
- [ ] Create 6 Prices (monthly + annual for each product — annual = 10x monthly)
- [ ] Update stripePriceId values in prisma/seed-tiers.ts with real Stripe Price IDs
- [ ] Run seed script: npx ts-node prisma/seed-tiers.ts
- [ ] Set up local webhook forwarding: stripe listen --forward-to localhost:3001/api/stripe/webhook
- [ ] Add STRIPE_WEBHOOK_SECRET from webhook listener to .env.local
- [ ] Test checkout with Stripe test card (4242 4242 4242 4242)
- [ ] Configure Stripe Customer Portal in Stripe dashboard (for payment method management)

## Legal (manual — Brandon)
- [ ] Update Terms of Service / Terms and Conditions to include 12-month minimum commitment clause for Pro and Premium plans
- [ ] Add cancellation policy language (Pro/Premium cannot cancel before 12 months; Basic can cancel anytime)

## Core Features
- [x] Admin CMS (manage users, content, forums, etc.)
- [ ] Client Portal (secure docs, billing, messaging)
- [x] Compliance+ subscription management (code complete — needs Stripe setup above)
- [ ] Academy course linking with Thinkific
- [ ] Bootcamp event management + attendee/alumni portals
- [ ] Trucksafe LIVE! show notes + episode pages
- [ ] TSC Certification (future)

## UX Improvements
- [ ] Dynamic form/signup boxes for logged-in members — swap newsletter signup, contact forms, etc. with contextual CTAs (e.g., link to notification settings, dashboard, or account preferences instead of re-collecting info)

## Infrastructure
- [ ] File/image upload system (S3 or similar)
- [ ] Email templates
- [ ] Notification system
