import { ReactNode } from "react";
import { Field, FieldError } from "../ui/field";
import { useFieldContext } from "./hooks";

export type FormControlProps = {
  label: string;
  description?: string;
};

type FormBaseProps = {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
};

export function FormBase({ children, horizontal }: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {children}
      {errorElem}
    </Field>
  );
}
