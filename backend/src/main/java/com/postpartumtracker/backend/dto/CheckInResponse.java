package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.CheckIn;

import java.time.LocalDateTime;

public class CheckInResponse {

    private Long id;
    private Long postpartumProfileId;
    private Long authorUserId;
    private Double sleepHours;
    private String medicationStatus;
    private String notes;
    private LocalDateTime createdAt;

    public CheckInResponse(CheckIn checkIn) {
        this.id = checkIn.getId();
        this.postpartumProfileId =
                checkIn.getPostpartumProfile().getId();
        this.authorUserId =
                checkIn.getAuthor().getId();
        this.sleepHours = checkIn.getSleepHours();
        this.medicationStatus = checkIn.getMedicationStatus();
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

    public String getMedicationStatus() {
        return medicationStatus;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}