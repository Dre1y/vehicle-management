import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IMotorcycleDTO) => void;
  defaultValues?: IMotorcycleDTO;
}

export function MotorcycleModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: Props) {
  const [form, setForm] = useState<IMotorcycleDTO>({
    model: "",
    manufacturer: "",
    year: "",
    price: 0,
    engineDisplacement: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    } else {
      setForm({
        model: "",
        manufacturer: "",
        year: "",
        price: 0,
        engineDisplacement: 0,
      });
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Editar Moto" : "Adicionar Moto"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Modelo"
            name="model"
            value={form.model}
            onChange={handleChange}
          />
          <Input
            placeholder="Fabricante"
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
          />
          <Input
            placeholder="Ano"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
          />
          <Input
            placeholder="Preço"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <Input
            placeholder="Cilindrada"
            name="engineDisplacement"
            type="number"
            value={form.engineDisplacement}
            onChange={handleChange}
          />
          <Button onClick={() => onSave(form)}>
            {defaultValues ? "Salvar" : "Criar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
