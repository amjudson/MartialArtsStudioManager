'use client';

import { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import EquipmentList from '../../components/EquipmentList';
import EquipmentForm from '../../components/EquipmentForm';
import { Equipment } from '../../types/Equipment';

export default function EquipmentPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | undefined>();

    const handleClose = () => {
        setShowForm(false);
        setSelectedEquipment(undefined);
    };

    const handleEdit = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setShowForm(true);
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Equipment Management</h1>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Add New Equipment
                </Button>
            </div>

            <EquipmentList onEdit={handleEdit} />

            <Modal show={showForm} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedEquipment ? 'Edit Equipment' : 'Add New Equipment'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EquipmentForm 
                        equipment={selectedEquipment} 
                        onSuccess={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
} 