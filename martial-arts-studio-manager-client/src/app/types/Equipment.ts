export interface Equipment {
    id: string;
    name: string;
    description: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
    lastMaintenanceDate?: string;
    condition: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt?: string;
} 