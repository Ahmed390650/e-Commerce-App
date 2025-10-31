import React from "react";
import { FormBase, FormControlProps } from "./FormBase";
import { Switch } from "../ui/switch";
import { FieldLabel } from "../ui/field";
import { useFieldContext } from "./hooks";
import * as SwitchPrimitive from "@radix-ui/react-switch";

const FormSwitch = (
  props: FormControlProps & React.ComponentProps<typeof SwitchPrimitive.Root>
) => {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase>
      <div className="flex gap-2 ">
        <Switch
          {...props}
          checked={field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked);
          }}
          aria-invalid={isInvalid}
          id={field.name}
          name={field.name}
        />
        <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
      </div>
    </FormBase>
  );
};

export default FormSwitch;
