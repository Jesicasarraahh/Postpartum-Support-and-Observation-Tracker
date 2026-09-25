package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.CreatePostpartumProfileRequest;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostpartumProfileService {

    private final PostpartumProfileRepository postpartumProfileRepository;
    private final UserRepository userRepository;

    public PostpartumProfileService(
            PostpartumProfileRepository postpartumProfileRepository,
            UserRepository userRepository) {

        this.postpartumProfileRepository = postpartumProfileRepository;
        this.userRepository = userRepository;
    }

    public PostpartumProfile createProfile(
            String email,
            CreatePostpartumProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found")
                );

        PostpartumProfile profile = new PostpartumProfile();

        profile.setOwner(user);
        profile.setDeliveryDate(request.getDeliveryDate());

        return postpartumProfileRepository.save(profile);
    }
    public List<PostpartumProfile> getProfilesForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found")
                );
        return postpartumProfileRepository.findByOwner(user);
    }
}