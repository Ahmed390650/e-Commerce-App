import { FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export function FormInput(
  props: FormControlProps & React.ComponentProps<"input">
) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      <Input
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
