package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.entity.EmailVerificationToken;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.EmailVerificationTokenRepository;
import com.postpartumtracker.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class EmailVerificationService {

    private final EmailVerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public EmailVerificationService(
            EmailVerificationTokenRepository tokenRepository,
            UserRepository userRepository,
            EmailService emailService) {

        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void createAndSendVerification(User user) {

        tokenRepository
                .findByUser(user)
                .ifPresent(tokenRepository::delete);

        EmailVerificationToken token =
                new EmailVerificationToken();

        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiresAt(
                LocalDateTime.now().plusHours(24)
        );

        EmailVerificationToken savedToken =
                tokenRepository.save(token);

        emailService.sendVerificationEmail(
                user.getEmail(),
                user.getFirstName(),
                savedToken.getToken()
        );
    }

    @Transactional
    public void verifyEmail(String tokenValue) {

        EmailVerificationToken token =
                tokenRepository
                        .findByToken(tokenValue)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid verification token"
                                )
                        );

        if (token.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new IllegalArgumentException(
                    "Verification link has expired"
            );
        }

        User user = token.getUser();

        user.setEmailVerified(true);

        userRepository.save(user);

        tokenRepository.delete(token);
    }
}