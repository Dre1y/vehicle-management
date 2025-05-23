package com.company.api.DTOS.car;

import com.company.api.DTOS.vehicle.VehicleResponseDTO;
import com.company.api.enums.FuelType;

public class CarResponseDTO extends VehicleResponseDTO {

    private int door_quantity;
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
