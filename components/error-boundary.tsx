import { Component, ErrorInfo, ReactNode } from "react";
import Button from "./button";

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

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
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <p className="text-xl font-bold text-white">Something went wrong.</p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
