package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "check_in_moods",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"check_in_id", "mood_id"}
        )
    }
)
public class CheckInMood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_in_id", nullable = false)
    private CheckIn checkIn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mood_id", nullable = false)
    private Mood mood;

    public CheckInMood() {
    }

    public Long getId() {
        return id;
    }

    public CheckIn getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(CheckIn checkIn) {
        this.checkIn = checkIn;
    }

    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }
}