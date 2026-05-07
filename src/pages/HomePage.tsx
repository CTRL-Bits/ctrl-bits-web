import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Code2,
  Compass,
  Gauge,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import CompanyLogoCloud from "@/components/sections/CompanyLogoCloud";
import InsightsCards from "@/components/sections/InsightsCards";
import SchemaMarkup from "@/components/schema-markup";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const servicePaths = [
  {
    title: "Websites that explain, rank, and convert",
    description:
      "Business websites, landing pages, CMS builds, and e-commerce experiences built around speed, search intent, trust, and lead generation.",
    icon: SearchCheck,
    to: "/solutions",
  },
  {
    title: "Apps and software systems that reduce operational drag",
    description:
      "Web apps, dashboards, internal tools, automation workflows, integrations, and custom software for teams that have outgrown spreadsheets.",
    icon: Blocks,
    to: "/solutions",
  },
  {
    title: "Product design with enough taste to stay useful",
    description:
      "Interface systems, UX flows, brand direction, SEO structure, and content architecture shaped before code turns expensive.",
    icon: Compass,
    to: "/solutions",
  },
];

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4";

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
      "Ctrl Bits | Web Development, App Development & Software Company in Nepal",
    description:
      "Ctrl Bits is a Nepal-based software and digital product company for web development, app development, UI/UX, SEO, automation, branding, and custom systems.",
    keywords:
      "web development Kathmandu, app development Nepal, software company Kathmandu, SEO services Kathmandu, UI UX design Nepal, business automation Nepal, digital product development Nepal",
    ogTitle: "Ctrl Bits | Websites, Apps, Software and Automation",
    ogDescription:
      "A Nepal-based digital product team building fast websites, useful apps, custom software, SEO foundations, and automation systems.",
    ogUrl: "https://www.ctrlbits.com/",
    canonical: "https://www.ctrlbits.com/",
    twitterCard: "summary_large_image",
  });

  return (
    <>
      <SchemaMarkup type="localBusiness" />
      <main className="bg-[#f5f5f5] text-neutral-950">
        <section className="relative min-h-screen overflow-hidden rounded-b-[2rem] bg-[#05070d] px-4 pb-10 pt-32 text-white md:rounded-b-[4rem] md:px-8 md:pb-14 md:pt-40">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(5,7,13,0.96)_0%,rgba(0,24,82,0.90)_42%,rgba(0,88,252,0.44)_78%,rgba(255,255,255,0.10)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(0,88,252,0.30),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(255,255,255,0.11),transparent_30%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d]/78 to-transparent" />

          <div className="relative mx-auto grid min-h-[calc(100vh-11rem)] max-w-[88rem] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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
                  Practical digital systems for serious businesses.
                </h1>
              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-xl leading-9 text-white/78">
                  Ctrl Bits designs and builds websites, apps, software systems,
                  SEO foundations, brands, and automation workflows for
                  companies that need their digital presence to do actual work.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#001ea2] transition-colors hover:bg-[#dbe8ff]"
                  >
                    Start a project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.18]"
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
                    alt="Ctrl Bits digital product visual placeholder"
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
              className="grid gap-4 lg:grid-cols-3"
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
                A strong digital product is usually quiet. It answers the right
                question, gives the next step, loads quickly, and makes the
                business look competent. That is the direction for Ctrl Bits:
                less noise, more signal, better structure.
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
                Enough context to understand Ctrl Bits, enough proof to trust
                the work, and enough direction to choose the correct route.
                The detailed service, portfolio, company, and contact content
                now lives on separate pages for better SEO and better UX.
              </p>
              <p>
                That gives search engines clearer page intent and gives users a
                cleaner path: learn what we do, inspect the work, understand the
                team, or start a conversation.
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
