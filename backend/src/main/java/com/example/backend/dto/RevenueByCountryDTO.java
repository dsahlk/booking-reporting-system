package com.example.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueByCountryDTO {

    private String country;
    private BigDecimal revenue;
}
