"use client";

import Filters from "@/components/Filters/Filters";
import CamperList from "@/components/CamperList/CamperList";
import css from "./CatalogPage.module.css";
import { getCampers } from "@/lib/campers";
import { useState } from "react";
import { Camper } from "@/types/camper";

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    transmission: "",
    engine: "",
  });

  const [campers, setCampers] = useState<Camper[]>([]);

  const fetchCampers = async () => {
    try {
      const data = await getCampers({
        page: 1,
        perPage: 4,
        ...filters,
      });

      setCampers(data.campers);
    } catch (error) {
      console.error("Failed to fetch campers:", error);
    }
  };

  const handleSearch = () => {
    fetchCampers();
  };

  const handleClear = async () => {
    const clearedFilters = {
      location: "",
      form: "",
      transmission: "",
      engine: "",
    };

    setFilters(clearedFilters);

    try {
      const data = await getCampers({
        page: 1,
        perPage: 4,
        ...clearedFilters,
      });

      setCampers(data.campers);
    } catch (error) {
      console.error("Failed to fetch campers:", error);
    }
  };
  return (
    <main className={css.catalog}>
      <Filters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <CamperList campers={campers} />
    </main>
  );
}
