package com.company.api.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.api.domain.Car;

public interface CarRepository extends JpaRepository<Car, UUID> {

}
