package com.company.api.DTOS.car;

import com.company.api.DTOS.vehicle.VehicleRequestDTO;
import com.company.api.enums.FuelType;

import jakarta.validation.constraints.NotNull;

public class CarRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Quantidade de portas é obrigatória")
    private int doorQuantity;

    @NotNull(message = "Tipo de combustível é obrigatório")
    private FuelType fuelType;

    public int getDoorQuantity() {
        return doorQuantity;
    }

    public void setDoorQuantity(int doorQuantity) {
        this.doorQuantity = doorQuantity;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }
}
