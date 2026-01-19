"use client";

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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
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
        {/* Add SEO content here */}
        <div className="mt-12 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              What is a Privacy Policy?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              A privacy policy is a legal document that discloses how a website
              or app collects, uses, and shares personal information from its
              users. It outlines the types of data collected, the purposes for
              which it's used, and the rights of users regarding their data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Do You Need a Privacy Policy?
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Having a privacy policy is essential for several reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Legal compliance with data protection laws</li>
              <li>Building trust with your users</li>
              <li>Protecting your business from potential lawsuits</li>
              <li>Demonstrating transparency in data handling</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              GDPR and CCPA Compliance
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The General Data Protection Regulation (GDPR) in the EU and the
              California Consumer Privacy Act (CCPA) in the US require
              businesses to have clear privacy policies. Our generator helps you
              create policies that comply with these regulations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              FAQs
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How often should I update my privacy policy?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You should review and update your privacy policy whenever you
                  make changes to your data collection practices or when laws
                  change.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is a privacy policy legally required?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  In many jurisdictions, yes, especially if you collect personal
                  data from users in the EU, California, or other regions with
                  data protection laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
