package com.example.backend.service.impl;

import com.example.backend.dto.AgentBookingDTO;
import com.example.backend.dto.MonthlyRevenueDTO;
import com.example.backend.dto.RevenueByCountryDTO;
import com.example.backend.dto.SummaryDTO;
import com.example.backend.entity.BookingStatus;
import com.example.backend.repository.BookingRepository;
import com.example.backend.service.DashboardService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final BookingRepository bookingRepository;

    DashboardServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public SummaryDTO summary() {

        long total = bookingRepository.count();

        long confirmed = bookingRepository.countByStatus(
                        BookingStatus.CONFIRMED);

        long cancelled = bookingRepository.countByStatus(
                        BookingStatus.CANCELLED);

        BigDecimal revenue = bookingRepository.getTotalRevenue();

        return SummaryDTO.builder()

                .totalBookings(total)

                .confirmed(confirmed)

                .cancelled(cancelled)

                .totalRevenue(revenue)

                .build();

    }

    @Override
    public List<RevenueByCountryDTO> revenueByCountry() {

        return bookingRepository.revenueByCountry();

    }

    @Override
    public List<AgentBookingDTO> agentBookings() {

        return bookingRepository.bookingsByAgent();

    }

    @Override
    public List<MonthlyRevenueDTO> monthlyRevenue() {

        return bookingRepository.monthlyRevenue();

    }

}
