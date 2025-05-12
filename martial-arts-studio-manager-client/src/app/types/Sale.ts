import { Item } from './Item';
import { Student } from './Student';

export interface Sale {
    id: string;
    itemId: string;
    item?: Item;
    studentId?: string;
    student?: Student;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    saleDate: string;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
} 