import { HttpTypes } from "@medusajs/types";
import { HeartIcon, Trash2Icon } from "lucide-react";
import { useProduct } from "../..";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CartQtyBox = ({ item }: { item: HttpTypes.StoreCartLineItem }) => {
  const { changeQuantity } = useProduct();
  const increaseDisable = item.quantity <= 1;
  const descreaseDisable = item.variant?.inventory_quantity === item.quantity;
  return (
    <div className="flex px-0 py-[4px] w-[5rem] h-fit items-center justify-evenly object-contain  rounded-[4px] border bg-white">
      <div
        aria-disabled={increaseDisable}
        onClick={() => changeQuantity(item.quantity - 1, item.id)}
        className="text-[15px] font-semibold h-full cursor-pointer aria-disabled:pointer-events-none aria-disabled:text-[#e3e3e3]"
      >
        -
      </div>
      <div className="w-[6px] h-[17px] object-contain text-[14px] font-bold text-center leading-normal flex items-center justify-center">
        {item.quantity}
      </div>
      <div
        aria-disabled={descreaseDisable}
        onClick={() => changeQuantity(item.quantity + 1, item.id)}
        className="text-[15px] font-semibold h-full cursor-pointer aria-disabled:pointer-events-none aria-disabled:text-[#e3e3e3]"
      >
        +
      </div>
    </div>
  );
};
const DeleteButton = ({ item }: { item: HttpTypes.StoreCartLineItem }) => {
  const { handleDelete } = useProduct();
  return (
    <Trash2Icon
      size={18}
      onClick={() => handleDelete(item.id)}
      className="stroke-current hover:stroke-red-500 fill-none hover:fill-red-500 cursor-pointer transition-colors "
    />
  );
};
const HeartButton = () => {
  const [active, setActive] = useState(false);
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => setActive(!active)}
      className="rounded-full size-6 absolute top-2.5 right-2.5  z-10 cursor-pointer bg-[#ffffff80] "
    >
      <HeartIcon
        size={22}
        aria-checked={active}
        className=" aria-[checked=true]:fill-black  transition-colors aria-[checked=true]:stroke-black"
      />
    </Button>
  );
};
export { CartQtyBox, DeleteButton, HeartButton };
