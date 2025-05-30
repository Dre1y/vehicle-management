import { type ICarDTO } from "@/core/interfaces/ICarDTO";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CarTableProps {
  data: ICarDTO[];
  onEdit(car: ICarDTO): void;
  onDelete(id: string): void;
}

export const CarTable = ({ data, onEdit, onDelete }: CarTableProps) => {
  const fuelTypePt = {
    GASOLINE: "Gasolina",
    ETHANOL: "Etanol",
    DIESEL: "Diesel",
    FLEX: "Flex",
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm text-white">
        <thead className="bg-zinc-800 text-zinc-300">
          <tr>
            <th className="p-3 text-left">Modelo</th>
            <th className="p-3 text-left">Fabricante</th>
            <th className="p-3 text-left">Ano</th>
            <th className="p-3 text-left">Preço</th>
            <th className="p-3 text-left">Portas</th>
            <th className="p-3 text-left">Combustível</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
          {data.map((car) => (
            <tr
              key={car.id}
              className="hover:bg-zinc-800 transition-colors duration-200"
            >
              <td className="p-3">{car.model}</td>
              <td className="p-3">{car.manufacturer}</td>
              <td className="p-3">{car.year}</td>
              <td className="p-3">R$ {Number(car.price).toFixed(2)}</td>
              <td className="p-3">{car.doorQuantity}</td>
              <td className="p-3">
                {fuelTypePt[car.fuelType] || "Desconhecido"}
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    onClick={() => onEdit(car)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(car.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
