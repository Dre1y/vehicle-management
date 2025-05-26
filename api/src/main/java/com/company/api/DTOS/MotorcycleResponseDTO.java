package com.company.api.DTOS;

public class MotorcycleResponseDTO extends VehicleResponseDTO {

    private Integer engineDisplacement;

    public Integer getEngineDisplacement() {
        return engineDisplacement;
    }

    public void setEngineDisplacement(Integer engineDisplacement) {
        this.engineDisplacement = engineDisplacement;
    }
}
