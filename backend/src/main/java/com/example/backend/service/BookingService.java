package com.example.backend.service;

import com.example.backend.dto.UploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface BookingService {
    UploadResult uploadBookings(MultipartFile file);
}
