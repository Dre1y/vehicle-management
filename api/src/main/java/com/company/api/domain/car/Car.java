package com.company.api.domain.car;

import com.company.api.domain.vehicle.Vehicle;
import com.company.api.enums.FuelType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "car")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car extends Vehicle {

    private int door_quantity;

    @Enumerated(EnumType.STRING)
    private FuelType fuel_type;
}
