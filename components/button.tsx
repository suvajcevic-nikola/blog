import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({ children, ...elementProps }: ButtonProps) {
  return (
    <button
      {...elementProps}
      className="rounded-full bg-fuchsia-500 px-4 py-2 font-bold text-white"
      role="button"
    >
      {children}
    </button>
  );
}
