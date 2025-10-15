import { StoreProductVariant } from "@medusajs/framework/types"; // Example of more categories
import { ProductStatus } from "@medusajs/framework/utils";
const categories = [
  { name: "Shirts", is_active: true },
  { name: "Sweatshirts", is_active: true },
  { name: "Pants", is_active: true },
  { name: "Merch", is_active: true },
  { name: "Jackets", is_active: true },
  { name: "Hoodies", is_active: true },
  { name: "Jeans", is_active: true },
  { name: "Suits", is_active: true },
  { name: "Dresses", is_active: true },
  { name: "Shorts", is_active: true },
  { name: "Shoes", is_active: true },
];

const sizeOptions = ["S", "M", "L", "XL"];
const colorOptions = ["Black", "White"];
const titlesBase = [
  "Classic Tee",
  "Urban Sweatshirt",
  "Relax Fit Pants",
  "Vintage Shorts",
  "Street Hoodie",
  "Slim Jeans",
  "Office Suit",
  "Summer Dress",
  "Sport Jacket",
  "Casual Shoes",
];

// Helper to create random price
const randomPrice = () => {
  const eur = Math.floor(Math.random() * 50) + 10; // 10 - 60 EUR
  const usd = eur + 5;
  return [
    { amount: eur, currency_code: "eur" },
    { amount: usd, currency_code: "usd" },
  ];
};

// Helper to create variants
const createVariants = (withColor = true, index) => {
  const variants: StoreProductVariant[] = [];
  for (const size of sizeOptions) {
    if (withColor) {
      for (const color of colorOptions) {
        variants.push({
          title: `${size} / ${color}`,
          sku: `SKU-${size}-${color}-${Math.floor(
            Math.random() * 10000
          )}-${index}`,
          options: { Size: size, Color: color },
          prices: randomPrice(),
        });
      }
    } else {
      variants.push({
        title: size,
        sku: `SKU-${size}-${Math.floor(Math.random() * 10000)}-${index}`,
        options: { Size: size },
        prices: randomPrice(),
      });
    }
  }
  return variants;
};

// Generate 100 products
export const Createproducts = (
  categoryResult,
  shippingProfile,
  defaultSalesChannel
) =>
  Array.from({ length: 100 }).map((_, index) => {
    const baseTitle = titlesBase[index % titlesBase.length];
    const category = categories[index % categories.length];

    const withColor = ["Shirts", "Jackets", "Hoodies"].includes(category.name);

    return {
      title: `${baseTitle} ${index + 1}`,
      category_ids: [
        categoryResult.find((cat) => cat.name === category.name)!.id,
      ],
      description: `This is a premium ${category.name.toLowerCase()} designed for comfort and style.`,
      handle: `product-${index + 1}`,
      weight: 400,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile?.id,
      images: [
        {
          url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png",
        },
        {
          url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
        },
      ],
      options: withColor
        ? [
            { title: "Size", values: sizeOptions },
            { title: "Color", values: colorOptions },
          ]
        : [{ title: "Size", values: sizeOptions }],
      variants: createVariants(withColor, index),
      sales_channels: [{ id: defaultSalesChannel[0]?.id }],
    };
  });
