import React from "react";
import PageHero from "../components/PageHero/PageHero";
import ContactDetails from "../components/ContactDetails/ContactDetails";

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

  // Données des bureaux partagées entre ContactDetails et Map
  const offices = [
    {
      id: "main",
      title: "Main Office",
      email: "archone@mail.com",
      address: "1892 Chenoweth Drive TN",
      phone: "123-456-3451",
    },
    {
      id: "office2",
      title: "Office II",
      email: "archtwo@mail.com",
      address: "3399 Wines Lane TX",
      phone: "832-123-4321",
    },
  ];

  return (
    <section className="contact-page">
      <PageHero {...contactHeroData} />
      <ContactDetails offices={offices} />
    </section>
  );
};

export default ContactPage;
