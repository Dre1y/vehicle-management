package com.company.api.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.company.api.DTOS.car.CarRequestDTO;
import com.company.api.DTOS.car.CarResponseDTO;
import com.company.api.domain.car.Car;
import com.company.api.repositories.CarRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public CarResponseDTO create(CarRequestDTO dto) {
        Car car = new Car();
        car.setModel(dto.getModel());
        car.setManufacturer(dto.getManufacturer());
        car.setYear(dto.getYear());
        car.setPrice(dto.getPrice());
        car.setDoor_quantity(dto.getDoorQuantity());
        car.setFuel_type(dto.getFuelType());

        car = carRepository.save(car);

        return toDTO(car);
    }

    public CarResponseDTO getById(UUID id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Carro não encontrado"));
        return toDTO(car);
    }

    public List<CarResponseDTO> getAll() {
        return carRepository.findAll().stream().map(this::toDTO).toList();
    }

    public CarResponseDTO update(UUID id, CarRequestDTO dto) {
        Car car = carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Carro não encontrado"));
        car.setModel(dto.getModel());
        car.setManufacturer(dto.getManufacturer());
        car.setYear(dto.getYear());
        car.setPrice(dto.getPrice());
        car.setDoor_quantity(dto.getDoorQuantity());
        car.setFuel_type(dto.getFuelType());

        return toDTO(carRepository.save(car));
    }

    public void delete(UUID id) {
        carRepository.deleteById(id);
    }

    private CarResponseDTO toDTO(Car car) {
        CarResponseDTO dto = new CarResponseDTO();
        dto.setId(car.getId() != null ? car.getId().toString() : null);
        dto.setModel(car.getModel());
        dto.setManufacturer(car.getManufacturer());
        dto.setYear(car.getYear());
        dto.setPrice(car.getPrice());
        dto.setDoorQuantity(car.getDoor_quantity());
        dto.setFuelType(car.getFuel_type());

        return dto;
    }
}
