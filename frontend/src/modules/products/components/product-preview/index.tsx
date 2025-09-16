"use client"
import { Plus, ShoppingCart } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Badge, Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"
import { VariantPrice } from "types/global"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductCard({
  cheapestPrice,
  isFeatured,
  product,
  discountPercentage,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  cheapestPrice?: VariantPrice
  discountPercentage?: number
}) {
  return (
    <div className="product-card flex flex-col border border-ui-border-base rounded-2xl shadow-sm hover:shadow-md overflow-hidden bg-ui-bg-base">
      {/* Discount Badge */}
      {discountPercentage && (
        <div className="absolute top-3 left-3">
          <Badge size="small" color="red">
            -{discountPercentage}%
          </Badge>
        </div>
      )}

      {/* Product Link & Image */}
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="no-underline"
      >
        <div className="flex flex-col items-center p-3">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            className="w-40 h-40 object-contain"
          />
        </div>
      </LocalizedClientLink>

      {/* Price Section */}
      <div className="px-4 text-center">
        {cheapestPrice ? (
          <div className="price flex justify-center items-baseline gap-2">
            {/* Special / Discounted Price */}
            <Text className="text-lg font-semibold text-ui-fg-base">
              {cheapestPrice.calculated_price}
            </Text>
            {/* Regular Price */}
            {cheapestPrice.original_price !==
              cheapestPrice.calculated_price && (
              <Text className="text-sm text-ui-fg-subtle line-through">
                {cheapestPrice.original_price}
              </Text>
            )}
          </div>
        ) : (
          <Text className="text-ui-fg-subtle">Not available</Text>
        )}
      </div>

      {/* Brand + Name */}
      <div className="px-4 mt-2 text-center">
        <Text className="text-sm font-medium text-ui-fg-subtle">
          {product.collection?.title || product.type?.value || "Brand"}
        </Text>
        <Text className="text-sm font-semibold line-clamp-2">
          {product.title}
        </Text>
      </div>

      {/* Add to Cart */}
      <div className="mt-3 px-4 pb-4">
        <Button
          variant="secondary"
          size="small"
          className="w-full flex items-center justify-center gap-2"
        >
          <span>أضف</span>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
