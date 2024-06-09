import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, ...elementProps }: ButtonProps) => {
  const isDisabled = elementProps.disabled;

  return (
    <button
      {...elementProps}
      className={`rounded-full bg-fuchsia-500 px-4 py-2 font-bold text-white ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-fuchsia-700"}`}
      aria-disabled={isDisabled}
      role="button"
    >
      {children}
    </button>
  );
}

export default Button;