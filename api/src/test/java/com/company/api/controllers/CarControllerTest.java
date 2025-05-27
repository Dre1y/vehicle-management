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

import com.company.api.DTOS.CarRequestDTO;
import com.company.api.DTOS.CarResponseDTO;
import com.company.api.enums.FuelType;
import com.company.api.services.CarService;

class CarControllerTest {

    @Mock
    private CarService carService;

    @InjectMocks
    private CarController carController;

    private UUID carId;
    private CarRequestDTO requestDTO;
    private CarResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        carId = UUID.randomUUID();

        requestDTO = new CarRequestDTO();
        requestDTO.setModel("Onix");
        requestDTO.setManufacturer("Chevrolet");
        requestDTO.setYear(2023);
        requestDTO.setPrice(new BigDecimal("89000.00"));
        requestDTO.setDoorQuantity(4);
        requestDTO.setFuelType(FuelType.GASOLINE);

        responseDTO = new CarResponseDTO();
        responseDTO.setId(carId.toString());
        responseDTO.setModel("Onix");
        responseDTO.setManufacturer("Chevrolet");
        responseDTO.setYear(2023);
        responseDTO.setPrice(new BigDecimal("89000.00"));
        responseDTO.setDoorQuantity(4);
        responseDTO.setFuelType(FuelType.GASOLINE);
    }

    @Test
    void testCreate() {
        when(carService.create(requestDTO)).thenReturn(responseDTO);

        ResponseEntity<CarResponseDTO> response = carController.create(requestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Onix", response.getBody().getModel());
        assertEquals(4, response.getBody().getDoorQuantity());
        assertEquals(FuelType.GASOLINE, response.getBody().getFuelType());
        verify(carService).create(requestDTO);
    }

    @Test
    void testGetById() {
        when(carService.getById(carId)).thenReturn(responseDTO);

        ResponseEntity<CarResponseDTO> response = carController.getById(carId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(carId.toString(), response.getBody().getId());
        verify(carService).getById(carId);
    }

    @Test
    void testGetAll() {
        CarResponseDTO anotherCar = new CarResponseDTO();
        anotherCar.setId(UUID.randomUUID().toString());
        anotherCar.setModel("Corolla");
        anotherCar.setManufacturer("Toyota");
        anotherCar.setYear(2022);
        anotherCar.setPrice(new BigDecimal("110000.00"));
        anotherCar.setDoorQuantity(4);
        anotherCar.setFuelType(FuelType.FLEX);

        List<CarResponseDTO> cars = Arrays.asList(responseDTO, anotherCar);

        when(carService.getAll()).thenReturn(cars);

        ResponseEntity<List<CarResponseDTO>> response = carController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals("Corolla", response.getBody().get(1).getModel());
        verify(carService).getAll();
    }

    @Test
    void testUpdate() {
        when(carService.update(carId, requestDTO)).thenReturn(responseDTO);

        ResponseEntity<CarResponseDTO> response = carController.update(carId, requestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Onix", response.getBody().getModel());
        verify(carService).update(carId, requestDTO);
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
