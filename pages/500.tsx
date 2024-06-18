import { ErrorPlaceholder } from "@/components/error-boundary";
import { useRouter } from "next/router";

export default function ServerError() {
  const router = useRouter();

  return (
    <ErrorPlaceholder
      buttonTitle="Go Home"
      onButtonClick={() => router.replace("/")}
    />
  );
}
