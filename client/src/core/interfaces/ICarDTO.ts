import type { IVehicleDTO } from "./IVehicleDTO";

export interface ICarDTO extends IVehicleDTO {
  doorQuantity: number;
  fuelType: string;
}
