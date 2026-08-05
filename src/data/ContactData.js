import { MdLocationOn, MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

export const contactInfo = {
  title: "Get In Touch",
  description: "These are the phrases we stay via way of means of in the whole lot we do. Each brand we build, and we create.",
  details: [
    {
      id: 1,
      icon: MdLocationOn,
      title: "Location",
      content: "FOAM295 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
    },
    {
      id: 2,
      icon: FiPhone,
      title: "Call Now",
      content: "+971 55 824 1888",
    },
    {
      id: 3,
      icon: MdEmail,
      title: "Email Us",
      content: "info@nexttech.com",
    },
  ],
  socials: [
    { id: 1, icon: FaFacebookF, link: "#" },
    { id: 2, icon: FaLinkedinIn, link: "#" },
    { id: 3, icon: FaTwitter, link: "#" },
    { id: 4, icon: FaInstagram, link: "#" },
  ],
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.671151608!2d38.775336!3d9.002447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850020000001%3A0x671391629863a890!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set", // Replace with your actual embed URL
}; 
