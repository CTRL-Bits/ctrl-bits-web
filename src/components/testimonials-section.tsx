import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Trusted by businesses, loved by developers
          </h2>
          <p>
            Ctrl Bits empowers startups and enterprises with tailored tech
            solutions, reliable support, and scalable digital infrastructure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
              <img
                className="h-6 w-fit"
                src="https://www.gglamorous.com/assets/logo-CTwv0n0M.png"
                alt="gglamorous Logo"
                height="24"
                width="auto"
              />
            </CardHeader>
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  Ctrl Bits has been instrumental in streamlining our backend
                  systems and optimizing performance across our e-commerce
                  platform. Their technical insight and hands-on support are
                  top-notch.
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Pramesh Bhandari"
                    />
                    <AvatarFallback>PB</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">
                      Pramesh Bhandari
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      CTO, NepBay
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  The Ctrl Bits team was proactive, communicative, and fast.
                  They built and launched our internal dashboard in record time
                  — exactly what we needed.
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="Anish Koirala"
                    />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Anish Koirala</cite>
                    <span className="text-muted-foreground block text-sm">
                      Product Manager, SwiftFin
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Our collaboration with Ctrl Bits was seamless. They handled
                  everything from API integration to frontend polishing — always
                  delivering quality results.
                </p>
                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/65.jpg"
                      alt="Sneha Dahal"
                    />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Sneha Dahal</cite>
                    <span className="text-muted-foreground block text-sm">
                      Lead Developer, AgroTech Nepal
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  What impressed us most was Ctrl Bits’ ability to understand
                  our business logic and translate it into a scalable software
                  solution. Highly recommended!
                </p>
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/men/21.jpg"
                      alt="Roshan Thapa"
                    />
                    <AvatarFallback>RT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Roshan Thapa</p>
                    <span className="text-muted-foreground block text-sm">
                      Founder, BizSuite Tech
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
