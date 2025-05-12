'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import { useGetStudentsQuery, useDeleteStudentMutation } from '../store/api/studentsApi';
import { Student } from '../types/Student';
import { StudentForm } from './StudentForm';

export default function StudentList() {
    const { data: students, isLoading, error } = useGetStudentsQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

    const handleClose = () => {
        setShowForm(false);
        setSelectedStudent(undefined);
    };

    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
        setShowForm(true);
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                Error loading students. Please try again later.
            </Alert>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Students</h1>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Add New Student
                </Button>
            </div>

            <Row>
                {students?.map((student) => (
                    <Col key={student.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{student.firstName} {student.lastName}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {student.email}<br />
                                    <strong>Phone:</strong> {student.phoneNumber}<br />
                                    <strong>Belt Rank:</strong> {student.beltRank}
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    className="me-2"
                                    onClick={() => handleEdit(student)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => deleteStudent(student.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showForm} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedStudent ? 'Edit Student' : 'Add New Student'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentForm
                        student={selectedStudent}
                        onSuccess={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
} 