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
import com.postpartumtracker.backend.entity.TrustedCircleInviteToken;
import com.postpartumtracker.backend.repository.TrustedCircleInviteTokenRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class TrustedCircleService {

    private final TrustedCircleMemberRepository trustedCircleMemberRepository;
    private final PostpartumProfileRepository postpartumProfileRepository;
    private final UserRepository userRepository;
    private final TrustedCircleInviteTokenRepository inviteTokenRepository;
    private final EmailService emailService;

    public TrustedCircleService(
            TrustedCircleMemberRepository trustedCircleMemberRepository,
            PostpartumProfileRepository postpartumProfileRepository,
            UserRepository userRepository,
            TrustedCircleInviteTokenRepository inviteTokenRepository,
            EmailService emailService) {

        this.trustedCircleMemberRepository = trustedCircleMemberRepository;

        this.postpartumProfileRepository = postpartumProfileRepository;

        this.userRepository = userRepository;

        this.inviteTokenRepository = inviteTokenRepository;

        this.emailService = emailService;
    }

    @Transactional
    public TrustedCircleMember addMember(
            Long profileId,
            String email,
            CreateTrustedCircleMemberRequest request) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        PostpartumProfile profile = postpartumProfileRepository
                .findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Postpartum profile not found"));

        if (!profile.getOwner().getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You do not have permission to manage this trusted circle");
        }

        TrustedCircleMember member = new TrustedCircleMember();

        member.setPostpartumProfile(profile);
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setRelationship(
                request.getRelationship());

        TrustedCircleMember savedMember = trustedCircleMemberRepository.save(member);

        TrustedCircleInviteToken inviteToken = new TrustedCircleInviteToken();

        inviteToken.setTrustedCircleMember(savedMember);

        inviteToken.setToken(
                UUID.randomUUID().toString());

        inviteToken.setExpiresAt(
                LocalDateTime.now().plusDays(7));

        TrustedCircleInviteToken savedToken = inviteTokenRepository.save(inviteToken);

        emailService.sendTrustedCircleInviteEmail(
                savedMember.getEmail(),
                savedMember.getName(),
                savedToken.getToken());

        return savedMember;
    }

    public List<TrustedCircleMember> getMembers(
            Long profileId,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        PostpartumProfile profile = postpartumProfileRepository
                .findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Postpartum profile not found"));

        if (!profile.getOwner().getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You do not have permission to view this trusted circle");
        }

        return trustedCircleMemberRepository
                .findByPostpartumProfile(profile);
    }
    public TrustedCircleMember validateInviteToken(
        String tokenValue) {

    TrustedCircleInviteToken inviteToken =
            inviteTokenRepository
                    .findByToken(tokenValue)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Invalid trusted-circle access link"
                            )
                    );

    if (inviteToken
            .getExpiresAt()
            .isBefore(LocalDateTime.now())) {

        throw new IllegalArgumentException(
                "Trusted-circle access link has expired"
        );
    }

    return inviteToken
            .getTrustedCircleMember();
}
@Transactional
public void revokeMemberAccess(
    Long profileId,
    Long memberId,
    String email
) {

    User user =
        userRepository
            .findByEmail(email)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "User not found."
                )
            );

    PostpartumProfile profile =
        postpartumProfileRepository
            .findById(profileId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Postpartum profile not found."
                )
            );

    if (
        !profile.getOwner()
            .getId()
            .equals(user.getId())
    ) {

        throw new IllegalArgumentException(
            "You do not own this postpartum profile."
        );
    }

    TrustedCircleMember member =
        trustedCircleMemberRepository
            .findById(memberId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Trusted circle member not found."
                )
            );

    if (
        !member.getPostpartumProfile()
            .getId()
            .equals(profileId)
    ) {

        throw new IllegalArgumentException(
            "This trusted-circle member does not belong to this profile."
        );
    }

    member.setActive(false);

    trustedCircleMemberRepository.save(member);
}
}