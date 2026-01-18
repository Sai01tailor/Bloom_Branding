import React from "react";
import * as Slider from "@radix-ui/react-slider";
import * as LabelPrimitive from "@radix-ui/react-label";
import Color from "./Color";

const borderColor = Color.DarkChoc;

/* ================================
   1. Text Input with Label
================================ */
export const TextLabel = ({
  label,
  setLabel,
  placeHolder = "",
  compul = false,
  type = "text",
}) => {
  return (
    <div className="flex flex-col text-[2vh]" style={{ margin: 16 }}>
      <LabelPrimitive.Root
        className=" mb-1"
        style={{ color: Color.DarkChoc ,fontSize:'4vh',fontWeight:'bold' }}
      >
        {label} {compul && <span className="text-red-500">*</span>}
      </LabelPrimitive.Root>

      <input
        type={type}
        onInput={(e) => setLabel(e.target.value)}
        placeholder={placeHolder}
        required={compul}
        style={{
          color: Color.DarkChoc,
          border: `2px solid ${borderColor}`,
          borderRadius: 10,
          padding: "6px 8px",
          outline: "none",
        }}
      />
    </div>
  );
};

/* ================================
   2. Textarea with Label
================================ */
export const TextAreaLabel = ({
  label,
  setLabel,
  placeHolder = "",
  compul = false,
}) => {
  return (
    <div className="flex flex-col text-xl" style={{ margin: 16 }}>
      <LabelPrimitive.Root
        className="font-medium mb-1"
        style={{ color: Color.DarkChoc }}
      >
        {label}
      </LabelPrimitive.Root>

      <textarea
        onInput={(e) => setLabel(e.target.value)}
        placeholder={placeHolder}
        required={compul}
        style={{
          color: Color.DarkChoc,
          border: `2px solid ${borderColor}`,
          borderRadius: 10,
          padding: "6px 8px",
          minHeight: 120,
          outline: "none",
          resize: "vertical",
        }}
      />
    </div>
  );
};

/* ================================
   3. Slider with Input + Label
================================ */
export function Slider03({
  label,
  value,
  setValue,
  max = 100000,
  step = 10,
}) {
  const [localInput, setLocalInput] = React.useState(value[0]);

  React.useEffect(() => {
    setLocalInput(value[0]);
  }, [value]);

  const handleBlur = () => {
    let num = parseInt(localInput, 10);
    if (isNaN(num)) num = 0;

    const clamped = Math.max(0, Math.min(num, max));
    setValue([clamped]);
    setLocalInput(clamped);
  };

  return (
    <div className="flex flex-col" style={{ margin: 16, overflow: "hidden" }}>
      <div className="flex items-center justify-between mb-4 gap-4">
        <label
          className="text-xl font-medium "
          style={{ color: Color.DarkChoc }}
        >
          {label}
        </label>

        <input
          type="number"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          style={{
            color: Color.DarkChoc,
            border: `2px solid ${borderColor}`,
            borderRadius: 10,
            padding: "4px 8px",
            width: 140,
            textAlign: "right",
            outline: "none",
          }}
        />
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={setValue}
        step={step}
        max={max}
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <Slider.Range
            className="absolute rounded-full h-full"
            style={{ backgroundColor: Color.DarkChoc }}
          />
        </Slider.Track>

        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-sm rounded cursor-pointer"
          style={{ border: `2px solid ${Color.DarkChoc}` }}
        />
      </Slider.Root>
    </div>
  );
}
