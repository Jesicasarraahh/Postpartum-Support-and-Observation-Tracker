package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.RegisterRequest;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.postpartumtracker.backend.dto.UserResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);
        UserResponse response = new UserResponse(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}