package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.Observation;

import java.time.LocalDateTime;

public class ObservationResponse {

    private Long id;
    private String observerName;
    private String relationship;
    private String category;
    private String description;
    private boolean observerConcerned;
    private LocalDateTime observedAt;
    private LocalDateTime createdAt;

    public ObservationResponse(
            Observation observation) {

        this.id = observation.getId();

        this.observerName =
                observation
                        .getTrustedCircleMember()
                        .getName();

        this.relationship =
                observation
                        .getTrustedCircleMember()
                        .getRelationship();

        this.category =
                observation.getCategory();

        this.description =
                observation.getDescription();

        this.observerConcerned =
                observation.isObserverConcerned();

        this.observedAt =
                observation.getObservedAt();

        this.createdAt =
                observation.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getObserverName() {
        return observerName;
    }

    public String getRelationship() {
        return relationship;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public boolean isObserverConcerned() {
        return observerConcerned;
    }

    public LocalDateTime getObservedAt() {
        return observedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}