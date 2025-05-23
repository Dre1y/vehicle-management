import type { IVehicleDTO } from "./IVehicleDTO";

export interface IMotorcycleDTO extends IVehicleDTO {
  engineDisplacement: number;
}
