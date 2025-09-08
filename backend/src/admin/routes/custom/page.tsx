import { defineRouteConfig } from "@medusajs/admin-sdk";
import { HttpTypes, ProductStatus } from "@medusajs/framework/types";
import { ChatBubbleLeftRight } from "@medusajs/icons";
import {
  Badge,
  createDataTableColumnHelper,
  createDataTableFilterHelper,
  DataTable,
  DataTableFilteringState,
  DataTablePaginationState,
  DataTableSortingState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { SingleColumnLayout } from "../../layouts/single-column";
import { sdk } from "../../lib/sdk";
const columnHelper = createDataTableColumnHelper<HttpTypes.AdminProduct>();

const columns = [
  columnHelper.accessor("title", {
    header: "title",
    enableSorting: true,
    sortLabel: "Title",
    sortAscLabel: "A-Z",
    sortDescLabel: "Z-A",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <Badge color={status === "published" ? "green" : "grey"} size="xsmall">
          {status === "published" ? "Published" : "Draft"}
        </Badge>
      );
    },
  }),
];
const filterHelper = createDataTableFilterHelper<HttpTypes.AdminProduct>();

const filters = [
  filterHelper.accessor("status", {
    type: "select",
    label: "Status",
    options: [
      {
        label: "Published",
        value: "published",
      },
      {
        label: "Draft",
        value: "draft",
      },
    ],
  }),
];
const limit = 15;

const CustomPage = () => {
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });
  const [search, setSearch] = React.useState<string>("");
  const [filtering, setFiltering] = React.useState<DataTableFilteringState>({});
  const [sorting, setSorting] = React.useState<DataTableSortingState | null>(
    null
  );

  const offset = React.useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);
  const statusFilters = React.useMemo(() => {
    return (filtering.status || []) as ProductStatus;
  }, [filtering]);
  const { data, isLoading } = useQuery({
    queryFn: () =>
      sdk.admin.product.list({
        limit,
        offset,
        q: search,
        status: statusFilters,
        order: sorting ? `${sorting.desc ? "-" : ""}${sorting.id}` : undefined,
      }),
    queryKey: [
      [
        "products",
        limit,
        offset,
        search,
        statusFilters,
        sorting?.id,
        sorting?.desc,
      ],
    ],
  });
  const navigate = useNavigate();

  const table = useDataTable({
    columns,
    data: data?.products || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    search: {
      state: search,
      onSearchChange: setSearch,
    },
    filtering: {
      state: filtering,
      onFilteringChange: setFiltering,
    },
    filters,
    sorting: {
      // Pass the pagination state and updater to the table instance
      state: sorting,
      onSortingChange: setSorting,
    },
    onRowClick: (event, row) => {
      // Handle row click, for example
      navigate(`/products/${row.id}`);
    },
  });

  // TODO render component
  return (
    <SingleColumnLayout>
      <Container>
        <DataTable instance={table}>
          <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>Products</Heading>
            <div className="flex gap-2">
              <DataTable.FilterMenu tooltip="Filter" />
              <DataTable.SortingMenu tooltip="Sort" />
              <DataTable.Search placeholder="Search..." />
            </div>
          </DataTable.Toolbar>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </Container>
    </SingleColumnLayout>
  );
};
export const config = defineRouteConfig({
  label: "Custom",
  icon: ChatBubbleLeftRight,
});
export default CustomPage;
