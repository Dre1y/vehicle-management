import { useState } from "react";
import { Input } from "@/components/ui/input";

export function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    model: "",
    manufacturer: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="flex gap-4 mb-4">
      <Input
        name="model"
        value={filters.model}
        onChange={handleChange}
        placeholder="Modelo"
        className="w-1/3"
      />
      <Input
        name="manufacturer"
        value={filters.manufacturer}
        onChange={handleChange}
        placeholder="Fabricante"
        className="w-1/3"
      />
      <Input
        name="year"
        value={filters.year}
        onChange={handleChange}
        placeholder="Ano"
        className="w-1/3"
      />
    </div>
  );
}
