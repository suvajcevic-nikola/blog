import { ErrorPlaceholder } from "@/components/error-boundary";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorPlaceholder
      title="Page Not Found"
      buttonTitle="Go Home"
      onButtonClick={() => router.replace("/")}
    />
  );
}
