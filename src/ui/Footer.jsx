import { footerData } from '../data/FooterData';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane,
  FaFacebookF, FaTwitter, FaBehance, FaInstagram, FaGlobe
} from 'react-icons/fa';
import FooterModal from './Home Page/FooterModal';
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useServices } from '../hooks/useServiceHooks';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { logo, description, socials, quickLinks, newsletter } = footerData;

  // Fetch real services from API
  const { data: allServices } = useServices();

  // Pick 5 random services (stable per render, recalculates when services load)
  const randomServices = useMemo(() => {
    if (!allServices || allServices.length === 0) return [];
    const shuffled = [...allServices].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [allServices]);

  // Check if current page is the Home page
  const isHomePage = location.pathname === '/';

  const iconMap = {
    FaFacebookF: <FaFacebookF />,
    FaTwitter: <FaTwitter />,
    FaBehance: <FaBehance />,
    FaInstagram: <FaInstagram />,
    FaGlobe: <FaGlobe />
  };

  return (
    <footer className={`bg-secondary text-gray-400 px-6 font-sans relative z-10 ${isHomePage
        ? 'py-12 -mt-20 lg:pt-[21rem] lg:px-44' // Spacing for Home Page (with card overlap)
        : 'py-12 mt-0 lg:px-44'                 // Spacing for all other pages (clean look)
      }`}>
      <div className="max-w-[96.875rem] mt-[10rem] md:mt-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Info & Social Media */}
          <div className="flex flex-col space-y-8">
            <div className="bg-white p-2 inline-block rounded w-fit">
              <img src={logo} alt="Nextech Logo" className="h-9 w-auto" />
            </div>

            <div className="space-y-5 text-[15px]">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-tertiary" />
                <p>{description.address}, <br /> {description.country}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-tertiary" />
                <p>{description.phone}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-tertiary" />
                <p>{description.email}</p>
              </div>

              <div className="flex gap-5 pt-4">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    className="text-tertiary hover:text-primary text-lg transition-all"
                  >
                    {iconMap[social.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Service Categories */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold text-xl mb-8 uppercase tracking-tight">Our Service</h4>
            <ul className="space-y-5 text-[15px]">
              {randomServices.map((item) => (
                <li key={item.id}>
                  <a href={`/service/${item.id}`} className="hover:text-primary transition-colors">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold text-xl mb-8 uppercase tracking-tight">Quick Link</h4>
            <ul className="space-y-5 text-[15px]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.link} className="hover:text-primary transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6 relative">
            <h4 className="text-white font-bold text-xl uppercase tracking-tight">{newsletter.title}</h4>
            <p className="text-[15px] leading-relaxed text-tertiary">{newsletter.subtitle}</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center justify-between w-full bg-[#031b33] border border-sky-900/50 text-sky-400 py-2 pl-5 pr-2 rounded-xl hover:bg-sky-900 transition-all text-sm"
            >
              <span>Click me to send an email</span>
              <div className="bg-[#0A1128] p-3 rounded-lg group-hover:bg-[#00AEEF] transition-colors">
                <FaPaperPlane className="text-white" />
              </div>
            </button>

            <FooterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-600 mt-16 pt-4 text-center text-sm">
          <p>
            2026 © All rights reserved by <span className="text-primary font-semibold">Next-Tech</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




// import { footerData } from '../data/FooterData';
// import {
//   FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane,
//   FaFacebookF, FaTwitter, FaBehance, FaInstagram, FaGlobe
// } from 'react-icons/fa';
// import FooterModal from './Home Page/FooterModal';
// import { useState, useMemo } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useServices } from '../hooks/useServiceHooks';

// const Footer = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const location = useLocation();
//   const { logo, description, socials, quickLinks, newsletter } = footerData;

//   // Fetch real services from API
//   const { data: allServices } = useServices();

//   // Pick 5 random services
//   const randomServices = useMemo(() => {
//     if (!allServices || allServices.length === 0) return [];
//     const shuffled = [...allServices].sort(() => Math.random() - 0.5);
//     return shuffled.slice(0, 5);
//   }, [allServices]);

//   // Check if current page is the Home page
//   const isHomePage = location.pathname === '/';

//   const iconMap = {
//     FaFacebookF: <FaFacebookF />,
//     FaTwitter: <FaTwitter />,
//     FaBehance: <FaBehance />,
//     FaInstagram: <FaInstagram />,
//     FaGlobe: <FaGlobe />
//   };

//   return (
//     <footer className={`bg-secondary text-gray-400 px-4 md:px-6 font-sans relative z-10 ${
//     isHomePage
//       ? 'py-12 -mt-12 lg:pt-[20rem] lg:px-44'   // ← only mobile top margin reduced
//       : 'py-12 mt-0 lg:px-44'
//   }`}>
//       <div className="max-w-[96.875rem] mt-[22rem] mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

//           {/* Column 1: Info & Social Media */}
//           <div className="flex flex-col space-y-6">
//             <div className="bg-white p-2 inline-block rounded w-fit">
//               <img src={logo} alt="Nextech Logo" className="h-9 w-auto" />
//             </div>

//             <div className="space-y-4 text-[15px]">
//               <div className="flex items-start gap-4">
//                 <FaMapMarkerAlt className="mt-1 text-tertiary" />
//                 <p>{description.address}, <br /> {description.country}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <FaPhoneAlt className="text-tertiary" />
//                 <p>{description.phone}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <FaEnvelope className="text-tertiary" />
//                 <p>{description.email}</p>
//               </div>

//               <div className="flex gap-5 pt-2">
//                 {socials.map((social) => (
//                   <a
//                     key={social.id}
//                     href={social.link}
//                     className="text-tertiary hover:text-primary text-lg transition-all"
//                   >
//                     {iconMap[social.icon]}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Column 2: Service Categories */}
//           <div className="lg:pl-10">
//             <h4 className="text-white font-bold text-xl mb-6 uppercase tracking-tight">Service Categories</h4>
//             <ul className="space-y-4 text-[15px]">
//               {randomServices.map((item) => (
//                 <li key={item.id}>
//                   <a href={`/service/${item.id}`} className="hover:text-primary transition-colors">{item.title}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Quick Links */}
//           <div className="lg:pl-10">
//             <h4 className="text-white font-bold text-xl mb-6 uppercase tracking-tight">Quick Link</h4>
//             <ul className="space-y-4 text-[15px]">
//               {quickLinks.map((link) => (
//                 <li key={link.id}>
//                   <a href={link.link} className="hover:text-primary transition-colors">{link.name}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4: Newsletter */}
//           <div className="space-y-6 relative">
//             <h4 className="text-white font-bold text-xl uppercase tracking-tight">{newsletter.title}</h4>
//             <p className="text-[15px] leading-relaxed text-tertiary">{newsletter.subtitle}</p>

//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="group flex items-center justify-between w-full bg-[#031b33] border border-sky-900/50 text-sky-400 py-2 pl-5 pr-2 rounded-xl hover:bg-sky-900 transition-all text-sm"
//             >
//               <span>Click me to send an email</span>
//               <div className="bg-[#0A1128] p-3 rounded-lg group-hover:bg-[#00AEEF] transition-colors">
//                 <FaPaperPlane className="text-white" />
//               </div>
//             </button>

//             <FooterModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//             />
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="border-t border-gray-800 mt-16 pt-6 text-center text-sm">
//           <p>
//             2026 © All rights reserved by <span className="text-primary font-semibold">Next-Tech</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;