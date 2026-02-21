import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface SeedArticle {
  title: string
  slug: string
  excerpt: string
  content: string
  status: string
  publishedAt: Date
  categories: { name: string; slug: string }[]
  tags: { name: string; slug: string }[]
}

const seedArticles: SeedArticle[] = [
  {
    title: 'FMCSA Issues Final Rule on Non-Domiciled CDLs',
    slug: 'fmcsa-final-rule-non-domiciled-cdls',
    excerpt:
      'New rule largely reaffirms September 2025 provisions restricting non-domiciled CDL eligibility to H-2A, H-2B, or E-2 visa holders.',
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-8">The Federal Motor Carrier Safety Administration (FMCSA) has issued a new final rule on non-domiciled Commercial Learner's Permits (CLPs) and Commercial Driver's Licenses (CDLs). Scheduled for publication in the Federal Register on February 13, 2026, this rule largely reaffirms the provisions of the September 29, 2025, Interim Final Rule with minor clarifications, despite intense legal scrutiny, a court-imposed stay, and thousands of public comments.</p>
<h2>The Backstory</h2>
<p>The framework for non-domiciled CDLs traces its roots to the Commercial Motor Vehicle Safety Act of 1986, which established national standards for commercial licensing to enhance road safety. These credentials enable foreign nationals legally present in the U.S. with work authorization to operate commercial motor vehicles.</p>
<p>Historically, State Driver's Licensing Agencies could issue non-domiciled CDLs to individuals presenting proof of lawful presence, such as an unexpired Employment Authorization Document or a foreign passport with Form I-94. However, FMCSA's recent Annual Program Reviews uncovered persistent issues like widespread non-compliance with validity periods and inadequate verification processes.</p>
<h2>Key Provisions of the Rule</h2>
<p>The rule restricts non-domiciled CLP/CDL eligibility to foreign-domiciled holders of H-2A, H-2B, or E-2 visa statuses, requiring proof through an unexpired foreign passport. State agencies are mandated to limit credential validity to the immigration document's expiration (maximum one year, renewable with renewed proof).</p>
<h2>Implications for Trucking</h2>
<p>For fleets, FMCSA concluded that any reduction in the non-domiciled driver population would likely occur gradually as licenses expire and are not renewed under the new eligibility standards. The agency emphasized that many drivers will have several years before their credentials expire, giving both drivers and carriers time to adjust.</p>
<p>This rule fits into a larger pattern. Over the past several years, FMCSA has increasingly focused on credential integrity—whether in the context of English-language proficiency enforcement, licensing oversight, or fraudulent documentation cases.</p>
<div class="bg-[#363b57] text-white p-8 rounded-xl my-12">
<h3 class="text-2xl font-bold mb-4">Key Takeaway</h3>
<p class="text-white/90 leading-relaxed">For fleets, the takeaway is straightforward: expect closer scrutiny of driver credentials, fewer gray areas in eligibility, and a licensing system that is becoming more standardized—and more restrictive—at the same time.</p>
</div>`,
    status: 'published',
    publishedAt: new Date('2026-02-13'),
    categories: [{ name: 'General Compliance', slug: 'generalcompliance' }],
    tags: [
      { name: 'CDL', slug: 'cdl' },
      { name: 'Driver Qualification', slug: 'driver-qualification' },
    ],
  },
  {
    title: 'Compliance Theater: When Documentation Replaces Judgment',
    slug: 'compliance-theater-when-documentation-replaces-judgment',
    excerpt:
      "Many fleets document everything but miss the point—proper documentation doesn't replace sound operational judgment.",
    content: `<p>In the world of DOT compliance, there's a growing trend that safety professionals should be watching closely: compliance theater. It's the practice of documenting everything meticulously while failing to actually implement the safety measures those documents represent.</p>
<h2>What Is Compliance Theater?</h2>
<p>Compliance theater occurs when an organization prioritizes the appearance of compliance over its substance. The driver qualification files are immaculate. The maintenance records are up to date. The drug testing program has all the right paperwork. But behind the documentation, the actual safety practices tell a different story.</p>
<h2>Common Examples</h2>
<p>Consider the fleet that conducts annual reviews of its drivers' motor vehicle records but takes no action when violations appear. Or the carrier that has a detailed hours-of-service policy manual but looks the other way when drivers routinely push their limits. The documentation exists, but the operational follow-through is absent.</p>
<h2>Why It Matters</h2>
<p>In a DOT audit, investigators aren't just looking at whether you have the right forms. They're looking at patterns—patterns that reveal whether your safety management controls are actually working. A carrier with perfect paperwork but a rising violation rate is a red flag, not a model of compliance.</p>
<p>More importantly, compliance theater creates real safety risks. When documentation becomes a substitute for judgment rather than a reflection of it, the entire purpose of the regulatory framework is undermined.</p>
<h2>Moving Beyond Theater</h2>
<p>The antidote to compliance theater is simple in concept but challenging in execution: make your documentation reflect reality, not the other way around. Every form, every record, every policy should be a living document that drives actual decision-making—not just a box to check during audit season.</p>`,
    status: 'published',
    publishedAt: new Date('2026-01-25'),
    categories: [{ name: 'Compliance Myths', slug: 'compliancemyths' }],
    tags: [
      { name: 'Audits & Enforcement', slug: 'audits-enforcement' },
      { name: 'Safety Ratings', slug: 'safety-ratings' },
    ],
  },
  {
    title: 'FMCSA Keeps Random Drug & Alcohol Testing Rates the Same for 2026',
    slug: 'fmcsa-keeps-random-drug-alcohol-testing-rates-the-same-for-2026',
    excerpt:
      'Minimum random drug testing rate remains at 50%, with alcohol testing at 10%—marking six consecutive years at these rates.',
    content: `<p>The Federal Motor Carrier Safety Administration (FMCSA) has announced that the minimum annual random drug testing rate for commercial motor vehicle (CMV) drivers will remain at 50% for calendar year 2026. The minimum random alcohol testing rate will also stay at 10%.</p>
<h2>Background</h2>
<p>Under 49 CFR Part 382, FMCSA is required to set minimum annual random testing rates based on the industry-wide violation rate. If the positive rate for random drug tests falls below 1.0%, the minimum random testing rate drops to 25%. If it's at or above 1.0%, the rate stays at 50%.</p>
<h2>Current Industry Data</h2>
<p>Based on the most recent Management Information System (MIS) data reported by employers, the random drug testing positive rate remains above the 1.0% threshold, necessitating the 50% minimum rate. The alcohol violation rate remains well below the 0.5% threshold that would trigger a rate increase from 10% to 25%.</p>
<h2>What This Means for Fleets</h2>
<p>For motor carriers, this means no changes to your existing random testing programs. If you're already testing at 50% for drugs and 10% for alcohol, you're in compliance. However, this is a good reminder to review your testing consortium's practices and ensure your random selection process is truly random and properly documented.</p>
<p>Remember that these are minimum rates—carriers may test at higher rates if they choose, and some choose to do so as a deterrent.</p>`,
    status: 'published',
    publishedAt: new Date('2026-01-13'),
    categories: [{ name: 'Drug & Alcohol Testing', slug: 'drug-alcohol-testing' }],
    tags: [
      { name: 'Drug/Alcohol Testing', slug: 'drug-testing' },
      { name: 'FMCSA', slug: 'fmcsa' },
    ],
  },
  {
    title: 'CVSA Human Trafficking Awareness Week',
    slug: 'cvsa-human-trafficking-awareness-week',
    excerpt:
      'Law enforcement agencies conducting outreach at truck stops and weigh stations during Human Trafficking Awareness Initiative.',
    content: `<p>The Commercial Vehicle Safety Alliance (CVSA) has announced its annual Human Trafficking Awareness Initiative, with law enforcement agencies across North America conducting outreach at truck stops, rest areas, and weigh stations.</p>
<h2>The Initiative</h2>
<p>During the awareness week, inspectors and officers will distribute educational materials to commercial motor vehicle drivers and others at various locations. The focus is on teaching people to recognize the signs of human trafficking and know what to do if they suspect it.</p>
<h2>What Drivers Should Know</h2>
<p>Truck drivers are uniquely positioned to help combat human trafficking because of the time they spend on the road and at rest stops. Signs to watch for include individuals who appear disoriented or confused, show signs of physical abuse, are not allowed to speak for themselves, or are accompanied by someone who seems controlling.</p>
<h2>Reporting</h2>
<p>If you suspect human trafficking, call the National Human Trafficking Hotline at 1-888-373-7888 or text "HELP" to 233733 (BEFREE). In an emergency, always call 911.</p>
<p>Many carriers are incorporating human trafficking awareness into their driver orientation and ongoing training programs—a practice that Trucksafe strongly encourages.</p>`,
    status: 'published',
    publishedAt: new Date('2026-01-12'),
    categories: [{ name: 'Agency News', slug: 'agency-news' }],
    tags: [{ name: 'Enforcement', slug: 'enforcement' }],
  },
  {
    title: 'FMCSA Escalates Feud with California, Withholds $160M in Federal Funding',
    slug: 'fmcsa-escalates-feud-with-california-withholds-160m-in-federal-funding',
    excerpt:
      'Federal agency withholds $160M in funding over non-domiciled CDL compliance issues.',
    content: `<p>In an escalation of an ongoing dispute, the Federal Motor Carrier Safety Administration (FMCSA) has announced it will withhold approximately $160 million in federal Motor Carrier Safety Assistance Program (MCSAP) funding from California, citing the state's failure to comply with federal requirements regarding non-domiciled commercial driver's licenses.</p>
<h2>The Dispute</h2>
<p>The conflict centers on California's handling of non-domiciled CDLs. FMCSA contends that California has not adequately implemented federal requirements for verifying the immigration status and residency of CDL holders, creating potential safety and security vulnerabilities in the licensing system.</p>
<h2>Impact on California</h2>
<p>The $160 million in withheld funds represents a significant portion of California's federal highway safety funding. These funds typically support state-level commercial vehicle enforcement activities, including roadside inspections, compliance reviews, and safety technology.</p>
<h2>Broader Implications</h2>
<p>This action signals FMCSA's willingness to use financial leverage to enforce compliance with federal CDL standards. Other states that may be lagging in their implementation of non-domiciled CDL requirements should take note—California may be the first state to face this level of enforcement, but it likely won't be the last.</p>
<p>For carriers operating in California, the immediate practical impact is limited. However, the longer-term effects on state enforcement capacity and the broader regulatory environment remain to be seen.</p>`,
    status: 'published',
    publishedAt: new Date('2026-01-08'),
    categories: [{ name: 'Breaking', slug: 'breaking' }],
    tags: [
      { name: 'CDL', slug: 'cdl' },
      { name: 'Enforcement', slug: 'enforcement' },
    ],
  },
  {
    title: 'Top 10 Federal Developments Fleets Should Understand Heading Into 2026',
    slug: 'top-10-federal-developments-fleets-should-understand-heading-into-2026',
    excerpt:
      'A comprehensive look at the most significant compliance initiatives and policy changes impacting motor carriers.',
    content: `<p>As we head into 2026, the regulatory landscape for motor carriers continues to evolve. Here are the ten most significant federal developments that fleet safety teams need to understand and prepare for.</p>
<h2>1. Non-Domiciled CDL Rule Finalized</h2>
<p>FMCSA's final rule restricting non-domiciled CDL eligibility to H-2A, H-2B, and E-2 visa holders is now in effect, with significant implications for carriers employing foreign national drivers.</p>
<h2>2. Clearinghouse Phase 2 Enforcement</h2>
<p>Full enforcement of Drug & Alcohol Clearinghouse requirements is now in effect, with pre-employment queries mandatory and no grandfathering provisions remaining.</p>
<h2>3. Speed Limiter Mandate Withdrawn</h2>
<p>FMCSA and NHTSA have officially withdrawn the proposed speed limiter mandate for heavy trucks, though some carriers continue to implement speed limiters voluntarily.</p>
<h2>4. English Language Proficiency Focus</h2>
<p>Increased federal attention on ELP enforcement, with FMCSA issuing new guidance and some states enacting their own ELP laws.</p>
<h2>5. SMS Methodology Changes</h2>
<p>FMCSA continues to refine the Safety Measurement System, with proposed changes to how scores are calculated and displayed.</p>
<h2>6. DataQs System Improvements</h2>
<p>Enhanced appeal processes and system updates to the DataQs system for challenging inspection and crash records.</p>
<h2>7. Medical Examiner Registry Cleanup</h2>
<p>Ongoing removal of non-compliant medical examiners from the National Registry, affecting driver medical certification.</p>
<h2>8. Oral Fluid Drug Testing</h2>
<p>DOT has approved mouth swab testing for regulated drug screens, providing carriers with an additional testing methodology option.</p>
<h2>9. Crash Preventability Program Expansion</h2>
<p>FMCSA continues to broaden the Crash Preventability Determination Program, allowing more crash types to be reviewed for preventability.</p>
<h2>10. Regulatory Freeze and New Administration</h2>
<p>The current administration's regulatory priorities continue to shape the rulemaking agenda, with some proposed rules advanced and others shelved.</p>`,
    status: 'published',
    publishedAt: new Date('2025-12-08'),
    categories: [{ name: 'General Compliance', slug: 'generalcompliance' }],
    tags: [
      { name: 'Safety Ratings', slug: 'safety-ratings' },
      { name: 'Enforcement', slug: 'enforcement' },
      { name: 'FMCSA', slug: 'fmcsa' },
    ],
  },
]

async function main() {
  console.log('Seeding articles...')

  // Find brandon as the author
  const brandon = await prisma.user.findUnique({
    where: { email: 'brandon@trucksafe.com' },
  })

  if (!brandon) {
    console.error('Error: brandon@trucksafe.com not found. Run seed-admin.ts first.')
    return
  }

  for (const article of seedArticles) {
    // Check if article already exists
    const existing = await prisma.article.findUnique({
      where: { slug: article.slug },
    })

    if (existing) {
      console.log(`  Skipping "${article.title}" — already exists`)
      continue
    }

    const created = await prisma.article.create({
      data: {
        authorId: brandon.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        status: article.status,
        publishedAt: article.publishedAt,
        metaTitle: `${article.title} - Trucksafe`,
        metaDescription: article.excerpt,
        categories: {
          create: article.categories.map((c) => ({
            name: c.name,
            slug: c.slug,
          })),
        },
        tags: {
          create: article.tags.map((t) => ({
            name: t.name,
            slug: t.slug,
          })),
        },
      },
    })

    console.log(`  Created article: "${created.title}"`)
  }

  console.log('Article seeding complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
