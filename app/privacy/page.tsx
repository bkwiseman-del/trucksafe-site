import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy - Trucksafe',
  description: 'Trucksafe Consulting privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-black text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Last updated: February 21, 2026</p>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            <h2>1. Introduction</h2>
            <p>
              Trucksafe Consulting, LLC (&ldquo;Trucksafe,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at trucksafe.com and use our services, including Compliance+, the Trucksafe Network, Trucksafe Academy, Bootcamp, Client Portal, and related platforms.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>We may collect personal information that you voluntarily provide when you:</p>
            <ul>
              <li>Create an account or register for our services</li>
              <li>Subscribe to Compliance+ or purchase products from our shop</li>
              <li>Register for Bootcamp events or webinars</li>
              <li>Post in the Trucksafe Network forums</li>
              <li>Contact us through our website or email</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>This may include your name, email address, phone number, company name, job title, billing information, and any other information you choose to provide.</p>

            <h3>Information Collected Automatically</h3>
            <p>When you visit our website, we may automatically collect certain information, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. We use cookies and similar tracking technologies to collect this information.</p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as account updates and service changes</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send marketing and promotional communications (with your consent)</li>
              <li>Monitor and analyze usage trends to improve our services</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Service providers:</strong> Third-party vendors who perform services on our behalf, including payment processing (Stripe), email communications (SendGrid, Mailchimp), course delivery (Thinkific), document storage (Dropbox), and accounting (FreshBooks).</li>
              <li><strong>Legal compliance:</strong> When required by law, regulation, or legal process.</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Please note that disabling cookies may limit your ability to use certain features of our website.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
            <p>To exercise any of these rights, please contact us at the information provided below.</p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
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
