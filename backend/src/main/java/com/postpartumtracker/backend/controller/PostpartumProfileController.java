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

@RestController
@RequestMapping("/api/postpartum-profiles")
public class PostpartumProfileController {

    private final PostpartumProfileService postpartumProfileService;

    public PostpartumProfileController(
            PostpartumProfileService postpartumProfileService) {

        this.postpartumProfileService = postpartumProfileService;
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
}