export default function PrivacyContent() {
  return (
    <>
      <p className="text-gray-400 mb-8">Last updated: January 16, 2026</p>

      <section>
        <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          GitIsLife ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website gitislife.com and use our services.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
        <h3 className="text-2xl font-semibold mb-3">2.1 Information You Provide</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Name and contact information (email, shipping address)</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Order history and preferences</li>
          <li>Communications with us</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>IP address and browser type</li>
          <li>Device information</li>
          <li>Usage data and analytics</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders</li>
          <li>Improve our website and services</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">4. Data Storage and Security</h2>
        <p className="text-gray-300 leading-relaxed">
          We use Supabase (PostgreSQL) for secure data storage. All data is encrypted in transit and at rest. Payment information is processed through Stripe and never stored on our servers.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">5. GDPR Rights (EU Users)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you are located in the European Union, you have the following rights:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
          <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
          <li><strong>Right to Object:</strong> Object to processing of your data</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mt-4">
          To exercise these rights, contact us at: <a href="mailto:privacy@gitislife.com" className="text-blue-400 hover:underline">privacy@gitislife.com</a>
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">6. Cookies</h2>
        <p className="text-gray-300 leading-relaxed">
          We use cookies to enhance your experience, analyze usage, and assist with marketing efforts. You can control cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">7. Third-Party Services</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We use the following third-party services:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Stripe:</strong> Payment processing</li>
          <li><strong>Printful/Printify:</strong> Order fulfillment</li>
          <li><strong>Supabase:</strong> Database and authentication</li>
          <li><strong>Netlify:</strong> Website hosting</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mt-4">
          These services have their own privacy policies. We encourage you to review them.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">8. Data Retention</h2>
        <p className="text-gray-300 leading-relaxed">
          We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
        <p className="text-gray-300 leading-relaxed">
          Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">10. Changes to This Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">11. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-gray-300 leading-relaxed mt-2">
          <strong>Email:</strong> <a href="mailto:privacy@gitislife.com" className="text-blue-400 hover:underline">privacy@gitislife.com</a><br />
          <strong>Address:</strong> [Your Business Address]
        </p>
      </section>
    </>
  )
}
