import { useCarData } from "@/core/hooks/useCar";
import { CarTable } from "@/components/tables/CarTable";
import { CarModal } from "@/components/modals/CarModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ICarDTO } from "@/core/interfaces/ICarDTO";

const CarPage = () => {
  const { data: cars, isLoading } = useCarData();
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICarDTO | null>(null);

  const handleCreate = () => {
    setSelectedCar(null);
    setOpen(true);
  };

  const handleEdit = (car: ICarDTO) => {
    setSelectedCar(car);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Carros</h2>
        <Button onClick={handleCreate}>Novo Carro</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <CarTable data={cars || []} onEdit={handleEdit} />
      )}

      <CarModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={selectedCar}
      />
    </div>
  );
};

export default CarPage;
