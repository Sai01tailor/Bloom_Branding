import React from "react";
import * as Slider from '@radix-ui/react-slider';
import * as LabelPrimitive from '@radix-ui/react-label'; // Changed from broken import

const borderColor = 'Gray';

// 1. Standard Input with Label
export const TextLabel = ({ label, setLabel, placeHolder = '', compul = false, type = 'text' }) => {
  return (
    <div className="flex flex-col text-xl" style={{ margin: 16 }}>
      <LabelPrimitive.Root className="font-medium mb-1">
        {label} {compul && <span className="text-red-500">*</span>}
      </LabelPrimitive.Root>
      <input
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: 10,
          paddingLeft: 4
        }}
        type={type}
        onInput={(e) => setLabel(e.target.value)}
        placeholder={placeHolder}
        required={compul}
      />
    </div>
  );
};

// 2. Textarea with Label
export const TextAreaLabel = ({ label, setLabel, placeHolder = '', compul = false }) => {
  return (
    <div className="flex flex-col text-xl" style={{ margin: 16 }}>
      <LabelPrimitive.Root className="font-medium mb-1">
        {label}
      </LabelPrimitive.Root>
      <textarea
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: 10,
          paddingLeft: 4,
          minHeight: 120
        }}
        onInput={(e) => setLabel(e.target.value)}
        placeholder={placeHolder}
        required={compul}
      />
    </div>
  );
};

export function Slider03({ label, value, setValue, max = 100000, step = 10 }) {
  // 1. Local state to handle the "typing" experience
  const [localInput, setLocalInput] = React.useState(value[0]);

  // 2. Keep local input in sync if the slider moves
  React.useEffect(() => {
    setLocalInput(value[0]);
  }, [value]);

  const handleBlur = () => {
    let num = parseInt(localInput, 10);
    
    if (isNaN(num)) num = 0;
    
    // Clamp the value
    const clamped = Math.max(0, Math.min(num, max));
    
    // 3. Update the actual slider state only now
    setValue([clamped]);
    setLocalInput(clamped); // Sync local display to clamped value
  };

  return (
    <div className="flex flex-col" style={{ margin: 16 }}>
      <div className="flex flex-row items-center justify-between mb-4 gap-4">
        <label className="text-xl font-medium">{label}</label>
        <input
          type="number"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)} // Just update text
          onBlur={handleBlur} // 4. Sync slider only when focus is lost
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()} // Support Enter key
          style={{
            border: '2px solid Gray',
            borderRadius: 10,
            padding: '4px 8px',
            width: '140px',
            textAlign: 'right'
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
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 shadow-sm rounded cursor-pointer" />
      </Slider.Root>
    </div>
  );
}