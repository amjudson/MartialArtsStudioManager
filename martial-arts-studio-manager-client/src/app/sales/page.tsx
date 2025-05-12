'use client';

import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { SaleList } from '../components/SaleList';
import { SaleForm } from '../components/SaleForm';
import { Sale } from '../types/Sale';

export default function SalesPage() {
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

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Sales</h1>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Add New Sale
                </Button>
            </div>

            <SaleList onEdit={handleEdit} />

            <Modal show={showForm} onHide={handleClose} size="lg">
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