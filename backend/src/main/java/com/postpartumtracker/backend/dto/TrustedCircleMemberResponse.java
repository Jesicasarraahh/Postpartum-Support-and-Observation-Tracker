package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.TrustedCircleMember;

import java.time.LocalDateTime;

public class TrustedCircleMemberResponse {

    private Long id;
    private String name;
    private String email;
    private String relationship;
    private LocalDateTime createdAt;
    private boolean active;

    public TrustedCircleMemberResponse(
            TrustedCircleMember member) {

        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.relationship = member.getRelationship();
        this.createdAt = member.getCreatedAt();
        this.active = member.isActive();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRelationship() {
        return relationship;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}