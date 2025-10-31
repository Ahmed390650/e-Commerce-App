import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./FormInput";
import FormSwitch from "./FormSwitch";
import { FormSelect } from "./FormSelect";
const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Switch: FormSwitch,
    Select: FormSelect,
  },
  fieldContext,
  formContext,
  formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
