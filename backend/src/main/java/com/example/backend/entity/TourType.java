package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "tourType")
    private List<Booking> bookings = new ArrayList<>();
}
