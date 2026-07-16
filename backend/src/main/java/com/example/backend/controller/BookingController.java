package com.example.backend.controller;

import com.example.backend.dto.UploadResult;
import com.example.backend.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @Operation(summary = "Upload Booking CSV")
    @PostMapping("/upload")
    public ResponseEntity<UploadResult> upload(

            @RequestParam MultipartFile file){

        return ResponseEntity.ok(


                bookingService.uploadBookings(file)

        );

    }
}
