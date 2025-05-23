package com.company.api.DTOS;

import com.company.api.enums.FuelType;

public class CarResponseDTO extends VehicleResponseDTO {

    private int doorQuantity;
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
