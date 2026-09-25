package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.CreateCheckInRequest;
import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.CheckInRepository;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CheckInService {

    private final CheckInRepository checkInRepository;
    private final PostpartumProfileRepository postpartumProfileRepository;
    private final UserRepository userRepository;

    public CheckInService(
            CheckInRepository checkInRepository,
            PostpartumProfileRepository postpartumProfileRepository,
            UserRepository userRepository) {

        this.checkInRepository = checkInRepository;
        this.postpartumProfileRepository = postpartumProfileRepository;
        this.userRepository = userRepository;
    }

    public CheckIn createCheckIn(
            Long profileId,
            String email,
            CreateCheckInRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found")
                );

        PostpartumProfile profile =
                postpartumProfileRepository.findById(profileId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Postpartum profile not found"
                                )
                        );

        if (!profile.getOwner().getId().equals(user.getId())) {
            throw new IllegalArgumentException(
                    "You do not have permission to create a check-in for this profile"
            );
        }

        CheckIn checkIn = new CheckIn();

        checkIn.setPostpartumProfile(profile);
        checkIn.setAuthor(user);
        checkIn.setSleepHours(request.getSleepHours());
        checkIn.setMedicationStatus(request.getMedicationStatus());
        checkIn.setNotes(request.getNotes());

        return checkInRepository.save(checkIn);
    }
}