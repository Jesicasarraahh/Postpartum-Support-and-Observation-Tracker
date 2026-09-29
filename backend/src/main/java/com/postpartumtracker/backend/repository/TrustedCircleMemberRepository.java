package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.TrustedCircleMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrustedCircleMemberRepository
        extends JpaRepository<TrustedCircleMember, Long> {

    List<TrustedCircleMember>
    findByPostpartumProfile(PostpartumProfile postpartumProfile);
}