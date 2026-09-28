package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.entity.PasswordResetToken;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.PasswordResetTokenRepository;
import com.postpartumtracker.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(
            PasswordResetTokenRepository tokenRepository,
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder) {

        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void createResetToken(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        )
                );

        tokenRepository
                .findByUser(user)
                .ifPresent(tokenRepository::delete);

        PasswordResetToken token =
                new PasswordResetToken();

        token.setUser(user);
        token.setToken(
                UUID.randomUUID().toString()
        );

        token.setExpiresAt(
                LocalDateTime.now().plusHours(1)
        );

        PasswordResetToken savedToken =
                tokenRepository.save(token);

        emailService.sendPasswordResetEmail(
                user.getEmail(),
                user.getFirstName(),
                savedToken.getToken()
        );
    }

    @Transactional
    public void resetPassword(
            String tokenValue,
            String newPassword) {

        PasswordResetToken token =
                tokenRepository
                        .findByToken(tokenValue)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid reset token"
                                )
                        );

        if (token.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new IllegalArgumentException(
                    "Reset link has expired"
            );
        }

        User user = token.getUser();

        user.setPasswordHash(
                passwordEncoder.encode(
                        newPassword
                )
        );

        userRepository.save(user);

        tokenRepository.delete(token);
    }
}