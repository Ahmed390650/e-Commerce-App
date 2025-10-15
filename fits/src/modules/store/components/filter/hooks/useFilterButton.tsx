import { useRouter, useSearchParams } from "next/navigation";

const useFilterButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const currentFilter = params.get("filter");
  const activesFilter: Record<string, string[]> = {};
  if (currentFilter) {
    currentFilter.split(";").forEach((f) => {
      const [key, vals] = f.split(":");
      activesFilter[key] = vals ? vals.split(",") : [];
    });
  }

  const toggleFilter = (
    label: string,
    value: string,
    checked: boolean | string
  ) => {
    const filterMap: Record<string, string[]> = {};
    if (currentFilter) {
      currentFilter.split(";").forEach((f) => {
        const [key, vals] = f.split(":");
        filterMap[key] = vals ? vals.split(",") : [];
      });
    }

    if (label === "price") {
      // overwrite price, only one allowed
      if (checked) {
        filterMap[label] = [value]; // value looks like "[10,20]"
      } else {
        delete filterMap[label];
      }
    } else {
      if (!filterMap[label]) {
        filterMap[label] = [];
      }
      if (checked) {
        if (!filterMap[label].includes(value)) {
          filterMap[label].push(value);
        }
      } else {
        filterMap[label] = filterMap[label].filter((v) => v !== value);
        if (filterMap[label].length === 0) {
          delete filterMap[label];
        }
      }
    }

    const newFilter = Object.entries(filterMap)
      .map(([key, vals]) => `${key}:${vals.join(",")}`)
      .join(";");

    if (newFilter) {
      params.set("filter", newFilter);
    } else {
      params.delete("filter");
    }

    router.push(`?${params.toString()}`);
  };
  const clearFilter = () => {
    params.delete("filter");
    router.push(`?${params.toString()}`);
  };
  const isActiveFilter = (label: string, value: string) => {
    return activesFilter[label]?.includes(value) || false;
  };
  return { toggleFilter, isActiveFilter, activesFilter, clearFilter };
};

export default useFilterButton;
