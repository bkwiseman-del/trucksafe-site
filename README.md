# Trucksafe Platform - Project Overview & Development Plan

## Project Vision

Building a comprehensive, custom digital platform for Trucksafe to replace the current Wix-based website (www.trucksafe.com). This platform unifies compliance consulting services, training programs, event management, community forums, client communication & billing, the Trucksafe Network, Trucksafe LIVE! podcast, and subscription management into a single, modern web application.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14.1.0 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components + Lucide React icons
- **Forms:** React Hook Form (planned)
- **State Management:** React Context + hooks

### Backend
- **Database:** PostgreSQL via Railway Pro (1TB storage available)
- **ORM:** Prisma
- **Authentication:** NextAuth v4 (with Google & Microsoft OAuth providers)
- **API Routes:** Next.js API routes

### Third-Party Integrations
- **Payments:** Stripe (existing Trucksafe account, currently used with Freshbooks)
- **Accounting/Billing:** Freshbooks API (invoice history, client time tracking, payments)
- **Course Platform:** Thinkific API (seamless SSO and course completion tracking)
- **Video Hosting:** YouTube (Trucksafe LIVE! series, training videos)
- **Email - Transactional:** SendGrid (password resets, notifications, system emails)
- **Email - Marketing:** Mailchimp (existing account for newsletters and campaigns)
- **Calendar/Scheduling:** Calendly API integration (for consulting bookings)
- **File Storage:** Dropbox API (existing account for client documents) + cloud storage for media
- **Analytics:** Google Analytics

### DevOps & Hosting
- **Version Control:** Git/GitHub
- **Hosting:** Vercel (existing free Trucksafe account)
- **Database Hosting:** Railway Pro (existing account with 1TB storage, separate volume from other projects)
- **CDN:** Vercel Edge Network
- **SSL:** Automatic via Vercel
- **Domain Management:** Currently with Wix (will migrate to Vercel DNS during deployment)

---

## Platform Architecture

### Core Product Lines

#### 1. Trucksafe Network (Community)
**Status:** Spec complete, implementation pending  
**Access:** All Compliance+ tiers + free registration for non-subscribers

**Features:**
- Discussion forums with categories
- Admin post highlighting and pinning
- Member directory with search/filtering (privacy controls in settings)
- Direct messaging (with privacy settings)
- User profiles with achievement badges
- Master calendar integration showing all Trucksafe events (Bootcamp, LIVE! episodes, webinars) with access indicators and links
- Resource library (Network-exclusive content: webinar replays, curated forum posts)
- PWA mobile app with tabs for:
  - Forum access
  - Recent YouTube compliance videos feed
  - Recent blog articles
  - Recent Trucksafe LIVE! episodes
- Rich text post editor with media upload
- User notification system (push + email preferences)
- Media management system with:
  - Upload limits for users
  - Retention policies (purge user uploads after X years)
  - Persistent storage for Trucksafe-uploaded media
  - Admin media management tab

#### 2. Compliance+ (Subscription Service)
**Status:** Business logic defined, UI partially built  
**Note:** Tiers and offerings subject to refinement before finalization

**Tiers:**
- Basic: $95/month (or annual with discount)
- Pro: $495/month (or annual with discount)
- Premium: $995/month (or annual with discount)

**Subscription Management:**
- Stripe integration with monthly/annual payment options
- Self-service subscription management in member settings
- Pro/Premium subscribers become Freshbooks clients (must sign client terms & conditions)

**Features by Tier:**

**All Tiers:**
- Monthly regulatory updates
- Resource library (all shop documents included)
- Training videos (curated YouTube playlists by topic)
- Trucksafe Network access
- Quarterly webinars (Basic+)

**Pro Tier (+):**
- Monthly compliance reports (via Risk Control service integration - future)
- 2 hours/quarter consulting time (tracked in Freshbooks)
- Policy review service

**Premium Tier (++):**
- 5 hours/quarter consulting time (tracked in Freshbooks)
- Policy drafting & updates
- Emergency compliance hotline
- Mock DOT audits (facilitated through Client Portal with document upload, confidential messaging, report delivery, call scheduling)

#### 3. Trucksafe Academy
**Status:** Integration planned  
**Platform:** Thinkific (external) with API integration

**Integration Points:**
- SSO from main platform
- Display course completion on user profiles
- Tier-based access control
- Thinkific API for seamless user experience

#### 4. Consulting Client Portal
**Status:** To be built  
**Access:** Trucksafe consulting clients (independent of Compliance+ unless Pro/Premium)  
**Security:** 2FA required for access

**Features:**
- Secure messaging inbox/outbox (email notifications)
- Document repository:
  - Client upload dropbox (integrates with Trucksafe Dropbox account)
  - Trucksafe document delivery
  - Categorized and foldered structure
- Billing integration:
  - View past and current invoices (Freshbooks API)
  - Pay invoices (Stripe via Freshbooks)
  - Track consulting hours used
- Mock DOT audit management (for Premium subscribers)
- Confidential communication logging

#### 5. Trucksafe Bootcamp
**Status:** Event management system needed  

**Admin Requirements:**
- Backend event management system (similar to Wix Events)
- Create and schedule events
- Duplicate prior events (preserve common details)
- Dynamic frontend updates based on scheduled events
- Ticket types and conditions
- Export attendee lists
- Upload event materials

**Attendee Features:**
- Registration system (with Compliance+ tier discounts)
- Current attendee portal:
  - Notifications and posts from Trucksafe
  - Event details and schedule
  - Room booking
  - Messaging with fellow attendees
- Alumni portal:
  - Access to past event resources
  - Archived posts from their event year
  - Communication with past attendees
  - Special forum categories for their cohort

#### 6. Trucksafe LIVE! (Video Podcast)
**Status:** Content exists, platform integration needed  

**Admin Backend:**
- Scheduling interface for upcoming shows
- YouTube link input (auto-pulls title and description)
- Special guest management:
  - Photo upload
  - Name, company, bio
- Dynamic updates to frontend and homepage
- Scheduled shows appear on master calendar with join links

**Frontend:**
- Episode cards linking to show notes articles
- YouTube video integration
- Video library/archive

**Auto-Generation Workflow:**
1. Upload video to YouTube
2. Extract transcript via YouTube API
3. AI generates draft blog post:
   - Embedded video at top
   - Summary of key points
   - Special guests section (if any)
   - Full transcript
4. Notification to Brandon for editorial review
5. Publish SEO-optimized episode page

#### 7. TSC Certification
**Status:** Policy in progress, implementation later

**Features:**
- Certification program management
- Exam system
- CEU tracking
- Certificate generation
- Instructor qualification tracking

---

## Future Products

### FleetPrep by Trucksafe
**Domain:** fleetprep.io (reserved)  
**Description:** Subscription service for fleets to deliver driver training content  
**Integration:** Show subscription status on Trucksafe dashboard with SSO link to FleetPrep dashboard  
**Timeline:** To be implemented after core platform complete

### Risk Control Service
**Platform:** Separate Railway project  
**Integration:** Will power monthly compliance reports for Compliance+ Pro/Premium tiers  
**Timeline:** Future integration point

---

## Site Structure & Pages

### Public Pages (Marketing)
- ✅ Homepage (`/`)
- ✅ About (`/about`)
- ✅ Services Hub (`/#services` - cards on homepage, not dropdown)
- ✅ Articles/Blog (`/articles`)
  - Category/tag filtering
  - Author pages
  - Social sharing
  - Related articles
- ✅ Contact (`/contact`)
- ✅ Trucksafe LIVE! Landing (`/live`)
- ✅ Bootcamp Landing (`/bootcamp`) - dynamic based on scheduled events
- ✅ Academy Landing (`/academy`)
- ✅ Network Landing (`/network`)
- ✅ Expert Witness (`/expertwitness`)
- ✅ DOT Audit Prep (`/services/dot-audit-prep`)
- ⏳ Compliance Consulting (`/services/compliance-consulting`) - includes policy development
- ⏳ Trucksafe Productions (`/production`)
- ⏳ Videos (`/videos`) - recent YouTube channel videos
- ⏳ Shop (`/shop`) - Wix store functionality (Stripe integration)
- ⏳ TSC Certification Landing (`/tsc`)
- ⏳ Additional subpages (to be mapped from Wix audit)

### Authentication
- ✅ Login (`/login`) - credentials, Google, Microsoft
- ⏳ Signup (`/signup`) - credentials, Google, Microsoft
- ⏳ Password Reset (`/reset-password`)
- ⏳ Email Verification (`/verify-email`)

**Wix Member Migration:**
- Export member list from Wix (names, emails, etc.)
- Cannot port passwords
- Email all existing members to create new accounts
- Consider offering migration assistance/incentive

### Member Dashboard
- ✅ Main Dashboard (`/dashboard`)
- Service access cards (dynamic based on user roles):
  - Network
  - Compliance+ (with tier badge)
  - Academy
  - Bootcamp (if current attendee or alumni)
  - Client Portal (if consulting client)
  - TSC (future)
- Recent activity feed (personalized)
- Upcoming Trucksafe events (filtered by user access)
- Activity stats (personalized)

**User Role/Tag System:**
- Database tracks multiple membership types:
  - Network Member
  - Compliance+ Subscriber (Basic/Pro/Premium)
  - Bootcamp Attendee (year)
  - Bootcamp Alumni
  - Consulting Client
  - TSC Certified
- Roles dictate site access and visible content

### Trucksafe Network (Member Area)
- ✅ Forums List (`/network/forums`)
- ⏳ Activity Feed (`/network/feed`)
- ⏳ Forum Category (`/network/forums/[slug]`)
- ⏳ Post View (`/network/post/[id]`)
  - Rich text editor for posts/comments
  - Media upload capability
  - Reactions (like, helpful, love)
- ⏳ Member Directory (`/network/members`)
  - Search and filter
  - Privacy controls (users can opt to be private)
- ⏳ Member Profile (`/network/profile/[username]`)
  - Unified with broader member profile system
  - Privacy settings integration
- ⏳ Direct Messages (`/network/messages`)
  - Privacy settings respected
- ⏳ Events Calendar (`/network/events`)
  - Master Trucksafe calendar filtered for Network
- ⏳ Resources (`/network/resources`)
  - Webinar replays
  - Curated forum content

### Compliance+ Portal
- ⏳ Dashboard (`/complianceplus/dashboard`)
- ⏳ Compliance Reports (`/complianceplus/reports`)
  - Future integration with Risk Control service
- ⏳ Webinars (`/complianceplus/webinars`)
  - Upcoming and past
  - Recording access
- ⏳ Resource Library (`/complianceplus/resources`)
  - All shop documents
  - Additional exclusive content
- ⏳ Consulting Schedule (`/complianceplus/consulting`)
  - Calendly integration
  - Hours tracking via Freshbooks
  - Pro: 2hrs/qtr, Premium: 5hrs/qtr

### Academy (Thinkific Integration)
- ⏳ My Courses (`/academy/my-courses`)
- ⏳ Browse Courses (`/academy/browse`)
- ⏳ Course Detail (`/academy/course/[slug]`) → Redirects to Thinkific with SSO
- ⏳ Certificates (`/academy/certificates`)

### Bootcamp Portal
**Note:** Not just alumni - includes current registrants

**Current Attendees:**
- ⏳ Attendee Portal (`/bootcamp/attendee`)
- ⏳ Event Details & Schedule (`/bootcamp/attendee/schedule`)
- ⏳ Messaging & Forums (`/bootcamp/attendee/forums`)
- ⏳ Room Booking (`/bootcamp/attendee/rooms`)
- ⏳ Resources (`/bootcamp/attendee/resources`)

**Alumni:**
- ⏳ Alumni Portal (`/bootcamp/alumni`)
- ⏳ Alumni Forums by Year (`/bootcamp/alumni/forums/[year]`)
- ⏳ Alumni Resources (`/bootcamp/alumni/resources/[year]`)
- ⏳ Alumni Events (`/bootcamp/alumni/events`)

### Client Portal
- ⏳ Client Dashboard (`/portal`)
- ⏳ Messages (`/portal/messages`)
  - Secure inbox/outbox
  - Email notifications
- ⏳ Documents (`/portal/documents`)
  - Upload to Trucksafe
  - Download delivered documents
  - Organized folders/categories
- ⏳ Billing (`/portal/billing`)
  - View invoices (Freshbooks API)
  - Pay invoices (Stripe)
  - Track consulting hours
- ⏳ Mock Audit Management (`/portal/audits`) - Premium only

### TSC Certification (Future)
- ⏳ Dashboard (`/tsc/dashboard`)
- ⏳ Courses (`/tsc/courses`)
- ⏳ Certification Status (`/tsc/certification`)
- ⏳ CEU Tracker (`/tsc/ceu`)

### Account Management
- ⏳ Profile (`/profile`)
  - Unified across all services
  - Privacy controls
- ⏳ Account Settings (`/settings`)
  - Privacy preferences
  - Notification preferences (push + email)
- ⏳ Billing & Subscriptions (`/billing`)
  - Manage Compliance+ subscription
  - View payment history
  - Update payment methods
- ⏳ Notification Preferences (`/settings/notifications`)
  - Email notifications
  - Push notifications
  - Event reminders
  - New post alerts

### Admin Panel

**Dashboard (`/admin`):**
- Site health monitoring
- Quick metrics (active members, monthly revenue, traffic)
- Recent activity log
- Backup management
- Version control (undo/revert recent actions)

**Member Management (`/admin/members`):**
- View all members with details
- Sort, filter, search
- Edit member details
- Force password reset
- View member activity
- Export to CSV
- Manually add members
- Role/tag management

**Content Management:**

**Articles (`/admin/articles`):**
- View and edit existing articles
- Create new articles
- Draft and published views
- Schedule posts
- View metrics (views, engagement)
- SEO metadata editor
- Rich text editor with HTML embed support
- Categories and tags
- Featured images
- Claude AI assistance for drafting/revising

**Trucksafe LIVE! (`/admin/live`):**
- Schedule upcoming shows
- YouTube link input (auto-pull metadata)
- Add special guests
- Push to frontend and homepage
- Calendar integration with join links
- Generate show notes (AI-assisted)

**Bootcamp (`/admin/bootcamp`):**
- View past events
- Schedule new events
- Duplicate events
- Manage ticket types
- Export attendee lists
- Upload event materials
- Send messages to attendees (via forum)

**Network (`/admin/network`):**
- View all forums
- Create posts (admin-highlighted/pinned)
- Add resources
- Schedule webinars
- Moderate content
- Manage user-generated media

**Events (`/admin/events`):**
- Master calendar for all Trucksafe events
- Create/edit events
- Set access levels
- Generate calendar links

**Page Builder (`/admin/pages`):**
- Create new draft pages
- Stage for review
- Publish to production
- Claude AI assistance

**Subscriptions (`/admin/subscriptions`):**
- View all active subscriptions
- Subscription status monitoring
- Revenue analytics
- Manage subscription issues

**Media Library (`/admin/media`):**
- View all uploaded media
- Organize and categorize
- Optimize for display
- Set retention policies
- Delete media
- Usage analytics

**Analytics (`/admin/analytics`):**
- Full site analytics (Google Analytics integration)
- Traffic metrics
- User engagement
- Conversion tracking
- Revenue reporting
- Custom reports and graphs

---

## Content Management Strategy

### Articles/Blog System
**CMS:** Custom-built with Prisma (markdown-based)

**Features:**
- Rich text editor (WYSIWYG)
- HTML embed support (X/Twitter posts, videos, etc.)
- SEO metadata (title, description, keywords)
- Open Graph tags
- Categories and tags
- Featured images with optimization
- Author profiles
- Related articles (auto-suggest)
- Social sharing buttons
- Draft/published workflow
- Scheduled publishing
- Edit and republish tracking (updated date vs published date)
- Claude AI assistance for:
  - Drafting content
  - Revising copy
  - Generating titles
  - Writing metadata
  - SEO optimization

### Video Content (Trucksafe LIVE!)
**Source:** YouTube  
**Enhancement:** Auto-generate show notes

**Workflow:**
1. Upload video to YouTube
2. Schedule show in admin panel
3. Add YouTube link (auto-pulls title, description)
4. Add special guests (photo, name, company, bio)
5. Show appears on frontend, homepage, calendar
6. After airing: Extract transcript via YouTube API
7. AI generates draft show notes article:
   - Embedded video player
   - Episode summary (key points)
   - Special guests section
   - Full transcript
8. Draft sent to Brandon for review
9. Edit and publish SEO-optimized page
10. Episode card on LIVE! page links to article

### Resource Library
**Storage:** Cloud storage (S3 or Vercel Blob) + Dropbox API for client docs

**Admin Interface:**
- Upload and categorize
- Set access controls (tier-based)
- File optimization
- Bulk operations

**Resource Types:**
- PDF templates
- Policy documents
- Compliance checklists
- Training materials
- Webinar recordings
- Videos

### Shop Integration
**Current:** Wix online store  
**New:** Stripe-powered shop

**Products:**
- Individual documents/templates
- Document bundles
- Available free to Compliance+ members in their dashboard

---

## Database Schema Overview

### User Management
- `User` - Core account (email, password hash, OAuth tokens)
- `Profile` - Extended info (name, company, title, bio, photo)
- `UserRole` - Role assignments (Network Member, Compliance+ tier, Client, etc.)
- `Badge` - Achievement badges
- `UserBadge` - User<>Badge mapping with earned date
- `PrivacySettings` - User privacy preferences
- `NotificationPreferences` - Email and push notification settings

### Subscriptions & Payments
- `Subscription` - Stripe subscription records
- `SubscriptionTier` - Tier definitions (Basic/Pro/Premium)
- `PaymentHistory` - Transaction log
- `Invoice` - Freshbooks invoice sync
- `ConsultingHours` - Hours tracking for Pro/Premium

### Network/Community
- `Forum` - Forum categories with access levels
- `Post` - Forum posts
- `Comment` - Post replies
- `Reaction` - Likes/helpful reactions
- `Message` - Direct messages
- `Conversation` - DM threads
- `UserMedia` - User-uploaded media with retention dates

### Content
- `Article` - Blog posts/articles
- `ArticleDraft` - Draft versions
- `Category` - Content categories
- `Tag` - Content tags
- `Video` - Trucksafe LIVE! episodes
- `Resource` - Downloadable resources with access control
- `Media` - All site media with metadata

### Events
- `Event` - All Trucksafe events (webinars, bootcamp, LIVE! shows)
- `EventType` - Event type enum (webinar, bootcamp, show)
- `EventRegistration` - Attendee tracking
- `EventResource` - Event materials
- `Calendar` - Master calendar entries

### Bootcamp
- `BootcampEvent` - Specific bootcamp instances
- `BootcampTicket` - Ticket types and pricing
- `BootcampAttendee` - Registration records
- `BootcampRoom` - Room booking system

### Client Portal
- `Client` - Consulting client records
- `ClientDocument` - Document repository
- `ClientMessage` - Secure messaging
- `ClientAudit` - Mock audit management (Premium)

### Certifications (Future)
- `Certification` - TSC certification records
- `Course` - Certification courses
- `Exam` - Exam records
- `CEU` - Continuing education units

---

## Navigation System

### Main Navigation (Public)
- **Logo** → Home
- **About**
- **Services** (not dropdown - card grid on homepage showing):
  - Consulting
  - DOT Audit Prep
  - Compliance+
  - Academy
- **Resources** (dropdown):
  - Academy
  - Network
  - Bootcamp
  - Trucksafe LIVE!
  - Shop
- **Articles**
- **Videos** (recent YouTube feed)
- **Contact Us**
- **Log In** (shows when logged out)

### Member Navigation Bar (Logged In)
**Context-Aware:** Changes based on current section

**Dashboard Context:**
- Dashboard | Network | Academy | Compliance+ [TIER] | Bootcamp | Client Portal

**Network Context:**
- Dashboard | Forums | Members | Events | Resources

**Academy Context:**
- Dashboard | My Courses | Browse | Certificates

**Compliance+ Context:**
- Dashboard | Webinars | Reports | Resources | Consulting

**Bootcamp Context:**
- Dashboard | Schedule | Forums | Resources | Rooms

**Client Portal Context:**
- Dashboard | Messages | Documents | Billing | Audits

**Common Right Side (all contexts):**
- 🔔 Notifications (with badge count)
- ⚙️ Settings
- 👤 Profile Dropdown:
  - My Profile
  - Account Settings
  - Billing
  - Log Out

---

## Wix Migration & URL Mapping

### Pre-Migration Audit
**Current Wix Site:** www.trucksafe.com

**Tasks:**
1. Audit all existing URLs and page structure
2. Export all blog/article posts with content
3. Map old URLs to new URLs
4. Identify all media assets (images, PDFs, videos)
5. Export member list (names, emails, subscription status)
6. Document all integrations (Stripe, Freshbooks, Mailchimp)
7. Review Wix-specific features that need replication
8. Test subdomain capability for staging

### URL Preservation Strategy
- Maintain identical URLs where possible
- 301 redirects for any changed URLs
- Preserve article/blog post URLs exactly
- Maintain SEO authority through redirects

### Domain & Email Management
**Current State:**
- Domain managed by Wix
- Emails through Gmail (brandon@trucksafe.com)
- Email management interface in Wix

**Migration Plan:**
1. Check subdomain capability for staging (staging.trucksafe.com)
2. If Wix blocks subdomains, use alternative (trucksafenew.vercel.app)
3. During migration: Transfer domain to Vercel DNS
4. Email: Research Wix → Google Workspace direct integration
5. Ensure no email downtime during transition

### Wix Documentation Review
- Research Wix export capabilities
- Identify migration pitfalls
- Review Wix-to-platform migration guides
- Document best practices for DNS cutover

---

## Deployment & Migration Strategy

### Phase 1: Development Environment (Current)
- **Status:** Active development
- **URL:** `localhost:3000`
- **Purpose:** Building features, testing, iteration
- **Database:** Local PostgreSQL via Railway connection

### Phase 2: Staging Environment
- **Timing:** When core features complete (8-12 weeks)
- **URL:** `staging.trucksafe.com` (if Wix allows) or custom Vercel subdomain
- **Database:** Staging PostgreSQL on Railway (separate volume)
- **Purpose:**
  - Brandon's review and feedback
  - Content population (migrate Wix content)
  - User acceptance testing
  - Performance testing
  - SEO optimization and validation

### Phase 3: Production Soft Launch
- **Timing:** After staging approval (2-3 weeks)
- **Strategy:** Parallel operation with Wix
- **URL:** Subdomain or beta.trucksafe.com
- **Access:** Invite-only for select existing customers
- **Purpose:**
  - Real-world beta testing
  - Gather user feedback
  - Monitor performance under load
  - Fix critical bugs
  - Build confidence before full migration

### Phase 4: Full Migration
- **Timing:** After successful soft launch (2-4 weeks)
- **Strategy:** DNS cutover weekend

**Pre-Migration Checklist:**
- ✅ All Wix content migrated and verified
- ✅ All URLs mapped with 301 redirects
- ✅ Member data imported
- ✅ Stripe integration tested
- ✅ Email delivery tested (SendGrid + Mailchimp)
- ✅ Freshbooks API integration verified
- ✅ Thinkific SSO tested
- ✅ Performance benchmarks met
- ✅ Mobile responsiveness verified
- ✅ SEO scores validated (Lighthouse > 90)
- ✅ Backup/rollback plan ready

**Migration Weekend:**
1. Friday evening: Lower DNS TTL to 5 minutes
2. Saturday 2 AM EST (low traffic):
   - Point DNS to Vercel
   - Monitor error rates
   - Test all critical flows
   - Brandon on standby
3. Saturday morning: Verify all systems operational
4. Send announcement email to all users
5. Monitor closely for 48 hours

**Post-Migration:**
- Monitor analytics for traffic patterns
- Check for 404 errors (redirect as needed)
- Track form submissions and conversions
- Gather user feedback
- Keep Wix site as backup for 30 days (read-only)

### Minimizing Disruption
- **Content Parity:** 100% of Wix content replicated
- **URL Preservation:** Comprehensive 301 redirect mapping
- **Design Consistency:** Brand identity maintained
- **Customer Communication:**
  - Email announcement 1 week before
  - Highlight new features and improvements
  - Provide support resources and video walkthrough
  - Offer migration assistance
  - 24/7 support availability during transition
- **Phased Rollout:** Test with friendly customers first

---

## Development Priorities

### Immediate (Weeks 1-2)
1. ✅ Authentication system (NextAuth with Google/Microsoft)
2. ✅ Member dashboard with service cards
3. ✅ Navigation system (context-aware)
4. ⏳ Create placeholder pages for all nav links
5. ✅ Document project architecture (this README)
6. ⏳ Wix site audit and URL mapping
7. ⏳ Set up PostgreSQL on Railway + Prisma schema

### Short Term (Weeks 3-6)
1. **Admin CMS (Priority 1):**
   - Article management (create, edit, draft, publish, schedule)
   - Trucksafe LIVE! scheduling and guest management
   - Bootcamp event creation and management
   - Network resource management
   - Media library
   - Claude AI integration for content assistance

2. **User System:**
   - Registration flow (credentials + OAuth)
   - Email verification
   - Password reset
   - User role/tag system
   - Privacy settings

3. **Stripe Integration:**
   - Subscription checkout
   - Webhook handling
   - Customer portal (manage subscription)

### Medium Term (Weeks 7-12)
1. **Article System (Priority 2):**
   - Public article browsing and reading
   - Category/tag filtering
   - SEO optimization
   - Social sharing
   - Related articles
   - Author pages

2. **Trucksafe LIVE! Integration:**
   - YouTube API integration
   - Auto-transcript extraction
   - AI show notes generation
   - Episode pages with embedded video

3. **Freshbooks Integration:**
   - Client sync
   - Invoice display
   - Payment processing via Stripe
   - Consulting hours tracking

4. **Email System:**
   - SendGrid setup (transactional)
   - Mailchimp integration (marketing)
   - Email notification preferences
   - Automated campaigns

### Long Term (Weeks 13-20)
1. **Network Forums (Priority 3):**
   - Forum categories and access control
   - Post creation with rich text editor
   - Comments and reactions
   - Member directory
   - Direct messaging
   - Notifications

2. **Compliance+ Portal:**
   - Dashboard with tier-specific content
   - Resource library
   - Webinar management
   - Calendly integration

3. **Client Portal:**
   - Secure messaging
   - Document repository (Dropbox integration)
   - Billing integration
   - 2FA implementation

4. **Bootcamp System:**
   - Event management backend
   - Registration system
   - Current attendee portal
   - Alumni portal by year

### Future (Post-Launch)
1. Thinkific SSO and course completion tracking
2. TSC Certification system
3. FleetPrep integration
4. Risk Control service integration (compliance reports)
5. Advanced analytics and reporting
6. Mobile app enhancements (PWA++)

---

## Current Status

### ✅ Completed
- Homepage with all sections
- Service landing pages (Academy, Network, Bootcamp, LIVE!, Expert Witness, DOT Audit)
- Articles listing page with filters
- Article detail template
- Contact page
- About page
- Login page with NextAuth integration (credentials only - OAuth pending)
- Member dashboard with dynamic service cards
- Context-aware member navigation bar
- Network forums page (UI only, no backend)
- Persistent navigation across all pages
- Smooth client-side routing (Link components)

### 🔨 In Progress
- Database schema finalization
- Wix site audit
- URL mapping document

### ⏳ Planned (Next 2 Weeks)
- PostgreSQL setup on Railway
- Prisma migrations
- OAuth provider configuration (Google + Microsoft)
- User registration flow
- Admin CMS (article management)

### 🚧 Blockers
**None** - Ready to proceed!

---

## Key Technology Decisions

### Confirmed Decisions
1. **Hosting:** Vercel (existing account, perfect for Next.js)
2. **Database:** Railway Pro (existing account with 1TB storage)
3. **Authentication:** NextAuth v4 (credentials + Google + Microsoft OAuth)
4. **Payments:** Stripe (existing account)
5. **Email - Transactional:** SendGrid (automated, notifications)
6. **Email - Marketing:** Mailchimp (existing account, newsletters)
7. **File Storage:** Vercel Blob Storage (media) + Dropbox API (client docs)
8. **Video:** YouTube API
9. **Analytics:** Google Analytics
10. **Domain:** Vercel DNS (after Wix migration)

### Decisions for Brandon
1. **Calendly Integration:** Confirm this is the preferred scheduling tool for consulting bookings
2. **Wix Export:** Confirm ability to export member list, content, and URLs
3. **Timeline:** Aggressive (3 months) vs Moderate (4 months) vs Conservative (5-6 months)?

---

## Success Metrics

### Technical
- Page load time < 2 seconds (Lighthouse performance > 90)
- 99.9% uptime (Vercel SLA)
- Mobile responsive on all pages
- Accessibility (WCAG AA compliance)
- SEO scores > 90 on Lighthouse
- Zero data loss during migration

### Business
- Successful migration with < 5% traffic loss
- All Wix functionality replicated or improved
- Stripe integration working for all tiers
- 80%+ of existing members migrated within 30 days
- Support tickets related to platform < 10/week
- Positive user feedback (4+/5 stars)

### User Experience
- < 3 clicks to any major feature
- Clear upgrade paths (free → Basic → Pro → Premium)
- Seamless authentication flow (< 30 seconds to login)
- Fast content discovery (search, filters, related content)
- Mobile usage represents 30-40% of traffic
- Email deliverability > 95%

---

## Risk Management

### Identified Risks

**Technical Risks:**
1. **Wix Domain/Subdomain Limitations:** May not be able to create staging subdomain
   - **Mitigation:** Use Vercel preview deployment URL for staging

2. **Email Continuity:** Gmail email management currently through Wix
   - **Mitigation:** Research Google Workspace direct integration before migration

3. **Member Password Migration:** Cannot export passwords from Wix
   - **Mitigation:** Force password reset for all users with clear communication

4. **Database Scale:** Forum + media uploads could grow quickly
   - **Mitigation:** Railway Pro offers 1TB, implement retention policies

**Business Risks:**
1. **User Adoption:** Existing members may resist change
   - **Mitigation:** Soft launch with friendly customers, excellent support, clear benefits

2. **Revenue Interruption:** Stripe integration issues could affect subscriptions
   - **Mitigation:** Extensive testing, maintain Wix backup, phased migration

3. **SEO Impact:** URL changes could affect search rankings
   - **Mitigation:** Proper 301 redirects, maintain URL structure where possible

**Timeline Risks:**
1. **Scope Creep:** Project complexity growing
   - **Mitigation:** This README defines scope clearly, prioritize ruthlessly

2. **Integration Challenges:** Third-party APIs may be complex
   - **Mitigation:** Build integrations incrementally, test thoroughly

---

## Notes & Considerations

### Critical Reminders
- **Avoid Scope Creep:** Finish core features before adding enhancements
- **Mobile First:** 40%+ of traffic will be mobile devices
- **SEO Critical:** Many users discover Trucksafe via search
- **Security Matters:** 2FA for clients, secure document handling, GDPR/CCPA compliance
- **Performance:** Fast load times critical for user retention and SEO
- **Support Documentation:** Clear help center and FAQs before launch
- **User Onboarding:** Consider guided tour for complex features
- **Data Backup:** Automated daily backups via Railway
- **Monitoring:** Set up error tracking (Sentry or similar) and uptime monitoring

### Brandon's Preferences
- Claude AI assistance throughout admin CMS for content creation
- Minimize customer friction during migration
- Focus on revenue-generating features (Compliance+, Client Portal)
- Maintain professional brand identity throughout
- Prioritize speed and simplicity where possible

---

## Resources & Documentation

### Internal Documentation
- [Network Integration Spec](./Network_Integration_Spec.md)
- [Compliance+ Description](./Trucksafe_Compliance_Plus_Description.docx)
- [TSC Certification Policy](./Trucksafe_Certified_Operations_Policy_2_2_24.docx)
- [Feature Comparison](./Feature_Comparison.pdf)

### External Resources
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- NextAuth Documentation: https://next-auth.js.org
- Vercel Documentation: https://vercel.com/docs
- Railway Documentation: https://docs.railway.app
- Stripe API: https://stripe.com/docs/api
- Freshbooks API: https://www.freshbooks.com/api
- Thinkific API: https://developers.thinkific.com
- YouTube Data API: https://developers.google.com/youtube/v3

### Current Accounts
- **Vercel:** Free plan (trucksafe.com account)
- **Railway:** Pro plan with 1TB storage
- **Stripe:** Active account (via Freshbooks)
- **Freshbooks:** Active for accounting/invoicing
- **Mailchimp:** Active for newsletters
- **Dropbox:** Active for file storage
- **YouTube:** Trucksafe channel for videos
- **Domain:** Currently managed by Wix (www.trucksafe.com)

---

## Next Actions

### This Week (Week 1)
1. ✅ Complete README documentation
2. ⏳ Audit Wix site (pages, URLs, content)
3. ⏳ Create URL mapping spreadsheet
4. ⏳ Set up PostgreSQL database on Railway
5. ⏳ Create initial Prisma schema
6. ⏳ Run first migration
7. ⏳ Create placeholder pages for all nav links

### Next Week (Week 2)
1. Configure Google & Microsoft OAuth providers
2. Build user registration flow
3. Implement email verification
4. Create user role/tag system
5. Begin admin CMS (article management)

### Ongoing
- Test all new features thoroughly
- Document API integrations
- Gather feedback from Brandon
- Adjust priorities as needed

---

**Last Updated:** February 17, 2026  
**Document Version:** 2.0  
**Project Status:** Active Development  
**Current Sprint:** Documentation & Planning Complete, Moving to Database Setup  
**Next Milestone:** Admin CMS + User Registration (Weeks 3-6)  
**Estimated Launch:** 16-20 weeks (mid-June 2026)

---

# FreshBooks & Billing Integration
*Added: February 2026*

---

## Overview

Trucksafe uses two billing systems that must appear seamless to members:

| System | Used For |
|---|---|
| **Stripe (direct)** | Compliance+ subscriptions, Shop purchases |
| **FreshBooks → Stripe** | Consulting invoices, project work |

Both are normalized into a single `BillingHistory` table and displayed as one unified billing page at `/portal/billing`.

---

## FreshBooks API

- **Auth:** OAuth 2.0, bearer tokens expire every 12 hours, refresh token stored securely
- **Time tracking:** `GET /timetracking/business/<business_id>/time_entries` — filterable by `client_id` and date range
- **Invoices:** `GET /accounting/account/<account_id>/invoices/invoices` — filterable by `clientid`
- **Invoice PDF:** `invoice.getPDF` call — proxied server-side through our API (client never touches FreshBooks directly)
- **Online payments:** FreshBooks hosted payment URL — requires **Advanced Payments add-on** (confirmed enabled)
- **Webhooks:** `invoice.create`, `invoice.update`, `client.create`

### Environment Variables Required
```
FRESHBOOKS_CLIENT_ID=
FRESHBOOKS_CLIENT_SECRET=
FRESHBOOKS_REDIRECT_URI=
FRESHBOOKS_ACCESS_TOKEN=
FRESHBOOKS_REFRESH_TOKEN=
FRESHBOOKS_ACCOUNT_ID=
INTERNAL_EMAIL_DOMAINS=trucksafe.com
```

---

## Consulting Hours (Compliance+ Pro & Premium)

- **Source of truth:** FreshBooks time entries (not Calendly)
- **Trucksafe staff must log all consulting time in FreshBooks** regardless of how the session was arranged
- **Quarter logic:** Calendar quarters (Q1=Jan–Mar, Q2=Apr–Jun, Q3=Jul–Sep, Q4=Oct–Dec) — not subscription anniversary dates
- **Allowances:** Pro = 2 hrs/quarter, Premium = 5 hrs/quarter
- **Data freshness:** Daily sync at midnight — cached in `ConsultingHoursCache`
- **Display:** Hours widget on `/complianceplus/consulting` with Calendly link if hours remain

---

## FreshBooks Client Flows

### When Trucksafe Creates a Client in FreshBooks

1. FreshBooks fires `client.create` webhook
2. If email matches `INTERNAL_EMAIL_DOMAINS` → mark `isBillingOnly: true`, skip (no portal account)
3. If real client email matches existing Trucksafe account → create `FreshbooksClientQueue` record with `existingUserId`
4. If no match → create `FreshbooksClientQueue` record (existingUserId: null)
5. Create `AdminNotification`, send email to brandon@trucksafe.com

**Admin actions:**
- **Approve (existing account):** Link `freshbooksClientId`, grant `portalAccess`, send invitation email
- **Approve (new):** Create account, send invitation email from brandon@trucksafe.com via SendGrid
- **Dismiss:** Clear notification, no account created

### When a User Upgrades to Pro/Premium (Compliance+)

1. Stripe webhook fires `customer.subscription.updated`
2. Search FreshBooks by email (exact match)
3. If email match → link `freshbooksClientId`, grant `portalAccess`, trigger immediate sync
4. If name-only match → create `FreshbooksClientReview`, notify admin
5. If no match → create new FreshBooks client via API, link, trigger sync

---

## Unified Billing Portal (`/portal/billing`)

### Data Model

All billing records from both Stripe and FreshBooks are normalized into `BillingHistory`:

```
source        'stripe' | 'freshbooks'   (internal only — never shown to client)
sourceId      Stripe payment ID or FreshBooks invoice ID
category      'subscription' | 'consulting' | 'shop'
description   Human-readable label (e.g. "Compliance+ Pro - March 2026")
amount        Float
status        'paid' | 'unpaid' | 'overdue' | 'draft' | 'refunded'
invoiceDate   DateTime
pdfUrl        Stripe: invoice_pdf URL | FreshBooks: proxied via /api/freshbooks/invoices/[id]/pdf
paymentUrl    FreshBooks hosted payment link (unpaid FB invoices only)
receiptUrl    Stripe hosted receipt URL (paid Stripe charges)
```

### What Members See

```
Mar 2026  Compliance+ Pro Subscription    $495.00  ✓ Paid    [Download PDF]
Feb 2026  Consulting Services - Q1 2026  $500.00  ✓ Paid    [Download PDF]
Jan 2026  Consulting Services - Q1 2026  $750.00  ● Unpaid  [Pay Now ↗] [Download PDF]
Jan 2026  Compliance+ Pro Subscription    $495.00  ✓ Paid    [Download PDF]
```

- Every line item has **Download PDF** (Stripe provides `invoice_pdf` URL automatically; FreshBooks PDFs are proxied)
- **Pay Now** only appears on unpaid FreshBooks invoices — links to FreshBooks hosted payment page
- No mention of Stripe or FreshBooks anywhere visible to the client

### PDF Notes

- **Stripe PDFs:** Direct URL from `invoice_pdf` field — Stripe generates automatically on all finalized invoices. URL is publicly accessible but unguessable (same approach Stripe uses in customer emails).
- **FreshBooks PDFs:** Fetched server-side using our bearer token and streamed to client. Client never touches FreshBooks directly.

---

## Security Model

All billing endpoints verify:
1. **Session exists** — user must be authenticated
2. **Ownership** — `session.user.id` must match the requested `userId`
3. **Portal access** — user must have `portalAccess: true`
4. **Cache scoping** — `BillingHistory` and `InvoiceCache` always queried by `userId`, never by invoice ID alone
5. **PDF proxy** — verifies cache record exists for authenticated user before fetching from FreshBooks
6. **Admin separation** — admin billing views use separate `isAdmin` auth check

---

## Daily Sync Cron Job (midnight)

```
1. Refresh FreshBooks OAuth token
2. Stripe sync (all users with active/past subscriptions)
   → Pull charges → normalize → upsert BillingHistory (source: 'stripe')
3. FreshBooks sync (all users where isFreshbooksClient: true)
   → Pull time entries → bucket by quarter → upsert ConsultingHoursCache
   → Pull invoices → upsert InvoiceCache
   → Normalize invoices → upsert BillingHistory (source: 'freshbooks')
4. Log results in FreshbooksSync
5. On failure → create AdminNotification (type: 'sync_failure')
```

---

## Admin Notification System

`AdminNotification` is a general-purpose table for surfacing issues to the admin panel. Current types:

| Type | Trigger | Email? |
|---|---|---|
| `freshbooks_client_queue` | New FreshBooks client needs review | Yes — brandon@trucksafe.com |
| `freshbooks_review` | Ambiguous name match on upgrade | Yes — brandon@trucksafe.com |
| `sync_failure` | Nightly sync job error | No — panel only |

Unread notifications drive a badge counter on the admin nav. Extensible for future types (flagged forum posts, Bootcamp issues, etc.).

---

## API Routes

```
/api/freshbooks
├── /auth/callback          OAuth callback
├── /auth/refresh           Refresh access token
├── /clients/search         Search FreshBooks by email or name
├── /clients/create         Create new FreshBooks client
├── /hours/[userId]         Cached hours + allowance for current quarter
├── /invoices/[userId]      Cached invoice list (billing portal)
├── /invoices/[id]/pdf      Server-side PDF proxy (FreshBooks only)
├── /sync/hours             Cron: sync time entries
├── /sync/invoices          Cron: sync invoices + billing history
└── /webhooks/freshbooks    Receive FreshBooks webhook events

/api/billing
└── /history/[userId]       Unified BillingHistory for billing portal

/api/admin/notifications
├── GET  /                  List notifications (unread count for badge)
├── POST /[id]/read         Mark as read
└── POST /[id]/action       Approve or dismiss queue/review items
```

---

# Thinkific Academy Integration

## Overview

Thinkific hosts Trucksafe's safety manager training courses. The integration connects Thinkific's course platform with the Trucksafe member experience through a **linked accounts model** — no SSO required. Members link their Thinkific account once, and course progress appears automatically on their Trucksafe profile from that point forward.

**Plan:** Legacy Monthly + Grow  
**Authentication:** API Key (simple header-based, no OAuth)  
**Base URL:** `https://api.thinkific.com/api/public/v1`  
**Key constraint:** SSO requires Thinkific Plus plan. Integration uses account linking + webhooks instead.

---

## Architecture

### Core Principle: Two Independent User Universes

Thinkific and Trucksafe maintain separate user databases. Many Thinkific students are not Trucksafe platform members, and the integration must handle both populations gracefully.

Rather than assuming email parity, we maintain a `ThinkificUser` table that represents anyone who exists in Thinkific — regardless of whether they have a Trucksafe account. A nullable foreign key on `ThinkificUser` (`trucksafeUserId`) creates the bridge when a user explicitly links their accounts.

This means:
- Webhook data is captured for **all** Thinkific students immediately, even before they join the platform
- When a Thinkific-only student later creates a Trucksafe account and links it, their full course history is already waiting
- No backfill jobs needed, no data loss

### Data Flow

```
Thinkific Events
      │
      ▼
Webhook Handler ──► ThinkificUser (upsert by email)
      │                    │
      │                    ▼
      │            ThinkificEnrollment (upsert by enrollmentId)
      │
      └── (if trucksafeUserId linked) ──► Profile display updated

Account Linking Flow
      │
      ▼
User enters Thinkific email
      │
      ├── Check ThinkificUser table (likely already exists from webhook history)
      │       └── Found: link instantly, history appears immediately
      │
      └── Not found: query Thinkific API by email
              ├── Found: create ThinkificUser, link, pull full enrollment history
              └── Not found: offer to create Thinkific account via API, then link
```

---

## Database Schema

Add to `prisma/schema.prisma`:

```prisma
model ThinkificUser {
  id                  String    @id @default(cuid())
  thinkificId         Int       @unique
  email               String    @unique
  firstName           String?
  lastName            String?
  createdInThinkific  DateTime?
  lastSyncedAt        DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  // Nullable: null until user explicitly links accounts
  trucksafeUserId     String?   @unique
  trucksafeUser       User?     @relation(fields: [trucksafeUserId], references: [id])

  enrollments         ThinkificEnrollment[]
}

model ThinkificEnrollment {
  id                  String    @id @default(cuid())
  thinkificUserId     String
  thinkificEnrollId   Int       @unique   // Thinkific's enrollment ID
  courseId            Int
  courseName          String
  percentageCompleted Float     @default(0)
  activatedAt         DateTime?
  startedAt           DateTime?
  completedAt         DateTime?
  expiryDate          DateTime?
  certificateUrl      String?   // Only populated on enrollment.completed webhook
  freeTrial           Boolean   @default(false)
  lastWebhookAt       DateTime? // Timestamp of last webhook that updated this record
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  thinkificUser       ThinkificUser @relation(fields: [thinkificUserId], references: [id])

  @@index([thinkificUserId])
  @@index([courseId])
}
```

**Note:** No changes required to the existing `User` model. The relation is managed entirely through `ThinkificUser.trucksafeUserId`.

---

## Environment Variables

```env
THINKIFIC_API_KEY=your_api_key_here
THINKIFIC_SUBDOMAIN=trucksafe   # e.g. trucksafe.thinkific.com
THINKIFIC_WEBHOOK_SECRET=your_webhook_hmac_secret
```

API key is found in Thinkific Admin → Settings → Code & Analytics → API.

---

## API Routes

```
/api/thinkific/
├── webhooks                    POST  Receive all Thinkific webhook events
├── link                        POST  Initiate account linking by email lookup
├── link/confirm                POST  Save confirmed account link
├── sync/[userId]               POST  Full enrollment sync for a linked user (on-demand)
└── users/search                GET   Internal: search ThinkificUser table

/api/academy/
├── progress/[userId]           GET   Enrollment data for profile display (reads cache)
└── courses                     GET   All available courses (cached from Thinkific API)
```

---

## Webhook Handler

Thinkific sends webhook events to `/api/thinkific/webhooks`. We subscribe to three events:

| Event | Trigger | Action |
|---|---|---|
| `enrollment.created` | User enrolls in a course | Create/update ThinkificUser + ThinkificEnrollment |
| `enrollment.progress` | User completes a lesson | Update percentageCompleted |
| `enrollment.completed` | User completes entire course | Update completedAt + certificateUrl |

### Verification

All incoming webhooks include an `X-Thinkific-Hmac-Sha256` header. Verify before processing:

```typescript
// api/thinkific/webhooks.ts

import crypto from 'crypto';

function verifyWebhook(body: string, signature: string): boolean {
  const hmac = crypto
    .createHmac('sha256', process.env.THINKIFIC_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(signature)
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('X-Thinkific-Hmac-Sha256') || '';

  if (!verifyWebhook(body, signature)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);
  await handleWebhookEvent(event);
  return Response.json({ received: true }, { status: 200 });
  // IMPORTANT: Always return 200 quickly. Thinkific retries on non-200 responses
  // up to 14 times over 16 hours. Process async if needed.
}
```

### Event Handler

```typescript
async function handleWebhookEvent(event: ThinkificWebhookEvent) {
  const { resource, action, payload } = event;

  if (resource !== 'enrollment') return;

  const { user, course } = payload;

  // Upsert ThinkificUser — create if first time we've seen this person
  const thinkificUser = await prisma.thinkificUser.upsert({
    where: { thinkificId: user.id },
    create: {
      thinkificId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    update: {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });

  // Upsert ThinkificEnrollment
  const enrollmentData = {
    thinkificUserId: thinkificUser.id,
    courseId: course.id,
    courseName: course.name,
    percentageCompleted: parseFloat(payload.percentage_completed || '0'),
    activatedAt: payload.activated_at ? new Date(payload.activated_at) : undefined,
    startedAt: payload.started_at ? new Date(payload.started_at) : undefined,
    completedAt: payload.completed_at ? new Date(payload.completed_at) : undefined,
    expiryDate: payload.expiry_date ? new Date(payload.expiry_date) : undefined,
    certificateUrl: payload.certificate_url || undefined,
    freeTrial: payload.free_trial || false,
    lastWebhookAt: new Date(),
  };

  await prisma.thinkificEnrollment.upsert({
    where: { thinkificEnrollId: payload.id },
    create: { thinkificEnrollId: payload.id, ...enrollmentData },
    update: enrollmentData,
  });
}
```

---

## Account Linking Flow

### Route: POST /api/thinkific/link

Called when a Trucksafe member submits their Thinkific email in the Academy section.

```typescript
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) return unauthorized();

  const { email } = await req.json();

  // Step 1: Check our own ThinkificUser table first (fast, no API call)
  let thinkificUser = await prisma.thinkificUser.findUnique({
    where: { email: email.toLowerCase() },
    include: { enrollments: true },
  });

  // Step 2: If not in our DB, query Thinkific API
  if (!thinkificUser) {
    const apiUser = await searchThinkificByEmail(email);

    if (apiUser) {
      // Create ThinkificUser record from API data
      thinkificUser = await prisma.thinkificUser.create({
        data: {
          thinkificId: apiUser.id,
          email: apiUser.email,
          firstName: apiUser.first_name,
          lastName: apiUser.last_name,
        },
      });

      // Pull full enrollment history from API and cache it
      await syncEnrollmentsFromApi(thinkificUser.id, apiUser.id);
    }
  }

  if (!thinkificUser) {
    // No Thinkific account found — return flag to offer account creation
    return Response.json({ found: false });
  }

  // Step 3: Check this Thinkific account isn't already linked to someone else
  if (thinkificUser.trucksafeUserId && thinkificUser.trucksafeUserId !== session.user.id) {
    return Response.json({ error: 'This Thinkific account is linked to another user' }, { status: 409 });
  }

  return Response.json({
    found: true,
    thinkificUserId: thinkificUser.id,
    enrollmentCount: thinkificUser.enrollments?.length || 0,
    previewData: thinkificUser.enrollments?.slice(0, 3), // Show preview before confirming
  });
}
```

### Route: POST /api/thinkific/link/confirm

Called after user reviews the preview and clicks confirm.

```typescript
export async function POST(req: Request) {
  const session = await getServerSession();
  const { thinkificUserId } = await req.json();

  await prisma.thinkificUser.update({
    where: { id: thinkificUserId },
    data: { trucksafeUserId: session.user.id, lastSyncedAt: new Date() },
  });

  return Response.json({ linked: true });
}
```

---

## Full Enrollment Sync

Called on initial link and nightly as a safety net. Pulls all enrollments from the Thinkific API for a user and upserts them into our cache.

```typescript
// utils/thinkific/sync.ts

export async function syncEnrollmentsFromApi(thinkificUserId: string, thinkificId: number) {
  const enrollments = await fetchAllEnrollments(thinkificId);

  for (const enrollment of enrollments) {
    await prisma.thinkificEnrollment.upsert({
      where: { thinkificEnrollId: enrollment.id },
      create: {
        thinkificUserId,
        thinkificEnrollId: enrollment.id,
        courseId: enrollment.course_id,
        courseName: enrollment.course_name,
        percentageCompleted: parseFloat(enrollment.percentage_completed || '0'),
        activatedAt: enrollment.activated_at ? new Date(enrollment.activated_at) : undefined,
        startedAt: enrollment.started_at ? new Date(enrollment.started_at) : undefined,
        completedAt: enrollment.completed_at ? new Date(enrollment.completed_at) : undefined,
        expiryDate: enrollment.expiry_date ? new Date(enrollment.expiry_date) : undefined,
        certificateUrl: enrollment.certificate_url || undefined,
        freeTrial: enrollment.free_trial || false,
      },
      update: {
        percentageCompleted: parseFloat(enrollment.percentage_completed || '0'),
        completedAt: enrollment.completed_at ? new Date(enrollment.completed_at) : undefined,
        certificateUrl: enrollment.certificate_url || undefined,
        lastWebhookAt: new Date(),
      },
    });
  }

  await prisma.thinkificUser.update({
    where: { id: thinkificUserId },
    data: { lastSyncedAt: new Date() },
  });
}

async function fetchAllEnrollments(thinkificId: number) {
  const results = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.thinkific.com/api/public/v1/enrollments?query[user_id]=${thinkificId}&page=${page}&limit=50`,
      {
        headers: {
          'X-Auth-API-Key': process.env.THINKIFIC_API_KEY!,
          'X-Auth-Subdomain': process.env.THINKIFIC_SUBDOMAIN!,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    results.push(...data.items);

    // Thinkific returns pagination metadata
    hasMore = data.meta.pagination.current_page < data.meta.pagination.total_pages;
    page++;
  }

  return results;
}
```

---

## Nightly Sync Cron

Runs at 2 AM as part of the existing nightly cron job. Refreshes all linked users as a safety net against missed webhooks.

```typescript
// api/cron/nightly.ts (add to existing cron)

async function syncThinkificEnrollments() {
  const linkedUsers = await prisma.thinkificUser.findMany({
    where: { trucksafeUserId: { not: null } },
    select: { id: true, thinkificId: true },
  });

  for (const user of linkedUsers) {
    try {
      await syncEnrollmentsFromApi(user.id, user.thinkificId);
    } catch (err) {
      console.error(`Thinkific sync failed for user ${user.id}:`, err);
      // Non-critical: log but don't block other syncs
    }
  }
}
```

---

## Profile Display

### Route: GET /api/academy/progress/[userId]

Reads from local cache — no live Thinkific API call at display time.

```typescript
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const session = await getServerSession();

  // Users can only view their own progress
  if (session?.user?.id !== params.userId) return unauthorized();

  const thinkificUser = await prisma.thinkificUser.findUnique({
    where: { trucksafeUserId: params.userId },
    include: {
      enrollments: {
        where: { freeTrial: false }, // Exclude free preview enrollments
        orderBy: { activatedAt: 'desc' },
      },
    },
  });

  if (!thinkificUser) {
    return Response.json({ linked: false });
  }

  return Response.json({
    linked: true,
    lastSynced: thinkificUser.lastSyncedAt,
    enrollments: thinkificUser.enrollments.map(e => ({
      courseId: e.courseId,
      courseName: e.courseName,
      percentageCompleted: e.percentageCompleted,
      completedAt: e.completedAt,
      certificateUrl: e.certificateUrl,
      enrolledAt: e.activatedAt,
    })),
  });
}
```

### Profile UI Component

Displayed in the Academy section of the member profile:

```tsx
// components/profile/AcademyProgress.tsx

export function AcademyProgress({ userId }: { userId: string }) {
  const { data } = useSWR(`/api/academy/progress/${userId}`);

  if (!data?.linked) {
    return <LinkAccountPrompt />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Academy Courses</h3>
      {data.enrollments.map(course => (
        <div key={course.courseId} className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{course.courseName}</span>
            {course.certificateUrl && (
              <a
                href={course.certificateUrl}
                target="_blank"
                className="flex items-center gap-1 text-sm text-amber-600 font-medium"
              >
                <Award size={14} /> Certificate
              </a>
            )}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#363b57] h-2 rounded-full transition-all"
              style={{ width: `${course.percentageCompleted * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{Math.round(course.percentageCompleted * 100)}% complete</span>
            {course.completedAt && (
              <span>Completed {formatDate(course.completedAt)}</span>
            )}
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400">
        Last synced {formatRelative(data.lastSynced)}
      </p>
    </div>
  );
}
```

---

## Compliance+ Discount Codes

Pro and Premium subscribers receive a Thinkific discount code displayed in their Compliance+ dashboard. No API work required — codes are created manually in Thinkific Admin → Promotions → Coupons and stored as environment variables or in a simple admin config table.

```tsx
// In /complianceplus/dashboard — Pro and Premium only
{(tier === 'PRO' || tier === 'PREMIUM') && (
  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
    <h4 className="font-semibold text-amber-900">Academy Discount</h4>
    <p className="text-sm text-amber-700 mt-1">
      Use code <span className="font-mono font-bold">{ACADEMY_DISCOUNT_CODE}</span> for{' '}
      {tier === 'PREMIUM' ? '20%' : '10%'} off any Academy course.
    </p>
    <a href="https://trucksafe.thinkific.com" target="_blank" className="text-sm text-amber-700 underline mt-2 block">
      Browse courses →
    </a>
  </div>
)}
```

---

## Webhook Setup

Register webhooks programmatically via the Thinkific Webhooks API (v2) on first deploy, or manually in Thinkific Admin → Settings → Code & Analytics → Webhooks.

**Events to subscribe:**
- `enrollment/created`
- `enrollment/progress`
- `enrollment/completed`

**Target URL:** `https://trucksafe.com/api/thinkific/webhooks`

Note: Webhook target URL must use HTTPS. Use ngrok or similar for local development testing.

---

## Security Notes

- Verify `X-Thinkific-Hmac-Sha256` on every incoming webhook before processing
- Enrollment data is only returned for the authenticated user's own account — no cross-user access
- Free trial / preview enrollments are filtered out of profile display (`freeTrial: false`)
- Certificate URLs come directly from Thinkific and are hosted on their CDN — no proxy needed
- A Thinkific account can only be linked to one Trucksafe account. Attempt to link an already-linked account returns a 409 conflict

---

## Gotchas

- **`activated_at` is required for full enrollment** — when creating enrollments via API, always set `activated_at` or the student lands in free preview only
- **Certificate URL only in `enrollment.completed`** — progress events do not include it; only the completion event payload carries `certificate_url`
- **Percentage is a string in the API** (`"0.333..."`) — always parse with `parseFloat()`
- **Webhook retries** — Thinkific retries failed webhooks up to 14 times over 16 hours. The handler must be idempotent (upsert, not insert) to handle duplicate deliveries gracefully
- **Rate limits** — Thinkific API has rate limits on the Grow plan; the nightly sync paginates through enrollments sequentially rather than in parallel to avoid hitting limits

---

# Client Portal & Dropbox Integration

## Overview

The Client Portal gives consulting clients browser-based access to documents Trucksafe places in their Dropbox folder, and optionally allows clients to upload documents back to Trucksafe — all without clients needing a Dropbox account. The platform watches two specific subfolders within each client's Dropbox folder, syncing every 15 minutes. Everything else in the client's folder is invisible to the portal.

**Dropbox account type:** Dropbox Business Teams  
**Authentication:** OAuth 2.0 with offline refresh token (service account — one token for the platform)  
**SDK:** `dropbox` npm package  
**Sync approach:** Vercel Cron every 15 minutes (not webhooks)

---

## Dropbox Folder Structure

Trucksafe maintains one folder per client. The platform only reads/writes two specific subfolders. All other subfolders (e.g. `Admin/`) are completely ignored.

```
Dropbox/
└── Trucksafe/
    └── Client Documents/
        └── [Client Name]/          ← e.g. "ACIG" — named by admin at client creation
            ├── Client Portal Docs/ ← Staff drops files here → auto-appears in portal (read-only for client)
            ├── Client Uploads/     ← Client portal uploads land here (visible to client as history)
            └── Admin/              ← Internal use only, never visible in portal (example existing folder)
```

**Root path constant:**
```
DROPBOX_CLIENTS_ROOT = /Trucksafe/Client Documents
```

New client folder path is constructed as:
```
/Trucksafe/Client Documents/[clientName]
```

Where `clientName` is entered by admin at creation time (e.g. `"ACIG"`).

---

## Client Setup State Machine

Every client account tracks setup completion across three systems. This drives what the admin dashboard surfaces as "needs attention."

```prisma
enum SetupStatus {
  NOT_NEEDED   // This system is not applicable for this client
  PENDING      // Needs to be set up or linked — admin attention required
  LINKED       // Connected and operational
}
```

Each `ClientPortalConfig` record carries three status fields:

| Field | Meaning |
|---|---|
| `freshbooksStatus` | `NOT_NEEDED` / `PENDING` / `LINKED` |
| `dropboxStatus` | `NOT_NEEDED` / `PENDING` / `LINKED` |
| `portalAccess` | `Boolean` — can this client log in to the portal? |

---

## How Clients Come Into Existence

There are three entry points. All three must result in a consistent `ClientPortalConfig` state.

### Entry Point 1: Admin Manual Creation

Admin fills out the Create Client form in `/admin/clients/new`. The platform orchestrates all three systems in sequence with live status feedback.

**Form fields:**
- Client name (used as Dropbox folder name, e.g. `"ACIG"`)
- Primary contact name + email
- Client type: Compliance+ subscriber / Standalone consulting client
- Compliance+ tier (if applicable): Basic / Pro / Premium
- Enable portal access immediately? (toggle)
- Enable client uploads? (toggle)

**Orchestration sequence on submit:**

```
Step 1: Create User + ClientPortalConfig in platform DB
Step 2: FreshBooks — search by email → link if found, create if not
Step 3: Dropbox — check if /Trucksafe/Client Documents/[clientName]/ exists
         → If exists: check for Client Portal Docs/ and Client Uploads/ subfolders,
                      create any that are missing, link
         → If not exists: create full folder structure, link
Step 4: Send welcome email with portal login instructions
```

Each step updates the `ClientPortalConfig` status fields in real time. The admin UI shows a live progress indicator for each step. If any step fails, the error is surfaced immediately with a retry button for that specific step — the admin does not need to start over.

**Failure handling:**
- Steps are independent — a Dropbox failure does not roll back FreshBooks
- Failed steps set the relevant status to `PENDING`
- Failed clients appear in the admin "Needs Attention" queue
- Each pending item shows exactly which step failed with a one-click retry

### Entry Point 2: Pro/Premium Stripe Subscription

When a Pro or Premium subscriber completes checkout, the Stripe webhook fires and the platform auto-runs setup. Basic subscribers are created as users only — portal and FreshBooks are `NOT_NEEDED` unless admin enables them later.

**Auto-setup flow for Pro/Premium:**

```typescript
// Triggered by: customer.subscription.created webhook

async function handleNewProPremiumSubscriber(stripeEvent) {
  const { email, name, company } = extractCustomerData(stripeEvent);

  // 1. Create or find User in platform DB
  const user = await upsertUser({ email, name });

  // 2. Create ClientPortalConfig with PENDING status
  await prisma.clientPortalConfig.create({
    data: {
      userId: user.id,
      freshbooksStatus: 'PENDING',
      dropboxStatus: 'PENDING',
      portalAccess: false, // enabled after setup completes
      uploadsEnabled: false,
    }
  });

  // 3. Run setup asynchronously (don't block the webhook response)
  await runClientSetup(user.id, company ?? name);
}

async function runClientSetup(userId: string, clientName: string) {
  await Promise.allSettled([
    setupFreshBooks(userId),
    setupDropbox(userId, clientName),
  ]);

  // Enable portal access if both systems linked successfully
  const config = await prisma.clientPortalConfig.findUnique({ where: { userId } });
  if (config.freshbooksStatus === 'LINKED' && config.dropboxStatus === 'LINKED') {
    await prisma.clientPortalConfig.update({
      where: { userId },
      data: { portalAccess: true },
    });
    await sendWelcomeEmail(userId);
  }
  // If either is PENDING, config stays portalAccess: false
  // Admin sees it in the Needs Attention queue
}
```

**Duplicate checking before creating:**

```typescript
async function setupFreshBooks(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // Check if FreshBooks client already exists by email
  const existing = await searchFreshBooksClientByEmail(user.email);

  if (existing) {
    // Link to existing — don't create duplicate
    await prisma.clientPortalConfig.update({
      where: { userId },
      data: { freshbooksClientId: existing.id, freshbooksStatus: 'LINKED' }
    });
  } else {
    const created = await createFreshBooksClient(user);
    await prisma.clientPortalConfig.update({
      where: { userId },
      data: { freshbooksClientId: created.id, freshbooksStatus: 'LINKED' }
    });
  }
}

async function setupDropbox(userId: string, clientName: string) {
  const folderPath = `${process.env.DROPBOX_CLIENTS_ROOT}/${clientName}`;
  const dbx = await getDropboxClient();

  // Check if folder exists
  const exists = await checkDropboxFolderExists(dbx, folderPath);

  if (!exists) {
    await dbx.filesCreateFolderV2({ path: folderPath, autorename: false });
  }

  // Ensure both portal subfolders exist (create only if missing)
  await ensureSubfolder(dbx, `${folderPath}/Client Portal Docs`);
  await ensureSubfolder(dbx, `${folderPath}/Client Uploads`);

  await prisma.clientPortalConfig.update({
    where: { userId },
    data: {
      dropboxFolderPath: folderPath,
      dropboxStatus: 'LINKED'
    }
  });
}

async function ensureSubfolder(dbx: Dropbox, path: string) {
  try {
    await dbx.filesGetMetadata({ path });
    // Folder exists — nothing to do
  } catch (err) {
    if (err?.status === 409) {
      // Path not found — create it
      await dbx.filesCreateFolderV2({ path, autorename: false });
    } else {
      throw err;
    }
  }
}
```

### Entry Point 3: Existing Consulting Client Being Connected

Existing clients (already in FreshBooks, already have a Dropbox folder) need their records linked in the platform. Admin uses the "Connect Existing Client" flow in `/admin/clients/[userId]/setup`.

**Search and link — FreshBooks:**
- Admin searches by name or email
- Platform queries FreshBooks API: `GET /clients?search=[query]`
- Results displayed as a selectable list
- Admin clicks to link — stores `freshbooksClientId`, sets status to `LINKED`
- Or: admin can manually type the FreshBooks client ID if known

**Search and link — Dropbox:**
- Platform lists all folders under `/Trucksafe/Client Documents/`
- Admin searches by folder name
- **If no match found:** warning displayed — "No Dropbox folder found matching '[query]'. You can link manually or create a new folder."
- Admin can: select from list, type a path manually, or trigger folder creation
- After linking: platform checks for `Client Portal Docs/` and `Client Uploads/` subfolders and creates any that are missing

---

## Database Schema

Add to `prisma/schema.prisma`:

```prisma
model ClientPortalConfig {
  id                  String      @id @default(cuid())
  userId              String      @unique

  // FreshBooks
  freshbooksClientId  String?                         // FreshBooks client ID once linked
  freshbooksStatus    SetupStatus @default(PENDING)

  // Dropbox
  dropboxFolderPath   String?                         // Full path e.g. /Trucksafe/Client Documents/ACIG
  dropboxStatus       SetupStatus @default(PENDING)

  // Portal access
  portalAccess        Boolean     @default(false)     // Can client log in to portal?
  uploadsEnabled      Boolean     @default(false)     // Can client upload via portal?
  lastSyncedAt        DateTime?                       // Last successful cron sync

  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt

  user                User        @relation(fields: [userId], references: [id])
  documents           ClientDocument[]
}

enum SetupStatus {
  NOT_NEEDED
  PENDING
  LINKED
}

model ClientDocument {
  id              String            @id @default(cuid())
  userId          String
  dropboxPath     String                                // Full Dropbox path for downloads
  dropboxFileId   String            @unique             // Stable Dropbox ID (survives renames)
  fileName        String
  fileSize        Int?                                  // Bytes
  mimeType        String?
  direction       DocumentDirection
  seenByClient    Boolean           @default(false)     // Flipped true on first client view
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  user            User              @relation(fields: [userId], references: [id])
  config          ClientPortalConfig @relation(fields: [userId], references: [userId])

  @@index([userId])
  @@index([userId, direction])
  @@index([dropboxFileId])
}

enum DocumentDirection {
  OUTBOUND   // Trucksafe → Client: staff placed file in Client Portal Docs/
  INBOUND    // Client → Trucksafe: client uploaded via portal, landed in Client Uploads/
}
```

---

## API Routes

```
/api/portal/
├── GET    /documents/[userId]              List all documents (outbound + inbound)
├── POST   /documents/[userId]/upload       Client uploads a file → Dropbox Client Uploads/
└── GET    /documents/[userId]/[docId]/url  Generate temporary Dropbox download link

/api/admin/clients/
├── GET    /                                List all clients with setup status
├── POST   /                                Create new client (unified workflow)
├── GET    /[userId]                        Client detail + setup status
├── POST   /[userId]/setup/freshbooks       Link or create FreshBooks client
├── POST   /[userId]/setup/dropbox          Link or create Dropbox folder
├── GET    /[userId]/setup/dropbox/search   Search existing Dropbox folders
└── GET    /freshbooks/search               Search FreshBooks clients by name/email

/api/cron/
└── GET    /dropbox-sync                    Called by Vercel Cron every 15 minutes
```

---

## 15-Minute Sync (Cron)

The cron reads every linked client's `Client Portal Docs/` folder and upserts new/changed files into `ClientDocument`. Files removed from Dropbox are soft-deleted (retained in DB for audit trail).

```typescript
// app/api/cron/dropbox-sync/route.ts

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const configs = await prisma.clientPortalConfig.findMany({
    where: { dropboxStatus: 'LINKED', portalAccess: true },
  });

  const results = { synced: 0, errors: 0 };

  for (const config of configs) {
    try {
      await syncClientPortalDocs(config);
      results.synced++;
    } catch (err) {
      console.error(`Dropbox sync failed for userId ${config.userId}:`, err);
      results.errors++;
    }
  }

  return Response.json(results);
}

async function syncClientPortalDocs(config: ClientPortalConfig) {
  const dbx = await getDropboxClient();
  const portalDocsPath = `${config.dropboxFolderPath}/Client Portal Docs`;

  const entries = await listAllFiles(dbx, portalDocsPath);

  for (const file of entries) {
    await prisma.clientDocument.upsert({
      where: { dropboxFileId: file.id },
      create: {
        userId: config.userId,
        dropboxPath: file.path_display!,
        dropboxFileId: file.id,
        fileName: file.name,
        fileSize: (file as any).size ?? null,
        mimeType: getMimeType(file.name),
        direction: 'OUTBOUND',
        seenByClient: false,
      },
      update: {
        dropboxPath: file.path_display!, // Update if staff moved or renamed
        fileName: file.name,
      },
    });
  }

  await prisma.clientPortalConfig.update({
    where: { id: config.id },
    data: { lastSyncedAt: new Date() },
  });
}

// Handles Dropbox pagination automatically
async function listAllFiles(dbx: Dropbox, path: string) {
  const listing = await dbx.filesListFolder({ path, recursive: false });
  let entries = [...listing.result.entries];
  let cursor = listing.result.cursor;

  while (listing.result.has_more) {
    const more = await dbx.filesListFolderContinue({ cursor });
    entries = [...entries, ...more.result.entries];
    cursor = more.result.cursor;
  }

  return entries.filter(e => e['.tag'] === 'file');
}
```

**Vercel Cron configuration** (`vercel.json`):
```json
{
  "crons": [
    { "path": "/api/cron/dropbox-sync", "schedule": "*/15 * * * *" }
  ]
}
```

---

## Client Upload Flow

When `uploadsEnabled` is true for a client, they can drag-and-drop files in the portal. Files go directly into their `Client Uploads/` folder in Dropbox.

```typescript
// app/api/portal/documents/[userId]/upload/route.ts

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg', 'image/png',
  'text/plain',
];
const MAX_FILE_SIZE = 52_428_800; // 50MB

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  const session = await getServerSession();
  if (session?.user?.id !== params.userId) return unauthorized();

  const config = await prisma.clientPortalConfig.findUnique({
    where: { userId: params.userId },
  });

  if (!config?.uploadsEnabled) {
    return Response.json({ error: 'Uploads not enabled for this account' }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return badRequest('No file provided');
  if (file.size > MAX_FILE_SIZE) return badRequest('File exceeds 50MB limit');
  if (!ALLOWED_MIME_TYPES.includes(file.type)) return badRequest('File type not allowed');

  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._\- ]/g, '_');
  const uploadPath = `${config.dropboxFolderPath}/Client Uploads/${timestamp}_${sanitizedName}`;

  const dbx = await getDropboxClient();
  const uploaded = await dbx.filesUpload({
    path: uploadPath,
    contents: buffer,
    mode: { '.tag': 'add' },
    autorename: true,
  });

  // Record in DB immediately (don't wait for next cron cycle)
  await prisma.clientDocument.create({
    data: {
      userId: params.userId,
      dropboxPath: uploaded.result.path_display!,
      dropboxFileId: uploaded.result.id,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      direction: 'INBOUND',
      seenByClient: true, // Client just uploaded it — they've seen it
    },
  });

  return Response.json({ success: true });
}
```

---

## Download Link Generation

Files are never proxied through the platform server. Instead, a temporary Dropbox download link is generated on demand (expires after 4 hours).

```typescript
// app/api/portal/documents/[userId]/[docId]/url/route.ts

export async function GET(req: Request, { params }: { params: { userId: string; docId: string } }) {
  const session = await getServerSession();
  if (session?.user?.id !== params.userId) return unauthorized();

  const doc = await prisma.clientDocument.findFirst({
    where: { id: params.docId, userId: params.userId },
  });

  if (!doc) return notFound();

  const dbx = await getDropboxClient();
  const link = await dbx.filesGetTemporaryLink({ path: doc.dropboxPath });

  // Mark as seen if outbound and first view
  if (doc.direction === 'OUTBOUND' && !doc.seenByClient) {
    await prisma.clientDocument.update({
      where: { id: doc.id },
      data: { seenByClient: true },
    });
  }

  return Response.json({ url: link.result.link });
}
```

---

## Admin "Needs Attention" Queue

Any client with a `PENDING` status on any system field surfaces here. Drives a dashboard widget at `/admin`.

```typescript
// app/api/admin/clients/needs-attention/route.ts

export async function GET() {
  const pending = await prisma.clientPortalConfig.findMany({
    where: {
      OR: [
        { freshbooksStatus: 'PENDING' },
        { dropboxStatus: 'PENDING' },
      ],
    },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { updatedAt: 'asc' },
  });

  return Response.json(pending.map(c => ({
    userId: c.userId,
    name: c.user.name,
    email: c.user.email,
    issues: [
      c.freshbooksStatus === 'PENDING' && 'FreshBooks not linked',
      c.dropboxStatus === 'PENDING' && 'Dropbox folder not set up',
    ].filter(Boolean),
  })));
}
```

---

## Dropbox Authentication

One service account token for the entire platform. Dropbox access tokens expire every 4 hours — the platform handles refresh automatically.

```typescript
// utils/dropbox/auth.ts

import { Dropbox } from 'dropbox';

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getDropboxClient(): Promise<Dropbox> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 300_000) {
    return new Dropbox({ accessToken: cachedToken.token });
  }

  const response = await fetch('https://api.dropbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN!,
      client_id: process.env.DROPBOX_APP_KEY!,
      client_secret: process.env.DROPBOX_APP_SECRET!,
    }),
  });

  const data = await response.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return new Dropbox({ accessToken: cachedToken.token });
}
```

### Environment Variables

```env
DROPBOX_APP_KEY=your_app_key
DROPBOX_APP_SECRET=your_app_secret
DROPBOX_REFRESH_TOKEN=your_offline_refresh_token
DROPBOX_CLIENTS_ROOT=/Trucksafe/Client Documents
CRON_SECRET=your_cron_secret
```

### One-Time Setup

1. Create app in Dropbox App Console — select **Full Dropbox** access (not App Folder)
2. Run OAuth flow once manually with `token_access_type=offline`
3. Store the returned `refresh_token` as `DROPBOX_REFRESH_TOKEN`
4. Platform handles all subsequent token refreshes automatically

---

## Gotchas & Notes

- **Full Dropbox access required** — App Folder access cannot reach `/Trucksafe/Client Documents/`; must request Full Dropbox during OAuth setup
- **`dropboxFileId` is stable** — Dropbox file IDs survive renames and moves, so `path_display` can change without breaking the DB record; always upsert on `dropboxFileId` not path
- **Cron only syncs outbound** — `Client Portal Docs/` is synced by cron; `Client Uploads/` is written directly at upload time and never needs syncing
- **Don't proxy file downloads** — generate temporary Dropbox links and redirect; proxying large files through Next.js API routes will hit Vercel response size limits
- **`autorename: true` on uploads** — prevents overwrites if client uploads a file with the same name twice
- **Basic subscribers default to NOT_NEEDED** — FreshBooks and Dropbox status are set to `NOT_NEEDED` at creation; admin can change this per client which triggers the setup workflow

---

# Mailchimp Integration

## Overview

Mailchimp remains the tool for composing and sending newsletters — no change to that workflow. The platform's job is to keep Mailchimp's audience list in sync with the member database automatically, so segments and targeting are always accurate without any manual list management.

**Account type:** Mailchimp existing account  
**Auth:** API key (server-side only, never exposed to client)  
**SDK:** `@mailchimp/mailchimp_marketing` npm package  
**Sync direction:** Primarily platform → Mailchimp, with one Mailchimp → platform webhook for unsubscribes  
**Audience:** Single Mailchimp audience (list) — segments are managed via tags and merge fields

---

## Merge Fields

These are stored on each Mailchimp subscriber and power audience segmentation. The platform syncs them automatically whenever the underlying data changes.

| Merge Field Tag | Type | Source | Example |
|---|---|---|---|
| `FNAME` | Text | User.name (first) | `"Brandon"` |
| `LNAME` | Text | User.name (last) | `"Smith"` |
| `COMPANY` | Text | Profile.company | `"Acme Trucking"` |
| `JOBTITLE` | Text | Profile.title | `"Safety Manager"` |
| `TIER` | Text | Subscription.tier | `"Pro"` / `"None"` |
| `JOINDATE` | Date | User.createdAt | `"2026-02-19"` |
| `LASTACTIVE` | Date | User.lastActiveAt | `"2026-02-19"` |
| `NETWORKMEMBER` | Text | UserRole | `"Free"` / `"Paid"` |
| `ISCLIENT` | Text | ClientPortalConfig | `"Yes"` / `"No"` |
| `TSCCERT` | Text | Certification.status | `"Yes"` / `"No"` |
| `BOOTCAMP` | Text | BootcampAttendee | `"Attendee"` / `"Alumni"` / `"No"` |

**One-time setup:** These merge fields must be created manually in Mailchimp Audience → Settings → Audience fields and *MERGE* tags before the integration goes live. The API will silently ignore unknown merge field tags.

---

## Tags

Tags are used for binary states and event milestones. Applied and removed automatically by the platform.

| Tag | Applied when |
|---|---|
| `compliance-basic` | Active Basic subscription |
| `compliance-pro` | Active Pro subscription |
| `compliance-premium` | Active Premium subscription |
| `tsc-certified` | TSC certification active |
| `bootcamp-attendee` | Registered for upcoming Bootcamp |
| `bootcamp-alumni` | Attended at least one past Bootcamp |
| `consulting-client` | Active consulting client (portal access) |
| `network-free` | Network member, no Compliance+ subscription |
| `network-paid` | Network member with active subscription |

---

## Authentication

```typescript
// utils/mailchimp/client.ts

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. "us21" — from your API key suffix
});

export default mailchimp;
```

### Environment Variables

```env
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=us21          # The prefix from your API key (e.g. key ends in -us21)
MAILCHIMP_AUDIENCE_ID=your_list_id   # Found in Mailchimp Audience → Settings
MAILCHIMP_WEBHOOK_SECRET=your_secret  # Used to verify incoming webhook calls
```

---

## Core Sync Utility

All platform → Mailchimp calls go through this single utility. It handles both new subscribers (upsert) and updates to existing ones.

```typescript
// utils/mailchimp/sync.ts

import mailchimp from './client';
import crypto from 'crypto';

const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID!;

// Mailchimp requires email to be MD5-hashed to identify a subscriber
function getSubscriberHash(email: string): string {
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

export async function syncMemberToMailchimp(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      subscription: true,
      certifications: true,
      bootcampAttendees: true,
      portalConfig: true,
      roles: true,
    },
  });

  if (!user || !user.emailSubscribed) return;

  const subscriberHash = getSubscriberHash(user.email);

  // Determine tag set
  const tags = buildTags(user);

  // Build merge fields
  const mergeFields = buildMergeFields(user);

  // Upsert subscriber (creates if new, updates if exists)
  await mailchimp.lists.setListMember(LIST_ID, subscriberHash, {
    email_address: user.email,
    status_if_new: 'subscribed', // Only applied on creation — won't re-subscribe if they unsubscribed
    merge_fields: mergeFields,
  });

  // Sync tags separately (Mailchimp tags API is distinct from member update)
  await syncTags(subscriberHash, tags);
}

function buildMergeFields(user: UserWithRelations) {
  const nameParts = (user.name ?? '').split(' ');
  const tier = user.subscription?.status === 'active'
    ? capitalize(user.subscription.tier)
    : 'None';

  const bootcampStatus = user.bootcampAttendees?.length > 0
    ? (user.bootcampAttendees.some(b => b.isAlumni) ? 'Alumni' : 'Attendee')
    : 'No';

  const hasActiveCert = user.certifications?.some(c => c.status === 'active');
  const isPaidNetwork = user.subscription?.status === 'active';

  return {
    FNAME: nameParts[0] ?? '',
    LNAME: nameParts.slice(1).join(' ') ?? '',
    COMPANY: user.profile?.company ?? '',
    JOBTITLE: user.profile?.title ?? '',
    TIER: tier,
    JOINDATE: user.createdAt.toISOString().split('T')[0],
    LASTACTIVE: user.lastActiveAt?.toISOString().split('T')[0] ?? '',
    NETWORKMEMBER: isPaidNetwork ? 'Paid' : 'Free',
    ISCLIENT: user.portalConfig?.portalAccess ? 'Yes' : 'No',
    TSCCERT: hasActiveCert ? 'Yes' : 'No',
    BOOTCAMP: bootcampStatus,
  };
}

function buildTags(user: UserWithRelations): string[] {
  const tags: string[] = [];
  const tier = user.subscription?.status === 'active' ? user.subscription.tier : null;

  if (tier === 'BASIC') tags.push('compliance-basic');
  if (tier === 'PRO') tags.push('compliance-pro');
  if (tier === 'PREMIUM') tags.push('compliance-premium');
  if (user.certifications?.some(c => c.status === 'active')) tags.push('tsc-certified');
  if (user.bootcampAttendees?.some(b => !b.isAlumni)) tags.push('bootcamp-attendee');
  if (user.bootcampAttendees?.some(b => b.isAlumni)) tags.push('bootcamp-alumni');
  if (user.portalConfig?.portalAccess) tags.push('consulting-client');
  if (tier) tags.push('network-paid');
  else tags.push('network-free');

  return tags;
}

async function syncTags(subscriberHash: string, activeTags: string[]) {
  // Get all known tags
  const allTags = [
    'compliance-basic', 'compliance-pro', 'compliance-premium',
    'tsc-certified', 'bootcamp-attendee', 'bootcamp-alumni',
    'consulting-client', 'network-free', 'network-paid',
  ];

  // Build tag update payload — active = true, inactive = false
  const tagUpdates = allTags.map(name => ({
    name,
    status: activeTags.includes(name) ? 'active' : 'inactive',
  }));

  await mailchimp.lists.updateListMemberTags(LIST_ID, subscriberHash, {
    tags: tagUpdates,
  });
}
```

---

## Platform → Mailchimp Triggers

Call `syncMemberToMailchimp(userId)` from these event points:

```typescript
// After user registration
await syncMemberToMailchimp(newUser.id);

// After subscription tier change (Stripe webhook)
await syncMemberToMailchimp(userId);

// After TSC certification status change
await syncMemberToMailchimp(userId);

// After Bootcamp registration or alumni status granted
await syncMemberToMailchimp(userId);

// After profile update (name, company, title)
await syncMemberToMailchimp(userId);

// After consulting client portal access granted
await syncMemberToMailchimp(userId);

// After user unsubscribes via platform settings
await mailchimp.lists.updateListMember(LIST_ID, getSubscriberHash(email), {
  status: 'unsubscribed',
});

// After account deletion
await mailchimp.lists.updateListMember(LIST_ID, getSubscriberHash(email), {
  status: 'archived',
});
```

---

## Mailchimp → Platform Webhook (Unsubscribe)

When a member clicks unsubscribe in a Mailchimp email, Mailchimp pings this endpoint. The platform updates the user's `emailSubscribed` field so the preference is reflected everywhere.

```typescript
// app/api/webhooks/mailchimp/route.ts

export async function POST(req: Request) {
  // Mailchimp sends webhook as form-encoded data, not JSON
  const body = await req.formData();
  const type = body.get('type');
  const email = body.get('data[email]') as string;

  // Verify the request is from Mailchimp using shared secret
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.MAILCHIMP_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (type === 'unsubscribe') {
    await prisma.user.updateMany({
      where: { email: email.toLowerCase() },
      data: { emailSubscribed: false },
    });
  }

  if (type === 'profile') {
    // Mailchimp profile updates — not needed since platform is source of truth
    // but log it in case useful for debugging
    console.log('Mailchimp profile update received for:', email);
  }

  // Always return 200 — Mailchimp retries on any other status
  return Response.json({ ok: true });
}
```

**Webhook URL to register in Mailchimp:**
```
https://trucksafe.com/api/webhooks/mailchimp?secret=[MAILCHIMP_WEBHOOK_SECRET]
```

Register in Mailchimp under: Audience → Manage Audience → Settings → Webhooks
Enable: `Unsubscribes` and optionally `Profile updates`

---

## User Schema Addition

Add one field to the `User` model:

```prisma
model User {
  // ... existing fields
  emailSubscribed   Boolean   @default(true)   // Reflects Mailchimp unsubscribe status
  lastActiveAt      DateTime?                  // Updated on login — synced to LASTACTIVE merge field
}
```

---

## Nightly Sync (Safety Net)

In addition to event-driven updates, run a nightly full sync as a safety net to catch any missed events.

Add to existing cron job:

```typescript
// Part of nightly cron at 2 AM

const allUsers = await prisma.user.findMany({
  where: { emailSubscribed: true },
  include: { /* all relations needed for buildMergeFields */ }
});

for (const user of allUsers) {
  await syncMemberToMailchimp(user.id);
  // Small delay to avoid Mailchimp rate limits (10 req/sec)
  await new Promise(r => setTimeout(r, 150));
}
```

---

## Gotchas & Notes

- **`status_if_new` vs `status`** — use `status_if_new: 'subscribed'` on upserts, never `status: 'subscribed'`; using `status` will re-subscribe someone who previously unsubscribed, which violates CAN-SPAM
- **Double opt-in setting** — verify Mailchimp audience is NOT set to require double opt-in (Audience → Settings → Audience name and defaults); if it is, new members will receive a confirmation email before being added, bypassing auto opt-in
- **MD5 hash is required** — Mailchimp identifies subscribers by MD5 hash of lowercased email; always lowercase before hashing
- **Tags are all-or-nothing per call** — the tags API replaces the full tag state; always send all known tags with active/inactive status rather than adding/removing individually
- **Merge fields must exist first** — create all merge field tags in Mailchimp admin before going live; the API silently ignores unknown tags
- **Rate limits** — Mailchimp API allows 10 requests/second; the nightly sync includes a 150ms delay per user to stay under this
- **Webhook is form-encoded** — Mailchimp webhooks send `application/x-www-form-urlencoded`, not JSON; parse with `req.formData()` not `req.json()`
- **Platform is source of truth** — if Mailchimp profile data conflicts with platform data, platform wins; the nightly sync will correct any drift
