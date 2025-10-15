import ProductSkelekon from "./Product";

const ProductCardSkeletonList = () => {
  return (
    <div className="grid gap-3 grid-cols-1  md:grid-cols-4 sm:grid-cols-2 ">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <ProductSkelekon key={v} />
      ))}
    </div>
  );
};
export default ProductCardSkeletonList;
