import { Input } from "@headlessui/react";
import { useState } from "react";

export default function ColorSwitcher() {
  const [color, setColor] = useState("");
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setColor(color);
    const root = document.documentElement;
    root.style.setProperty("--color-primary", color);
  };
  return (
    <div className="fixed bottom-3 right-3 flex items-center gap-2 border border-neutral-400 px-2 py-1.5 rounded-lg">
      <Input
        type="color"
        name="picker"
        id="picker"
        onChange={handleColorChange}
        className="size-[30px] rounded-full border-none bg-transparents outline-none appearance-none cursor-pointer"
      />
      <div className="flex flex-col cursor-default select-none">
        <p className="font-medium">Color Switcher</p>
        <span className="text-xs">{color || "#000000"}</span>
      </div>
    </div>
  );
}
