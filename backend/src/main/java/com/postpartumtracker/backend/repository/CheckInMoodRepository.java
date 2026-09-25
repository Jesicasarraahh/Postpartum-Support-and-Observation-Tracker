package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.CheckInMood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckInMoodRepository
        extends JpaRepository<CheckInMood, Long> {

    List<CheckInMood> findByCheckIn(CheckIn checkIn);
}