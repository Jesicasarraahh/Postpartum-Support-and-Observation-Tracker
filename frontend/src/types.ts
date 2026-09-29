export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    createdAt: string;
};

export type PostpartumProfile = {
    id: number;
    ownerUserId: number;
    deliveryDate: string;
    createdAt: string;
};
export type CheckIn = {
    id: number;
    sleepHours: number | null;
    medicationStatus: string;
    notes: string | null;
    createdAt: string;
    moods: string[];
    physicalFeelings: string[];
};
export type TrustedCircleMember = {
    id: number;
    name: string;
    email: string;
    relationship: string;
    createdAt: string;
};
export type TimelineItem = {
    type: "MOTHER_CHECK_IN" | "TRUSTED_OBSERVATION";

    timestamp: string;

    sourceName: string | null;
    relationship: string | null;

    sleepHours: number | null;
    medicationStatus: string | null;

    moods: string[] | null;
    physicalFeelings: string[] | null;

    notes: string | null;

    category: string | null;
    description: string | null;

    observerConcerned: boolean | null;
};