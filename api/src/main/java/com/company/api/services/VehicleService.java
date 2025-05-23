package com.company.api.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.company.api.DTOS.VehicleRequestDTO;
import com.company.api.DTOS.VehicleResponseDTO;
import com.company.api.domain.Vehicle;
import com.company.api.repositories.VehicleRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleResponseDTO create(VehicleRequestDTO dto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setModel(dto.getModel());
        vehicle.setManufacturer(dto.getManufacturer());
        vehicle.setYear(dto.getYear());
        vehicle.setPrice(dto.getPrice());

        vehicle = vehicleRepository.save(vehicle);

        return toDTO(vehicle);

    }

    public VehicleResponseDTO getById(UUID id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));
        return toDTO(vehicle);
    }

    public List<VehicleResponseDTO> getAll() {
        return vehicleRepository.findAll().stream().map(this::toDTO).toList();
    }

    public VehicleResponseDTO update(UUID id, VehicleRequestDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));
        vehicle.setModel(dto.getModel());
        vehicle.setManufacturer(dto.getManufacturer());
        vehicle.setYear(dto.getYear());
        vehicle.setPrice(dto.getPrice());

        return toDTO(vehicleRepository.save(vehicle));
    }

    public void delete(UUID Id) {
        vehicleRepository.deleteById(Id);
    }

    private VehicleResponseDTO toDTO(Vehicle vehicle) {
        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId() != null ? vehicle.getId().toString() : null);
        dto.setModel(vehicle.getModel());
        dto.setManufacturer(vehicle.getManufacturer());
        dto.setYear(vehicle.getYear());
        dto.setPrice(vehicle.getPrice());

        return dto;
    }
}
