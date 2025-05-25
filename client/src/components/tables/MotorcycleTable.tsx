import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { useDeleteMotorcycle } from "@/core/hooks/useMotorcycle";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface MotorcycleTableProps {
  data: IMotorcycleDTO[];
  onEdit(motorcycle: IMotorcycleDTO): void;
}

export const MotorcycleTable = ({ data, onEdit }: MotorcycleTableProps) => {
  const deleteMotorcycle = useDeleteMotorcycle();

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm text-white">
        <thead className="bg-zinc-800 text-zinc-300">
          <tr>
            <th className="p-3 text-left">Modelo</th>
            <th className="p-3 text-left">Fabricante</th>
            <th className="p-3 text-left">Ano</th>
            <th className="p-3 text-right">Preço</th>
            <th className="p-3 text-right">Cilindrada</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
          {data.map((moto) => (
            <tr
              key={moto.id}
              className="hover:bg-zinc-800 transition-colors duration-200"
            >
              <td className="p-3 text-left">{moto.model}</td>
              <td className="p-3 text-left">{moto.manufacturer}</td>
              <td className="p-3 text-left">{moto.year}</td>
              <td className="p-3 text-right">
                R$ {Number(moto.price).toFixed(2)}
              </td>
              <td className="p-3 text-right">{moto.engineDisplacement} cc</td>
              <td className="p-3 text-left">
                <div className="flex gap-2">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    onClick={() => onEdit(moto)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMotorcycle.mutate(moto.id)}
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
