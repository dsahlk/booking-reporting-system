package com.example.backend.controller;

import com.example.backend.dto.EmailRequest;
import com.example.backend.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/report")
    public ResponseEntity<String> sendReport(
            @RequestBody @Valid EmailRequest request) {

        emailService.sendReport(request);

        return ResponseEntity.ok("Report sent successfully.");

    }
}
