import React from "react";
import css from "./Filters.module.css";
import { camperForms, engines, transmissions } from "@/constans/filter";
import Image from "next/image";

type FiltersProps = {
  filters: {
    location: string;
    form: string;
    engine: string;
    transmission: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string;
      form: string;
      engine: string;
      transmission: string;
    }>
  >;
  onSearch: () => void;
  onClear: () => void;
};

export default function Filters({
  filters,
  setFilters,
  onSearch,
  onClear,
}: FiltersProps) {
  return (
    <aside className={css.filters}>
      {/* Location */}
      <div className={css.field}>
        <label htmlFor="location" className={css.label}>
          Location
        </label>
        <div className={css.inputWrapper}>
          <Image
            src="/images/map.svg"
            alt="Location icon"
            width={20}
            height={20}
            className={css.icon}
          />
          <input
            id="location"
            type="text"
            placeholder="Kyiv, Ukraine"
            className={css.input}
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <h2 className={css.title}>Filters</h2>

      {/* Camper form */}
      <fieldset className={css.group}>
        <legend className={css.legend}>Camper form</legend>

        {camperForms.map(({ label, value }) => (
          <label key={value} className={css.option}>
            <input
              type="radio"
              name="form"
              value={value}
              checked={filters.form === value}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  form: e.target.value,
                }))
              }
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Engine */}
      <fieldset className={css.group}>
        <legend className={css.legend}>Engine</legend>

        {engines.map(({ label, value }) => (
          <label key={value} className={css.option}>
            <input
              type="radio"
              name="engine"
              value={value}
              checked={filters.engine === value}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  engine: e.target.value,
                }))
              }
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Transmission */}
      <fieldset className={css.group}>
        <legend className={css.legend}>Transmission</legend>

        {transmissions.map(({ label, value }) => (
          <label key={value} className={css.option}>
            <input
              type="radio"
              name="transmission"
              value={value}
              checked={filters.transmission === value}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  transmission: e.target.value,
                }))
              }
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button className={css.searchBtn} onClick={onSearch}>
        Search
      </button>
      <button type="button" className={css.clearBtn} onClick={onClear}>
        <Image
          src="/images/vector.svg"
          alt=""
          width={12}
          height={12}
          aria-hidden="true"
        />

        <span>Clear filters</span>
      </button>
    </aside>
  );
}
