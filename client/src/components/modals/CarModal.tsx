import { useEffect, useState } from "react";
import { useCarDataMutate, useCarDataUpdate } from "@/core/hooks/useCar";
import type { ICarDTO } from "@/core/interfaces/ICarDTO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CarModalProps {
  open: boolean;
  onClose(): void;
  defaultValues?: ICarDTO | null;
}

export const CarModal = ({ open, onClose, defaultValues }: CarModalProps) => {
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [doorQuantity, setDoorQuantity] = useState(0);
  const [fuelType, setFuelType] = useState("");

  const isEdit = Boolean(defaultValues?.id);

  const createCar = useCarDataMutate();
  const updateCar = useCarDataUpdate();

  const handleSubmit = () => {
    const payload: ICarDTO = {
      model,
      manufacturer,
      year,
      price: Number(price),
      doorQuantity,
      fuelType,
    };

    if (isEdit && defaultValues?.id) {
      updateCar.mutate({ ...payload, id: defaultValues.id });
    } else {
      createCar.mutate(payload);
    }

    onClose();
  };

  useEffect(() => {
    if (defaultValues) {
      setModel(defaultValues.model);
      setManufacturer(defaultValues.manufacturer);
      setYear(defaultValues.year);
      setPrice(String(defaultValues.price));
      setDoorQuantity(defaultValues.doorQuantity);
      setFuelType(defaultValues.fuelType);
    } else {
      setModel("");
      setManufacturer("");
      setYear("");
      setPrice("");
      setDoorQuantity(0);
      setFuelType("");
    }
  }, [defaultValues]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Carro" : "Cadastrar Carro"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <Input
            placeholder="Fabricante"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <Input
            placeholder="Ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <Input
            placeholder="Preço"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="Quantidade de portas"
            type="number"
            value={doorQuantity}
            onChange={(e) => setDoorQuantity(Number(e.target.value))}
          />
          <Input
            placeholder="Tipo de combustível"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            {isEdit ? "Salvar alterações" : "Cadastrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
