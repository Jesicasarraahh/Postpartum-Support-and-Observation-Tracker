package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.CheckIn;

import java.time.LocalDateTime;
import java.util.List;
import com.postpartumtracker.backend.entity.MedicationStatus;

public class CheckInResponse {

    private Long id;
    private Long postpartumProfileId;
    private Long authorUserId;

    private Double sleepHours;
    private MedicationStatus medicationStatus;

    private List<String> moods;
    private List<String> physicalFeelings;

    private String notes;
    private LocalDateTime createdAt;

    public CheckInResponse(
            CheckIn checkIn,
            List<String> moods,
            List<String> physicalFeelings) {

        this.id = checkIn.getId();
        this.postpartumProfileId =
                checkIn.getPostpartumProfile().getId();
        this.authorUserId =
                checkIn.getAuthor().getId();
        this.sleepHours = checkIn.getSleepHours();
        this.medicationStatus = checkIn.getMedicationStatus();
        this.moods = moods;
        this.physicalFeelings = physicalFeelings;
        this.notes = checkIn.getNotes();
        this.createdAt = checkIn.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public Long getPostpartumProfileId() {
        return postpartumProfileId;
    }

    public Long getAuthorUserId() {
        return authorUserId;
    }

    public Double getSleepHours() {
        return sleepHours;
    }

    public MedicationStatus getMedicationStatus() {
        return medicationStatus;
    }

    public List<String> getMoods() {
        return moods;
    }

    public List<String> getPhysicalFeelings() {
        return physicalFeelings;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}