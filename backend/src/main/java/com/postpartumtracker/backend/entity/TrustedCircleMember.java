package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "trusted_circle_members")
public class TrustedCircleMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "postpartum_profile_id",
            nullable = false
    )
    private PostpartumProfile postpartumProfile;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String relationship;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public TrustedCircleMember() {
    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public PostpartumProfile getPostpartumProfile() {
        return postpartumProfile;
    }

    public void setPostpartumProfile(
            PostpartumProfile postpartumProfile) {

        this.postpartumProfile = postpartumProfile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}