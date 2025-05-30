package com.company.api.DTOS;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class VehicleRequestDTO {

    @NotNull(message = "Modelo é obrigatório")
    private String model;

    @NotNull(message = "Fabricante é obrigatório")
    private String manufacturer;

    @NotNull(message = "Ano é obrigatório")
    @Min(value = 1886, message = "Ano deve ser maior ou igual a 1886")
    private Integer year;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "Preço deve ser positivo")
    private BigDecimal price;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
