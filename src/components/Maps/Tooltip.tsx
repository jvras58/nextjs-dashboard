import React from "react";

interface TooltipProps {
  position: { x: number; y: number };
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ position, content }) => (
  <div
    className="absolute bg-black text-white rounded px-2 py-1 text-sm"
    style={{
      top: position.y,
      left: position.x,
      transform: "translate(-50%, -100%)",
      pointerEvents: "none",
    }}
  >
    {content}
  </div>
);

export default Tooltip;