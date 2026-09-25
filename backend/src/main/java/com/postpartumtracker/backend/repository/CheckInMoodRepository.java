package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckInMood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckInMoodRepository
        extends JpaRepository<CheckInMood, Long> {
}