import {
  useMotorcycleData,
  useCreateMotorcycle,
  useUpdateMotorcycle,
  useDeleteMotorcycle,
} from "@/core/hooks/useMotorcycle";
import { useState, useEffect } from "react";
import { MotorcycleTable } from "@/components/tables/MotorcycleTable";
import { MotorcycleModal } from "@/components/modals/MotorcycleModal";
import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bike, Loader2, Inbox, Home, CarFront } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterBar } from "@/components/widgets/FilterBar";
import { toast } from "sonner";

export default function MotorcyclePage() {
  const { data: motorcycles, isLoading } = useMotorcycleData();
  const createMutation = useCreateMotorcycle();
  const updateMutation = useUpdateMotorcycle();
  const deleteMutation = useDeleteMotorcycle();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<IMotorcycleDTO | undefined>();
  const [filteredMotorcycles, setFilteredMotorcycles] = useState<
    IMotorcycleDTO[]
  >([]);

  useEffect(() => {
    if (motorcycles) setFilteredMotorcycles(motorcycles);
  }, [motorcycles]);

  const handleSave = (moto: IMotorcycleDTO) => {
    if (selected?.id) {
      updateMutation.mutate(
        { id: selected.id, data: moto },
        {
          onSuccess: () => {
            setModalOpen(false);
            toast.success("Moto atualizada com sucesso!");
          },
          onError: () => {
            toast.error("Erro ao atualizar a moto.");
          },
        }
      );
    } else {
      createMutation.mutate(moto, {
        onSuccess: () => {
          setModalOpen(false);
          toast.success("Moto criada com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao criar a moto.");
        },
      });
    }
    setSelected(undefined);
  };

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="bg-zinc-900 text-white p-4 rounded-lg shadow-lg flex flex-col gap-3 w-[320px]">
        <p className="text-sm font-semibold">
          Deseja realmente excluir esta moto?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              deleteMutation.mutate(id, {
                onSuccess: () => {
                  toast.success("Moto excluída com sucesso!");
                  toast.dismiss(t.id);
                },
                onError: () => {
                  toast.error("Erro ao excluir a moto.");
                  toast.dismiss(t.id);
                },
              });
            }}
          >
            Confirmar
          </Button>
        </div>
      </div>
    ));
  };

  const handleEdit = (moto: IMotorcycleDTO) => {
    setSelected(moto);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const handleFilter = (filters: {
    model: string;
    manufacturer: string;
    year: string;
  }) => {
    if (!motorcycles) return;

    const filtered = motorcycles.filter((motorcycle) => {
      return (
        (filters.model === "" ||
          motorcycle.model
            .toLowerCase()
            .includes(filters.model.toLowerCase())) &&
        (filters.manufacturer === "" ||
          motorcycle.manufacturer
            .toLowerCase()
            .includes(filters.manufacturer.toLowerCase())) &&
        (filters.year === "" || String(motorcycle.year).includes(filters.year))
      );
    });

    setFilteredMotorcycles(filtered);
  };

  const isSaving = createMutation.isLoading || updateMutation.isLoading;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 relative">
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

        <FilterBar onFilter={handleFilter} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="animate-spin w-8 h-8 mb-3" />
            <p>Carregando motos...</p>
          </div>
        ) : filteredMotorcycles.length > 0 ? (
          <MotorcycleTable
            data={filteredMotorcycles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Inbox className="w-10 h-10 mb-3" />
            <p>Nenhuma moto cadastrada ainda.</p>
          </div>
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

      <div className="fixed bottom-4 left-4">
        <Link to="/">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
            <Home className="w-4 h-4" />
            Início
          </Button>
        </Link>
      </div>

      <div className="fixed bottom-4 right-4">
        <Link to="/cars">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
            <CarFront className="w-4 h-4" />
            Carros
          </Button>
        </Link>
      </div>
    </div>
  );
}
