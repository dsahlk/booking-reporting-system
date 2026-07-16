package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UploadResult {
    private int totalRows;

    private int successRows;

    private int failedRows;

    private List<ValidationError> errors;
}
