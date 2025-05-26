package com.company.api.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "motorcycle")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Motorcycle extends Vehicle {

    private Integer engineDisplacement;
}
