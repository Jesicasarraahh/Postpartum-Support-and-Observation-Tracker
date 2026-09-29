package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.TimelineItemResponse;
import com.postpartumtracker.backend.service.TimelineService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/postpartum-profiles/{profileId}/timeline"
)
public class TimelineController {

    private final TimelineService timelineService;

    public TimelineController(
            TimelineService timelineService) {

        this.timelineService =
                timelineService;
    }

    @GetMapping
    public ResponseEntity<List<TimelineItemResponse>>
    getTimeline(
            @PathVariable Long profileId,
            Authentication authentication) {

        List<TimelineItemResponse> timeline =
                timelineService.getTimeline(
                        profileId,
                        authentication.getName()
                );

        return ResponseEntity.ok(
                timeline
        );
    }
}