import ShinyText from "../react-bits/animations/TextAnimations/ShinyText/ShinyText";
import { ContainerTextFlip } from "../ui/container-text-flip";
import MagicBento from "../react-bits/components/MagicBento/MagicBento";

export default function FeaturesHomeSection() {
  return (
    <section className="flex flex-col items-center gap-8 justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center">
          <ContainerTextFlip
            textSize="5xl"
            words={["Creative", "Innovative", "Visionary", "Bold"]}
          />{" "}
          & <ShinyText text="Experienced" hasSVG /> Team
        </h1>
        <p className="max-w-4/6 text-center">
          20+ projects done right. At Ctrl Bits, we deliver fast, dependable web
          development, and we don’t stop until you’re happy.
        </p>
      </div>
      <MagicBento enableTilt />
    </section>
  );
}
