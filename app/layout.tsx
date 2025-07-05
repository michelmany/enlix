import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
    title: 'Enlix - Beautiful Pages Made Simple',
    description: 'Create stunning personal and business pages with our easy-to-use templates.',
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
