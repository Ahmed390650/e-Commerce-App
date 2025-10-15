import { HttpTypes } from "@medusajs/types";

const QtyBox = ({
  item,
  changeQuantity,
}: {
  item: HttpTypes.StoreCartLineItem;
  changeQuantity: (number: number, lineId: string) => void;
}) => {
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

export default QtyBox;
