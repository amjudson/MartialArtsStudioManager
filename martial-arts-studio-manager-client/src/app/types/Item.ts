export interface Item {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stockQuantity: number;
    sku: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
} 