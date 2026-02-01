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
            <nav style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                <a href="https://scenariocalculators.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Privacy Policy</a>
                <span style={{ color: '#64748B' }}>|</span>
                <a href="https://scenariocalculators.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Terms of Service</a>
            </nav>
            <p style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem' }}>
                &copy; 2026 Home Affordability Calculator. All rights reserved.
            </p>
        </footer>
    );
};
