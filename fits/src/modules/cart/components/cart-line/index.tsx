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
import Image from "next/image";
import Link from "next/link";

interface CartLineProductProps {
  item: HttpTypes.StoreCartLineItem;
  currenyCode: string;
}
const CartLineProduct = ({ item, currenyCode }: CartLineProductProps) => {
  const { isMutating, product } = useProduct();
  const price = getPriceForVariantCart(item, currenyCode);
  const hasSaleType = price?.price_type === "sale";
  return (
    <div className=" border-b last:border-b-0 bg-white w-full h-full  mx-4 relative">
      {isMutating && (
        <div className="absolute flex items-center justify-center w-full h-full bg-accent-foreground/5 z-10 animate-pulse">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-5 gap-2 relative py-[10px] px-0">
        <Link href={`/products/${item.product?.handle}`}>
          <div className="relative aspect-square border  w-full max-w-lg  ">
            <Image
              src={product.thumbnail}
              alt={product.id}
              width={200}
              height={200}
              className="object-cover "
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-y-[8px] py-[10px] px-0  ">
          <ProductTitle className="text-[14px] font-semibold font-stretch-normal  truncate max-w-full " />
          <span>{item.variant?.title}</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-[8px] ">
          <CartQtyBox item={item} />
        </div>
        <div className="flex  justify-center  items-center">
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
        <div className="flex justify-center  items-center ">
          <div className="flex flex-col gap-y-[1rem] cursor-pointer items-center">
            <DeleteButton item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLineProduct;
