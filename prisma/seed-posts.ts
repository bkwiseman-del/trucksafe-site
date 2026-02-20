import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Seed posts use brandon@trucksafe.com as the author.
// We'll create a few "demo" users for variety, then seed posts + comments.

const demoUsers = [
  { email: 'sarah.m@demo.trucksafe.com', name: 'Sarah Mitchell' },
  { email: 'mike.r@demo.trucksafe.com', name: 'Mike Rodriguez' },
  { email: 'jennifer.k@demo.trucksafe.com', name: 'Jennifer Kim' },
  { email: 'tom.d@demo.trucksafe.com', name: 'Tom Davis' },
  { email: 'lisa.c@demo.trucksafe.com', name: 'Lisa Chen' },
]

interface SeedPost {
  forumSlug: string
  title: string
  content: string
  daysAgo: number
  authorIndex: number // -1 = brandon, 0-4 = demo users
  pinned?: boolean
  comments?: { content: string; authorIndex: number; daysAgo: number }[]
}

const seedPosts: SeedPost[] = [
  // Driver Qualification
  {
    forumSlug: 'driver-qualification',
    title: 'New FMCSA guidance on medical certificates — what you need to know',
    content: `Just a heads up for everyone — FMCSA released updated guidance last week on medical certificate requirements for interstate drivers. The key changes:\n\n1. Examiners must now verify driver identity with a photo ID before the exam\n2. Updated vision standards for drivers with monocular vision\n3. New guidelines for drivers with insulin-treated diabetes\n\nI've been updating our DQ files accordingly. Has anyone else started implementing these changes? Curious how other fleets are handling the transition period.\n\nThe full guidance is available on the FMCSA website. Happy to share more details if anyone has questions.`,
    daysAgo: 0,
    authorIndex: 0,
    comments: [
      { content: 'Thanks for the heads up, Sarah! We just got the notice from our medical examiner about these changes. The diabetes guidelines are going to affect a couple of our drivers — need to get them re-evaluated.', authorIndex: 3, daysAgo: 0 },
      { content: 'Great summary. I would add that the transition period gives carriers 90 days to update existing files. No need to panic, but don\'t wait until the last minute either.', authorIndex: -1, daysAgo: 0 },
      { content: 'Question — does this affect intrastate drivers too, or just interstate? We have a mixed fleet and I want to make sure I\'m not over-applying these rules.', authorIndex: 4, daysAgo: 0 },
    ],
  },
  {
    forumSlug: 'driver-qualification',
    title: 'Best practices for MVR monitoring — how often do you pull records?',
    content: `We currently pull MVRs annually as required, but I\'m considering moving to semi-annual or even quarterly pulls. A couple of our drivers had violations that didn\'t surface until the annual review, which feels like too long.\n\nWhat\'s your frequency? And is anyone using a continuous MVR monitoring service? If so, which one and how has the experience been?\n\nWould love to hear what\'s working for other fleets.`,
    daysAgo: 2,
    authorIndex: 3,
    comments: [
      { content: 'We switched to continuous MVR monitoring about 18 months ago through SambaSafety. It\'s been great — we get alerts within 24-48 hours of any new violations. Caught a DUI arrest the day after it happened. Worth every penny.', authorIndex: 1, daysAgo: 1 },
      { content: 'Quarterly pulls here. We found that annual was just too long between checks. The cost difference is minimal and it gives us much better visibility. Continuous monitoring is on our roadmap for next year.', authorIndex: 0, daysAgo: 1 },
    ],
  },

  // Drug & Alcohol Testing
  {
    forumSlug: 'drug-alcohol-testing',
    title: 'Clearinghouse query best practices — pre-employment vs annual',
    content: `Quick question for the group — how are you all handling your Clearinghouse queries?\n\nWe do full queries for pre-employment (with driver consent) and limited queries annually for all current drivers. But I\'ve heard some carriers are doing full queries annually too.\n\nIs anyone doing more than the minimum? And how are you tracking the annual query requirement? We\'ve been using a spreadsheet but it\'s getting unwieldy with 60+ drivers.\n\nAlso — has anyone had a situation where a limited query returned a result? Curious how you handled the follow-up full query process.`,
    daysAgo: 1,
    authorIndex: 2,
    comments: [
      { content: 'We do limited queries annually — that\'s all that\'s required. If a limited query comes back with a hit, you have 24 hours to get the driver\'s consent for a full query. We\'ve had it happen twice. Both times the driver cooperated immediately and we were able to resolve it quickly.', authorIndex: -1, daysAgo: 1 },
      { content: 'For tracking, check out the Clearinghouse\'s bulk query feature. You can upload a CSV of driver info and run all your annual queries at once. Saves a ton of time vs doing them one by one.', authorIndex: 1, daysAgo: 0 },
    ],
  },

  // CSA & Safety Ratings
  {
    forumSlug: 'csa-safety-ratings',
    title: 'Successfully challenged 3 DataQs this month — here\'s what worked',
    content: `I wanted to share some wins because I know DataQs can feel like shouting into the void sometimes.\n\nThis month we successfully challenged 3 roadside inspection violations through the DataQs process:\n\n1. **Tire violation** — Inspector measured tread depth incorrectly. We had photos from our pre-trip showing adequate tread. Provided the photos plus our PM records showing the tires were replaced 2 months prior.\n\n2. **Light violation** — Turn signal was working at the time of inspection but marked as inoperative. Driver had dashcam footage showing the signal working 15 minutes before the inspection. Submitted the video.\n\n3. **HOS violation** — Inspector recorded wrong time zone for the log entry. We submitted supporting GPS data showing the driver\'s actual location.\n\nKey takeaways:\n- Document everything. Photos, videos, PM records — they all matter\n- Be specific in your challenge. Don\'t just say "this is wrong" — explain exactly why\n- Include supporting evidence. FMCSA responds better to evidence than arguments\n- Be patient. Average response time was about 45 days for us\n\nHas anyone else had success with DataQs recently?`,
    daysAgo: 3,
    authorIndex: -1,
    pinned: true,
    comments: [
      { content: 'This is incredibly helpful, Brandon. The tip about photos from pre-trip is something I\'m going to start requiring from all our drivers. We have a tire violation sitting on our record right now that I\'m going to challenge using this approach.', authorIndex: 0, daysAgo: 2 },
      { content: 'Congrats on the wins! We\'ve had mixed results with DataQs. Biggest lesson I\'ve learned: file them promptly. We had one rejected because we waited too long (over 60 days). Now I submit within a week of the inspection.', authorIndex: 4, daysAgo: 2 },
      { content: '45 days is actually pretty fast. We\'ve waited 90+ days on some of ours. Do you think the quality of evidence speeds up the process?', authorIndex: 2, daysAgo: 1 },
      { content: 'Great question. I do think strong evidence helps. When we submitted the dashcam footage, that one was resolved in about 30 days. The tire one took longer (60 days) even with photos. Hard to say for sure, but I believe clear evidence makes it easier for the reviewer.', authorIndex: -1, daysAgo: 1 },
    ],
  },

  // HOS Regulations
  {
    forumSlug: 'hos-regulations',
    title: 'Short-haul exemption confusion — 150 vs 100 air-mile radius',
    content: `I\'m seeing conflicting information online about the short-haul exemption and I\'m hoping someone can clarify.\n\nMy understanding:\n- **100 air-mile radius** (§395.1(e)(1)): CDL drivers, no ELD required, 12-hour duty period, must return to reporting location\n- **150 air-mile radius** (§395.1(e)(2)): Non-CDL drivers, no ELD required, 14-hour duty period\n\nBut I\'ve read some articles that seem to mix these up. Can someone confirm this is correct?\n\nAlso, what happens if a short-haul driver occasionally goes beyond the radius? Do they need to log that entire day, or just when they exceed it? We have a few drivers who are normally within 100 miles but might go to 110-120 miles once or twice a month.`,
    daysAgo: 5,
    authorIndex: 1,
    comments: [
      { content: 'Your understanding is correct. The key distinction is CDL vs non-CDL. And yes, if a driver exceeds the radius, they need to log that entire day using either paper logs or an ELD. It\'s not just the time beyond the radius — it\'s the whole day.\n\nFor drivers who occasionally exceed, I recommend having ELDs available in those vehicles so they can switch to electronic logging when needed. Much easier than trying to do paper logs when they\'re not used to it.', authorIndex: -1, daysAgo: 4 },
      { content: 'Brandon is right. One thing I\'d add: you need to track this. If a driver is regularly exceeding the radius (FMCSA looks at patterns), the exemption might not apply at all. "Occasionally" is the key word in the regulation.', authorIndex: 0, daysAgo: 4 },
    ],
  },

  // ELD & Technology
  {
    forumSlug: 'eld-technology',
    title: 'Switching ELD providers — lessons learned',
    content: `We just completed a migration from [Provider A] to KeepTruckin (now Motive) across our fleet of 45 trucks. Thought I\'d share some lessons learned in case anyone else is considering a switch.\n\n**What went well:**\n- Motive\'s hardware installation was straightforward — most trucks took 15-20 minutes\n- Driver training was easier than expected — the app is intuitive\n- Customer support during migration was excellent\n\n**What I\'d do differently:**\n- Start the migration mid-week, not on a Monday. We had issues that took 2 days to resolve and it hit during our busiest time\n- Run both systems in parallel for at least a week. We did 3 days and it wasn\'t enough\n- Get drivers involved earlier. The ones who tested the app before go-live had zero issues. The ones who didn\'t had lots of questions\n\n**Unexpected costs:**\n- Old provider charged an early termination fee (read your contract!)\n- Needed new mounting brackets for about 30% of trucks\n- Training time — budget for about 30 minutes per driver\n\nOverall very happy with the switch. Happy to answer questions if anyone is considering Motive.`,
    daysAgo: 4,
    authorIndex: 3,
    comments: [
      { content: 'Thanks for sharing this, Tom! We\'re actually evaluating Motive right now. Quick question — how\'s the GPS tracking accuracy compared to your old provider? That\'s been a pain point for us.', authorIndex: 2, daysAgo: 3 },
      { content: 'GPS has been great. Much better than what we had before. Real-time updates are within a few seconds and the geofencing feature is really useful for tracking yard arrivals/departures.', authorIndex: 3, daysAgo: 3 },
    ],
  },

  // Hiring & Retention
  {
    forumSlug: 'hiring-retention',
    title: 'What\'s working for driver retention in 2026?',
    content: `We\'re losing drivers at a rate of about 25% annually and I know that\'s actually below the industry average, but it still hurts. Every time we lose an experienced driver, it costs us $8-10K to recruit and train a replacement.\n\nWhat\'s actually working for you all in terms of retention? Not the generic "pay them more" advice (although that helps), but specific programs or benefits that have made a difference.\n\nHere\'s what we\'ve implemented:\n- Quarterly safety bonuses ($500 for clean record)\n- Paid home time (guaranteed every other weekend)\n- Health insurance with no waiting period\n- Annual equipment upgrade requests (drivers pick their truck features)\n\nTurnover dropped from 35% to 25% after implementing these, but I want to get it lower. What else is working out there?`,
    daysAgo: 6,
    authorIndex: 4,
    comments: [
      { content: 'We started a driver referral program — $2,000 bonus if the referred driver stays 6 months. Our best drivers know other good drivers, and referred hires tend to stay longer. We\'ve gotten 8 quality hires this way in the past year.', authorIndex: 1, daysAgo: 5 },
      { content: 'One thing that surprised us: assigned trucks. When we stopped slip-seating and gave every driver their own truck, turnover dropped significantly. Drivers take better care of equipment they "own" and it gives them a sense of stability.', authorIndex: 0, daysAgo: 5 },
      { content: 'Don\'t underestimate the power of simply communicating well. We started doing monthly one-on-ones with every driver — not about performance, just checking in. "How are things going? What can we do better?" Several drivers told us it\'s the reason they stayed when they had offers elsewhere.', authorIndex: -1, daysAgo: 4 },
    ],
  },

  // Preventive Maintenance
  {
    forumSlug: 'preventive-maintenance',
    title: 'Digital vs paper DVIR — making the switch',
    content: `We\'re still using paper DVIRs and I know it\'s time to go digital. For those who\'ve made the switch:\n\n1. What app/system are you using?\n2. How did drivers react to the change?\n3. Has it improved your compliance audit results?\n4. What\'s the cost per truck/month?\n\nOur fleet is 30 trucks and we want something that integrates with our maintenance software (we use Fleetio). Any recommendations appreciated!`,
    daysAgo: 7,
    authorIndex: 1,
    comments: [
      { content: 'We use Fleetio\'s built-in DVIR feature and it\'s been great. Integrates directly with work orders, so when a driver reports a defect it automatically creates a maintenance ticket. Cost is included in the Fleetio subscription. Drivers adapted within a week — most actually prefer it because it\'s faster than paper.', authorIndex: 3, daysAgo: 6 },
      { content: 'Switched to digital DVIRs about a year ago. Our last DOT audit was the smoothest we\'ve ever had. The auditor loved being able to search and pull up any inspection instantly instead of flipping through binders. That alone made it worth the switch.', authorIndex: 4, daysAgo: 6 },
    ],
  },

  // Roadside Inspections
  {
    forumSlug: 'roadside-inspections',
    title: 'Preparing drivers for Level I inspections — training checklist',
    content: `After a rough quarter with 4 OOS violations, I developed a training checklist for our drivers to review before heading out. Wanted to share it here:\n\n**Pre-trip items that inspectors check most often:**\n- [ ] All lights working (turn signals, brake lights, markers, headlights)\n- [ ] Tire tread depth (4/32" steer, 2/32" drive/trailer)\n- [ ] Tire pressure and condition (no bulges, cuts, or exposed cord)\n- [ ] Brake adjustment (listen for air leaks, check slack adjusters)\n- [ ] Windshield condition (no cracks in wiper sweep area)\n- [ ] Mirrors secure and adjusted\n- [ ] Fire extinguisher charged and accessible\n- [ ] Reflective triangles present\n- [ ] Current registration and insurance documents\n\n**Driver-side items:**\n- [ ] Valid CDL with correct endorsements\n- [ ] Current medical card\n- [ ] ELD functioning and logs current\n- [ ] Know your vehicle\'s GVWR and current load\n\nSince implementing this as a mandatory monthly review, we haven\'t had a single OOS. Knock on wood.\n\nAnyone have additions they\'d recommend?`,
    daysAgo: 8,
    authorIndex: 0,
    comments: [
      { content: 'Great list! I\'d add: check that the 5th wheel is properly coupled and locked. That\'s one of the most common critical violations we see. Also, make sure drivers know what to do during an inspection — be polite, don\'t argue, and let the inspector do their job.', authorIndex: -1, daysAgo: 7 },
      { content: 'Adding to Brandon\'s point — we tell drivers to take photos of any pre-existing damage or conditions BEFORE an inspection if they think something might be questioned. Having timestamped photos has saved us more than once.', authorIndex: 2, daysAgo: 7 },
    ],
  },

  // General Discussion
  {
    forumSlug: 'general-discussion',
    title: 'Welcome to the Trucksafe Network forums!',
    content: `Welcome to the Trucksafe Network discussion forums! This is your space to connect with fellow safety professionals, share knowledge, and get answers to your toughest compliance questions.\n\n**A few guidelines:**\n- Be respectful and professional\n- Share your experience — your real-world knowledge helps everyone\n- Ask questions — there are no dumb questions in compliance\n- Stay on topic within each forum\n- Don\'t share confidential company information\n\n**Forum categories:**\n- **DOT Compliance** — DQ files, drug testing, CSA scores\n- **Hours of Service** — HOS rules, ELD questions\n- **Driver Management** — Hiring, retention, training\n- **Vehicle Maintenance** — PM programs, inspections\n- **Safety Programs** — Accident prevention, insurance\n- **Community** — General chat, introductions\n\nDive in, introduce yourself, and let\'s build something great together!`,
    daysAgo: 14,
    authorIndex: -1,
    pinned: true,
    comments: [
      { content: 'Excited to be here! I manage safety for a 20-truck fleet in Texas. Looking forward to learning from everyone.', authorIndex: 1, daysAgo: 12 },
      { content: 'Great to see this community growing. I\'ve been in fleet safety for 15 years and I still learn something new every day. Happy to help where I can!', authorIndex: 0, daysAgo: 11 },
    ],
  },

  // Introductions
  {
    forumSlug: 'introductions',
    title: 'Hi from Chicago — 50-truck fleet safety manager',
    content: `Hey everyone! Just joined the network. I\'m Jennifer and I manage safety and compliance for a 50-truck fleet based out of Chicago. We run primarily Midwest regional routes.\n\nBeen in the industry for about 8 years, started as a dispatcher and moved into safety. Currently working on improving our CSA scores (our Vehicle Maintenance BASIC is higher than I\'d like) and rolling out a new driver training program.\n\nLooking forward to connecting with everyone!`,
    daysAgo: 3,
    authorIndex: 2,
    comments: [
      { content: 'Welcome Jennifer! Fellow Midwest fleet here (based in Columbus). Happy to chat about CSA scores anytime — we went through a similar Vehicle Maintenance BASIC improvement project last year. Feel free to reach out!', authorIndex: 4, daysAgo: 2 },
      { content: 'Welcome to the network! Check out the CSA & Safety Ratings forum — Brandon just posted some great DataQs tips that might help with your scores.', authorIndex: 0, daysAgo: 2 },
    ],
  },

  // Accident Prevention
  {
    forumSlug: 'accident-prevention',
    title: 'Dashcam programs — ROI and driver pushback',
    content: `We\'re evaluating dashcams for our fleet and I\'d love to hear from those who\'ve already implemented them.\n\nSpecifically:\n1. What was the ROI? Did insurance premiums actually drop?\n2. How did you handle driver pushback about being monitored?\n3. Inward-facing camera or just forward-facing?\n4. Any recommendations on providers?\n\nOur insurance company is offering a 12% discount if we install forward + inward facing cameras, which would pay for the system in about 14 months. But I\'m worried about losing drivers who don\'t want to be watched.`,
    daysAgo: 1,
    authorIndex: 4,
    comments: [
      { content: 'We installed Lytx cameras 2 years ago. Insurance dropped 15%, which more than covers the cost. Driver pushback was real at first, but we framed it as protecting THEM — in not-at-fault accidents, the footage proves they weren\'t responsible. After the first time a camera exonerated a driver, the complaints basically stopped.', authorIndex: 3, daysAgo: 0 },
      { content: 'Key advice: don\'t use the cameras to micromanage. We only review footage when there\'s an event (hard brake, collision, etc.). Drivers accepted that. Companies that review random footage constantly tend to lose drivers.', authorIndex: -1, daysAgo: 0 },
    ],
  },
]

async function main() {
  // Get or create brandon as the primary author
  const brandon = await prisma.user.findUnique({
    where: { email: 'brandon@trucksafe.com' },
  })

  if (!brandon) {
    console.error('brandon@trucksafe.com not found. Sign in first.')
    process.exit(1)
  }

  // Create demo users
  const userMap: Record<number, string> = { [-1]: brandon.id }

  for (let i = 0; i < demoUsers.length; i++) {
    const demo = demoUsers[i]
    const user = await prisma.user.upsert({
      where: { email: demo.email },
      create: {
        email: demo.email,
        name: demo.name,
        emailVerified: new Date(),
      },
      update: { name: demo.name },
    })

    // Give them NETWORK_MEMBER role
    await prisma.userRole.upsert({
      where: { userId_role: { userId: user.id, role: 'NETWORK_MEMBER' } },
      create: { userId: user.id, role: 'NETWORK_MEMBER' },
      update: {},
    })

    userMap[i] = user.id
  }

  let postCount = 0
  let commentCount = 0

  for (const seedPost of seedPosts) {
    // Find the forum
    const forum = await prisma.forum.findUnique({
      where: { slug: seedPost.forumSlug },
    })

    if (!forum) {
      console.warn(`Forum ${seedPost.forumSlug} not found, skipping post: ${seedPost.title}`)
      continue
    }

    // Check if post already exists (by title + forum)
    const existing = await prisma.post.findFirst({
      where: { title: seedPost.title, forumId: forum.id },
    })

    if (existing) {
      console.log(`  Skipping (exists): ${seedPost.title}`)
      continue
    }

    const postDate = new Date()
    postDate.setDate(postDate.getDate() - seedPost.daysAgo)
    postDate.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60))

    const post = await prisma.post.create({
      data: {
        title: seedPost.title,
        content: seedPost.content,
        forumId: forum.id,
        authorId: userMap[seedPost.authorIndex],
        pinned: seedPost.pinned || false,
        viewCount: 10 + Math.floor(Math.random() * 150),
        createdAt: postDate,
      },
    })

    postCount++

    // Create comments
    if (seedPost.comments) {
      for (const comment of seedPost.comments) {
        const commentDate = new Date()
        commentDate.setDate(commentDate.getDate() - comment.daysAgo)
        commentDate.setHours(10 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60))

        await prisma.comment.create({
          data: {
            content: comment.content,
            postId: post.id,
            authorId: userMap[comment.authorIndex],
            createdAt: commentDate,
          },
        })

        commentCount++
      }
    }

    console.log(`  Post: ${seedPost.title} (${seedPost.comments?.length || 0} comments)`)
  }

  console.log(`\nDone! ${postCount} posts and ${commentCount} comments seeded.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
