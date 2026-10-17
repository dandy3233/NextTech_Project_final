import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe, FaBars, FaPhone } from 'react-icons/fa';
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaTimesSolid } from "react-icons/lia";
import { MdLocationOn } from 'react-icons/md';
import NextTechLogo from "/NavBarImages/NextTechLogo.png";
import { NavLink, useLocation } from 'react-router-dom';
import Button from './Button';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/aboutus' },
    { name: 'Service', href: '/service' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contacts' },
  ];

  // Hide Contact only on the Home page
  const visibleNavLinks = navLinks.filter(
    (link) => !(isHomePage && link.name === 'Contact')
  );

  // Evaluates sticky condition consistently for both home scroll and subpages
  const isNavbarSticky = isSticky || !isHomePage;

  return (
    <div className={`w-full z-50 transition-all duration-300 
      ${isNavbarSticky
        ? 'fixed top-0 left-0 pt-0 px-0'
        : 'relative pt-0 px-0 lg:pt-11 lg:px-12 xl:px-[6.75rem] '
      }`}>

      <nav className={`w-full transition-all duration-300 shadow-xl bg-white
        ${isNavbarSticky
          ? 'lg:max-w-full lg:rounded-none'
          : 'lg:max-w-[100rem] lg:mx-auto lg:ml-2 lg:rounded-[20px] overflow-hidden'
        }`}>

        {/* --- TOP BAR (Only visible on Home page when not sticky on desktop) --- */}
        {(!isSticky && isHomePage) && (
          <div className="hidden lg:block bg-secondary text-white py-3 px-6 lg:px-0 w-full">
            <div className="w-full hidden lg:flex justify-between items-center text-sm">
              {/* Left Side: Location & Email */}
              <div className="flex items-center gap-8 lg:ml-6">
                <span className="font-light">Ras Al Khaimah,United Arab Emirates</span>
                <a href="mailto:info@nexttech.com" className="text-primary font-medium hover:underline">
                  info@nexttech.com
                </a>
              </div>

              {/* Right Side: Social Media Icons */}
              <div className="flex items-center gap-[1rem] text-white ml-auto mr-6">
                <a href="https://web.facebook.com/profile.php?id=61595294197455" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF className="cursor-pointer hover:text-primary transition-colors text-base" />
                </a>
                <a href="https://www.instagram.com/nexttech435/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="cursor-pointer hover:text-primary transition-colors text-base" />
                </a>
                <a href="https://x.com/nexttech22" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <FaTwitter className="cursor-pointer hover:text-primary transition-colors text-base" />
                </a>
                <a href="https://nexttech.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <FaGlobe className="cursor-pointer hover:text-primary transition-colors text-base" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- MAIN NAVBAR --- */}
        <div className="transition-all duration-300 w-full">
          <div
            className={`max-w-[100rem]  flex justify-between gap-5 xl:gap-0 items-center
              transition-all duration-300 py-[1rem] lg:py-[0rem] 
              ${
                isNavbarSticky
                  ? 'px-[1rem] lg:px-[2rem] xl:px-[7rem] 2xl:px-[8rem]  lg:pb-[0.75rem] '
                  : 'px-[1rem] lg:px-[2rem]'
              }
            `}
          >
            {/* 1. Logo Container */}
            <div className="flex items-center flex-1">
              <img
                src={NextTechLogo}
                alt="NextTech Logo"
                className={`object-contain w-[12.5rem] h-[3.4375rem] lg:h-[5rem] lg:w-[18rem] xl:w-[10rem] transition-all duration-300
                  ${isNavbarSticky ? ' xl:w-[12rem] 2xl:w-[12rem]' : ''}
                `}
              />
            </div>

            {/* 2. Links Container */}
            <div
              className={`hidden lg:flex flex-[2.2] justify-start items-center gap-[2.5rem] transition-all duration-300
                ${isNavbarSticky ? 'lg:ml-[3rem]' : ''}
              `}
            >
              {visibleNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-[1rem] transition-colors hover:text-[#00acee] ${
                      isActive ? 'text-primary' : 'text-[#0B162C]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* 3. Right Side */}
            <div className="flex flex-1 justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-[0.75rem] text-secondary"
              >
                <FaBars size={32} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-y-auto">
          <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
            <img src={NextTechLogo} alt="NextTech Logo" className="w-[180px] sm:w-[200px] h-auto object-contain" />
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary p-3 text-white rounded-lg flex items-center justify-center w-12 h-12"
              aria-label="Close menu"
            >
              <LiaTimesSolid size={24} />
            </button>
          </div>

          <div className="flex flex-col px-6 sm:px-10 py-6 gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `uppercase font-black text-lg pb-2 transition-all ${isActive ? 'text-primary ' : 'text-secondary '}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto bg-[#eafcff] px-6 sm:px-10 py-6 space-y-6">
            <h3 className="text-[#0a1128] text-2xl sm:text-3xl mb-2 text-center font-normal">Contact Info</h3>
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] border-2 border-primary rounded-lg flex items-center justify-center text-primary bg-white shrink-0">
                <MdLocationOn size={24} />
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-medium break-words">FOAM295 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah,
United Arab Emirates</p>
            </div>
            <div className="flex gap-4 sm:gap-5 items-center">
              <div className="min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] border-2 border-primary rounded-lg flex items-center justify-center text-primary bg-white shrink-0">
                <FaPhone size={20} />
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium">+971 55 824 1888</p>
            </div>
            <div className="flex gap-4 sm:gap-5 items-center">
              <div className="min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] border-2 border-primary rounded-lg flex items-center justify-center text-primary bg-white shrink-0">
                <HiOutlineMailOpen size={20} />
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium break-all">info@nextechgtfz.com</p>
            </div>

            <div className="flex justify-center items-center gap-4 pt-2">
              <a href="https://web.facebook.com/profile.php?id=61595294197455" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/nexttech435/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="https://x.com/nexttech22" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-colors">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>

          <div className="flex justify-center py-6 pb-16">
            <Button as={Link} to="/contacts" onClick={() => setIsOpen(false)} variant="primary" size="xl">
              Send Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;