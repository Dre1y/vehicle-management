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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [doorQuantity, setDoorQuantity] = useState("");
  const [fuelType, setFuelType] = useState("");

  const isEdit = Boolean(defaultValues?.id);

  const createCar = useCarDataMutate();
  const updateCar = useCarDataUpdate();

  const isLoading = createCar.isLoading || updateCar.isLoading;

  const handleSubmit = () => {
    if (!fuelType) {
      alert("Por favor, selecione o tipo de combustível.");
      return;
    }

    const payload: ICarDTO = {
      model,
      manufacturer,
      year: Number(year),
      price: Number(price),
      doorQuantity: Number(doorQuantity),
      fuelType,
    };

    if (isEdit && defaultValues?.id) {
      updateCar.mutate(
        { ...payload, id: defaultValues.id },
        { onSuccess: onClose }
      );
    } else {
      createCar.mutate(payload, { onSuccess: onClose });
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setModel(defaultValues.model);
      setManufacturer(defaultValues.manufacturer);
      setYear(String(defaultValues.year));
      setPrice(String(defaultValues.price));
      setDoorQuantity(String(defaultValues.doorQuantity));
      setFuelType(defaultValues.fuelType);
    } else {
      setModel("");
      setManufacturer("");
      setYear("");
      setPrice("");
      setDoorQuantity("");
      setFuelType("");
    }
  }, [defaultValues]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white rounded-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Editar Carro" : "Cadastrar Carro"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) handleSubmit();
          }}
          className="space-y-5"
        >
          <Input
            placeholder="Modelo do carro"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            autoFocus
          />
          <Input
            placeholder="Fabricante"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
          />
          <Input
            placeholder="Ano de fabricação"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            maxLength={4}
            required
          />
          <Input
            placeholder="Preço (R$)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            required
          />
          <Input
            placeholder="Quantidade de portas"
            type="number"
            value={doorQuantity}
            onChange={(e) => setDoorQuantity(e.target.value)}
            min={2}
            max={5}
            required
          />
          <Select value={fuelType} onValueChange={setFuelType}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Tipo de combustível" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700">
              <SelectItem value="GASOLINE">Gasolina</SelectItem>
              <SelectItem value="ETHANOL">Etanol</SelectItem>
              <SelectItem value="DIESEL">Diesel</SelectItem>
              <SelectItem value="FLEX">Flex</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-700 hover:bg-zinc-600 transition-colors"
          >
            {isLoading
              ? isEdit
                ? "Salvando..."
                : "Cadastrando..."
              : isEdit
              ? "Salvar alterações"
              : "Cadastrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
