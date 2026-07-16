package com.example.backend.service;

import com.example.backend.dto.EmailRequest;

public interface EmailService {
    void sendReport(EmailRequest request);
}
