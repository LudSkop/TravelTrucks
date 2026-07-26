"use client";

import Filters from "@/components/Filters/Filters";
import CamperList from "@/components/CamperList/CamperList";
import css from "./CatalogPage.module.css";
import { getCampers } from "@/lib/campers";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    transmission: "",
    engine: "",
  });

  const [searchFilters, setSearchFilters] = useState(filters);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["campers", searchFilters],

      queryFn: ({ pageParam = 1 }) =>
        getCampers({
          page: pageParam,
          perPage: 4,
          ...searchFilters,
        }),

      initialPageParam: 1,

      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
    });
  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  const handleSearch = () => {
    setSearchFilters(filters);
  };
  const handleClear = () => {
    const clearedFilters = {
      location: "",
      form: "",
      transmission: "",
      engine: "",
    };

    setFilters(clearedFilters);
    setSearchFilters(clearedFilters);
  };
  console.log({
    hasNextPage,
    lastPage: data?.pages[data.pages.length - 1],
  });

  return (
    <main className={css.catalog}>
      <Filters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <CamperList
        campers={campers}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
}
