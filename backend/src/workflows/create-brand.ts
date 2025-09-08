import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import BrandModuleService from "../modules/brand/service";
import { BRAND_MODULE } from "../modules/brand";
import { emitEventStep } from "@medusajs/medusa/core-flows";
export type CreateBrandStepInput = {
  name: string;
};

export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandStepInput, { container }) => {
    const brandServices: BrandModuleService = container.resolve(BRAND_MODULE);

    const brand = await brandServices.createBrands(input);
    return new StepResponse(brand, brand.id);
  },
  async (id: string, { container }) => {
    const brandServices: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandServices.deleteBrands(id);
  }
);

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandStepInput) => {
    const brand = createBrandStep(input);
    emitEventStep({ eventName: "brand.created", data: { id: brand.id } });
    return new WorkflowResponse(brand);
  }
);
