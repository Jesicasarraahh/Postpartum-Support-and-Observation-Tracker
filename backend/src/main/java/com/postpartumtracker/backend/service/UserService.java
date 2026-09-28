package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.RegisterRequest;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.PostpartumProfile;

import com.postpartumtracker.backend.repository.CheckInMoodRepository;
import com.postpartumtracker.backend.repository.CheckInPhysicalFeelingRepository;
import com.postpartumtracker.backend.repository.CheckInRepository;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.EmailVerificationTokenRepository;
import com.postpartumtracker.backend.repository.PasswordResetTokenRepository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service 
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationService emailVerificationService;
    private final PostpartumProfileRepository postpartumProfileRepository;
    private final CheckInRepository checkInRepository;
    private final CheckInMoodRepository checkInMoodRepository;
    private final CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        EmailVerificationService emailVerificationService,
        PostpartumProfileRepository postpartumProfileRepository,
        CheckInRepository checkInRepository,
        CheckInMoodRepository checkInMoodRepository,
        CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository,
        EmailVerificationTokenRepository emailVerificationTokenRepository,
        PasswordResetTokenRepository passwordResetTokenRepository) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.emailVerificationService = emailVerificationService;

    this.postpartumProfileRepository = postpartumProfileRepository;
    this.checkInRepository = checkInRepository;
    this.checkInMoodRepository = checkInMoodRepository;
    this.checkInPhysicalFeelingRepository =
            checkInPhysicalFeelingRepository;

    this.emailVerificationTokenRepository =
            emailVerificationTokenRepository;

    this.passwordResetTokenRepository =
            passwordResetTokenRepository;
}
    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);
        emailVerificationService.createAndSendVerification(savedUser);
        return savedUser;
    }

    @Transactional
public void deleteAccount(String email) {

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "User not found"
                    )
            );

    List<PostpartumProfile> profiles =
            postpartumProfileRepository
                    .findByOwner(user);

    for (PostpartumProfile profile : profiles) {

        List<CheckIn> checkIns =
                checkInRepository
                        .findByPostpartumProfileOrderByCreatedAtDesc(
                                profile
                        );

        for (CheckIn checkIn : checkIns) {

            checkInMoodRepository.deleteAll(
                    checkInMoodRepository
                            .findMoodsForCheckIn(checkIn)
            );

            checkInPhysicalFeelingRepository.deleteAll(
                    checkInPhysicalFeelingRepository
                            .findPhysicalFeelingsForCheckIn(checkIn)
            );
        }

        checkInRepository.deleteAll(checkIns);
    }

    postpartumProfileRepository.deleteAll(profiles);

    emailVerificationTokenRepository
            .findByUser(user)
            .ifPresent(
                    emailVerificationTokenRepository::delete
            );

    passwordResetTokenRepository
            .findByUser(user)
            .ifPresent(
                    passwordResetTokenRepository::delete
            );

    userRepository.delete(user);
}
    
}
