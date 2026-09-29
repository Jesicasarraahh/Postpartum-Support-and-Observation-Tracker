package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "trusted_circle_invite_tokens")
public class TrustedCircleInviteToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "trusted_circle_member_id",
            nullable = false,
            unique = true
    )
    private TrustedCircleMember trustedCircleMember;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    public TrustedCircleInviteToken() {
    }

    public Long getId() {
        return id;
    }

    public TrustedCircleMember getTrustedCircleMember() {
        return trustedCircleMember;
    }

    public void setTrustedCircleMember(
            TrustedCircleMember trustedCircleMember) {

        this.trustedCircleMember =
                trustedCircleMember;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(
            LocalDateTime expiresAt) {

        this.expiresAt = expiresAt;
    }
}