import React from "react";
import PageHero from "../components/PageHero/PageHero";

// Import des images Contact
import contactImageDesktop from "../assets/contact/desktop/image-hero.jpg";
import contactImageTablet from "../assets/contact/tablet/image-hero.jpg";
import contactImageMobile from "../assets/contact/mobile/image-hero.jpg";

const ContactPage = () => {
  const contactHeroData = {
    images: {
      desktop: contactImageDesktop,
      tablet: contactImageTablet,
      mobile: contactImageMobile,
    },
    altText: "Téléphone vintage noir pour nous contacter",
    bigLabel: "Contact",
    title: "Tell us about your project",
    description:
      "We'd love to hear more about your project. Please, leave a message below or give us a call. We have two offices, one in Texas and one in Tennessee. If you find yourself nearby, come say hello!",
  };

  return (
    <section className="contact-page">
      <PageHero {...contactHeroData} />
    </section>
  );
};

export default ContactPage;
