"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import axios from "axios";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

type TestimonialType = {
  id: string | number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating?: number;
  featured?: boolean;
  date?: string;
};

const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src: string;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </div>
      ) : null}
      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          asChild
        >
          <a href={url}>{children}</a>
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};

// Function to find URLs in text and return parts with LinkPreview for URLs
const formatContentWithLinks = (content: string) => {
  if (!content) return null;

  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    // Check if this part is a URL
    if (part.match(urlRegex)) {
      return (
        <LinkPreview key={index} url={part} width={250} height={150}>
          <span className="text-blue-600 hover:text-blue-800 underline">
            {part}
          </span>
        </LinkPreview>
      );
    }
    // Regular text
    return <span key={index}>{part}</span>;
  });
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await axios.get(
          "https://api.ctrlbits.xyz/api/testimonials"
        );
        if (!response) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.data;
        setTestimonials(data.results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);
  const placeholderTestimonials: TestimonialType[] = [
    {
      id: "placeholder-1",
      name: "Pramesh Bhandari",
      position: "CTO",
      company: "NepBay",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "Ctrl Bits has been instrumental in streamlining our backend systems and optimizing performance across our e-commerce platform. Their technical insight and hands-on support are top-notch.",
    },
    {
      id: "placeholder-2",
      name: "Anish Koirala",
      position: "Product Manager",
      company: "SwiftFin",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content:
        "The Ctrl Bits team was proactive, communicative, and fast. They built and launched our internal dashboard in record time — exactly what we needed.",
    },
    {
      id: "placeholder-3",
      name: "Sneha Dahal",
      position: "Lead Developer",
      company: "AgroTech Nepal",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      content:
        "Our collaboration with Ctrl Bits was seamless. They handled everything from API integration to frontend polishing — always delivering quality results.",
    },
    {
      id: "placeholder-4",
      name: "Roshan Thapa",
      position: "Founder",
      company: "BizSuite Tech",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      content:
        "What impressed us most was Ctrl Bits' ability to understand our business logic and translate it into a scalable software solution. Highly recommended!",
    },
  ];

  // Combine API testimonials with placeholders to maintain layout
  const displayTestimonials =
    loading || error
      ? placeholderTestimonials
      : [
          ...testimonials,
          ...placeholderTestimonials.slice(testimonials.length),
        ].slice(0, 4);

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

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

        {loading && (
          <div className="text-center py-8">Loading testimonials...</div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Error loading testimonials: {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          {/* First testimonial (larger card) */}
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
              {displayTestimonials[0].company && (
                <div className="h-6 font-semibold">
                  {displayTestimonials[0].company}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  {formatContentWithLinks(displayTestimonials[0].content)}
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={displayTestimonials[0].avatar}
                      alt={displayTestimonials[0].name}
                    />
                    <AvatarFallback>
                      {getInitials(displayTestimonials[0].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">
                      {displayTestimonials[0].name}
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      {displayTestimonials[0].position},{" "}
                      {displayTestimonials[0].company}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Second testimonial */}
          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  {formatContentWithLinks(displayTestimonials[1].content)}
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={displayTestimonials[1].avatar}
                      alt={displayTestimonials[1].name}
                    />
                    <AvatarFallback>
                      {getInitials(displayTestimonials[1].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">
                      {displayTestimonials[1].name}
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      {displayTestimonials[1].position},{" "}
                      {displayTestimonials[1].company}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Third testimonial */}
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>{formatContentWithLinks(displayTestimonials[2].content)}</p>
                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={displayTestimonials[2].avatar}
                      alt={displayTestimonials[2].name}
                    />
                    <AvatarFallback>
                      {getInitials(displayTestimonials[2].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">
                      {displayTestimonials[2].name}
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      {displayTestimonials[2].position},{" "}
                      {displayTestimonials[2].company}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Fourth testimonial */}
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>{formatContentWithLinks(displayTestimonials[3].content)}</p>
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={displayTestimonials[3].avatar}
                      alt={displayTestimonials[3].name}
                    />
                    <AvatarFallback>
                      {getInitials(displayTestimonials[3].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {displayTestimonials[3].name}
                    </p>
                    <span className="text-muted-foreground block text-sm">
                      {displayTestimonials[3].position},{" "}
                      {displayTestimonials[3].company}
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
