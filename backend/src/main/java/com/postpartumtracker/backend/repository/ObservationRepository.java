package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.Observation;
import com.postpartumtracker.backend.entity.PostpartumProfile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObservationRepository
        extends JpaRepository<Observation, Long> {

    List<Observation>
    findByPostpartumProfileOrderByObservedAtDesc(
            PostpartumProfile postpartumProfile
    );
}