package com.postpartumtracker.backend.controller;

import com.postpartumtracker.backend.dto.RegisterRequest;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.postpartumtracker.backend.dto.UserResponse;
import com.postpartumtracker.backend.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    public AuthController(UserService userService,
        AuthenticationManager authenticationManager
    ) 
    {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);
        UserResponse response = new UserResponse(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/login")
public ResponseEntity<String> login(
        @Valid @RequestBody LoginRequest request) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail().toLowerCase(),
            request.getPassword()
        )
    );

    return ResponseEntity.ok("Login successful");
}
}