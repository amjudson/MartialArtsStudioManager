'use client';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import Link from 'next/link';

const NavbarComponent: React.FC = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} href="/">Martial Arts Studio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={Link} href="/students">Students</Nav.Link>
                                <Nav.Link as={Link} href="/items">Items</Nav.Link>
                                <Nav.Link as={Link} href="/sales">Sales</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} href="/login">Login</Nav.Link>
                                <Nav.Link as={Link} href="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent; 