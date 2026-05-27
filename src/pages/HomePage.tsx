import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Code2,
  Gauge,
  PenTool,
  SearchCheck,
  ShieldCheck,
  AppWindow,
  Palette,
} from "lucide-react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import CompanyLogoCloud from "@/components/sections/CompanyLogoCloud";
import GradientBlinds from "@/components/GradientBlinds";
import InsightsCards from "@/components/sections/InsightsCards";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const servicePaths = [
  {
    title: "Web Development",
    description:
      "Business websites, landing pages, and SEO-ready builds optimized for speed and lead generation.",
    icon: Code2,
    to: "/solutions",
  },
  {
    title: "App Development",
    description:
      "Web apps and mobile apps with clean architecture, secure APIs, and simple user flows.",
    icon: AppWindow,
    to: "/solutions",
  },
  {
    title: "Custom Software",
    description:
      "Dashboards, portals, internal tools, and integrations that reduce manual work.",
    icon: Blocks,
    to: "/solutions",
  },
  {
    title: "UI/UX Design",
    description:
      "Research-led interfaces, wireframes, and design systems that make products easier to use.",
    icon: PenTool,
    to: "/solutions",
  },
  {
    title: "Creative Services",
    description:
      "Video production, graphic design, branding, animation, and illustration that bring your ideas to life.",
    icon: Palette,
    to: "/solutions",
  },
  {
    title: "Digital Marketing",
    description:
      "SEO, local SEO, content, and paid campaigns built to generate qualified traffic and measurable growth.",
    icon: SearchCheck,
    to: "/solutions",
  },
];

const principles = [
  "Fast pages before decorative pages",
  "Search intent before keyword stuffing",
  "Reusable systems before one-off screens",
  "Clear scope before rushed delivery",
];

const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = (delay = 0): HTMLMotionProps<"section"> =>
    shouldReduceMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-90px" },
          transition: {
            duration: 0.58,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  usePageMetadata({
    title:
      "Web Development & Digital Marketing Services in Nepal | Ctrl Bits",
    description:
      "Ctrl Bits is a Kathmandu-based agency for web development, app development, custom software, UI/UX design, creative services, and digital marketing across Nepal.",
    keywords:
      "web development agency Nepal, app development company Nepal, custom software development Nepal, UI/UX design agency Nepal, digital marketing agency Nepal, creative services Nepal, web development agency Kathmandu, app development agency Kathmandu, control bits, control bits Nepal",
    ogTitle: "Web Development & Digital Marketing | Ctrl Bits",
    ogDescription:
      "Web development, app development, custom software, UI/UX design, creative services, and digital marketing for businesses in Kathmandu and across Nepal.",
    ogUrl: "https://www.ctrlbits.com/",
    canonical: "https://www.ctrlbits.com/",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup type="localBusiness" />
      <main className="bg-[#f5f5f5] text-neutral-950">
        <section className="relative min-h-screen overflow-hidden rounded-b-[2rem] bg-[#05070d] px-4 pb-10 pt-32 text-white md:rounded-b-[4rem] md:px-8 md:pb-14 md:pt-40">
          <div className="absolute inset-0 z-0">
            <GradientBlinds
              className="h-full w-full"
              gradientColors={["#00143f", "#0058fc", "#38bdf8", "#ffffff"]}
              angle={28}
              noise={0.16}
              blindCount={18}
              blindMinWidth={72}
              mouseDampening={0.12}
              mirrorGradient
              spotlightRadius={0.58}
              spotlightSoftness={1.25}
              spotlightOpacity={0.72}
              distortAmount={0.2}
              shineDirection="right"
              mixBlendMode="normal"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(118deg,rgba(5,7,13,0.86)_0%,rgba(0,24,82,0.72)_42%,rgba(0,88,252,0.18)_78%,rgba(255,255,255,0.04)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_16%_0%,rgba(0,88,252,0.24),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(255,255,255,0.09),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#05070d]/78 to-transparent" />

          <div className="pointer-events-none relative z-20 mx-auto grid min-h-[calc(100vh-11rem)] max-w-[88rem] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              className="flex h-full flex-col justify-center"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="mb-7 max-w-xl text-sm font-semibold uppercase tracking-[0.24em] text-white/72">
                  Ctrl the code, bit by bit
                </p>
                <h1 className="max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.085em] md:text-8xl lg:text-[8.75rem]">
                  Digital work that moves business.
                </h1>
              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-xl leading-9 text-white/78">
                  We build fast websites, useful systems, sharp design, and
                  growth-ready marketing from Kathmandu.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#001ea2] transition-colors hover:bg-[#dbe8ff]"
                  >
                    Start a project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.18]"
                  >
                    View case studies
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.18] bg-white/[0.14] p-3 shadow-[0_35px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl md:rounded-[2.75rem]">
                <div className="overflow-hidden rounded-[1.45rem] bg-[#edf3ff] md:rounded-[2.2rem]">
                  <img
                    src="/bitman.png"
                    alt="Ctrl Bits website development, software, and digital marketing team visual"
                    className="aspect-[4/4.35] w-full object-cover object-center"
                  />
                </div>
                <div className="grid gap-3 pt-3 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-white p-5 text-[#00132f]">
                    <Gauge
                      className="h-5 w-5 text-[#0058fc]"
                      aria-hidden="true"
                    />
                    <p className="mt-8 text-2xl font-semibold tracking-[-0.05em]">
                      Speed, search, and use.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      Pages that read clearly and support the business behind
                      them.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#001ea2] p-5 text-white">
                    <ShieldCheck
                      className="h-5 w-5 text-[#cfe0ff]"
                      aria-hidden="true"
                    />
                    <p className="mt-8 text-2xl font-semibold tracking-[-0.05em]">
                      Route-first SEO.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/[0.68]">
                      Each page gets a clear job and search intent.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.64, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <CompanyLogoCloud
                compact
                marquee
                splitInternational
                title="Companies and teams around our work"
              />
            </motion.div>
          </div>
        </section>

        <motion.section className="px-4 py-16 md:px-8 md:py-24" {...revealProps()}>
          <div className="mx-auto max-w-[88rem]">
            <motion.div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-90px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {servicePaths.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={{
                      hidden: { opacity: 0, y: 22 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <Link
                      to={item.to}
                      className="group block min-h-96 rounded-[2rem] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0058fc] text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h2 className="mt-20 max-w-sm text-3xl font-semibold tracking-[-0.06em] text-neutral-950">
                        {item.title}
                      </h2>
                      <p className="mt-5 text-sm leading-7 text-neutral-600">
                        {item.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0058fc]">
                        Explore services
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="px-4 py-16 md:px-8 md:py-24" {...revealProps()}>
          <div className="mx-auto grid max-w-[88rem] gap-10 border-y border-neutral-200 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0058fc]">
                How we think
              </p>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-[-0.075em] md:text-7xl">
                Minimal does not mean empty.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-8 text-neutral-600 md:col-span-2">
                Strong digital work feels simple: clear, fast, useful, and easy
                to trust.
              </p>
              {principles.map((principle) => (
                <div key={principle} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#0058fc]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-neutral-700">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <CaseStudiesGrid preview />

        <motion.section className="px-4 py-16 md:px-8 md:py-24" {...revealProps()}>
          <div className="mx-auto grid max-w-[88rem] gap-5 rounded-[2.5rem] bg-white p-8 md:grid-cols-[1fr_1fr] md:p-10">
            <div>
              <Code2 className="h-7 w-7 text-[#0058fc]" aria-hidden="true" />
              <h2 className="mt-10 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
                What belongs on the homepage?
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-neutral-600">
              <p>
                Give visitors the shortest path to trust, proof, and action.
              </p>
              <p>
                Every page gets one clear job.
              </p>
            </div>
          </div>
        </motion.section>

        <InsightsCards preview />

        <motion.section className="px-4 py-20 md:px-8" {...revealProps()}>
          <div className="mx-auto grid max-w-[88rem] gap-6 rounded-[2.5rem] bg-[#001ea2] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#cfe0ff]">
                Start with the problem
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
                Tell us what needs to work better.
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#001ea2] transition-colors hover:bg-[#dbe8ff]"
            >
              Contact Ctrl Bits
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
};
export default HomePage;

