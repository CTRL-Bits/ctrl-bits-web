import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Headphones,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { API_BASE_URL } from "@/services/api";
import { cn } from "@/lib/utils";

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

const tabs = [
  {
    id: "general",
    label: "General",
    icon: MessageSquareText,
  },
  {
    id: "support",
    label: "Support",
    icon: Headphones,
  },
  {
    id: "sales",
    label: "Projects",
    icon: BriefcaseBusiness,
  },
];

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  job_function: "",
  service_interest: "",
  message: "",
};

const inputClass =
  "h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition-all placeholder:text-neutral-400 focus:border-[#0058fc]/60 focus:ring-4 focus:ring-[#0058fc]/10";

const labelClass = "text-sm font-semibold text-neutral-800";

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
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
        setError(data.message || "Something went wrong. Please try again later.");
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
        icon: <Mail className="h-5 w-5" aria-hidden="true" />,
        label: "Email",
        value: "hi@ctrlbits.com",
        link: "mailto:hi@ctrlbits.com",
      },
      {
        icon: <Phone className="h-5 w-5" aria-hidden="true" />,
        label: "Phone",
        value: "+977-9709659012",
        subtitle: "Monday-Friday, 9AM-6PM NPT",
        link: "tel:+9779709659012",
      },
    ],
    support: [
      {
        icon: <Mail className="h-5 w-5" aria-hidden="true" />,
        label: "Support",
        value: "support@ctrlbits.com",
        link: "mailto:support@ctrlbits.com",
      },
      {
        icon: <Phone className="h-5 w-5" aria-hidden="true" />,
        label: "Hotline",
        value: "+977-9709659012",
        subtitle: "For active clients and urgent fixes",
        link: "tel:+9779709659012",
      },
      {
        icon: <Headphones className="h-5 w-5" aria-hidden="true" />,
        label: "Client portal",
        value: "Available for managed accounts",
      },
    ],
    sales: [
      {
        icon: <Mail className="h-5 w-5" aria-hidden="true" />,
        label: "Projects",
        value: "info@ctrlbits.com",
        link: "mailto:info@ctrlbits.com",
      },
      {
        icon: <Phone className="h-5 w-5" aria-hidden="true" />,
        label: "Discovery call",
        value: "+977-9709659012",
        subtitle: "Scope, timeline, budget, and delivery path",
        link: "tel:+9779709659012",
      },
      {
        icon: <Globe2 className="h-5 w-5" aria-hidden="true" />,
        label: "Remote delivery",
        value: "Nepal and international teams",
      },
    ],
  };

  return (
    <section className="bg-white">
      <div className="grid min-h-[44rem] lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="relative overflow-hidden bg-[#05070d] p-6 text-white md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,88,252,0.32),transparent_34%),radial-gradient(circle_at_92%_100%,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-8 max-w-md text-4xl font-semibold leading-[0.96] tracking-[-0.065em] md:text-5xl">
                Start with the problem, not a package.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
                Share what needs to work better. We will help shape the scope
                for web development, app development, custom software, UI/UX
                design, digital marketing, or creative services.
              </p>
            </div>

            <div>
              <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                        isActive
                          ? "bg-white text-[#001ea2]"
                          : "text-white/54 hover:text-white",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                {contactInfo[activeTab as keyof typeof contactInfo].map(
                  (item) => (
                    <ContactItem key={`${item.label}-${item.value}`} {...item} />
                  ),
                )}
              </div>

              {activeTab === "support" && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex gap-3 text-sm leading-6 text-white/62">
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#8eb6ff]"
                      aria-hidden="true"
                    />
                    <p>
                      For faster support, include your client ID, affected URL,
                      browser, and screenshots when available.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="p-6 md:p-10">
          {formSubmitted ? (
            <SuccessState
              onReset={() => {
                setFormSubmitted(false);
                setFormData(initialFormData);
              }}
            />
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0058fc]">
                  Project inquiry
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-neutral-950 md:text-4xl">
                  Tell us what needs to happen.
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  The more specific you are about goals, timeline, budget, and
                  constraints, the faster we can recommend the right next step.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-3 text-sm leading-6 text-red-800">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" htmlFor="name" required>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Aviral Ale"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Work email" htmlFor="email" required>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Company" htmlFor="company">
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company or brand name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 9709659012"
                    className={inputClass}
                  />
                </Field>

                <Field label="Country/region" htmlFor="country" required>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select country</option>
                    <option value="nepal">Nepal</option>
                    <option value="india">India</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="australia">Australia</option>
                    <option value="eu">European Union</option>
                    <option value="other">Other</option>
                  </select>
                </Field>

                <Field label="Your role" htmlFor="job_function" required>
                  <select
                    id="job_function"
                    value={formData.job_function}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="founder">Founder / owner</option>
                    <option value="executive">Executive / C-level</option>
                    <option value="marketing">Marketing / growth</option>
                    <option value="operations">Operations</option>
                    <option value="product">Product / design</option>
                    <option value="technical">Technical / engineering</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Service interest" htmlFor="service_interest" required>
                  <select
                    id="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Choose the closest match</option>
                    <option value="web-development">Web development</option>
                    <option value="app-development">App development</option>
                    <option value="custom-software">Custom software system</option>
                    <option value="ui-ux-design">UI/UX design</option>
                    <option value="digital-marketing">Digital marketing</option>
                    <option value="creative-services">Creative services</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Project details" htmlFor="message" required>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you trying to build, fix, improve, or automate?"
                    rows={6}
                    className={`${inputClass} h-auto resize-none py-4 leading-6`}
                    required
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-neutral-500">
                  We usually reply within one business day.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0058fc] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0046c9] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting" : "Send inquiry"}
                  {isSubmitting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  subtitle,
  link,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  link?: string;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-white/80">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/34">
          {label}
        </span>
        <span className="mt-1 block break-words text-sm font-semibold text-white/78">
          {value}
        </span>
        {subtitle && (
          <span className="mt-1 block text-xs leading-5 text-white/42">
            {subtitle}
          </span>
        )}
      </span>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.055] p-4 transition-colors hover:bg-white/[0.09]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.055] p-4">
      {content}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="text-[#0058fc]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[34rem] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0058fc]/10 text-[#0058fc]">
        <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-3xl font-semibold tracking-[-0.055em] text-neutral-950">
        Message received.
      </h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-neutral-600">
        Thanks for reaching out. We will review the details and get back to you
        with the right next step.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
      >
        Send another message
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
