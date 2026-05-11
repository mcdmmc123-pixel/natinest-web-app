import React from "react";

export function MarqueeStrip() {
  const items = [
    "Free Roaming",
    "Karnataka Farms",
    "Zero Middlemen",
    "Full Traceability",
    "Nest Membership",
    "Natural Feed Only",
    "Weekly Delivery",
  ];

  return (
    <div className="bg-[#1B3A2D] py-3 overflow-hidden whitespace-nowrap flex relative z-10 w-full border-y border-[#4A7C5F]">
      <div className="animate-marquee flex items-center">
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <React.Fragment key={i}>
            <span className="text-[#EDE8DC] uppercase tracking-wider font-semibold text-sm px-6">
              {text}
            </span>
            <span className="text-[#C9A227] px-2">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
