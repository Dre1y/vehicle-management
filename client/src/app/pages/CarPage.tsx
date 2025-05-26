import {
  useCarData,
  useCarDataMutate,
  useCarDataUpdate,
  useCarDataDelete,
} from "@/core/hooks/useCar";
import { useState, useEffect } from "react";
import { CarTable } from "@/components/tables/CarTable";
import { CarModal } from "@/components/modals/CarModal";
import type { ICarDTO } from "@/core/interfaces/ICarDTO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CarFront, Loader2, Inbox, Home, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterBar } from "@/components/widgets/FilterBar";
import { toast } from "sonner";

export default function CarPage() {
  const { data: cars, isLoading } = useCarData();
  const createMutation = useCarDataMutate();
  const updateMutation = useCarDataUpdate();
  const deleteMutation = useCarDataDelete();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICarDTO | undefined>();
  const [filteredCars, setFilteredCars] = useState<ICarDTO[]>([]);

  useEffect(() => {
    if (cars) setFilteredCars(cars);
  }, [cars]);

  const handleSave = (car: ICarDTO) => {
    if (selectedCar?.id) {
      updateMutation.mutate(
        { id: selectedCar.id, ...car },
        {
          onSuccess: () => {
            setModalOpen(false);
            toast.success("Carro atualizado com sucesso!");
          },
          onError: () => {
            toast.error("Erro ao atualizar o carro.");
          },
        }
      );
    } else {
      createMutation.mutate(car, {
        onSuccess: () => {
          setModalOpen(false);
          toast.success("Carro criado com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao criar o carro.");
        },
      });
    }
    setSelectedCar(undefined);
  };

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="bg-zinc-900 text-white p-4 rounded-lg shadow-lg flex flex-col gap-3 w-[320px]">
        <p className="text-sm font-semibold">
          Deseja realmente excluir este carro?
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
                  toast.success("Carro excluído com sucesso!");
                  toast.dismiss(t.id);
                },
                onError: () => {
                  toast.error("Erro ao excluir o carro.");
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

  const handleEdit = (car: ICarDTO) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCar(undefined);
    setModalOpen(true);
  };

  const handleFilter = (filters: {
    model: string;
    manufacturer: string;
    year: string;
  }) => {
    if (!cars) return;

    const filtered = cars.filter((car) => {
      return (
        (filters.model === "" ||
          car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (filters.manufacturer === "" ||
          car.manufacturer
            .toLowerCase()
            .includes(filters.manufacturer.toLowerCase())) &&
        (filters.year === "" || String(car.year).includes(filters.year))
      );
    });

    setFilteredCars(filtered);
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
            <CarFront className="w-6 h-6 text-zinc-400" />
            <h2 className="text-2xl font-bold tracking-tight">
              Gerenciar Carros
            </h2>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Novo Carro
          </Button>
        </div>

        <FilterBar onFilter={handleFilter} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="animate-spin w-8 h-8 mb-3" />
            <p>Carregando carros...</p>
          </div>
        ) : filteredCars.length > 0 ? (
          <CarTable
            data={filteredCars}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Inbox className="w-10 h-10 mb-3" />
            <p>Nenhum carro cadastrado ainda.</p>
          </div>
        )}

        <CarModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCar(undefined);
          }}
          onSave={handleSave}
          defaultValues={selectedCar}
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
        <Link to="/motorcycles">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2">
            <Bike className="w-4 h-4" />
            Motos
          </Button>
        </Link>
      </div>
    </div>
  );
}
