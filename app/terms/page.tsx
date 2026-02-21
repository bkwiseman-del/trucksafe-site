import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service - Trucksafe',
  description: 'Trucksafe Consulting terms of service — the terms governing your use of our platform and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-black text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-12">Last updated: February 21, 2026</p>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the Trucksafe Consulting, LLC (&ldquo;Trucksafe&rdquo;) website at trucksafe.com and any related services, including Compliance+, the Trucksafe Network, Trucksafe Academy, Bootcamp, and the Client Portal (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not access or use the Services.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years of age to use our Services. By using the Services, you represent and warrant that you meet this requirement and have the legal capacity to enter into a binding agreement.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of the Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>4. Subscriptions and Payments</h2>
            <h3>Compliance+ Subscriptions</h3>
            <p>
              Compliance+ is offered in three tiers: Basic, Pro, and Premium. Subscriptions are billed monthly or annually as selected at the time of purchase. All payments are processed through Stripe.
            </p>
            <h3>Billing</h3>
            <p>
              By subscribing, you authorize Trucksafe to charge your payment method on a recurring basis. You are responsible for keeping your payment information current. Failed payments may result in service suspension.
            </p>
            <h3>Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. No refunds are provided for partial billing periods.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>When using the Services, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Post false, misleading, defamatory, or harassing content</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to any part of the Services</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Scrape, crawl, or use automated means to access the Services without our permission</li>
            </ul>

            <h2>6. Community Guidelines (Trucksafe Network)</h2>
            <p>
              Participants in the Trucksafe Network forums and community features must conduct themselves professionally and respectfully. Trucksafe reserves the right to remove content and suspend accounts that violate our community standards. Harassment, spam, self-promotion without context, and off-topic posts may be removed at our discretion.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on the Trucksafe website, including text, graphics, logos, images, videos, course materials, and software, is the property of Trucksafe Consulting, LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.
            </p>

            <h2>8. User Content</h2>
            <p>
              You retain ownership of content you post through the Services (forum posts, comments, messages). By posting content, you grant Trucksafe a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with providing the Services. You represent that you have the right to post any content you submit.
            </p>

            <h2>9. Client Portal and Confidentiality</h2>
            <p>
              Information shared through the Client Portal, including documents, messages, and consulting communications, is treated as confidential. Trucksafe will not disclose client information to third parties except as required by law or with your express consent. Two-factor authentication may be required for Client Portal access.
            </p>

            <h2>10. Disclaimer of Warranties</h2>
            <p>
              The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. Trucksafe does not warrant that the Services will be uninterrupted, error-free, or free of harmful components. The information provided through our Services is for general informational purposes and does not constitute legal advice.
            </p>

            <h2>11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Trucksafe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services. Our total liability for any claim arising from or related to the Services shall not exceed the amount you paid to Trucksafe in the twelve (12) months preceding the claim.
            </p>

            <h2>12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Trucksafe and its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Services, your violation of these Terms, or your violation of any rights of a third party.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts of competent jurisdiction.
            </p>

            <h2>14. Changes to These Terms</h2>
            <p>
              Trucksafe reserves the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Services after changes are posted constitutes your acceptance of the revised Terms.
            </p>

            <h2>15. Contact Us</h2>
            <p>If you have questions about these Terms of Service, please contact us at:</p>
            <p>
              Trucksafe Consulting, LLC<br />
              Email: <a href="mailto:brandon@trucksafe.com">brandon@trucksafe.com</a><br />
              Website: <a href="https://trucksafe.com/contact">trucksafe.com/contact</a>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
