package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.CheckInPhysicalFeeling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckInPhysicalFeelingRepository
        extends JpaRepository<CheckInPhysicalFeeling, Long> {

    List<CheckInPhysicalFeeling> findByCheckIn(CheckIn checkIn);
}