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

import com.company.api.DTOS.VehicleRequestDTO;
import com.company.api.DTOS.VehicleResponseDTO;
import com.company.api.services.VehicleService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleResponseDTO> create(@RequestBody @Validated VehicleRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(vehicleService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> getAll() {
        return ResponseEntity.ok(vehicleService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated VehicleRequestDTO dto) {
        return ResponseEntity.ok(vehicleService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> delete(@PathVariable UUID id) {
        vehicleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
