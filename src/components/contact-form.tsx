import { useState, useEffect } from "react";

// Icon Components
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-8 h-8"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  job_function: string;
  service_interest: string;
  message: string;
}

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    job_function: "",
    service_interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.ctrlbits.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        const data = await response.json();
        setError(
          data.message || "Something went wrong. Please try again later.",
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        "Failed to submit your inquiry. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    general: [
      {
        icon: <MailIcon />,
        label: "Email Us",
        value: "info@ctrlbits.com",
        link: "mailto:info@ctrlbits.com",
      },
      {
        icon: <PhoneIcon />,
        label: "Call Us",
        value: "+977-9709659012",
        subtitle: "Monday-Friday, 9AM-6PM NPT",
      },
    ],
    support: [
      {
        icon: <MailIcon />,
        label: "Support Email",
        value: "support@ctrlbits.com",
        link: "mailto:support@ctrlbits.com",
      },
      {
        icon: <PhoneIcon />,
        label: "Support Hotline",
        value: "+977-9709659012",
        subtitle: "24/7 Technical Support",
      },
      {
        icon: <MessageIcon />,
        label: "Live Chat",
        value: "Available on our client portal",
        link: "#",
      },
    ],
    sales: [
      {
        icon: <MailIcon />,
        label: "Sales Inquiries",
        value: "sales@ctrlbits.com",
        link: "mailto:sales@ctrlbits.com",
      },
      {
        icon: <PhoneIcon />,
        label: "Sales Team",
        value: "+977-9709659012",
        subtitle: "Monday-Friday, 8AM-7PM NPT",
      },
      {
        icon: <GlobeIcon />,
        label: "Schedule a Demo",
        value: "See our solutions in action",
        link: "#",
      },
    ],
  };

  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <div
          className="text-center mb-16 space-y-4"
          style={{ animation: "fadeIn 600ms ease-out backwards" }}
        >
          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Let's Connect
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Contact Ctrl Bits — Let's Build Smarter Together
          </p>
        </div>

        {/* Tabs */}
        <div
          className="mb-12"
          style={{ animation: "fadeIn 700ms ease-out 100ms backwards" }}
        >
          <div className="flex gap-2 justify-center flex-wrap">
            {["general", "support", "sales"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {tab === "general"
                  ? "General Inquiries"
                  : tab === "support"
                    ? "Technical Support"
                    : "Sales & Projects"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div
            className="lg:col-span-2 space-y-6"
            style={{ animation: "fadeIn 700ms ease-out 200ms backwards" }}
          >
            {contactInfo[activeTab as keyof typeof contactInfo].map(
              (item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {item.label}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                    )}
                    {item.subtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ),
            )}

            {activeTab === "support" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                <div className="flex gap-2">
                  <AlertCircleIcon />
                  <p className="text-xs text-blue-900 dark:text-blue-300">
                    For faster resolution, please have your client ID ready when
                    contacting support.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div
            className="lg:col-span-3"
            style={{ animation: "fadeIn 700ms ease-out 300ms backwards" }}
          >
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Thank You!
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                  Your message has been received. One of our agency specialists
                  will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      phone: "",
                      country: "",
                      job_function: "",
                      service_interest: "",
                      message: "",
                    });
                  }}
                  className="mt-4 px-5 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Contact Our Team
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tell us about your IT needs and our experts will get back to
                    you within 24 hours.
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircleIcon />
                      <p className="text-xs text-red-900 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Country/Region *
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    >
                      <option value="">Select your country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="eu">European Union</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="job_function"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Job Function *
                    </label>
                    <select
                      id="job_function"
                      value={formData.job_function}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    >
                      <option value="">Select your role</option>
                      <option value="executive">Executive/C-Level</option>
                      <option value="it-manager">IT Manager</option>
                      <option value="developer">Developer/Engineer</option>
                      <option value="operations">Operations</option>
                      <option value="security">Security</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="service_interest"
                    className="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Service Interest *
                  </label>
                  <select
                    id="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                  >
                    <option value="">
                      What services are you interested in?
                    </option>
                    <option value="cloud">Cloud Migration & Services</option>
                    <option value="security">Cybersecurity Solutions</option>
                    <option value="development">
                      Custom Software Development
                    </option>
                    <option value="consulting">IT Consulting</option>
                    <option value="support">Managed IT Support</option>
                    <option value="data">Data Analytics & AI</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Tell us about your project or requirements *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your IT challenges or project requirements..."
                    rows={5}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  <ArrowRightIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
