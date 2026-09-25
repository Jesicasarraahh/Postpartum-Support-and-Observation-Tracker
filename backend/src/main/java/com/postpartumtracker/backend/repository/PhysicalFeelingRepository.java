package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.PhysicalFeeling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhysicalFeelingRepository
        extends JpaRepository<PhysicalFeeling, Long> {

    Optional<PhysicalFeeling> findByName(String name);
}