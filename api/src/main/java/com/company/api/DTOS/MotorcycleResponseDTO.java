package com.company.api.DTOS;

public class MotorcycleResponseDTO extends VehicleResponseDTO {

    private int engineDisplacement;

    public int getEngineDisplacement() {
        return engineDisplacement;
    }

    public void setEngineDisplacement(int engineDisplacement) {
        this.engineDisplacement = engineDisplacement;
    }
}
