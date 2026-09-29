package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "observations")
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "postpartum_profile_id",
            nullable = false
    )
    private PostpartumProfile postpartumProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "trusted_circle_member_id",
            nullable = false
    )
    private TrustedCircleMember trustedCircleMember;

    @Column(nullable = false)
    private String category;

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(nullable = false)
    private boolean observerConcerned;

    @Column(nullable = false)
    private LocalDateTime observedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Observation() {
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

    public TrustedCircleMember getTrustedCircleMember() {
        return trustedCircleMember;
    }

    public void setTrustedCircleMember(
            TrustedCircleMember trustedCircleMember) {

        this.trustedCircleMember =
                trustedCircleMember;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}