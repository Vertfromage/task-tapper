// app/badges/page.tsx

"use client";

import { badgeData } from '../components/Badges'; // Import the default badge data
import BadgeDisplay from '../components/Badge'; // Rename the Badge component to BadgeDisplay
import { Badge } from '../components/types'; // Import the Badge type
import { useEffect, useState } from 'react';

export default function BadgesPage() {
    const [badges, setBadges] = useState<Badge[]>(badgeData); // Set initial state to default data

    useEffect(() => {
        // Ensure `localStorage` access only occurs on the client
        const savedBadges = JSON.parse(localStorage.getItem("badges") || "null") || badgeData;
        setBadges(savedBadges);
    }, []); // Empty dependency array to run only once on mount

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Your Badges</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {badges.map((badge: Badge) => (
                    <BadgeDisplay key={badge.id} badge={badge} />
                ))}
            </div>
        </div>
    );
}


