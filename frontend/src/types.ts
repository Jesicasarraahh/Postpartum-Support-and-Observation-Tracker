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