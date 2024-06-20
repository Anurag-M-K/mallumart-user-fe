import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <section className="my-10">
        <h1 className="font-bold text-2xl mb-10">
          Terms & conditions Related to Your Use of{" "}
          <span className="text-yellow-400"> MalluMart.com</span>
        </h1>
        <h2 className="font-bold text-2xl my-2">Your account</h2>
        <p>
          By using the website, you are responsible for keeping your account and
          password confidential and for restricting access to your computer to
          prevent unauthorized access. You agree to accept responsibility for
          all activities that occur under your account and password. Take all
          necessary steps to ensure your password remains confidential and
          secure. If you suspect that your password has become known to someone
          else or is being used in an unauthorized manner, inform us
          immediately. Please ensure that the details you provide are correct
          and complete, and inform us immediately of any changes to the
          information you provided during registration. You can access and
          update much of your information in the 'My Account' section. We
          understand that you care about how your information is used and
          shared, and we appreciate your trust in our careful and sensible
          handling of your data.
        </p>
      </section>
      <section className="my-10">
        <h2 className="font-bold text-2xl my-2">Subscription</h2>
        <p>
          Subscription plans are available exclusively for sellers. Sellers must
          subscribe annually. Once subscribed, the plan is valid for one year
          from the subscription date. The subscription fee is non-refundable
          under any circumstances.
        </p>
      </section>
      <section className="my-10">
        <h2 className="font-bold text-2xl my-2">
          Digital Communication Platform
        </h2>
        <p>
          You agree, understand, and acknowledge that the website is an online
          platform enabling you to purchase products and services from the
          sellers listed on it from any location. You further agree and
          acknowledge that MalluMart acts solely as a facilitator and is not,
          and cannot be, a party to or in control of any transactions on the
          website. Therefore, the contract of sale for products on the website
          is strictly between users and the sellers on{" "}
          <span className="text-yellow-400">MalluMart.com</span>.
        </p>
      </section>
      <section className="my-5">
        <h2 className="font-bold text-2xl my-2">Disclaimer</h2>
        <p>
          You acknowledge and agree that you are accessing the services on this
          website and conducting transactions at your own risk, using your best
          and most prudent judgment before entering into any transactions. We
          are neither liable nor responsible for any actions or inactions of
          sellers, nor for any breach of conditions, representations, or
          warranties by sellers or manufacturers of the products and services.
          We expressly disclaim all responsibility and liability in this regard.
          Additionally, we will not mediate or resolve any disputes or
          disagreements between users and sellers or manufacturers of the
          products
        </p>
        <p>
          We expressly disclaim any warranties or representations (express or
          implied) regarding the quality, suitability, accuracy, reliability,
          completeness, timeliness, performance, safety,merchantability, or
          legality of the products listed, displayed, or transacted on the
          website, as well as the content (including product or pricing
          information and/or specifications). Although we have taken precautions
          to avoid inaccuracies in the content, this website and all content,
          information, products, and services are provided "as is" without any
          warranty of any kind. We do not implicitly or explicitly support or
          endorse the sale or purchase of any products on the website. At no
          time shall any right, title, or interest in the products sold through
          or displayed on the website vest with MalluMart, nor shall MalluMart
          have any obligations or liabilities in respect of any transactions on
          the website.{" "}
        </p>
      </section>
      <section className="my-5">
        <h2 className="font-bold text-2xl my-2">
          Access to <span className="text-yellow-400">MalluMart.com</span>
        </h2>
        <p>
          We will make every effort to ensure that the website is available
          without interruption and that transmissions are error-free. However,
          due to the nature of the Internet, this cannot be guaranteed.
          Additionally, your access to the website may occasionally be suspended
          or restricted to allow for repairs, maintenance, or the introduction
          of new facilities or services, without prior notice. We will strive to
          minimize the frequency and duration of any such suspensions or
          restrictions.
        </p>
      </section>
      <section className="my-5">
        <h2 className="font-bold text-2xl my-2">Communication</h2>
        <p>
          When you visit MalluMart, you are communicating with us
          electronically. You are required to provide a valid phone number. We
          may communicate with you via email, SMS, chat, phone calls, or any
          other mode of communication. For contractual purposes, you consent to
          receive communications from us, including transactional, promotional,
          and commercial messages, regarding your use of the website.
        </p>
      </section>
      <section className="my-5">
        <h2 className="font-bold text-2xl my-2">Losses</h2>
        <p>
          We shall not be liable for any business damages (including loss of
          profits, revenue, contracts, anticipated savings, data, goodwill, or
          wasted expenditure) or any other indirect or consequential harm that
          was not reasonably foreseeable by both parties when you began using
          the website.
        </p>
      </section>
      <section className="my-5">
        <h2 className="font-bold text-2xl my-2">
          {" "}
          Alteration of Service or Updates to the Terms & conditions
        </h2>
        <p>
          We retain the right to modify our website, policies, and these Terms
          of Use at any time. Your use of the website implies acceptance of the
          policies and Terms of Use in effect at that time.
        </p>
      </section>
      <section className="my-5">
        <h1 className="font-bold text-2xl my-2">Complaint form</h1>
        <p>
          If you believe that your rights are being violated upon by an item or
          information on the MalluMart website, you may file a complaint with
          us. This can be sent via whatsapp, SMS or e￾mail. Whatsapp or SMS :{" "}
          <span className="text-yellow-400 me-4">+919747411113</span>
          e-mail :{" "}
          <span className="text-yellow-400">Mallumartindia@gmail.com</span>
        </p>
      </section>
      <section className="my-5">
        <h1 className="text-2xl font-bold my-2">Our Details</h1>
        <p>
          This website is operated by MalluMart Private Limited. website :{" "}
          <span className="text-yellow-400">Mallumart.com</span>, you could
          contact us by visiting:{" "}
          <span className="text-yellow-400">
            <Link target="_blank" href="www.Mallumart.com/help/contact-us">
              www.Mallumart.com/help/contact-us
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}

export default page;
