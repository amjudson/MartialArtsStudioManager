'use client';

import React from 'react';
import { Providers } from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
