package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.UserResponse;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.UserRepository;
import com.postpartumtracker.backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(
            UserRepository userRepository,
            UserService userService) {

        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found")
                );

        return ResponseEntity.ok(
                new UserResponse(user)
        );
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        userService.deleteAccount(email);

        return ResponseEntity
                .noContent()
                .build();
    }
}