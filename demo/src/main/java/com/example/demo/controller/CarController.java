package com.example.demo.controller;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objectMapper;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
        this.objectMapper = new ObjectMapper();
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

    @PostMapping(
            value = "/add",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<?> addCar(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String bodyType,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) Integer mileage,
            @RequestParam(required = false) Integer engineCapacity,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String exteriorColor,
            @RequestParam(required = false) String features, // JSON string from frontend
            @RequestParam(required = false) MultipartFile image
    ) {

        if (title == null || model == null || year == null || price == null || image == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

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

        // Parse features JSON
        try {
            if (features != null && !features.isEmpty()) {
                List<String> featureList = objectMapper.readValue(features, new TypeReference<List<String>>() {});
                car.setFeatures(featureList);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Convert image to Base64
        try {
            String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
            car.setImage(base64Image);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image");
        }

        return ResponseEntity.ok(carRepository.save(car));
    }
}
