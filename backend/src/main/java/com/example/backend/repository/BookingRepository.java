package com.example.backend.repository;

import com.example.backend.dto.AgentBookingDTO;
import com.example.backend.dto.MonthlyRevenueDTO;
import com.example.backend.dto.RevenueByCountryDTO;
import com.example.backend.entity.Booking;
import com.example.backend.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long>{

    boolean existsByBookingNo(String bookingNo);

    //total booking
    long count();
    //confirmed booking
    long countByStatus(BookingStatus status);

    //total revenue
    @Query("""
    SELECT COALESCE(SUM(b.amount),0)
    FROM Booking b
    WHERE b.status='CONFIRMED'
    """)
    BigDecimal getTotalRevenue();

    //revenue by country
    @Query("""
    SELECT new com.example.backend.dto.RevenueByCountryDTO(

    c.name,

    SUM(b.amount)

    )

    FROM Booking b

    JOIN b.country c

    WHERE b.status='CONFIRMED'

    GROUP BY c.name

    ORDER BY SUM(b.amount) DESC
    """)
    List<RevenueByCountryDTO> revenueByCountry();

    //booking by agent
    @Query("""
    SELECT new com.example.backend.dto.AgentBookingDTO(

    a.name,

    COUNT(b)

    )

    FROM Booking b

    JOIN b.agent a

    GROUP BY a.name

    ORDER BY COUNT(b) DESC
    """)
    List<AgentBookingDTO> bookingsByAgent();

    //monthly revenue
    @Query("""
    SELECT new com.example.backend.dto.MonthlyRevenueDTO(

    MONTH(b.bookingDate),

    SUM(b.amount)

    )

    FROM Booking b

    WHERE b.status='CONFIRMED'

    GROUP BY MONTH(b.bookingDate)

    ORDER BY MONTH(b.bookingDate)
    """)
    List<MonthlyRevenueDTO> monthlyRevenue();
}
