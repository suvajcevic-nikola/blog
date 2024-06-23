import { useEffect, useRef, useState } from "react";
import Button from "./button";
import { cls } from "@/utils/helper";

type DropdownSelectOption = {
  id: string;
  label: string;
  value: any;
};

const DropdownSelect = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: {
  title: string;
  options: DropdownSelectOption[];
  selectedOption: DropdownSelectOption;
  setSelectedOption: (selected: DropdownSelectOption) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownSelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <Button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-28"
      >
        <div className="flex items-center justify-between gap-2">
          <span>{selectedOption.label}</span>
          <span>&#9662;</span>
        </div>
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 p-2 shadow-lg ring-2 ring-fuchsia-500"
        >
          <div className="px-4 py-2 text-white">{title}</div>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={cls(
                  "my-2 block cursor-pointer rounded-md px-4 py-2 text-white hover:bg-neutral-600",
                  option.id === selectedOption.id && "bg-neutral-500",
                )}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
