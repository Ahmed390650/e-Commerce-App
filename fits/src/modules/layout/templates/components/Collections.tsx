import { Button } from "@/components/ui/button";
import { listCategories } from "@/lib/data/categories";
import Link from "next/link";
const Categories = async () => {
  const Categories = await listCategories();

  const categoriesNoChildren = Categories.filter(
    ({ parent_category, products }) =>
      parent_category === null && products && products.length > 0
  );
  return (
    <div className="flex  items-center">
      {categoriesNoChildren.map(({ name, id, handle }) => (
        <Button variant="link" key={id} className=" underline-offset-[100%]">
          <Link href={`/categories/${handle}`}>{name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Categories;
