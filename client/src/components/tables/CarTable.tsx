import { type ICarDTO } from "@/core/interfaces/ICarDTO";
import { useCarDataDelete } from "@/core/hooks/useCar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CarTableProps {
  data: ICarDTO[];
  onEdit(car: ICarDTO): void;
}

export const CarTable = ({ data, onEdit }: CarTableProps) => {
  const deleteCar = useCarDataDelete();

  return (
    <div className="p-4">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Modelo</th>
            <th className="p-2">Fabricante</th>
            <th className="p-2">Ano</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Portas</th>
            <th className="p-2">Combustível</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.id} className="border-t">
              <td className="p-2">{car.model}</td>
              <td className="p-2">{car.manufacturer}</td>
              <td className="p-2">{car.year}</td>
              <td className="p-2">{car.price}</td>
              <td className="p-2">{car.doorQuantity}</td>
              <td className="p-2">{car.fuelType}</td>
              <td className="p-2 flex gap-2">
                <Button variant="outline" onClick={() => onEdit(car)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteCar.mutate(car.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
