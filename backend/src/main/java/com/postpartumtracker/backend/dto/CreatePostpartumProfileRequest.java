package com.postpartumtracker.backend.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CreatePostpartumProfileRequest {

    @NotNull
    private LocalDate deliveryDate;

    public CreatePostpartumProfileRequest() {
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}