package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.CreateObservationRequest;
import com.postpartumtracker.backend.entity.Observation;
import com.postpartumtracker.backend.entity.TrustedCircleMember;
import com.postpartumtracker.backend.repository.ObservationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ObservationService {

    private final ObservationRepository observationRepository;

    public ObservationService(
            ObservationRepository observationRepository) {

        this.observationRepository =
                observationRepository;
    }

    @Transactional
    public Observation createObservation(
            TrustedCircleMember member,
            CreateObservationRequest request) {

        Observation observation =
                new Observation();

        observation.setPostpartumProfile(
                member.getPostpartumProfile()
        );

        observation.setTrustedCircleMember(
                member
        );

        observation.setCategory(
                request.getCategory()
        );

        observation.setDescription(
                request.getDescription()
        );

        observation.setObserverConcerned(
                request.isObserverConcerned()
        );

        observation.setObservedAt(
                request.getObservedAt()
        );

        return observationRepository.save(
                observation
        );
    }
}