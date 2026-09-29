package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.TrustedAccessResponse;
import com.postpartumtracker.backend.entity.TrustedCircleMember;
import com.postpartumtracker.backend.service.TrustedCircleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trusted-access")
public class TrustedAccessController {

    private final TrustedCircleService trustedCircleService;

    public TrustedAccessController(
            TrustedCircleService trustedCircleService) {

        this.trustedCircleService =
                trustedCircleService;
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
}