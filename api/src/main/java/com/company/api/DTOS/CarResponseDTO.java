package com.company.api.DTOS;

import com.company.api.enums.FuelType;

public class CarResponseDTO extends VehicleResponseDTO {

    private Integer doorQuantity;
    private FuelType fuelType;

    public Integer getDoorQuantity() {
        return doorQuantity;
    }

    public void setDoorQuantity(Integer doorQuantity) {
        this.doorQuantity = doorQuantity;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }
}
