package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.CreatePostpartumProfileRequest;
import com.postpartumtracker.backend.dto.PostpartumProfileResponse;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.service.PostpartumProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.postpartumtracker.backend.dto.CheckInResponse;
import com.postpartumtracker.backend.dto.CreateCheckInRequest;
import com.postpartumtracker.backend.entity.CheckIn;
import com.postpartumtracker.backend.service.CheckInService;

@RestController
@RequestMapping("/api/postpartum-profiles")
public class PostpartumProfileController {

    private final PostpartumProfileService postpartumProfileService;
    private final CheckInService checkInService;

    public PostpartumProfileController(
            PostpartumProfileService postpartumProfileService,
            CheckInService checkInService) {

        this.postpartumProfileService = postpartumProfileService;
        this.checkInService = checkInService;
    }

    @PostMapping
    public ResponseEntity<PostpartumProfileResponse> createProfile(
            @Valid @RequestBody CreatePostpartumProfileRequest request,
            Authentication authentication) {

        PostpartumProfile profile =
                postpartumProfileService.createProfile(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new PostpartumProfileResponse(profile));
    }
    @GetMapping
public ResponseEntity<List<PostpartumProfileResponse>> getMyProfiles(
        Authentication authentication) {

    List<PostpartumProfileResponse> profiles =
            postpartumProfileService
                    .getProfilesForUser(authentication.getName())
                    .stream()
                    .map(PostpartumProfileResponse::new)
                    .toList();

    return ResponseEntity.ok(profiles);
}
@PostMapping("/{profileId}/check-ins")
public ResponseEntity<CheckInResponse> createCheckIn(
        @PathVariable Long profileId,
        @Valid @RequestBody CreateCheckInRequest request,
        Authentication authentication) {

    CheckIn checkIn = checkInService.createCheckIn(
            profileId,
            authentication.getName(),
            request
    );

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new CheckInResponse(checkIn));
}
@GetMapping("/{profileId}/check-ins")
public ResponseEntity<List<CheckInResponse>> getCheckIns(
        @PathVariable Long profileId,
        Authentication authentication) {

    List<CheckInResponse> checkIns =
            checkInService
                    .getCheckIns(
                            profileId,
                            authentication.getName()
                    )
                    .stream()
                    .map(CheckInResponse::new)
                    .toList();

    return ResponseEntity.ok(checkIns);
}
}