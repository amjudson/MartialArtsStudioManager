'use client';

import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { SaleList } from '../components/SaleList';
import { SaleForm } from '../components/SaleForm';
import { Sale } from '../types/Sale';

export default function SalesPage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [showForm, setShowForm] = useState(false);
    const [selectedSale, setSelectedSale] = useState<Sale | undefined>();

    const handleClose = () => {
        setShowForm(false);
        setSelectedSale(undefined);
    };

    const handleEdit = (sale: Sale) => {
        setSelectedSale(sale);
        setShowForm(true);
    };

    if (!isAuthenticated) {
        return null; // Middleware will handle redirect
    }

    return (
        <Container className="py-4">
            <SaleList onEdit={handleEdit} />
            
            <Modal show={showForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedSale ? 'Edit Sale' : 'Add New Sale'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SaleForm
                        sale={selectedSale}
                        onSuccess={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
} 