import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  const shouldShowStack = import.meta.env.DEV && errorStack;

  return (
    <div
      role="alert"
      className="bg-background text-foreground flex min-h-screen items-center justify-center p-6"
    >
      <div className="bg-card w-full max-w-lg space-y-5 rounded-2xl border p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground text-sm">
            The application encountered an unexpected error. Try again or
            restart the app if the problem persists.
          </p>
        </div>

        <pre className="bg-muted text-muted-foreground overflow-auto rounded-lg p-3 text-sm">
          {errorMessage}
        </pre>

        {shouldShowStack ? (
          <details className="rounded-lg border p-3 text-sm">
            <summary className="cursor-pointer font-medium">
              Error stack
            </summary>
            <pre className="text-muted-foreground mt-3 overflow-auto text-xs">
              {errorStack}
            </pre>
          </details>
        ) : null}

        <Button type="button" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </div>
  );
}

interface Props {
  children?: ReactNode;
}

export const BaseErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};
