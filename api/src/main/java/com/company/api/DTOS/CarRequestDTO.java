package com.company.api.DTOS;

import com.company.api.enums.FuelType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CarRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Quantidade de portas é obrigatória")
    @Min(value = 2, message = "Quantidade mínima de portas é 2")
    @Max(value = 5, message = "Quantidade máxima de portas é 5")
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
