package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.TrustedCircleInviteToken;
import com.postpartumtracker.backend.entity.TrustedCircleMember;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrustedCircleInviteTokenRepository
        extends JpaRepository<TrustedCircleInviteToken, Long> {

    Optional<TrustedCircleInviteToken>
    findByToken(String token);

    Optional<TrustedCircleInviteToken>
    findByTrustedCircleMember(
            TrustedCircleMember trustedCircleMember
    );
}