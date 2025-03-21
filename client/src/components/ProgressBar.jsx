import React from "react";

export default function ProgressBar({
  color,
  currentValue,
  totalValue,
  name,
  unit,
}) {
  return (
    <div className="text-[#BDB7AF] text-[14px]">
      <div className="flex justify-between">
        <p className="inline">{name}</p>
        <p className="inline">
          {currentValue}/{totalValue} {unit}
        </p>
      </div>

      <div className="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-[#25282A] font-sans text-xs font-medium">
        <div
          style={{ backgroundColor: color }}
          className="flex h-full w-1/2 items-center justify-center overflow-hidden break-all rounded-full text-white "
        ></div>
      </div>
    </div>
  );
}
