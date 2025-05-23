package com.company.api.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.api.domain.Motorcycle;

public interface MotorcycleRepository extends JpaRepository<Motorcycle, UUID> {

}
