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
- [ ] Add test API keys to .env.local (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET)
- [ ] Create 3 Products in Stripe dashboard (Basic, Pro, Premium)
- [ ] Create 6 Prices (monthly + annual for each product)
- [ ] Update stripePriceId values in prisma/seed-tiers.ts with real Stripe Price IDs
- [ ] Run seed script: npx ts-node prisma/seed-tiers.ts
- [ ] Set up local webhook forwarding: stripe listen --forward-to localhost:3001/api/stripe/webhook
- [ ] Test checkout with Stripe test card (4242 4242 4242 4242)
- [ ] Configure Stripe Customer Portal in Stripe dashboard (for payment method management)

## Core Features
- [x] Admin CMS (manage users, content, forums, etc.)
- [ ] Client Portal (secure docs, billing, messaging)
- [x] Compliance+ subscription management (code complete — needs Stripe setup above)
- [ ] Academy course linking with Thinkific
- [ ] Bootcamp event management + attendee/alumni portals
- [ ] Trucksafe LIVE! show notes + episode pages
- [ ] TSC Certification (future)

## Infrastructure
- [ ] File/image upload system (S3 or similar)
- [ ] Email templates
- [ ] Notification system
