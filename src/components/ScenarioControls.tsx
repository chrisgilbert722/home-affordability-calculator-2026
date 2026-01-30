import React, { useState } from 'react';
import type { AffordabilityInput } from '../logic/affordabilityCalculations';

interface ScenarioControlsProps {
    values: AffordabilityInput;
    onChange: (field: keyof AffordabilityInput, value: number) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowAdvanced(e.target.checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof AffordabilityInput, parseFloat(value) || 0);
    };

    return (
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Advanced Options</h3>

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={showAdvanced}
                        onChange={handleToggle}
                        style={{ width: 'auto' }}
                    />
                    Customize DTI & rates
                </label>

                {/* Conditional Inputs */}
                {showAdvanced && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                        <div>
                            <label htmlFor="dtiLimit">DTI Limit (%)</label>
                            <select
                                id="dtiLimit"
                                name="dtiLimit"
                                value={values.dtiLimit}
                                onChange={handleChange}
                            >
                                <option value="28">28% (Conservative)</option>
                                <option value="32">32% (Moderate)</option>
                                <option value="36">36% (Aggressive)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="propertyTaxRate">Property Tax (%)</label>
                            <input
                                id="propertyTaxRate"
                                name="propertyTaxRate"
                                type="number"
                                step="0.1"
                                value={values.propertyTaxRate || ''}
                                onChange={handleChange}
                                placeholder="1.2"
                            />
                        </div>
                        <div>
                            <label htmlFor="insuranceRate">Insurance (%)</label>
                            <input
                                id="insuranceRate"
                                name="insuranceRate"
                                type="number"
                                step="0.1"
                                value={values.insuranceRate || ''}
                                onChange={handleChange}
                                placeholder="0.5"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
