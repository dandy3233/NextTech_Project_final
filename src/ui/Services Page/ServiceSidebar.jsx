import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import Button from "../Button.jsx";
import PropTypes from "prop-types";
import { useContactForm } from "../../hooks/useContactHooks.js";

/**
 * Right sidebar containing the services navigation list
 * and the "Need Help?" contact form.
 */
export default function ServiceSidebar({ services = [], activeId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      message: formData.message,
    });
    
    if (result.success) {
      setFormData({ name: "", email: "", message: "" });
    }
  };
  return (
    <aside className="space-y-11 lg:top-10 py-20 md:py-0 h-fit flex flex-col mb-28 md:mb-0 ml-0 lg:ml-10 xl:ml-14">
      {/* Services List */}
      <div className="bg-white py-8 rounded-lg p-6 sm:p-6 lg:p-5 xl:p-6 flex flex-col border border-gray-600 border-opacity-20">
        <h3 className="font-sans text-2xl lg:text-xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-900 mb-6 lg:mb-4 xl:mb-6">
          Services List
        </h3>
        <div className="flex flex-col space-y-3 lg:space-y-3 h-[26rem] lg:h-[20rem] xl:h-[26rem] overflow-y-auto pr-2 custom-scrollbar">
          {services.map((item) => (
            <Link
              key={item.id}
              to={`/service/${item.id}`}
              className={`rounded-lg px-6 py-4 lg:py-2 xl:py-4 2xl:py-5 flex items-center justify-between border border-gray-600 border-opacity-20 transition-all duration-300 group ${
                activeId === item.id
                  ? "bg-[#101010] border-transparent"
                  : "bg-white hover:bg-[#101010]"
              }`}
            >
              <span
                className={`text-base lg:text-base xl:text-lg 2xl:text-lg line-clamp-1 transition-colors ${
                  activeId === item.id
                    ? "text-white"
                    : "text-gray-800 group-hover:text-white"
                }`}
              >
                {item.title}
              </span>
              <IoIosArrowRoundForward
                className={`text-2xl transition-all duration-300 group-hover:translate-x-1 ${
                  activeId === item.id
                    ? "text-white"
                    : "text-gray-800 group-hover:text-white"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Need Help Form */}
      <div className="bg-white rounded-lg p-6 lg:p-5 xl:p-6 border border-gray-100 shadow-sm ring-1 ring-gray-900/5">
        <h3 className="text-2xl lg:text-xl xl:text-4xl font-bold text-gray-900 mb-8 lg:mb-4 xl:mb-8">
          Need help?
        </h3>
        <form className="space-y-4 lg:space-y-3 xl:space-y-4 2xl:space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full px-5 py-4 lg:py-3 xl:py-4 border border-gray-200 rounded-xl text-base leading-none focus:ring-2 focus:ring-primary outline-none transition text-gray-900"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email *"
              className={`w-full px-5 py-4 lg:py-3 xl:py-4 border rounded-xl text-base leading-none focus:ring-2 outline-none transition ${
                errors.email ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-200 focus:ring-primary text-gray-900'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help? *"
              className={`w-full px-5 py-4 lg:py-3 xl:py-4 2xl:py-5 min-h-[7.5rem] lg:min-h-[6.25rem] xl:min-h-[7.5rem] 2xl:min-h-[8.75rem] border rounded-xl text-base focus:ring-2 outline-none transition resize-none ${
                errors.message ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-200 focus:ring-primary text-gray-900'
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>}
          </div>
          {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
          {status.success && <p className="text-green-600 text-sm">Message sent successfully!</p>}

          <div className="pt-4 lg:pt-3 xl:pt-8 2xl:pt-10 flex justify-center">
            <Button as="button" type="submit" onClick={handleSubmit} disabled={status.loading} variant="primary" size="lg" iconAfter={MdKeyboardArrowRight}>
              {status.loading ? "SENDING..." : "SEND MESSAGE"}
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
}

ServiceSidebar.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, title: PropTypes.string })
  ),
  activeId: PropTypes.string,
};
