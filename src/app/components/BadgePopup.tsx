// components/BadgePopup.tsx

import { useEffect } from "react";
import { Badge } from "./types";

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
    <div className="fixed top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/5 bg-background p-6 rounded-lg shadow-lg text-center z-50">
      <h2 className="text-2xl font-semibold text-primary mb-2">
        🎉 New Badge Unlocked!
      </h2>
      <p className="text-xl font-medium text-text mb-1">
        {badge.emoji} {badge.name}
      </p>
      <p className="text-text-muted mb-4">{badge.description}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark cursor-pointer"
      >
        Close
      </button>
    </div>
  );
}
