package com.example.backend.service;

import com.example.backend.dto.AgentBookingDTO;
import com.example.backend.dto.MonthlyRevenueDTO;
import com.example.backend.dto.RevenueByCountryDTO;
import com.example.backend.dto.SummaryDTO;
import java.util.List;

public interface DashboardService {
    SummaryDTO summary();
    List<RevenueByCountryDTO> revenueByCountry();
    List<AgentBookingDTO> agentBookings();
    List<MonthlyRevenueDTO> monthlyRevenue();
}
