package com.company.api.DTOS;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class MotorcycleRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Cilindrada é obrigatória")
    @Min(value = 50, message = "Cilindrada mínima é 50cc")
    @Max(value = 2500, message = "Cilindrada máxima é 2500cc")
    private int engineDisplacement;

    public int getEngineDisplacement() {
        return engineDisplacement;
    }

    public void setEngineDisplacement(int engineDisplacement) {
        this.engineDisplacement = engineDisplacement;
    }
}
