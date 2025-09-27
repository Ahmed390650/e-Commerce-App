import {
  ProductImageThumbnail,
  ProductTitle,
  useProduct,
} from "@/components/product";
import {
  CartQtyBox,
  DeleteButton,
  HeartButton,
} from "@/components/product/product-line-cart/line-actions";
import ProductPrice from "@/components/product/product-Price";
import { getPriceForVariantCart } from "@/lib/utils/get-product-price";
import { HttpTypes } from "@medusajs/types";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

interface CartLineProductProps {
  item: HttpTypes.StoreCartLineItem;
  currenyCode: string;
}
const CartLineProduct = ({ item, currenyCode }: CartLineProductProps) => {
  const { isMutating } = useProduct();
  const price = getPriceForVariantCart(item, currenyCode);
  const hasSaleType = price?.price_type === "sale";
  return (
    <div className="flex flex-col border-b last:border-b-0 bg-white w-full h-full my-[8px] mx-0 relative">
      {isMutating && (
        <div className="absolute flex items-center justify-center w-full h-full bg-accent-foreground/5 z-10 animate-pulse">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <div className="flex justify-between relative py-[10px] px-0">
        <Link href={`/products/${item.product?.handle}`}>
          <div className="flex px-[10px] py-0 justify-center items-center w-full h-full cursor-pointer basis-[20%] ">
            <ProductImageThumbnail />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-y-[8px] py-[10px] px-0 basis-[20%]">
          <ProductTitle className="text-[14px] font-semibold font-stretch-normal  truncate" />
          <span>{item.variant?.title}</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-[8px] basis-[20%]">
          <CartQtyBox item={item} />
        </div>
        <div className="flex  justify-center basis-[20%] items-center">
          <div className="flex flex-col items-start">
            <ProductPrice
              hasSaleType={hasSaleType}
              value={price?.calculated_price}
            />
            <span className="text-[12px] font-medium text-[#3d3d3d] line-through">
              {hasSaleType ? price?.original_price : ""}
            </span>
          </div>
        </div>
        <div className="flex justify-center  items-center basis-[12.5%]">
          <div className="flex flex-col gap-y-[1rem] cursor-pointer items-center">
            <DeleteButton item={item} />
            <HeartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLineProduct;
