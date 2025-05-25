package com.company.api.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.api.DTOS.CarRequestDTO;
import com.company.api.DTOS.CarResponseDTO;
import com.company.api.services.CarService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Tag(name = "Carro")
public class CarController {

    private final CarService carService;

    @PostMapping
    public ResponseEntity<CarResponseDTO> create(@RequestBody @Validated CarRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(carService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CarResponseDTO>> getAll() {
        return ResponseEntity.ok(carService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated CarRequestDTO dto) {
        return ResponseEntity.ok(carService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CarResponseDTO> delete(@PathVariable UUID id) {
        carService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
