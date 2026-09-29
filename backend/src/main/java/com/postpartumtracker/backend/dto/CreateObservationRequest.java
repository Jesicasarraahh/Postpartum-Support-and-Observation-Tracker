package com.postpartumtracker.backend.dto;

import java.time.LocalDateTime;

public class CreateObservationRequest {

    private Long trustedCircleMemberId;
    private String category;
    private String description;
    private boolean observerConcerned;
    private LocalDateTime observedAt;

    public CreateObservationRequest() {
    }

    public Long getTrustedCircleMemberId() {
        return trustedCircleMemberId;
    }

    public void setTrustedCircleMemberId(
            Long trustedCircleMemberId) {

        this.trustedCircleMemberId =
                trustedCircleMemberId;
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

    public void setDescription(
            String description) {

        this.description = description;
    }

    public boolean isObserverConcerned() {
        return observerConcerned;
    }

    public void setObserverConcerned(
            boolean observerConcerned) {

        this.observerConcerned =
                observerConcerned;
    }

    public LocalDateTime getObservedAt() {
        return observedAt;
    }

    public void setObservedAt(
            LocalDateTime observedAt) {

        this.observedAt = observedAt;
    }
}