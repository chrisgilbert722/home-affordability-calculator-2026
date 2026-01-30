import React from 'react';
import type { AffordabilityInput } from '../logic/affordabilityCalculations';

interface InputCardProps {
    values: AffordabilityInput;
    onChange: (field: keyof AffordabilityInput, value: number) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof AffordabilityInput, parseFloat(value) || 0);
    };

    return (
        <div className="card">
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Annual Income */}
                <div>
                    <label htmlFor="annualIncome">Annual Gross Income</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                        <input
                            id="annualIncome"
                            name="annualIncome"
                            type="number"
                            value={values.annualIncome || ''}
                            onChange={handleChange}
                            placeholder="0"
                            style={{ paddingLeft: '28px', fontSize: '1.25rem', fontWeight: 600 }}
                        />
                    </div>
                </div>

                {/* Monthly Debts & Down Payment Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="monthlyDebts">Monthly Debts</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                            <input
                                id="monthlyDebts"
                                name="monthlyDebts"
                                type="number"
                                value={values.monthlyDebts || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            Car, student loans, cards
                        </p>
                    </div>
                    <div>
                        <label htmlFor="downPayment">Down Payment</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                            <input
                                id="downPayment"
                                name="downPayment"
                                type="number"
                                value={values.downPayment || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Interest Rate & Loan Term Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <input
                            id="interestRate"
                            name="interestRate"
                            type="number"
                            step="0.125"
                            value={values.interestRate || ''}
                            onChange={handleChange}
                            placeholder="6.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="loanTerm">Loan Term</label>
                        <select
                            id="loanTerm"
                            name="loanTerm"
                            value={values.loanTerm}
                            onChange={handleChange}
                        >
                            <option value="30">30 Years</option>
                            <option value="20">20 Years</option>
                            <option value="15">15 Years</option>
                        </select>
                    </div>
                </div>

                {/* Calculate Button */}
                <button className="btn-primary" type="button">
                    Calculate
                </button>

            </div>
        </div>
    );
};
