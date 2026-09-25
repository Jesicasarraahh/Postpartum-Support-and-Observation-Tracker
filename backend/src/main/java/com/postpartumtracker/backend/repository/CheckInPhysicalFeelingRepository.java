package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.CheckInPhysicalFeeling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckInPhysicalFeelingRepository
        extends JpaRepository<CheckInPhysicalFeeling, Long> {

    @Query("""
            SELECT cipf
            FROM CheckInPhysicalFeeling cipf
            WHERE cipf.checkIn = :checkIn
            """)
    List<CheckInPhysicalFeeling> findPhysicalFeelingsForCheckIn(
            @Param("checkIn") CheckIn checkIn
    );
}