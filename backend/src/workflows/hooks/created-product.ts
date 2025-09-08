import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import BrandModuleService from "../../modules/brand/service";
import { BRAND_MODULE } from "../../modules/brand";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
createProductsWorkflow.hooks.productsCreated(
  async ({ additional_data, products }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);
    const link = container.resolve("link");
    const logger = container.resolve("logger");
    const links: LinkDefinition[] = [];
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: { product_id: product.id },
        [BRAND_MODULE]: { brand_id: additional_data.brand_id },
      });
    }
    await link.create(links);
    logger.info("Linked brand to Products");
    return new StepResponse(links, links);
  },
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }
    const link = container.resolve("link");
    await link.dismiss(links);
  }
);
