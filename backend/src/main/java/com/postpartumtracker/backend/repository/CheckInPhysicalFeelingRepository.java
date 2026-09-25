package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckInPhysicalFeeling;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckInPhysicalFeelingRepository
        extends JpaRepository<CheckInPhysicalFeeling, Long> {
}