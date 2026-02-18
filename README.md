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
