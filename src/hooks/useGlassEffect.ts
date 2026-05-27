import React from "react";

export const useGlassEffect = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  dependencies: any[] = []
) => {
  // Fixed typing
  const uniqueId = React.useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const feImageRef = React.useRef<SVGFEImageElement>(null); // Fixed typing
  const redChannelRef = React.useRef<SVGFEDisplacementMapElement>(null); // Fixed typing
  const greenChannelRef = React.useRef<SVGFEDisplacementMapElement>(null); // Fixed typing
  const blueChannelRef = React.useRef<SVGFEDisplacementMapElement>(null); // Fixed typing
  const gaussianBlurRef = React.useRef<SVGFEGaussianBlurElement>(null); // Fixed typing

  const generateDisplacementMap = React.useCallback(() => {
    if (!containerRef.current) return "";

    const rect = containerRef.current.getBoundingClientRect();
    const actualWidth = rect.width || window.innerWidth;
    const actualHeight = rect.height || 72;
    const borderRadius = 16;
    const borderWidth = 0.07;
    const brightness = 50;
    const opacity = 0.93;
    const blur = 11;
    const mixBlendMode = "difference";

    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${
      actualWidth - edgeSize * 2
    }" height="${
      actualHeight - edgeSize * 2
    }" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [uniqueId, redGradId, blueGradId]);

  const updateDisplacementMap = React.useCallback(() => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute("href", generateDisplacementMap());
    }
  }, [generateDisplacementMap]);

  React.useEffect(() => {
    updateDisplacementMap();

    // Setup displacement map parameters
    const channels = [
      { ref: redChannelRef, offset: 0 },
      { ref: greenChannelRef, offset: 10 },
      { ref: blueChannelRef, offset: 20 },
    ];

    channels.forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute("scale", (-180 + offset).toString());
        ref.current.setAttribute("xChannelSelector", "R");
        ref.current.setAttribute("yChannelSelector", "G");
      }
    });

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute("stdDeviation", "0.7");
    }
  }, dependencies);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [updateDisplacementMap]);

  return {
    filterId,
    feImageRef,
    redChannelRef,
    greenChannelRef,
    blueChannelRef,
    gaussianBlurRef,
  };
};
