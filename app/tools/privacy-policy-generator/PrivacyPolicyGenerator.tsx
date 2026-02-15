"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

export default function PrivacyPolicyGenerator() {
  const [formData, setFormData] = useState({
    website: "",
    url: "",
    email: "",
    country: "",
  });
  const [policy, setPolicy] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tools/policy-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setPolicy(data.policy);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 pt-12">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Privacy Policy Generator
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md mb-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website Name
            </label>
            <input
              type="text"
              placeholder="My Website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://mywebsite.com"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="contact@mywebsite.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country
            </label>
            <input
              type="text"
              placeholder="United States"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md"
          >
            Generate Privacy Policy
          </button>
        </form>
        {policy && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Generated Privacy Policy
            </h2>
            <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-96">
              {policy}
            </pre>
          </div>
        )}
        {/* Comprehensive Description Section */}
        <div className="mt-12 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              What is the ToolHub Privacy Policy Generator?
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                The{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  ToolHub Privacy Policy Generator
                </span>{" "}
                is a comprehensive, user-friendly tool that transforms the
                complex process of creating a privacy policy into a simple,
                straightforward experience. Privacy policies are essential legal
                documents that every website, mobile app, and online business
                must have. However, creating one from scratch can be daunting,
                time-consuming, and potentially costly if you need to hire a
                lawyer. Our generator eliminates these barriers by automatically
                creating professional, legally-compliant privacy policies based
                on your specific business information. Whether you run a small
                blog, an e-commerce store, or a software-as-a-service platform,
                this tool provides the privacy protection your users deserve and
                that legal regulations require.
              </p>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  How the Privacy Policy Generator Works
                </h3>
                <p>
                  Creating a privacy policy with our tool is remarkably simple.
                  You provide basic information about your website including its
                  name, URL, contact email, and the country where your primary
                  operations occur. Our intelligent system uses this information
                  to generate a comprehensive, customized privacy policy that
                  addresses data collection practices common to your type of
                  business. The generator automatically includes sections
                  covering cookie usage, analytics tracking, user rights, data
                  retention, and compliance with major regulations like GDPR and
                  CCPA. Rather than presenting you with a generic template, our
                  system tailors the policy to your specific context, ensuring
                  relevance and accuracy for your business model.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Why Is a Privacy Policy Essential?
                </h3>
                <p className="mb-3">
                  A privacy policy serves multiple critical functions. First and
                  foremost, it is a legal requirement in many jurisdictions. If
                  your website collects any personal information—even just email
                  addresses or names—you likely need a privacy policy by law.
                  Second, it establishes trust with your users. People want to
                  know how their personal data is being used. A transparent,
                  clearly-written privacy policy demonstrates that you respect
                  your users' information and handle it responsibly. Third, it
                  protects your business from legal liability. Having a
                  documented privacy policy creates a record of your data
                  practices and commitment to compliance. Finally, it
                  demonstrates compliance with regulations, preventing potential
                  fines and legal complications that could severely damage your
                  business.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Key Features of Our Generator
                </h3>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Lightning-Fast Generation:
                      </span>{" "}
                      Create a complete privacy policy in seconds. No lengthy
                      questionnaires or complex processes. Simply fill in four
                      basic fields and receive your policy immediately.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Customized to Your Business:
                      </span>{" "}
                      The generator tailors the policy based on the country
                      where you operate and your website information. This
                      ensures the policy addresses regulations relevant to your
                      jurisdiction.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Covers Major Regulations:
                      </span>{" "}
                      Your generated policy addresses GDPR (General Data
                      Protection Regulation) requirements for EU compliance,
                      CCPA (California Consumer Privacy Act) for US compliance,
                      and general data protection best practices.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Professional Language:
                      </span>{" "}
                      The policy uses clear, professional language that is both
                      legally sound and easy for users to understand. Avoid the
                      confusing jargon that often characterizes privacy
                      documents.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Ready to Use:
                      </span>{" "}
                      Your generated policy is complete and ready to publish
                      immediately. No additional editing or legal review
                      required, though we recommend reviewing it to ensure it
                      matches your specific practices.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Easy Copying and Formatting:
                      </span>{" "}
                      View your complete policy in the browser and easily copy
                      it into any text editor or directly onto your website.
                      Compatible with all website platforms and CMS systems.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Understanding GDPR and CCPA Compliance
                </h3>
                <p className="mb-3">
                  The General Data Protection Regulation (GDPR) applies to any
                  website serving users in the European Union, regardless of
                  where the business is located. It imposes strict requirements
                  about how user data must be handled, stored, and protected.
                  The California Consumer Privacy Act (CCPA) applies to
                  businesses collecting data from California residents. Both
                  regulations require clear disclosure of data practices. Our
                  generator ensures your privacy policy covers the essential
                  elements required by these regulations, including data subject
                  rights, consent mechanisms, data retention periods, and
                  contact information for privacy-related inquiries. This
                  comprehensive coverage protects both your users and your
                  business.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Perfect for Various Business Types
                </h3>
                <p>
                  The Privacy Policy Generator serves diverse business models
                  effectively.{" "}
                  <span className="font-semibold">E-commerce businesses</span>{" "}
                  use it to protect customer transaction and shipping data.{" "}
                  <span className="font-semibold">SaaS companies</span> rely on
                  it to clarify how user account information is managed.{" "}
                  <span className="font-semibold">
                    Content creators and bloggers
                  </span>{" "}
                  use it to disclose analytics and tracking practices.{" "}
                  <span className="font-semibold">Mobile app developers</span>{" "}
                  use it to address location data and device permissions.{" "}
                  <span className="font-semibold">Marketing agencies</span> use
                  it to outline how they handle client and customer data.{" "}
                  <span className="font-semibold">Healthcare providers</span>{" "}
                  use it as a foundation for HIPAA-compliant practices. Every
                  online business benefits from having a clear, professional
                  privacy policy.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  What Your Generated Policy Covers
                </h3>
                <p className="mb-3">
                  Your generated privacy policy automatically addresses critical
                  topics including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <span className="font-semibold">
                      Information Collection:
                    </span>{" "}
                    What types of data you collect and how users provide it
                  </li>
                  <li>
                    <span className="font-semibold">Use of Information:</span>{" "}
                    How you use the collected data and your business purposes
                  </li>
                  <li>
                    <span className="font-semibold">Data Security:</span>{" "}
                    Measures you take to protect user information from
                    unauthorized access
                  </li>
                  <li>
                    <span className="font-semibold">Cookies and Tracking:</span>{" "}
                    How cookies and analytics tools are used on your site
                  </li>
                  <li>
                    <span className="font-semibold">Third-Party Sharing:</span>{" "}
                    Whether and how you share data with service providers or
                    partners
                  </li>
                  <li>
                    <span className="font-semibold">User Rights:</span> Rights
                    users have regarding their data and how to exercise them
                  </li>
                  <li>
                    <span className="font-semibold">Contact Information:</span>{" "}
                    How users can reach you with privacy concerns or questions
                  </li>
                  <li>
                    <span className="font-semibold">Policy Updates:</span> How
                    you will notify users of changes to the privacy policy
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Getting Started
                </h3>
                <p>
                  Using the Privacy Policy Generator takes just minutes. Enter
                  your website name—the name your business or website operates
                  under. Provide your website URL to ensure the policy is
                  specific to your site. Supply a contact email address where
                  users can reach you with privacy inquiries. Specify your
                  country to ensure compliance with local regulations. Click the
                  generate button and download or copy your complete,
                  professional privacy policy. The policy is immediately ready
                  to implement on your website.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    ⚖️ Legal Disclaimer:
                  </span>{" "}
                  While our generator creates a comprehensive, professional
                  privacy policy, we recommend having your policy reviewed by a
                  legal professional familiar with your specific business
                  practices and jurisdiction. This tool provides a solid
                  foundation that covers most common scenarios, but your
                  specific data practices may require additional customizations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How often should I update my privacy policy?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You should review and update your privacy policy whenever you
                  make significant changes to your data collection practices,
                  add new features that collect additional data, or when laws
                  change. At minimum, review it annually to ensure continued
                  accuracy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is a privacy policy legally required?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  In many jurisdictions, yes—especially if you collect personal
                  data from users in the EU (GDPR), California (CCPA), or other
                  regions with data protection laws. Even if not strictly
                  required for your location, having a privacy policy is highly
                  recommended for building user trust.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I customize my generated policy?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely. The generated policy is a solid template that you
                  can freely customize to match your exact data practices. Add
                  or remove sections as needed, and adjust language to better
                  reflect your specific business operations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What if my business operates in multiple countries?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you serve users across multiple jurisdictions, generate a
                  policy based on the most restrictive regulations you must
                  comply with. Since GDPR is generally the most stringent, a
                  GDPR-compliant policy typically covers other regions as well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
