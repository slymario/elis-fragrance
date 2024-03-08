import React from "react";
import Layout from "./../components/layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="p-container">
        <h1 className="text-center">Privacy Policy</h1>
        <p className="text-end">Last Updated: [Date]</p>

        <p>Welcome to Elis Fragrance. We at Elis Fragrance, we are committed to protecting the privacy of our users. This Privacy Policy outlines the types of personal information we collect, how we use and protect that information, and your rights regarding your personal data. By using our website, you agree to the terms of this Privacy Policy.</p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Personal Information</h3>
        <ul>
          <li><strong>Account Information:</strong> When you create an account on Elis Fragrance, we collect information such as your name, email address, and password.</li>
          <li><strong>Order Information:</strong> When you make a purchase, we collect information necessary for the transaction, including your billing and shipping address, payment details, and order history.</li>
          <li><strong>Communication:</strong> If you contact us via email or through our website, we may collect information provided during the communication.</li>
        </ul>

        <h3>1.2 Non-Personal Information</h3>
        <ul>
          <li><strong>Website Usage Data:</strong> We may collect non-personal information about your interaction with our website, such as the pages visited, time spent on the site, and browser type.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To process and fulfill orders.</li>
          <li>To provide customer support.</li>
          <li>To personalize your experience on our website.</li>
          <li>To communicate with you about your account and transactions.</li>
          <li>To send promotional emails and newsletters (you can opt-out at any time).</li>
          <li>To improve our website and services.</li>
        </ul>

        <h2>3. How We Protect Your Information</h2>
        <p>We take appropriate security measures to protect your personal information. This includes encryption, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third parties who assist us in operating our website, conducting business, or servicing you, as long as those parties agree to keep this information confidential.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Withdraw consent for data processing.</li>
        </ul>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. The date of the latest revision will be indicated at the top of the policy. We recommend reviewing this page periodically for any changes.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:contact@elisfragrance.com">help@elisfragrance.com</a>.</p>

        <p>Thank you for choosing Elis Fragrance!</p>
        <p> 
            [Your Company Name]<br />
            [Your Company Address]<br />
            [City, State, Zip Code]<br />
            [Email Address]<br />
            [Phone Number]
        </p>
      </div>

    </Layout>
  );
};

export default Policy;