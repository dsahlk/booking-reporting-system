package com.example.backend.repository;

import com.example.backend.entity.TourType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface TourTypeRepository extends JpaRepository<TourType, Long>{
    Optional<TourType> findByName(String name);
}
