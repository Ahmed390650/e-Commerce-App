import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { createBrandWorkflow } from "../../../workflows/create-brand";
import { z } from "zod";
import { PostAdminCreateBrand } from "./validators";
import { BRAND_MODULE } from "../../../modules/brand";
type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;
export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const { result: brand } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ brand });
};
export const GET = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query");
  const { data: brands, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "brand",
      ...req.queryConfig,
    });
  res.json({ brands, count, limit: take, offset: skip });
};
