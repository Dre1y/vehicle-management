import {
  useMotorcycleData,
  useCreateMotorcycle,
  useUpdateMotorcycle,
  useDeleteMotorcycle,
} from "@/core/hooks/useMotorcycle";
import { useState } from "react";
import { MotorcycleTable } from "@/components/tables/MotorcycleTable";
import { MotorcycleModal } from "@/components/modals/MotorcycleModal";
import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { Button } from "@/components/ui/button";

export default function App() {
  const { data: motorcycles, isLoading } = useMotorcycleData();
  const createMutation = useCreateMotorcycle();
  const updateMutation = useUpdateMotorcycle();
  const deleteMutation = useDeleteMotorcycle();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<IMotorcycleDTO | undefined>();

  const handleSave = (moto: IMotorcycleDTO) => {
    if (selected?.id) {
      updateMutation.mutate({ id: selected.id, data: moto });
    } else {
      createMutation.mutate(moto);
    }
    setModalOpen(false);
    setSelected(undefined);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (moto: IMotorcycleDTO) => {
    setSelected(moto);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Motocicletas</h1>
        <Button onClick={() => setModalOpen(true)}>Nova Moto</Button>
      </div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <MotorcycleTable
          data={motorcycles || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <MotorcycleModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(undefined);
        }}
        onSave={handleSave}
        defaultValues={selected}
      />
    </div>
  );
}
