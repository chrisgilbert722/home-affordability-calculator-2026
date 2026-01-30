import React from 'react';

interface AdContainerProps {
    slotId?: string;
    sticky?: boolean;
}

export const AdContainer: React.FC<AdContainerProps> = ({ slotId: _slotId, sticky = false }) => {
    const style: React.CSSProperties = sticky ? {
        position: 'sticky',
        bottom: '0',
        zIndex: 100,
        background: '#f1f5f9',
        padding: 'var(--space-4)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px'
    } : {
        background: '#f1f5f9',
        minHeight: '250px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'var(--space-6) 0',
        borderRadius: 'var(--radius-md)'
    };

    return (
        <div style={style} className="ad-container">
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
                AD SPACE ({sticky ? 'STICKY FOOTER' : 'NATIVE'})
            </span>
        </div>
    );
};
