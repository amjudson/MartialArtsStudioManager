import { BeltRank } from './BeltRank';

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    joinDate: string;
    beltRankId: number;
    beltRank?: BeltRank;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
} 