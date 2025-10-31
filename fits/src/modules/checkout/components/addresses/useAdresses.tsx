import { useAppForm } from "@/components/form/hooks";
import { HttpTypes } from "@medusajs/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import useAddressUpdate from "../../hooks/useAddress";
const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required").optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
  address_1: z.string().min(1, "Address line 1 is required").optional(),
  address_2: z.string().optional(), // optional field
  company: z.string().min(1, "Company name is required").optional(),
  postal_code: z.string().min(1, "Postal code is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  province: z.string().min(1, "Province/State is required").optional(),
  country_code: z.string().min(1, "Country code is required").optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
});

const formSchema = z.object({
  shipping_address: addressSchema,
  billing_address: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      address_1: z.string().optional(),
      address_2: z.string().optional(), // optional field
      company: z.string().optional(),
      postal_code: z.string().optional(),
      city: z.string().optional(),
      country_code: z.string().optional(),
      province: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  sameAsBilling: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;
const defaultShippingAddress: z.infer<typeof addressSchema> = {
  city: "",
  address_1: "",
  address_2: "",
  company: "",
  country_code: "",
  first_name: "",
  last_name: "",
  phone: "",
  postal_code: "",
  province: "",
};
const useAdresses = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "shipping";
  const { updateAdress, isPending } = useAddressUpdate();
  const { billing_address, shipping_address } = cart;
  const form = useAppForm({
    defaultValues: {
      shipping_address: shipping_address ?? defaultShippingAddress,
      sameAsBilling: true,
      billing_address: billing_address ?? defaultShippingAddress,
    } satisfies FormValues as FormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value: values }) => {
      const sameAsBilling = values.sameAsBilling;
      const formData = new FormData();
      Object.entries(values.shipping_address).forEach(([key, value]) => {
        formData.append(`shipping_address.${key}`, value || "");
      });

      formData.append("same_as_billing", sameAsBilling ? "on" : "");

      if (!sameAsBilling && values.billing_address) {
        Object.entries(values.billing_address).forEach(([key, value]) => {
          formData.append(`billing_address.${key}`, value || "");
        });
      }
      updateAdress(formData);
    },
  });

  const handleEdit = () => router.push(`${pathname}?step=address`);

  return {
    form,
    handleEdit,
    isPending,
    isOpen,
  };
};

export default useAdresses;
