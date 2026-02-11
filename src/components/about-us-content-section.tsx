// Icon Components
const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CpuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

interface FeatureItemProps {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-900">
        <Icon />
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

export default function ContentSection() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          style={{
            animation: "fadeIn 700ms ease-out 100ms backwards",
          }}
        >
          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Our Mission
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-4 max-w-3xl mx-auto">
            Meet Ctrl Bits – A Top Web Development Team from Nepal
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div
            className="space-y-6"
            style={{
              animation: "fadeIn 700ms ease-out 200ms backwards",
            }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              At Ctrl Bits, we build more than software. We empower businesses
              with web development, custom software, automation, digital
              marketing, and creative production including motion graphics and
              video editing.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We deliver the full stack of growth services, from strategy and
              design to development, analytics, and ongoing optimization.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <FeatureItem
                icon={ZapIcon}
                title="Speed & Efficiency"
                description="Our solutions are designed to accelerate processes, ensuring faster delivery and more responsive systems."
              />

              <FeatureItem
                icon={CpuIcon}
                title="Performance"
                description="With powerful tech stacks, we deliver high-performing applications that scale with your business needs."
              />

              <FeatureItem
                icon={ShieldIcon}
                title="Security"
                description="Enterprise-grade protection built into every layer of our solutions to safeguard your business data."
              />

              <FeatureItem
                icon={GlobeIcon}
                title="Global Scale"
                description="Solutions designed to work seamlessly across regions with multi-language and compliance support."
              />
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                <span>Learn More About Our Approach</span>
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </div>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="relative"
            style={{
              animation: "fadeIn 700ms ease-out 300ms backwards",
            }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db"
                className="h-full w-full object-cover object-center hidden dark:block"
                alt="Web development company in Nepal team collaboration at Ctrl Bits"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64"
                className="h-full w-full object-cover object-center block dark:hidden"
                alt="Custom software development by Ctrl Bits in Nepal"
                loading="lazy"
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-sm p-4 border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Client Satisfaction
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      98%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Projects Completed
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      100+
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
