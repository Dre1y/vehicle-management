import type { IMotorcycleDTO } from "@/core/interfaces/IMotorcycleDTO";
import { Button } from "@/components/ui/button";

interface Props {
  data: IMotorcycleDTO[];
  onEdit: (motorcycle: IMotorcycleDTO) => void;
  onDelete: (id: string) => void;
}

export function MotorcycleTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="px-4 py-2">Modelo</th>
            <th className="px-4 py-2">Fabricante</th>
            <th className="px-4 py-2">Ano</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Cilindrada</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((moto) => (
            <tr key={moto.id} className="border-t">
              <td className="px-4 py-2">{moto.model}</td>
              <td className="px-4 py-2">{moto.manufacturer}</td>
              <td className="px-4 py-2">{moto.year}</td>
              <td className="px-4 py-2">
                {moto.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="px-4 py-2">{moto.engineDisplacement} cc</td>
              <td className="px-4 py-2">
                <Button onClick={() => onEdit(moto)} className="mr-2">
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => onDelete(moto.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
