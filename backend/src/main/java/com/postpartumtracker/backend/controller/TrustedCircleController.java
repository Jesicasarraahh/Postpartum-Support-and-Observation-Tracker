package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.CreateTrustedCircleMemberRequest;
import com.postpartumtracker.backend.dto.TrustedCircleMemberResponse;
import com.postpartumtracker.backend.entity.TrustedCircleMember;
import com.postpartumtracker.backend.service.TrustedCircleService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postpartum-profiles/{profileId}/trusted-circle")
public class TrustedCircleController {

        private final TrustedCircleService trustedCircleService;

        public TrustedCircleController(
                        TrustedCircleService trustedCircleService) {

                this.trustedCircleService = trustedCircleService;
        }

        @PostMapping
        public ResponseEntity<TrustedCircleMemberResponse> addMember(
                        @PathVariable Long profileId,
                        @RequestBody CreateTrustedCircleMemberRequest request,
                        Authentication authentication) {

                TrustedCircleMember member = trustedCircleService.addMember(
                                profileId,
                                authentication.getName(),
                                request);

                return ResponseEntity.ok(
                                new TrustedCircleMemberResponse(member));
        }

        @GetMapping
        public ResponseEntity<List<TrustedCircleMemberResponse>> getMembers(
                        @PathVariable Long profileId,
                        Authentication authentication) {

                List<TrustedCircleMemberResponse> members = trustedCircleService
                                .getMembers(
                                                profileId,
                                                authentication.getName())
                                .stream()
                                .map(TrustedCircleMemberResponse::new)
                                .toList();

                return ResponseEntity.ok(members);
        }

        @DeleteMapping("/{memberId}")
        public ResponseEntity<Void> revokeMemberAccess(
                        @PathVariable Long profileId,
                        @PathVariable Long memberId,
                        Authentication authentication) {

                String email = authentication.getName();

                trustedCircleService
                                .revokeMemberAccess(
                                                profileId,
                                                memberId,
                                                email);

                return ResponseEntity.noContent().build();
        }
}