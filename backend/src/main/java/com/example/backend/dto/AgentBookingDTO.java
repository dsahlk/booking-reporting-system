package com.example.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentBookingDTO {
    private String agent;
    private Long bookings;
}
