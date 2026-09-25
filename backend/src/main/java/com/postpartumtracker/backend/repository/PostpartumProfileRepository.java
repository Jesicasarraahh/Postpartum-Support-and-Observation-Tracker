package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostpartumProfileRepository
        extends JpaRepository<PostpartumProfile, Long> {

    List<PostpartumProfile> findByOwner(User owner);
}