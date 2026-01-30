import React from 'react';
import type { AffordabilityResult } from '../logic/affordabilityCalculations';

interface BreakdownTableProps {
    result: AffordabilityResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const rows = [
        { label: 'Principal & Interest', amount: result.monthlyPrincipalInterest, isTotal: false },
        { label: 'Property Taxes', amount: result.monthlyTaxes, isTotal: false },
        { label: 'Home Insurance', amount: result.monthlyInsurance, isTotal: false },
        { label: 'Total Monthly Payment', amount: result.maxMonthlyPayment, isTotal: true },
    ];

    return (
        <div className="card" style={{ padding: '0' }}>
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Monthly Payment Breakdown</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx} style={{
                            borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--color-border)',
                            backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                        }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                                {row.label}
                            </td>
                            <td style={{
                                padding: 'var(--space-3) var(--space-6)',
                                textAlign: 'right',
                                fontWeight: row.isTotal ? 700 : 400,
                                color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                            }}>
                                {formatMoney(row.amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
