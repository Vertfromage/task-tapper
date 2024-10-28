// app/badges/page.tsx

"use client";

import { badgeData } from '../components/Badges'; // Import the default badge data
import BadgeDisplay from '../components/Badge'; // Rename the Badge component to BadgeDisplay
import { Badge } from '../components/types'; // Import the Badge type

export default function BadgesPage() {
    // Access `localStorage` directly as we're now running only on the client
    const badges: Badge[] = JSON.parse(localStorage.getItem("badges") || "null") || badgeData;

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


