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
  defaultValues?: IMotorcycleDTO | null;
  isLoading?: boolean;
}

export function MotorcycleModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<IMotorcycleDTO>({
    model: "",
    manufacturer: "",
    year: "",
    price: "",
    engineDisplacement: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        ...defaultValues,
        price: defaultValues.price?.toString() ?? "",
        engineDisplacement: defaultValues.engineDisplacement?.toString() ?? "",
      });
    } else {
      setForm({
        model: "",
        manufacturer: "",
        year: "",
        price: "",
        engineDisplacement: "",
      });
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSave({
        ...form,
        price: Number(form.price),
        engineDisplacement: Number(form.engineDisplacement),
      });
    }
  };

  const isEdit = Boolean(defaultValues?.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white rounded-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Editar Moto" : "Adicionar Moto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            placeholder="Modelo da moto"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
            autoFocus
          />
          <Input
            placeholder="Fabricante"
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Ano de fabricação"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Preço (R$)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            min={0}
            required
          />
          <Input
            placeholder="Cilindrada (cc)"
            name="engineDisplacement"
            type="number"
            value={form.engineDisplacement}
            onChange={handleChange}
            min={0}
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-700 hover:bg-zinc-600 transition-colors"
          >
            {isLoading
              ? isEdit
                ? "Salvando..."
                : "Criando..."
              : isEdit
              ? "Salvar alterações"
              : "Cadastrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
