package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.TimelineItemResponse;

import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.entity.Observation;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.User;

import com.postpartumtracker.backend.repository.CheckInMoodRepository;
import com.postpartumtracker.backend.repository.CheckInPhysicalFeelingRepository;
import com.postpartumtracker.backend.repository.CheckInRepository;
import com.postpartumtracker.backend.repository.ObservationRepository;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class TimelineService {

    private final UserRepository userRepository;
    private final PostpartumProfileRepository postpartumProfileRepository;

    private final CheckInRepository checkInRepository;
    private final CheckInMoodRepository checkInMoodRepository;
    private final CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository;

    private final ObservationRepository observationRepository;

    public TimelineService(
            UserRepository userRepository,
            PostpartumProfileRepository postpartumProfileRepository,
            CheckInRepository checkInRepository,
            CheckInMoodRepository checkInMoodRepository,
            CheckInPhysicalFeelingRepository checkInPhysicalFeelingRepository,
            ObservationRepository observationRepository) {

        this.userRepository =
                userRepository;

        this.postpartumProfileRepository =
                postpartumProfileRepository;

        this.checkInRepository =
                checkInRepository;

        this.checkInMoodRepository =
                checkInMoodRepository;

        this.checkInPhysicalFeelingRepository =
                checkInPhysicalFeelingRepository;

        this.observationRepository =
                observationRepository;
    }


    public List<TimelineItemResponse> getTimeline(
            Long profileId,
            String email) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found"
                                )
                        );

        PostpartumProfile profile =
                postpartumProfileRepository
                        .findById(profileId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Postpartum profile not found"
                                )
                        );

        if (!profile.getOwner()
                .getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You do not have permission to view this timeline"
            );
        }


        List<TimelineItemResponse> timeline =
                new ArrayList<>();


        List<CheckIn> checkIns =
                checkInRepository
                        .findByPostpartumProfileOrderByCreatedAtDesc(
                                profile
                        );


        for (CheckIn checkIn : checkIns) {

            TimelineItemResponse item =
                    new TimelineItemResponse();

            item.setType(
                    "MOTHER_CHECK_IN"
            );

            item.setTimestamp(
                    checkIn.getCreatedAt()
            );

            item.setSourceName(
                    user.getFirstName()
            );

            item.setSleepHours(
                    checkIn.getSleepHours()
            );

            if (checkIn.getMedicationStatus() != null) {

                item.setMedicationStatus(
                        checkIn
                                .getMedicationStatus()
                                .name()
                );
            }

            item.setNotes(
                    checkIn.getNotes()
            );


            List<String> moods =
                    checkInMoodRepository
                            .findMoodsForCheckIn(checkIn)
                            .stream()
                            .map(link ->
                                    link
                                            .getMood()
                                            .getName()
                            )
                            .toList();

            item.setMoods(moods);


            List<String> physicalFeelings =
                    checkInPhysicalFeelingRepository
                            .findPhysicalFeelingsForCheckIn(
                                    checkIn
                            )
                            .stream()
                            .map(link ->
                                    link
                                            .getPhysicalFeeling()
                                            .getName()
                            )
                            .toList();

            item.setPhysicalFeelings(
                    physicalFeelings
            );


            timeline.add(item);
        }


        List<Observation> observations =
                observationRepository
                        .findByPostpartumProfileOrderByObservedAtDesc(
                                profile
                        );


        for (Observation observation : observations) {

            TimelineItemResponse item =
                    new TimelineItemResponse();

            item.setType(
                    "TRUSTED_OBSERVATION"
            );

            item.setTimestamp(
                    observation.getObservedAt()
            );

            item.setSourceName(
                    observation
                            .getTrustedCircleMember()
                            .getName()
            );

            item.setRelationship(
                    observation
                            .getTrustedCircleMember()
                            .getRelationship()
            );

            item.setCategory(
                    observation.getCategory()
            );

            item.setDescription(
                    observation.getDescription()
            );

            item.setObserverConcerned(
                    observation.isObserverConcerned()
            );


            timeline.add(item);
        }


        timeline.sort(
                Comparator
                        .comparing(
                                TimelineItemResponse::getTimestamp
                        )
                        .reversed()
        );


        return timeline;
    }
}