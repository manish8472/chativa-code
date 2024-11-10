import React from "react";
import { Link } from "react-router-dom";
import LogoName from "../component/LogoName";

const TermsOfUsePage = () => {
  return (
    <div className="sm:p-8 bg-fuchsia-50 min-h-screen dark:bg-gray-900 dark:text-gray-300">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-between font-semibold text-blue-600 py-2">
          {/* <img
            className="w-8 h-8 mb-2"
            src={logo} // You can replace this with your logo alt="Chativa Logo" " // You can replace this with your logo
          /> */}
          <LogoName />
          <p className="cursor-pointer">
            <Link to="/signup">⬅️Back to Sign Up page </Link>
          </p>
        </div>
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. ✔️Acceptance of Terms
          </h2>
          <p>
            By accessing or using the Chativa application, you agree to be bound
            by these Terms of Use. If you do not agree to all the terms and
            conditions, you should not use the application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            You must be at least 13 years old to use Chativa. By registering for
            an account, you confirm that you are of legal age and have the
            authority to use the application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Account Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password, and you agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. 🚫Prohibited Conduct
          </h2>
          <p>
            You agree not to engage in any unlawful or inappropriate behavior
            while using Chativa, including but not limited to: harassment,
            offensive language, spamming, or sharing illegal content.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Content Ownership and Usage
          </h2>
          <p>
            You retain ownership of any content you submit, post, or display
            through the Chativa application. However, by submitting content, you
            grant Chativa a license to use, modify, and distribute that content
            within the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. 🔐Privacy Policy</h2>
          <p>
            Your use of Chativa is also governed by our Privacy Policy. Your
            data are stored in database in encrypted. Incoming and outgoing
            messages are also encrypted. And Your data could not be access by or
            shared to third party.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p>
            Chativa reserves the right to suspend or terminate your account for
            any violation of these Terms of Use or any other misconduct.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            Chativa is not liable for any damages that may arise from the use of
            the application, including but not limited to data loss, service
            interruptions, or unauthorized access to your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            9. Modifications to Terms
          </h2>
          <p>
            Chativa reserves the right to modify these Terms of Use at any time.
            Users will be notified of significant changes via email or within
            the application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes will be
            handled in the appropriate courts of this jurisdiction.
          </p>
        </section>
        <div className="flex flex-row-reverse font-semibold text-blue-600 py-2">
          <p className="cursor-pointer">
            <Link to="/signup">⬅️Back to Sign Up page </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
