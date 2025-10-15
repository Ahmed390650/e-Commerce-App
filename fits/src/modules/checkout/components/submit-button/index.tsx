"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      className={className}
      type="submit"
      disabled={pending}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}
