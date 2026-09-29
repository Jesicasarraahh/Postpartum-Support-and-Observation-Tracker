package com.postpartumtracker.backend.service;

import com.postpartumtracker.backend.dto.CreateTrustedCircleMemberRequest;
import com.postpartumtracker.backend.entity.PostpartumProfile;
import com.postpartumtracker.backend.entity.TrustedCircleMember;
import com.postpartumtracker.backend.entity.User;
import com.postpartumtracker.backend.repository.PostpartumProfileRepository;
import com.postpartumtracker.backend.repository.TrustedCircleMemberRepository;
import com.postpartumtracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TrustedCircleService {

    private final TrustedCircleMemberRepository trustedCircleMemberRepository;
    private final PostpartumProfileRepository postpartumProfileRepository;
    private final UserRepository userRepository;

    public TrustedCircleService(
            TrustedCircleMemberRepository trustedCircleMemberRepository,
            PostpartumProfileRepository postpartumProfileRepository,
            UserRepository userRepository) {

        this.trustedCircleMemberRepository =
                trustedCircleMemberRepository;

        this.postpartumProfileRepository =
                postpartumProfileRepository;

        this.userRepository =
                userRepository;
    }

    @Transactional
    public TrustedCircleMember addMember(
            Long profileId,
            String email,
            CreateTrustedCircleMemberRequest request) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        )
                );

        PostpartumProfile profile =
                postpartumProfileRepository
                        .findById(profileId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Postpartum profile not found"
                                )
                        );

        if (!profile.getOwner().getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You do not have permission to manage this trusted circle"
            );
        }

        TrustedCircleMember member =
                new TrustedCircleMember();

        member.setPostpartumProfile(profile);
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setRelationship(
                request.getRelationship()
        );

        return trustedCircleMemberRepository.save(member);
    }

    public List<TrustedCircleMember> getMembers(
            Long profileId,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        )
                );

        PostpartumProfile profile =
                postpartumProfileRepository
                        .findById(profileId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Postpartum profile not found"
                                )
                        );

        if (!profile.getOwner().getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You do not have permission to view this trusted circle"
            );
        }

        return trustedCircleMemberRepository
                .findByPostpartumProfile(profile);
    }
}