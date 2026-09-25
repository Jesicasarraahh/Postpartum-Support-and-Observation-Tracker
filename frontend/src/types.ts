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