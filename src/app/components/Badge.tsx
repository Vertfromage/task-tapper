// components/Badge.tsx

// components/Badge.tsx

import { Badge } from './types'; // Import Badge type from types

interface BadgeProps {
    badge: Badge; // Use Badge type directly for consistency
}

export default function BadgeDisplay({ badge }: BadgeProps) { // Export as BadgeDisplay for consistency
    return (
        <div style={{
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: badge.isUnlocked ? '#FFD700' : '#ccc',
            textAlign: 'center',
            width: '120px'
        }}>
            <div style={{ fontSize: '2rem' }}>{badge.emoji}</div>
            <h3>{badge.name}</h3>
            <p style={{ fontSize: '0.8rem' }}>{badge.isUnlocked ? badge.description : "Locked"}</p>
        </div>
    );
}
