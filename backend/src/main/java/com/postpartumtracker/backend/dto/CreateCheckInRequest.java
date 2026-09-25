package com.postpartumtracker.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.util.List;
import com.postpartumtracker.backend.entity.MedicationStatus;

public class CreateCheckInRequest {

    @DecimalMin("0.0")
    @DecimalMax("24.0")
    private Double sleepHours;

    private MedicationStatus medicationStatus;

    private String notes;

    private List<String> moods;

    private List<String> physicalFeelings;

    public CreateCheckInRequest() {
    }

    public Double getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(Double sleepHours) {
        this.sleepHours = sleepHours;
    }

    public MedicationStatus getMedicationStatus() {
        return medicationStatus;
    }

    public void setMedicationStatus(MedicationStatus medicationStatus) {
        this.medicationStatus = medicationStatus;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<String> getMoods() {
        return moods;
    }

    public void setMoods(List<String> moods) {
        this.moods = moods;
    }

    public List<String> getPhysicalFeelings() {
        return physicalFeelings;
    }

    public void setPhysicalFeelings(
            List<String> physicalFeelings) {

        this.physicalFeelings = physicalFeelings;
    }
}