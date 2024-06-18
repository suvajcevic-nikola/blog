import {
  ButtonHTMLAttributes,
  ReactNode,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { cls } from "@/utils/helper";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, className, role = "button", ...elementProps },
  ref,
) => {
  const isDisabled = elementProps.disabled;

  return (
    <button
      {...elementProps}
      ref={ref}
      className={cls(
        className,
        "rounded-full bg-fuchsia-600 px-4 py-2 font-bold text-white",
        isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-fuchsia-700",
      )}
      role={role}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
