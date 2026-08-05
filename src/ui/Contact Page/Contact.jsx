import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { contactInfo } from "../../data/ContactData";
import Button from "../Button.jsx";
import { useContactForm } from "../../hooks/useContactHooks.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: ""
  });

  const { submitContactForm, status, resetStatus } = useContactForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (status.error || status.success) resetStatus();
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    if (result.success) {
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
    }
  };
  return (
    <section className="font-sans pt-28 sm:pt-16 md:pt-24 lg:pt-32 bg-white ">
      <div className="px-6 sm:px-10 lg:px-12 xl:px-28">
        {/* Main Flex/Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-0 items-start mb-16 md:mb-24 xl:mb-28">

          {/* LEFT SIDE: Form */}
          <div className="order-1 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 sm:mb-10 tracking-tight">
              Get A Quote
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full px-5 py-4 border border-gray-300 bg-gray-50/30 rounded-lg text-lg sm:text-lg outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email *"
                    className={`w-full px-5 py-4 border bg-gray-50/30 rounded-lg text-lg sm:text-lg outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-300 focus:ring-primary text-gray-900'
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter Subject"
                    className="w-full px-5 py-4 border border-gray-300 bg-gray-50/30 rounded-lg text-lg sm:text-lg outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone"
                    className="w-full px-5 py-4 border border-gray-300 bg-gray-50/30 rounded-lg text-lg sm:text-lg outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Message... *"
                  className={`w-full h-36 px-5 pt-4 border bg-gray-50/30 rounded-lg text-lg outline-none focus:ring-2 transition-all resize-none ${errors.message ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-300 focus:ring-primary text-gray-900'
                    }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              {status.error && <p className="text-red-500">{status.error}</p>}
              {status.success && <p className="text-green-600">Message sent successfully!</p>}

              <div className="pt-10 lg:pt-6">
                <Button as="button" type="submit" onClick={handleSubmit} disabled={status.loading} variant="primary" size="lg" iconAfter={MdKeyboardArrowRight}>
                  {status.loading ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </div>
            </form>
          </div>

          {/* ================= RIGHT SIDE: Info from Data ================= */}
          <div className="order-2 lg:px-24 lg:order-2 space-y-8 sm:space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 ml-2 tracking-tight">
                {contactInfo.title}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">{contactInfo.description}</p>
            </div>

            <div className="space-y-5">
              {contactInfo.details.map((item) => (
                <div key={item.id} className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-cyan-50 flex items-center justify-center text-primary">
                    <item.icon size={30} />
                  </div>
                  <div>
                    <h4 className="text-xl  font-medium text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-900 text-lg leading-snug">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 sm:gap-4 pt-6">
              {contactInfo.socials.map((social) => (
                <a key={social.id} href={social.link} className="w-16 h-16 bg-cyan-50 flex items-center justify-center rounded-md text-primary">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAP SECTION ================= */}
      <div className="w-full h-[18.75rem] sm:h-[25rem] md:h-[31.25rem] 2xl:h-[33rem] overflow-hidden shadow-inner grayscale-[0.3]">
        <iframe
          src={contactInfo.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
