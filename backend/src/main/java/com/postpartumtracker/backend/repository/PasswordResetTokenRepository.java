package com.postpartumtracker.backend.repository;

import com.postpartumtracker.backend.entity.PasswordResetToken;
import com.postpartumtracker.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);
}