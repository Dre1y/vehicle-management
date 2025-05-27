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

import com.company.api.DTOS.MotorcycleRequestDTO;
import com.company.api.DTOS.MotorcycleResponseDTO;
import com.company.api.services.MotorcycleService;

class MotorcycleControllerTest {

    @Mock
    private MotorcycleService motorcycleService;

    @InjectMocks
    private MotorcycleController motorcycleController;

    private UUID motoId;
    private MotorcycleRequestDTO requestDTO;
    private MotorcycleResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        motoId = UUID.randomUUID();

        requestDTO = new MotorcycleRequestDTO();
        requestDTO.setModel("XRE 300");
        requestDTO.setManufacturer("Honda");
        requestDTO.setYear(2024);
        requestDTO.setPrice(new BigDecimal("23500.00"));
        requestDTO.setEngineDisplacement(300);

        responseDTO = new MotorcycleResponseDTO();
        responseDTO.setId(motoId.toString());
        responseDTO.setModel("XRE 300");
        responseDTO.setManufacturer("Honda");
        responseDTO.setYear(2024);
        responseDTO.setPrice(new BigDecimal("23500.00"));
        responseDTO.setEngineDisplacement(300);
    }

    @Test
    void testCreate() {
        when(motorcycleService.create(requestDTO)).thenReturn(responseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.create(requestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("XRE 300", response.getBody().getModel());
        assertEquals(300, response.getBody().getEngineDisplacement());
        verify(motorcycleService).create(requestDTO);
    }

    @Test
    void testGetById() {
        when(motorcycleService.getById(motoId)).thenReturn(responseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.getById(motoId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(motoId.toString(), response.getBody().getId());
        verify(motorcycleService).getById(motoId);
    }

    @Test
    void testGetAll() {
        MotorcycleResponseDTO moto2 = new MotorcycleResponseDTO();
        moto2.setId(UUID.randomUUID().toString());
        moto2.setModel("MT-03");
        moto2.setManufacturer("Yamaha");
        moto2.setYear(2023);
        moto2.setPrice(new BigDecimal("28000.00"));
        moto2.setEngineDisplacement(321);

        List<MotorcycleResponseDTO> list = Arrays.asList(responseDTO, moto2);

        when(motorcycleService.getAll()).thenReturn(list);

        ResponseEntity<List<MotorcycleResponseDTO>> response = motorcycleController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals("MT-03", response.getBody().get(1).getModel());
        verify(motorcycleService).getAll();
    }

    @Test
    void testUpdate() {
        when(motorcycleService.update(motoId, requestDTO)).thenReturn(responseDTO);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.update(motoId, requestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("XRE 300", response.getBody().getModel());
        verify(motorcycleService).update(motoId, requestDTO);
    }

    @Test
    void testDelete() {
        doNothing().when(motorcycleService).delete(motoId);

        ResponseEntity<MotorcycleResponseDTO> response = motorcycleController.delete(motoId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(motorcycleService).delete(motoId);
    }
}
