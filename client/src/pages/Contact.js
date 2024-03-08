import React from "react";
import Layout from "./../components/layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
    <div className="contact-container">
      <div className="contact-image">
        <img src="/images/contactusss.png" alt="contactus" style={{ width: "99%" }}/>
      </div>
      <div className="contact-info">
        <p className="contact-description">
          Welcome to ElisFragrance Contact Us page!! We are excited to assist you with any inquiries or feedback you may have.Our dedicated team is committed to providing excellent customer service and ensuring your satisfaction.
          Whether you have questions about our product offerings, assistance with an order, or simply want to share your experience with us, we are here to help. Our knowledgeable staff is well-equipped to provide prompt and personalized assistance to address your concerns.
          At ElisFragrance, we value your feedback and strive to continuously improve our services. We appreciate hearing from our customers and encourage you to reach out to us with any suggestions, comments, or testimonials you may have.
          Contacting us is easy! You can reach our customer support team via phone, email, or by filling out the convenient contact form on this page. Rest assured that we will respond to your inquiries as swiftly as possible, ensuring a seamless and satisfactory resolution.
        </p>
        <p>Any query and information about our products, feel free to contact us anytime. We are available 24/7.</p>
        <div className="contact-details">
          <p className="contact-detail">
            <BiMailSend /> Email: <a href="mailto:help@elisfragrance.com">help@elisfragrance.com</a>
          </p>
          <p className="contact-detail">
            <BiPhoneCall /> Phone: +234 806 818 6317
          </p>
          <p className="contact-detail">
            <BiSupport /> Toll-Free: 01-4325-5665
          </p>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default Contact;