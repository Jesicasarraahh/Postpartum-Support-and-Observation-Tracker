package com.postpartumtracker.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

public class CreateCheckInRequest {

    @DecimalMin("0.0")
    @DecimalMax("24.0")
    private Double sleepHours;

    private String medicationStatus;

    private String notes;

    public CreateCheckInRequest() {
    }

    public Double getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(Double sleepHours) {
        this.sleepHours = sleepHours;
    }

    public String getMedicationStatus() {
        return medicationStatus;
    }

    public void setMedicationStatus(String medicationStatus) {
        this.medicationStatus = medicationStatus;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}