/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import { useContactForm } from '../../hooks/useContactHooks.js';

const FooterModal = ({ isOpen = false, onClose = () => { } }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
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

    const result = await submitContactForm(formData);

    if (result.success) {
      setFormData({ email: "", subject: "", message: "" });
      setTimeout(() => {
        onClose();
        resetStatus();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop to catch clicks outside the modal */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Change 'fixed inset-0' to 'absolute' and remove blur/bg-black */}
      {/* bottom-0 right-0 ensures it appears right over the newsletter section */}
      <div className="absolute bottom-0 lg:translate-y-20  right-0 z-50 w-full min-w-[320px] animate-in slide-in-from-bottom-5 duration-300">

        <div className="relative w-full bg-white rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100">

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Need help?</h2>

          <form className="space-y-3" onSubmit={handleSubmit} noValidate>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email *"
                className={`w-full border rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-200 text-gray-800 focus:ring-[#00AEEF]'
                  }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-gray-200 rounded-lg py-3 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Message... *"
                rows="3"
                className={`w-full border rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 resize-none ${errors.message ? 'border-red-500 focus:ring-red-500 text-red-500 placeholder-red-400' : 'border-gray-200 text-gray-800 focus:ring-[#00AEEF]'
                  }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            {status.error && <p className="text-red-500 text-xs">{status.error}</p>}
            {status.success && <p className="text-green-600 text-xs">Message sent successfully!</p>}

            <button
              type="submit"
              disabled={status.loading}
              className="flex items-center justify-center gap-2 w-full bg-[#00AEEF] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#0096ce] transition-all uppercase text-xs tracking-widest disabled:opacity-50"
            >
              {status.loading ? "SENDING..." : "SEND MESSAGE"}
              <FaChevronRight size={10} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FooterModal;