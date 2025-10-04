"use client";

import React from "react";

const TermsOfService = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="text-muted-foreground mb-8">
        Last updated: October 4, 2025
      </p>

      <section className="space-y-4">
        <p>
          Welcome to ScopeMatter. These Terms of Service (“Terms”) govern your
          access to and use of ScopeMatter’s website, web application, and
          related services (collectively, the “Service”). By using the Service,
          you agree to these Terms. If you do not agree, do not use the Service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. Description of Service
        </h2>
        <p>
          ScopeMatter helps freelancers and small agencies manage project
          requirements, track change requests, and prevent scope creep. The
          Service provides tools for project documentation, change order
          management, and collaboration with clients.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Eligibility</h2>
        <p>
          You must be at least 16 years old to use ScopeMatter. By creating an
          account, you represent that all registration information you submit is
          accurate and that you have the legal authority to agree to these
          Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Accounts</h2>
        <p>
          To use the Service, you must create an account through Clerk (our
          authentication provider). You are responsible for maintaining the
          confidentiality of your login credentials and for all activities under
          your account. If you suspect unauthorized access, notify us
          immediately at{" "}
          <a
            href="mailto:muradyusubovdev@icloud.com"
            className="text-primary underline"
          >
            muradyusubovdev@icloud.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Acceptable Use</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Do not use the Service for unlawful, harmful, or fraudulent
            purposes.
          </li>
          <li>
            Do not attempt to gain unauthorized access, reverse engineer, or
            disrupt the Service.
          </li>
          <li>
            Do not upload or share content that infringes on intellectual
            property rights or violates privacy laws.
          </li>
          <li>
            You are responsible for ensuring that your use of ScopeMatter
            complies with all applicable local and international laws.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          5. Intellectual Property
        </h2>
        <p>
          All materials provided through the Service, including but not limited
          to the user interface, features, branding, and underlying technology,
          are the property of ScopeMatter or its licensors. You retain ownership
          of your uploaded content and project data. By using the Service, you
          grant us a limited, non-exclusive license to store and display that
          data solely for providing the Service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          6. Payment and Subscriptions
        </h2>
        <p>
          Some features of ScopeMatter may require a paid subscription,
          processed through Lemon Squeezy. By subscribing, you authorize
          recurring billing according to your selected plan. Subscription fees
          are non-refundable except where required by law. You may cancel at any
          time, and access to paid features will remain until the end of your
          billing cycle.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Termination</h2>
        <p>
          We may suspend or terminate your account if you violate these Terms or
          misuse the Service. You may terminate your account at any time by
          contacting{" "}
          <a
            href="mailto:muradyusubovdev@icloud.com"
            className="text-primary underline"
          >
            muradyusubovdev@icloud.com
          </a>
          . Upon termination, your access will cease, but certain obligations
          (such as outstanding payments) may remain.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Disclaimers</h2>
        <p>
          The Service is provided on an “as is” and “as available” basis. We do
          not guarantee that ScopeMatter will be error-free or uninterrupted. To
          the fullest extent permitted by law, ScopeMatter disclaims all
          warranties, whether express or implied, including fitness for a
          particular purpose and non-infringement.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          9. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, ScopeMatter and its affiliates
          shall not be liable for any indirect, incidental, or consequential
          damages arising from your use of the Service, including data loss or
          business interruption. Our total liability shall not exceed the amount
          you paid to ScopeMatter in the twelve months preceding the event.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          10. Changes to the Terms
        </h2>
        <p>
          We may modify these Terms at any time. Updates will be effective upon
          posting on{" "}
          <a
            href="https://scopematter.xyz/terms"
            className="text-primary underline"
          >
            scopematter.xyz/terms
          </a>
          . Continued use of the Service after an update constitutes acceptance
          of the new Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the Republic of Türkiye, without regard to its conflict of law
          provisions.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Contact</h2>
        <p>
          For any questions regarding these Terms, please contact us at{" "}
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

export default TermsOfService;
