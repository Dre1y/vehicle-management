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
            <th className="p-3">Modelo</th>
            <th className="p-3">Fabricante</th>
            <th className="p-3">Ano</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Cilindrada</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
          {data.map((moto) => (
            <tr
              key={moto.id}
              className="hover:bg-zinc-800 transition-colors duration-200"
            >
              <td className="p-3">{moto.model}</td>
              <td className="p-3">{moto.manufacturer}</td>
              <td className="p-3">{moto.year}</td>
              <td className="p-3">R$ {Number(moto.price).toFixed(2)}</td>
              <td className="p-3">{moto.engineDisplacement} cc</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onEdit(moto)}>
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
