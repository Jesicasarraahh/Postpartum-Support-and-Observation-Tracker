package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.CreateObservationRequest;
import com.postpartumtracker.backend.dto.ObservationResponse;
import com.postpartumtracker.backend.dto.TrustedAccessResponse;

import com.postpartumtracker.backend.entity.Observation;
import com.postpartumtracker.backend.entity.TrustedCircleMember;

import com.postpartumtracker.backend.service.ObservationService;
import com.postpartumtracker.backend.service.TrustedCircleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trusted-access")
public class TrustedAccessController {

    private final TrustedCircleService trustedCircleService;
    private final ObservationService observationService;

    public TrustedAccessController(
            TrustedCircleService trustedCircleService,
            ObservationService observationService) {

        this.trustedCircleService =
                trustedCircleService;

        this.observationService =
                observationService;
    }

    @GetMapping
    public ResponseEntity<TrustedAccessResponse>
    validateAccess(
            @RequestParam String token) {

        TrustedCircleMember member =
                trustedCircleService
                        .validateInviteToken(token);

        TrustedAccessResponse response =
                new TrustedAccessResponse(
                        member.getId(),
                        member.getName(),
                        member.getRelationship(),
                        member
                                .getPostpartumProfile()
                                .getId()
                );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/observations")
    public ResponseEntity<ObservationResponse>
    createObservation(
            @RequestParam String token,
            @RequestBody CreateObservationRequest request) {

        TrustedCircleMember member =
                trustedCircleService
                        .validateInviteToken(token);

        Observation observation =
                observationService
                        .createObservation(
                                member,
                                request
                        );

        return ResponseEntity.ok(
                new ObservationResponse(
                        observation
                )
        );
    }
}