package com.postpartumtracker.backend.dto;

public class TrustedAccessResponse {

    private Long trustedCircleMemberId;
    private String name;
    private String relationship;
    private Long postpartumProfileId;

    public TrustedAccessResponse(
            Long trustedCircleMemberId,
            String name,
            String relationship,
            Long postpartumProfileId) {

        this.trustedCircleMemberId =
                trustedCircleMemberId;

        this.name = name;

        this.relationship = relationship;

        this.postpartumProfileId =
                postpartumProfileId;
    }

    public Long getTrustedCircleMemberId() {
        return trustedCircleMemberId;
    }

    public String getName() {
        return name;
    }

    public String getRelationship() {
        return relationship;
    }

    public Long getPostpartumProfileId() {
        return postpartumProfileId;
    }
}