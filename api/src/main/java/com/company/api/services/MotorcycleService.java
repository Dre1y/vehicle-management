package com.company.api.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.company.api.DTOS.MotorcycleRequestDTO;
import com.company.api.DTOS.MotorcycleResponseDTO;
import com.company.api.domain.Motorcycle;
import com.company.api.repositories.MotorcycleRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MotorcycleService {

    private final MotorcycleRepository motorcycleRepository;

    public MotorcycleResponseDTO create(MotorcycleRequestDTO dto) {
        Motorcycle motorcycle = new Motorcycle();
        motorcycle.setModel(dto.getModel());
        motorcycle.setManufacturer(dto.getManufacturer());
        motorcycle.setYear(dto.getYear());
        motorcycle.setPrice(dto.getPrice());
        motorcycle.setEngineDisplacement(dto.getEngineDisplacement());

        motorcycle = motorcycleRepository.save(motorcycle);

        return toDTO(motorcycle);
    }

    public MotorcycleResponseDTO getById(UUID id) {
        Motorcycle motorcycle = motorcycleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Moto não encontrada"));
        return toDTO(motorcycle);
    }

    public List<MotorcycleResponseDTO> getAll() {
        return motorcycleRepository.findAll().stream().map(this::toDTO).toList();
    }

    public MotorcycleResponseDTO update(UUID id, MotorcycleRequestDTO dto) {
        Motorcycle motorcycle = motorcycleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Moto não encontrada"));
        motorcycle.setModel(dto.getModel());
        motorcycle.setManufacturer(dto.getManufacturer());
        motorcycle.setYear(dto.getYear());
        motorcycle.setPrice(dto.getPrice());
        motorcycle.setEngineDisplacement(dto.getEngineDisplacement());

        return toDTO(motorcycleRepository.save(motorcycle));
    }

    public void delete(UUID id) {
        motorcycleRepository.deleteById(id);
    }

    private MotorcycleResponseDTO toDTO(Motorcycle motorcycle) {
        MotorcycleResponseDTO dto = new MotorcycleResponseDTO();
        dto.setId(motorcycle.getId() != null ? motorcycle.getId().toString() : null);
        dto.setModel(motorcycle.getModel());
        dto.setManufacturer(motorcycle.getManufacturer());
        dto.setYear(motorcycle.getYear());
        dto.setPrice(motorcycle.getPrice());
        dto.setEngineDisplacement(motorcycle.getEngineDisplacement());

        return dto;
    }
}
