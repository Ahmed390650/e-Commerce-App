import { setAddresses } from "@/lib/data/cart";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const useAddressUpdate = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: setAddresses,
    onSuccess() {
      toast.success("Address updated");
      router.push("/checkout?step=delivery");
    },
    onError() {
      toast.error("Error updating address");
    },
  });
  return {
    updateAdress: React.useCallback(mutate, [mutate]),
    isPending,
  };
};

export default useAddressUpdate;
