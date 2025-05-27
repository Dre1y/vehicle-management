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

import com.company.api.DTOS.VehicleRequestDTO;
import com.company.api.DTOS.VehicleResponseDTO;
import com.company.api.services.VehicleService;

class VehicleControllerTest {

    @Mock
    private VehicleService vehicleService;

    @InjectMocks
    private VehicleController vehicleController;

    private UUID vehicleId;
    private VehicleRequestDTO vehicleRequestDTO;
    private VehicleResponseDTO vehicleResponseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        vehicleId = UUID.randomUUID();
        vehicleRequestDTO = new VehicleRequestDTO();
        vehicleResponseDTO = new VehicleResponseDTO();
    }

    @Test
    void testCreate() {
        when(vehicleService.create(vehicleRequestDTO)).thenReturn(vehicleResponseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.create(vehicleRequestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(vehicleResponseDTO, response.getBody());
        verify(vehicleService).create(vehicleRequestDTO);
    }

    @Test
    void testGetById() {
        when(vehicleService.getById(vehicleId)).thenReturn(vehicleResponseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.getById(vehicleId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehicleResponseDTO, response.getBody());
        verify(vehicleService).getById(vehicleId);
    }

    @Test
    void testGetAll() {
        List<VehicleResponseDTO> vehicleList = Arrays.asList(vehicleResponseDTO, new VehicleResponseDTO());
        when(vehicleService.getAll()).thenReturn(vehicleList);

        ResponseEntity<List<VehicleResponseDTO>> response = vehicleController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehicleList, response.getBody());
        verify(vehicleService).getAll();
    }

    @Test
    void testUpdate() {
        when(vehicleService.update(vehicleId, vehicleRequestDTO)).thenReturn(vehicleResponseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.update(vehicleId, vehicleRequestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehicleResponseDTO, response.getBody());
        verify(vehicleService).update(vehicleId, vehicleRequestDTO);
    }

    @Test
    void testDelete() {
        doNothing().when(vehicleService).delete(vehicleId);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.delete(vehicleId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(vehicleService).delete(vehicleId);
    }
}
