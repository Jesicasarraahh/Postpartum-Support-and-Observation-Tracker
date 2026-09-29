package com.postpartumtracker.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TimelineItemResponse {

    private String type;
    private LocalDateTime timestamp;

    private String sourceName;
    private String relationship;

    private Double sleepHours;
    private String medicationStatus;
    private List<String> moods;
    private List<String> physicalFeelings;
    private String notes;

    private String category;
    private String description;
    private Boolean observerConcerned;

    public TimelineItemResponse() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
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

        this.physicalFeelings =
                physicalFeelings;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getObserverConcerned() {
        return observerConcerned;
    }

    public void setObserverConcerned(
            Boolean observerConcerned) {

        this.observerConcerned =
                observerConcerned;
    }
}