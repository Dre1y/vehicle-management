package com.company.api.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.company.api.DTOS.MotorcycleRequestDTO;
import com.company.api.DTOS.MotorcycleResponseDTO;
import com.company.api.services.MotorcycleService;

class MotorcycleControllerTest {

    @Mock
    private MotorcycleService motorcycleService;

    @InjectMocks
    private MotorcycleController motorcycleController;

    private UUID motorcycleId;
    private MotorcycleRequestDTO motorcycleRequestDTO;
    private MotorcycleResponseDTO motorcycleResponseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        motorcycleId = UUID.randomUUID();

        motorcycleRequestDTO = new MotorcycleRequestDTO();
        motorcycleResponseDTO = new MotorcycleResponseDTO();
    }

    @Test
    void testCreate() {
        when(motorcycleService.create(motorcycleRequestDTO)).thenReturn(motorcycleResponseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.create(motorcycleRequestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(motorcycleResponseDTO, response.getBody());
        verify(motorcycleService).create(motorcycleRequestDTO);
    }

    @Test
    void testGetById() {
        when(motorcycleService.getById(motorcycleId)).thenReturn(motorcycleResponseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.getById(motorcycleId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(motorcycleResponseDTO, response.getBody());
        verify(motorcycleService).getById(motorcycleId);
    }

    @Test
    void testGetAll() {
        List<MotorcycleResponseDTO> list = Arrays.asList(motorcycleResponseDTO, new MotorcycleResponseDTO());
        when(motorcycleService.getAll()).thenReturn(list);

        ResponseEntity<List<MotorcycleResponseDTO>> response = motorcycleController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(list, response.getBody());
        verify(motorcycleService).getAll();
    }

    @Test
    void testUpdate() {
        when(motorcycleService.update(motorcycleId, motorcycleRequestDTO)).thenReturn(motorcycleResponseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.update(motorcycleId, motorcycleRequestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(motorcycleResponseDTO, response.getBody());
        verify(motorcycleService).update(motorcycleId, motorcycleRequestDTO);
    }

    @Test
    void testDelete() {
        doNothing().when(motorcycleService).delete(motorcycleId);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.delete(motorcycleId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(motorcycleService).delete(motorcycleId);
    }
}
