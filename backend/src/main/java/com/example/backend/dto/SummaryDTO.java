package com.example.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SummaryDTO {
    private Long totalBookings;
    private Long confirmed;
    private Long cancelled;
    private BigDecimal totalRevenue;
}
