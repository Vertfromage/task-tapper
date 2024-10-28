// components/BadgePopup.tsx

import { useEffect } from 'react';
import { Badge } from './types';

interface BadgePopupProps {
    badge: Badge;
    onClose: () => void;
}

export default function BadgePopup({ badge, onClose }: BadgePopupProps) {
    // Auto-close popup after a few seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed', 
            top: '20%', 
            left: '50%', 
            transform: 'translate(-50%, -20%)', 
            backgroundColor: '#fff', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            zIndex: 1000
        }}>
            <h2>🎉 New Badge Unlocked!</h2>
            <p>{badge.emoji} {badge.name}</p>
            <p>{badge.description}</p>
            <button onClick={onClose} style={{
                marginTop: '1rem', 
                padding: '0.5rem 1rem', 
                border: 'none', 
                borderRadius: '4px', 
                backgroundColor: '#0070f3', 
                color: '#fff', 
                cursor: 'pointer'
            }}>
                Close
            </button>
        </div>
    );
}
