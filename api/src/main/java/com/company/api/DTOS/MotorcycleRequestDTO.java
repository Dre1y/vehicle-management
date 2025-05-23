package com.company.api.DTOS;

import jakarta.validation.constraints.NotNull;

public class MotorcycleRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Cilindrada é obrigatória")
    private int engineDisplacement;

    public int getEngineDisplacement() {
        return engineDisplacement;
    }

    public void setEngineDisplacement(int engineDisplacement) {
        this.engineDisplacement = engineDisplacement;
    }
}
