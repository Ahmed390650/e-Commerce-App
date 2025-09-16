import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Product Container */}
      <div
        className="content-container grid grid-cols-1 lg:grid-cols-12 gap-12 py-12"
        data-testid="product-container"
      >
        {/* Left Sidebar: Info + Tabs */}
        <div className="lg:col-span-3 flex flex-col gap-8 sticky top-28 self-start">
          <div className="p-4 rounded-2xl border border-ui-border-base bg-ui-bg-subtle/60">
            <ProductInfo product={product} />
          </div>

          <div className="p-4 rounded-2xl border border-ui-border-base bg-ui-bg-subtle/60">
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Center: Image Gallery */}
        <div className="lg:col-span-6 relative">
          <div className="overflow-hidden rounded-3xl border border-ui-border-base shadow-sm">
            <ImageGallery images={product?.images || []} />
          </div>
        </div>

        {/* Right Sidebar: CTA + Actions */}
        <div className="lg:col-span-3 flex flex-col gap-8 sticky top-28 self-start">
          <div className="p-6 rounded-2xl border border-ui-border-base bg-ui-bg-subtle/60">
            <ProductOnboardingCta />
          </div>

          <div className="p-6 rounded-2xl border border-ui-border-base bg-ui-bg-subtle/60">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div
        className="content-container my-20 lg:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
