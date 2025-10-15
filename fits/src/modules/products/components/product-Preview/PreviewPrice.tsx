import { VariantPrice } from "@/types/global";

const PreviewPrice = ({ price }: { price: VariantPrice | null }) => {
  if (!price) {
    return null;
  }
  return (
    <div>
      <div className="flex  justify-between flex-wrap my-[10px] ">
        {price.price_type === "sale" ? (
          <>
            <span className="text-red-500 text-[16px] font-bold">
              {price.calculated_price}
            </span>
            <div className=" bg-[#a8efb4] rounded-[3px] p-[4px] flex items-center justify-center w-[40px]">
              <div className="  flex justify-center  text-[12px] font-bold">
                -{price.percentage_diff}%
              </div>
            </div>
          </>
        ) : (
          <div>
            <span className="text-[16px] font-bold">
              {price.calculated_price}
            </span>
          </div>
        )}
      </div>
      {price.price_type === "sale" && (
        <div className="flex justify-between">
          <div className="line-through text-[12px] font-medium">
            {price.original_price}
          </div>
          <div className="font-bold text-[12px] text-black">
            Save {price.saving_price}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPrice;
