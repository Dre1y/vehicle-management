package com.company.api.DTOS;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class MotorcycleRequestDTO extends VehicleRequestDTO {

    @NotNull(message = "Cilindrada é obrigatória")
    @Min(value = 50, message = "Cilindrada mínima é 50cc")
    @Max(value = 2500, message = "Cilindrada máxima é 2500cc")
    private Integer engineDisplacement;

    public Integer getEngineDisplacement() {
        return engineDisplacement;
    }

    public void setEngineDisplacement(Integer engineDisplacement) {
        this.engineDisplacement = engineDisplacement;
    }
}
