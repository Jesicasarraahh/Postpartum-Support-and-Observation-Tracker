package com.postpartumtracker.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "physical_feelings")
public class PhysicalFeeling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    public PhysicalFeeling() {
    }

    public PhysicalFeeling(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}