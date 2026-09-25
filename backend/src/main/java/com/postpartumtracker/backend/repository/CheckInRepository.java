package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

    List<CheckIn> findByPostpartumProfileOrderByCreatedAtDesc(
            PostpartumProfile postpartumProfile
    );
}