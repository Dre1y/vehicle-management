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
import { motion } from "framer-motion";
import { Bike } from "lucide-react";

export default function MotorcyclePage() {
  const { data: motorcycles, isLoading } = useMotorcycleData();
  const createMutation = useCreateMotorcycle();
  const updateMutation = useUpdateMotorcycle();
  const deleteMutation = useDeleteMotorcycle();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<IMotorcycleDTO | undefined>();

  const handleSave = (moto: IMotorcycleDTO) => {
    if (selected?.id) {
      updateMutation.mutate(
        { id: selected.id, data: moto },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createMutation.mutate(moto, {
        onSuccess: () => setModalOpen(false),
      });
    }
    setSelected(undefined);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (moto: IMotorcycleDTO) => {
    setSelected(moto);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const isSaving = createMutation.isLoading || updateMutation.isLoading;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Bike className="w-6 h-6 text-zinc-400" />
            <h2 className="text-2xl font-bold tracking-tight">
              Gerenciar Motos
            </h2>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Nova Moto
          </Button>
        </div>

        {isLoading ? (
          <p className="text-zinc-400">Carregando motos...</p>
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
          isLoading={isSaving}
        />
      </motion.div>
    </div>
  );
}
