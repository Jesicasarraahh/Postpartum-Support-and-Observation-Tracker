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
import com.postpartumtracker.backend.dto.LoginResponse;
import com.postpartumtracker.backend.service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(UserService userService,
        AuthenticationManager authenticationManager,
        JwtService jwtService
    ) 
    {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);
        UserResponse response = new UserResponse(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/login")
public ResponseEntity<LoginResponse> login(
        @Valid @RequestBody LoginRequest request) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail().toLowerCase(),
            request.getPassword()
        )
    );

    String token = jwtService.generateToken(
            request.getEmail().toLowerCase()
    );

    return ResponseEntity.ok(new LoginResponse(token));
}
   

}