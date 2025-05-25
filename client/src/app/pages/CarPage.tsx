import { useCarData } from "@/core/hooks/useCar";
import { CarTable } from "@/components/tables/CarTable";
import { CarModal } from "@/components/modals/CarModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ICarDTO } from "@/core/interfaces/ICarDTO";
import { motion } from "framer-motion";
import { CarFront, Loader2, Inbox, Home, Bike } from "lucide-react";
import { Link } from "react-router-dom";

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="animate-spin w-8 h-8 mb-3" />
            <p>Carregando carros...</p>
          </div>
        ) : cars && cars.length > 0 ? (
          <CarTable data={cars} onEdit={handleEdit} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Inbox className="w-10 h-10 mb-3" />
            <p>Nenhum carro cadastrado ainda.</p>
          </div>
        )}

        <CarModal
          open={open}
          onClose={() => setOpen(false)}
          defaultValues={selectedCar}
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
};

export default CarPage;
