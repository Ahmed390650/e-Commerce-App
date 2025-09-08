import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import {
  Container,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";
import React, { useMemo, useState } from "react";
type Brand = {
  id: string;
  name: string;
};
type BrandsResponse = {
  brands: Brand[];
  count: number;
  limit: number;
  offset: number;
};
const columnHelper = createDataTableColumnHelper<Brand>();
const columns = [
  columnHelper.accessor("id", { header: "id" }),
  columnHelper.accessor("name", { header: "Name" }),
];
const limit = 15;
const BrandsPage = () => {
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageIndex: 0,
    pageSize: limit,
  });
  const offset = React.useMemo(
    () => pagination.pageIndex * limit,
    [pagination]
  );
  const { data, isLoading } = useQuery<BrandsResponse>({
    queryFn: () =>
      sdk.client.fetch("/admin/brands", { query: { limit, offset } }),
    queryKey: [["brands", limit, offset]],
  });

  const table = useDataTable({
    columns,
    data: data?.brands || [],
    isLoading,
    pagination: { state: pagination, onPaginationChange: setPagination },
  });
  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar>
          <Heading>Brands</Heading>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
});

export default BrandsPage;
