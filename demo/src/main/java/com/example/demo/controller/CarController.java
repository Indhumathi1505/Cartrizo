package com.example.demo.controller;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable String id) {
        return carRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addCar(
            @RequestParam String title,
            @RequestParam String bodyType,
            @RequestParam String model,
            @RequestParam Integer year,
            @RequestParam String fuelType,
            @RequestParam Integer mileage,
            @RequestParam Integer engineCapacity,
            @RequestParam Double price,
            @RequestParam String description,
            @RequestParam String condition,
            @RequestParam String exteriorColor,
            @RequestParam(required = false) List<String> features,
            @RequestParam MultipartFile image
    ) {

        Car car = new Car();
        car.setTitle(title);
        car.setBodyType(bodyType);
        car.setModel(model);
        car.setYear(year);
        car.setFuelType(fuelType);
        car.setMileage(mileage);
        car.setEngineCapacity(engineCapacity);
        car.setPrice(price);
        car.setDescription(description);
        car.setCondition(condition);
        car.setExteriorColor(exteriorColor);

        // ✅ FEATURES
        if (features != null && !features.isEmpty()) {
            car.setFeatures(features);
        }

        // ✅ IMAGE
        try {
            String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
            car.setImage(base64Image);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Image upload failed");
        }

        return ResponseEntity.ok(carRepository.save(car));
    }
}
