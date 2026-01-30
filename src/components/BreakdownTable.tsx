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
    const paymentRows = [
        { label: 'Estimated Principal & Interest', value: formatMoney(result.monthlyPrincipalInterest), isTotal: false },
        { label: 'Estimated Monthly Property Taxes', value: formatMoney(result.monthlyTaxes), isTotal: false },
        { label: 'Estimated Monthly Insurance', value: formatMoney(result.monthlyInsurance), isTotal: false },
        ...(result.monthlyPMI > 0 ? [{ label: 'Estimated PMI', value: formatMoney(result.monthlyPMI), isTotal: false }] : []),
        { label: 'Total Monthly Payment', value: formatMoney(result.maxMonthlyPayment), isTotal: true },
    ];

    const dtiRows = [
        { label: 'Front-End DTI (Housing)', value: `${result.frontEndDTI.toFixed(1)}%`, isTotal: false },
        { label: 'Back-End DTI (All Debts)', value: `${result.backEndDTI.toFixed(1)}%`, isTotal: false },
    ];

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Payment Breakdown Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Monthly Payment Breakdown</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {paymentRows.map((row, idx) => (
                        <tr key={idx} style={{
                            borderBottom: '1px solid var(--color-border)',
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
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* DTI Ratios Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem' }}>Debt-to-Income Ratios</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {dtiRows.map((row, idx) => (
                        <tr key={idx} style={{
                            borderBottom: idx === dtiRows.length - 1 ? 'none' : '1px solid var(--color-border)',
                            backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                        }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                                {row.label}
                            </td>
                            <td style={{
                                padding: 'var(--space-3) var(--space-6)',
                                textAlign: 'right',
                                fontWeight: 500,
                                color: 'var(--color-text-primary)'
                            }}>
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
