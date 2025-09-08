import { Module } from "@medusajs/framework/utils";
import BrandModulaService from "./service";

export const BRAND_MODULE = "brand";

export default Module(BRAND_MODULE, { service: BrandModulaService });
