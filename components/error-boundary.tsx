import { Component, ErrorInfo, ReactNode } from "react";
import Button from "./button";
import { title } from "process";

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

export const ErrorPlaceholder = ({
  title = "Something went wrong.",
  buttonTitle,
  onButtonClick,
}: {
  title?: string;
  buttonTitle: string;
  onButtonClick: () => void;
}) => (
  <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
    <p className="text-xl font-bold text-white">{title}</p>
    <Button onClick={onButtonClick}>{buttonTitle}</Button>
  </div>
);

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPlaceholder
          buttonTitle="Try again?"
          onButtonClick={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
