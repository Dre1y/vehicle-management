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

import com.company.api.DTOS.MotorcycleRequestDTO;
import com.company.api.DTOS.MotorcycleResponseDTO;
import com.company.api.services.MotorcycleService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/motorcycles")
@RequiredArgsConstructor
@Tag(name = "Moto")
public class MotorcycleController {

    private final MotorcycleService motorcycleService;

    @PostMapping
    public ResponseEntity<MotorcycleResponseDTO> create(@RequestBody @Validated MotorcycleRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(motorcycleService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MotorcycleResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(motorcycleService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MotorcycleResponseDTO>> getAll() {
        return ResponseEntity.ok(motorcycleService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MotorcycleResponseDTO> update(@PathVariable UUID id, @RequestBody @Validated MotorcycleRequestDTO dto) {
        return ResponseEntity.ok(motorcycleService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MotorcycleResponseDTO> delete(@PathVariable UUID id) {
        motorcycleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
