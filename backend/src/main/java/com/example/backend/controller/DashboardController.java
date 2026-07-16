package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public SummaryDTO summary() {

        return dashboardService.summary();

    }

    @GetMapping("/revenue-country")
    public List<RevenueByCountryDTO> revenueCountry() {

        return dashboardService.revenueByCountry();

    }

    @GetMapping("/agent-bookings")
    public List<AgentBookingDTO> agentBookings() {

        return dashboardService.agentBookings();

    }

    @GetMapping("/monthly-revenue")
    public List<MonthlyRevenueDTO> monthlyRevenue() {

        return dashboardService.monthlyRevenue();

    }

}
