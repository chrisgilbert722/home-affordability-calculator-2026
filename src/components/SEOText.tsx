import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            <p>
                This home affordability calculator estimates how much house you can afford based on income,
                debts, down payment, and current interest rates. Results are estimates only and not financial
                advice. Actual affordability depends on lender requirements, credit score, and other factors.
            </p>
        </div>
    );
};
