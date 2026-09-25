package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.CheckInResponse;
import com.postpartumtracker.backend.dto.CreateCheckInRequest;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.CheckInMood;
import com.postpartumtracker.backend.entity.CheckInPhysicalFeeling;
import com.postpartumtracker.backend.entity.Mood;
import com.postpartumtracker.backend.entity.PhysicalFeeling;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.User;

import com.postpartumtracker.backend.repository.CheckInMoodRepository;
import com.postpartumtracker.backend.repository.CheckInPhysicalFeelingRepository;
import com.postpartumtracker.backend.repository.CheckInRepository;
import com.postpartumtracker.backend.repository.MoodRepository;
import com.postpartumtracker.backend.repository.PhysicalFeelingRepository;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.UserRepository;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CheckInService {

    private final CheckInRepository checkInRepository;
    private final PostpartumProfileRepository postpartumProfileRepository;
    private final UserRepository userRepository;

    private final CheckInMoodRepository checkInMoodRepository;
    private final CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository;

    private final MoodRepository moodRepository;
    private final PhysicalFeelingRepository physicalFeelingRepository;

    public CheckInService(
            CheckInRepository checkInRepository,
            PostpartumProfileRepository postpartumProfileRepository,
            UserRepository userRepository,
            CheckInMoodRepository checkInMoodRepository,
            CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository,
            MoodRepository moodRepository,
            PhysicalFeelingRepository physicalFeelingRepository) {

        this.checkInRepository = checkInRepository;
        this.postpartumProfileRepository = postpartumProfileRepository;
        this.userRepository = userRepository;
        this.checkInMoodRepository = checkInMoodRepository;
        this.checkInPhysicalFeelingRepository = checkInPhysicalFeelingRepository;
        this.moodRepository = moodRepository;
        this.physicalFeelingRepository = physicalFeelingRepository;
    }

    @Transactional
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

        CheckIn savedCheckIn = checkInRepository.save(checkIn);

        if (request.getMoods() != null) {

            for (String moodName : request.getMoods()) {

                Mood mood = moodRepository
                        .findByName(moodName.toUpperCase())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid mood: " + moodName
                                )
                        );

                CheckInMood checkInMood = new CheckInMood();

                checkInMood.setCheckIn(savedCheckIn);
                checkInMood.setMood(mood);

                checkInMoodRepository.save(checkInMood);
            }
        }

        if (request.getPhysicalFeelings() != null) {

            for (String feelingName : request.getPhysicalFeelings()) {

                PhysicalFeeling feeling =
                        physicalFeelingRepository
                                .findByName(feelingName.toUpperCase())
                                .orElseThrow(() ->
                                        new IllegalArgumentException(
                                                "Invalid physical feeling: "
                                                        + feelingName
                                        )
                                );

                CheckInPhysicalFeeling checkInPhysicalFeeling =
                        new CheckInPhysicalFeeling();

                checkInPhysicalFeeling.setCheckIn(savedCheckIn);
                checkInPhysicalFeeling.setPhysicalFeeling(feeling);

                checkInPhysicalFeelingRepository.save(
                        checkInPhysicalFeeling
                );
            }
        }

        return savedCheckIn;
    }

    public List<CheckIn> getCheckIns(
            Long profileId,
            String email) {

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
                    "You do not have permission to view these check-ins"
            );
        }

        return checkInRepository
                .findByPostpartumProfileOrderByCreatedAtDesc(profile);
    }

    public CheckInResponse buildCheckInResponse(CheckIn checkIn) {

    List<String> moods =
            checkInMoodRepository
                    .findMoodsForCheckIn(checkIn)
                    .stream()
                    .map(checkInMood ->
                            checkInMood.getMood().getName())
                    .toList();

    List<String> physicalFeelings =
            checkInPhysicalFeelingRepository
                    .findPhysicalFeelingsForCheckIn(checkIn)
                    .stream()
                    .map(link ->
                            link.getPhysicalFeeling().getName())
                    .toList();

    return new CheckInResponse(
            checkIn,
            moods,
            physicalFeelings
    );
}
}