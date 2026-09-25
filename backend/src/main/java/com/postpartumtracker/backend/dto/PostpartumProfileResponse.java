package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.PostpartumProfile;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PostpartumProfileResponse {

    private Long id;
    private Long ownerUserId;
    private LocalDate deliveryDate;
    private LocalDateTime createdAt;

    public PostpartumProfileResponse(PostpartumProfile profile) {
        this.id = profile.getId();
        this.ownerUserId = profile.getOwner().getId();
        this.deliveryDate = profile.getDeliveryDate();
        this.createdAt = profile.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public Long getOwnerUserId() {
        return ownerUserId;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}