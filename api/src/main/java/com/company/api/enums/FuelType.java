package com.company.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum FuelType {
    GASOLINE,
    ETHANOL,
    DIESEL,
    FLEX;

    @JsonCreator

    public static FuelType from(String fuel_type) {
        return FuelType.valueOf(fuel_type.toUpperCase());
    }
}
