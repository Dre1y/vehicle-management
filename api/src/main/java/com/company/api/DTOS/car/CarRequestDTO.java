package com.company.api.DTOS.car;

import com.company.api.DTOS.vehicle.VehicleRequestDTO;
import com.company.api.enums.FuelType;

import jakarta.validation.constraints.NotNull;

public class CarRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Quantidade de portas é obrigatória")
    private int door_quantity;

    @NotNull(message = "Tipo de combustível é obrigatório")
    private FuelType fuel_type;

    public int getDoorQuantity() {
        return door_quantity;
    }

    public void setDoorQuantity(int door_quantity) {
        this.door_quantity = door_quantity;
    }

    public FuelType getFuelType() {
        return fuel_type;
    }

    public void setFuelType(FuelType fuel_type) {
        this.fuel_type = fuel_type;
    }
}
