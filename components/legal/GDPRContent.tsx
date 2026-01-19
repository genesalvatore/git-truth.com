export default function GDPRContent() {
  return (
    <>
      <p className="text-gray-400 mb-8">Last updated: January 16, 2026</p>

      <section>
        <h2 className="text-3xl font-bold mb-4">Your Rights Under GDPR</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          If you are located in the European Economic Area (EEA), you have specific rights regarding your personal data under the General Data Protection Regulation (GDPR).
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">1. Right to Access</h3>
            <p className="text-gray-300 leading-relaxed">
              You have the right to request a copy of all personal data we hold about you. We will provide this information within 30 days of your request.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">2. Right to Rectification</h3>
            <p className="text-gray-300 leading-relaxed">
              You can request correction of any inaccurate or incomplete personal data we hold about you.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">3. Right to Erasure ("Right to be Forgotten")</h3>
            <p className="text-gray-300 leading-relaxed">
              You can request deletion of your personal data when it is no longer necessary for the purposes for which it was collected, or when you withdraw consent.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">4. Right to Restrict Processing</h3>
            <p className="text-gray-300 leading-relaxed">
              You can request that we limit how we process your personal data in certain circumstances.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">5. Right to Data Portability</h3>
            <p className="text-gray-300 leading-relaxed">
              You can request your personal data in a structured, commonly used, and machine-readable format, and have the right to transmit that data to another controller.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">6. Right to Object</h3>
            <p className="text-gray-300 leading-relaxed">
              You can object to processing of your personal data for direct marketing purposes or when processing is based on legitimate interests.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">7. Right to Withdraw Consent</h3>
            <p className="text-gray-300 leading-relaxed">
              Where processing is based on consent, you have the right to withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">How to Exercise Your Rights</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          To exercise any of these rights, please contact us at:
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Email:</strong> <a href="mailto:gdpr@gitislife.com" className="text-blue-400 hover:underline">gdpr@gitislife.com</a><br />
          <strong>Subject Line:</strong> "GDPR Request - [Your Right]"
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          We will respond to your request within 30 days. We may require verification of your identity before processing your request.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Data Processing Legal Basis</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We process your personal data based on the following legal bases:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Contract Performance:</strong> To fulfill orders and provide services</li>
          <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
          <li><strong>Consent:</strong> For marketing communications (you can withdraw at any time)</li>
          <li><strong>Legal Obligation:</strong> To comply with tax and accounting requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Data Transfers</h2>
        <p className="text-gray-300 leading-relaxed">
          Your data may be transferred to and processed in countries outside the EEA (including the United States) where our service providers operate. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Data Protection Officer</h2>
        <p className="text-gray-300 leading-relaxed">
          For questions about our GDPR compliance or to file a complaint, contact our Data Protection Officer at:
        </p>
        <p className="text-gray-300 leading-relaxed mt-2">
          <strong>Email:</strong> <a href="mailto:dpo@gitislife.com" className="text-blue-400 hover:underline">dpo@gitislife.com</a>
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Right to Lodge a Complaint</h2>
        <p className="text-gray-300 leading-relaxed">
          If you believe we have not addressed your concerns adequately, you have the right to lodge a complaint with your local data protection authority. For a list of EU data protection authorities, visit: <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">edpb.europa.eu</a>
        </p>
      </section>
    </>
  )
}
