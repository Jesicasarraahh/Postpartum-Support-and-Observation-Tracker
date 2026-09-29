package com.postpartumtracker.backend.dto;

import com.postpartumtracker.backend.entity.TrustedCircleMember;

import java.time.LocalDateTime;

public class TrustedCircleMemberResponse {

    private Long id;
    private String name;
    private String email;
    private String relationship;
    private LocalDateTime createdAt;

    public TrustedCircleMemberResponse(
            TrustedCircleMember member) {

        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.relationship = member.getRelationship();
        this.createdAt = member.getCreatedAt();
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
}