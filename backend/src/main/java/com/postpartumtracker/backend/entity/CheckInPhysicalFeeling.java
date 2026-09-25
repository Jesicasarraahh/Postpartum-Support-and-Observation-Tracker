package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "check_in_physical_feelings",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {
                "check_in_id",
                "physical_feeling_id"
            }
        )
    }
)
public class CheckInPhysicalFeeling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_in_id", nullable = false)
    private CheckIn checkIn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "physical_feeling_id", nullable = false)
    private PhysicalFeeling physicalFeeling;

    public CheckInPhysicalFeeling() {
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

    public PhysicalFeeling getPhysicalFeeling() {
        return physicalFeeling;
    }

    public void setPhysicalFeeling(
            PhysicalFeeling physicalFeeling) {
        this.physicalFeeling = physicalFeeling;
    }
}