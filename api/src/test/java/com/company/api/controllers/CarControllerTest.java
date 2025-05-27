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

import com.company.api.DTOS.CarRequestDTO;
import com.company.api.DTOS.CarResponseDTO;
import com.company.api.services.CarService;

public class CarControllerTest {

    @Mock
    private CarService carService;

    @InjectMocks
    private CarController carController;

    private UUID carId;
    private CarRequestDTO carRequestDTO;
    private CarResponseDTO carResponseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        carId = UUID.randomUUID();

        carRequestDTO = new CarRequestDTO();
        carResponseDTO = new CarResponseDTO();
    }

    @Test
    void testCreate() {
        when(carService.create(carRequestDTO)).thenReturn(carResponseDTO);

        ResponseEntity<CarResponseDTO> response = carController.create(carRequestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(carResponseDTO, response.getBody());
        verify(carService).create(carRequestDTO);
    }

    @Test
    void testGetById() {
        when(carService.getById(carId)).thenReturn(carResponseDTO);

        ResponseEntity<CarResponseDTO> response = carController.getById(carId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(carResponseDTO, response.getBody());
        verify(carService).getById(carId);
    }

    @Test
    void testGetAll() {
        List<CarResponseDTO> carList = Arrays.asList(carResponseDTO, new CarResponseDTO());
        when(carService.getAll()).thenReturn(carList);

        ResponseEntity<List<CarResponseDTO>> response = carController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(carList, response.getBody());
        verify(carService).getAll();
    }

    @Test
    void testUpdate() {
        when(carService.update(carId, carRequestDTO)).thenReturn(carResponseDTO);

        ResponseEntity<CarResponseDTO> response = carController.update(carId, carRequestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(carResponseDTO, response.getBody());
        verify(carService).update(carId, carRequestDTO);
    }

    @Test
    void testDelete() {
        doNothing().when(carService).delete(carId);

        ResponseEntity<CarResponseDTO> response = carController.delete(carId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(carService).delete(carId);
    }
}
