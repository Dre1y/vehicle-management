import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface MotorcycleTableProps {
  data: IMotorcycleDTO[];
  onEdit(motorcycle: IMotorcycleDTO): void;
  onDelete(id: string): void;
}

export const MotorcycleTable = ({
  data,
  onEdit,
  onDelete,
}: MotorcycleTableProps) => {
  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm text-white">
        <thead className="bg-zinc-800 text-zinc-300">
          <tr>
            <th className="p-3 text-left">Modelo</th>
            <th className="p-3 text-left">Fabricante</th>
            <th className="p-3 text-left">Ano</th>
            <th className="p-3 text-left">Preço</th>
            <th className="p-3 text-left">Cilindrada</th>
            <th className="p-3 text-left">Ações</th>
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
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    onClick={() => onEdit(moto)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(moto.id)}
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
