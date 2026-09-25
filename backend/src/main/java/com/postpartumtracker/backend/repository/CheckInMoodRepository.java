package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.CheckInMood;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckInMoodRepository
        extends JpaRepository<CheckInMood, Long> {

    @Query("""
            SELECT cim
            FROM CheckInMood cim
            WHERE cim.checkIn = :checkIn
            """)
    List<CheckInMood> findMoodsForCheckIn(
            @Param("checkIn") CheckIn checkIn
    );
}