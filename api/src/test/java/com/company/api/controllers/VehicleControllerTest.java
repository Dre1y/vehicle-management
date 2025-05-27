package com.company.api.controllers;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
    private VehicleRequestDTO requestDTO;
    private VehicleResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        vehicleId = UUID.randomUUID();

        requestDTO = new VehicleRequestDTO();
        requestDTO.setModel("Civic");
        requestDTO.setManufacturer("Honda");
        requestDTO.setYear(2022);
        requestDTO.setPrice(new BigDecimal("120000.00"));

        responseDTO = new VehicleResponseDTO();
        responseDTO.setId(vehicleId.toString());
        responseDTO.setModel("Civic");
        responseDTO.setManufacturer("Honda");
        responseDTO.setYear(2022);
        responseDTO.setPrice(new BigDecimal("120000.00"));
    }

    @Test
    void testCreate() {
        when(vehicleService.create(requestDTO)).thenReturn(responseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.create(requestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Civic", response.getBody().getModel());
        assertEquals("Honda", response.getBody().getManufacturer());
        assertEquals(2022, response.getBody().getYear());
        assertEquals(new BigDecimal("120000.00"), response.getBody().getPrice());
        verify(vehicleService).create(requestDTO);
    }

    @Test
    void testGetById() {
        when(vehicleService.getById(vehicleId)).thenReturn(responseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.getById(vehicleId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehicleId.toString(), response.getBody().getId());
        verify(vehicleService).getById(vehicleId);
    }

    @Test
    void testGetAll() {
        VehicleResponseDTO anotherVehicle = new VehicleResponseDTO();
        anotherVehicle.setId(UUID.randomUUID().toString());
        anotherVehicle.setModel("Corolla");
        anotherVehicle.setManufacturer("Toyota");
        anotherVehicle.setYear(2021);
        anotherVehicle.setPrice(new BigDecimal("110000.00"));

        List<VehicleResponseDTO> vehicleList = Arrays.asList(responseDTO, anotherVehicle);

        when(vehicleService.getAll()).thenReturn(vehicleList);

        ResponseEntity<List<VehicleResponseDTO>> response = vehicleController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(vehicleService).getAll();
    }

    @Test
    void testUpdate() {
        when(vehicleService.update(vehicleId, requestDTO)).thenReturn(responseDTO);

        ResponseEntity<VehicleResponseDTO> response = vehicleController.update(vehicleId, requestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Civic", response.getBody().getModel());
        verify(vehicleService).update(vehicleId, requestDTO);
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
