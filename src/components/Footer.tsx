import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: 'var(--space-8) var(--space-4)',
            color: 'var(--color-text-muted)',
            borderTop: '1px solid var(--color-border)',
            marginTop: 'var(--space-8)'
        }}>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 'var(--space-4)',
                fontSize: '0.875rem'
            }}>
                <li>Estimates only - not financial advice</li>
                <li>Updated for 2026</li>
                <li>No account required</li>
                <li>Free to use</li>
            </ul>
            <p style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem' }}>
                &copy; 2026 Home Affordability Calculator. All rights reserved.
            </p>
        </footer>
    );
};
