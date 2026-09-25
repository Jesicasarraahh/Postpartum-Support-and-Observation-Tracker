package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoodRepository extends JpaRepository<Mood, Long> {

    Optional<Mood> findByName(String name);
}