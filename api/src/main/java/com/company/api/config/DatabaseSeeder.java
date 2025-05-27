package com.company.api.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.company.api.domain.Car;
import com.company.api.domain.Motorcycle;
import com.company.api.enums.FuelType;
import com.company.api.repositories.CarRepository;
import com.company.api.repositories.MotorcycleRepository;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(CarRepository carRepository, MotorcycleRepository motorcycleRepository) {
        return args -> {

            if (carRepository.count() == 0 && motorcycleRepository.count() == 0) {

                Car car1 = new Car();
                car1.setModel("Civic");
                car1.setManufacturer("Honda");
                car1.setYear(2020);
                car1.setPrice(new BigDecimal("95000"));
                car1.setDoorQuantity(4);
                car1.setFuelType(FuelType.GASOLINE);

                Car car2 = new Car();
                car2.setModel("Onix");
                car2.setManufacturer("Chevrolet");
                car2.setYear(2023);
                car2.setPrice(new BigDecimal("75000"));
                car2.setDoorQuantity(4);
                car2.setFuelType(FuelType.FLEX);

                carRepository.save(car1);
                carRepository.save(car2);

                Motorcycle moto1 = new Motorcycle();
                moto1.setModel("CG 160");
                moto1.setManufacturer("Honda");
                moto1.setYear(2022);
                moto1.setPrice(new BigDecimal("14000"));
                moto1.setEngineDisplacement(160);

                Motorcycle moto2 = new Motorcycle();
                moto2.setModel("MT-07");
                moto2.setManufacturer("Yamaha");
                moto2.setYear(2021);
                moto2.setPrice(new BigDecimal("42000"));
                moto2.setEngineDisplacement(689);

                motorcycleRepository.save(moto1);
                motorcycleRepository.save(moto2);
            } else {
            }
        };
    }
}
