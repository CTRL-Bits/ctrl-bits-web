import { Cpu, Zap } from "lucide-react";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h1 className="relative variable-font z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          About Ctrl Bits – Empowering Businesses with Technology
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              At Ctrl Bits, we strive to build more than just software.{" "}
              <span className="text-accent-foreground font-bold">
                We empower businesses
              </span>{" "}
              with cutting-edge solutions, offering tools to innovate, optimize,
              and scale operations.
            </p>
            <p className="text-muted-foreground">
              We believe in creating an entire ecosystem that supports
              businesses — from seamless integrations to the tools and platforms
              developers need to push boundaries and stay ahead in the digital
              world.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <h3 className="text-sm font-medium">Speed</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Our solutions are designed to accelerate processes, ensuring
                  faster delivery and more responsive systems.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4" />
                  <h3 className="text-sm font-medium">Performance</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  With powerful tech stacks, we deliver high-performing
                  applications that scale with your business needs.
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-6 sm:mt-0">
            <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db"
                className="hidden rounded-[15px] dark:block"
                alt="tech solutions illustration dark"
                width={1206}
                height={612}
              />
              <img
                src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64"
                className="rounded-[15px] shadow dark:hidden"
                alt="tech solutions illustration light"
                width={1206}
                height={612}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
