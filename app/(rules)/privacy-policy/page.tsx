"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-muted-foreground mb-8">
        Last updated: October 4, 2025
      </p>

      <section className="space-y-4">
        <p>
          ScopeMatter (“we,” “our,” or “us”) respects your privacy and is
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and safeguard information when you use
          our website, web application, and related services (collectively, the
          “Service”).
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p>We collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Account Information:</strong> When you sign up through Clerk
            (our authentication provider), we receive your name, email address,
            and profile image from Clerk.
          </li>
          <li>
            <strong>Usage Data:</strong> We automatically collect information
            such as browser type, IP address, pages visited, and actions taken
            within the app to improve performance and usability.
          </li>
          <li>
            <strong>Project Data:</strong> When you create or manage projects,
            clients, or change orders within ScopeMatter, this data is securely
            stored in our Supabase (PostgreSQL) database.
          </li>
          <li>
            <strong>Cookies:</strong> We use essential and analytical cookies to
            maintain your session and enhance your experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To provide and maintain the ScopeMatter platform.</li>
          <li>To authenticate users and secure access through Clerk.</li>
          <li>To analyze product usage and improve user experience.</li>
          <li>
            To communicate important updates, such as feature changes or policy
            updates.
          </li>
          <li>To comply with legal obligations and prevent misuse.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          3. Data Storage and Security
        </h2>
        <p>
          All data is stored securely using Supabase (PostgreSQL) and cached via
          Upstash Redis for performance. We use HTTPS, encryption in transit,
          and role-based access to protect user data. Authentication and
          identity management are handled by Clerk, which meets modern security
          standards (SOC 2, GDPR, and ISO 27001 compliance).
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          4. Sharing of Information
        </h2>
        <p>
          We do not sell or rent your personal data. Information may be shared
          only with trusted infrastructure partners such as:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Clerk – authentication and user identity management</li>
          <li>Supabase – database and hosting</li>
          <li>Vercel – app deployment and analytics</li>
          <li>Lemon Squeezy – billing and payments</li>
        </ul>
        <p>
          Each of these providers processes data on our behalf and under strict
          data protection agreements.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Retention</h2>
        <p>
          We retain your account and project data for as long as your account
          remains active. You can request data deletion or account closure at
          any time by contacting{" "}
          <a
            href="mailto:muradyusubovdev@icloud.com"
            className="text-primary underline"
          >
            muradyusubovdev@icloud.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent for data processing.</li>
          <li>Export your project data (available within your account).</li>
          <li>
            Lodge a complaint with your local data protection authority if you
            believe your rights have been violated.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          7. Third-Party Links
        </h2>
        <p>
          Our Service may include links to third-party sites (e.g., PandaDoc,
          Bonsai, Notion templates). We are not responsible for their privacy
          practices. We encourage you to review their respective privacy
          policies before sharing personal data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          8. Updates to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. Any significant
          changes will be communicated via email or in-app notice. The latest
          version will always be available at{" "}
          <a
            href="https://scopematter.xyz/privacy-policy"
            className="text-primary underline"
          >
            scopematter.com/privacy
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Contact Us</h2>
        <p>
          For questions or concerns about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:muradyusubovdev@icloud.com"
            className="text-primary underline"
          >
            muradyusubovdev@icloud.com
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
