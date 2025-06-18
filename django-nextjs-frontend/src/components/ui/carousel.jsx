import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel({ slides }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div
      className="embla overflow-hidden w-full rounded-lg shadow-lg bg-white"
      ref={emblaRef}
    >
      <div className="embla__container flex">
        {slides.map((slide, idx) => (
          <div
            className="embla__slide flex-shrink-0 w-full"
            key={idx}
            style={{ minWidth: "100%", height: "700px" }} >
            {React.cloneElement(slide, {
              className:
                (slide.props.className || "") +
                " w-full h-full object-cover rounded-lg",
              style: { ...slide.props.style, height: "100%" },
            })}
          </div>
        ))}
      </div>
    </div>
  );
}