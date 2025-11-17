import ShinyText from "../react-bits/animations/TextAnimations/ShinyText/ShinyText";
import MarqueeSection from "../shared/marquee";

export default function ServicesHome() {
  const services = [
    "Web Development",
    "Front-End Development",
    "Back-End Development",
    "App Development",
    "AI/ML Development",
    "UI/UX Design",
    "Custom Applications",
    "Email Marketing",
  ];

  return (
    <section className="flex flex-col items-center gap-8 justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="!text-5xl !font-bold text-center">
          Complete <ShinyText text="Website" hasSVG /> Development
        </h1>
        <p className="max-w-4/6 text-center">
          We specialize in UI/UX design, front-end and back-end development, app
          development and cutting-edge AI/ML solutions
        </p>
      </div>
      <MarqueeSection items={services} />
    </section>
  );
}
