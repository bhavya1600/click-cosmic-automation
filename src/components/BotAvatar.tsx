import React from 'react';

interface BotAvatarProps {
  size?: number;
  className?: string;
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ size = 40, className = '' }) => {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          {/* Core glow */}
          <radialGradient id="novaCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>

          {/* Outer aura */}
          <radialGradient id="novaAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#9333ea" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
          </radialGradient>

          {/* Ring gradients */}
          <linearGradient id="ring1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="ring2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="ring3Grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="novaBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <filter id="novaBlurSm">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>

        {/* Breathing aura */}
        <circle cx="50" cy="50" r="48" fill="url(#novaAura)">
          <animate attributeName="r" values="44;48;44" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ── Orbit rings ── */}

        {/* Ring 1 — wide, slow */}
        <ellipse
          cx="50" cy="50" rx="36" ry="14"
          fill="none" stroke="url(#ring1Grad)" strokeWidth="0.8"
        >
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
        </ellipse>

        {/* Ring 2 — tilted, mid speed */}
        <ellipse
          cx="50" cy="50" rx="30" ry="11"
          fill="none" stroke="url(#ring2Grad)" strokeWidth="0.8"
        >
          <animateTransform attributeName="transform" type="rotate" from="60 50 50" to="420 50 50" dur="7s" repeatCount="indefinite" />
        </ellipse>

        {/* Ring 3 — tight, fast */}
        <ellipse
          cx="50" cy="50" rx="24" ry="9"
          fill="none" stroke="url(#ring3Grad)" strokeWidth="0.7"
        >
          <animateTransform attributeName="transform" type="rotate" from="120 50 50" to="-240 50 50" dur="5s" repeatCount="indefinite" />
        </ellipse>

        {/* ── Orbiting particles ── */}

        {/* Particle on ring 1 */}
        <circle r="1.8" fill="#06b6d4" opacity="0.9" filter="url(#novaBlurSm)">
          <animateMotion dur="10s" repeatCount="indefinite" path="M50,50 m-36,0 a36,14 0 1,1 72,0 a36,14 0 1,1 -72,0" />
        </circle>

        {/* Particle on ring 2 */}
        <circle r="1.4" fill="#a78bfa" opacity="0.8" filter="url(#novaBlurSm)">
          <animateMotion dur="7s" repeatCount="indefinite" path="M50,50 m-30,0 a30,11 0 1,1 60,0 a30,11 0 1,1 -60,0" />
        </circle>

        {/* Particle on ring 3 */}
        <circle r="1.2" fill="#c084fc" opacity="0.7" filter="url(#novaBlurSm)">
          <animateMotion dur="5s" repeatCount="indefinite" path="M50,50 m24,0 a24,9 0 1,1 -48,0 a24,9 0 1,1 48,0" />
        </circle>

        {/* ── Central core ── */}

        {/* Soft glow behind core */}
        <circle cx="50" cy="50" r="14" fill="url(#novaCore)" filter="url(#novaBlur)" opacity="0.7">
          <animate attributeName="r" values="12;15;12" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Bright core */}
        <circle cx="50" cy="50" r="8" fill="url(#novaCore)">
          <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Inner white hotspot */}
        <circle cx="50" cy="50" r="3" fill="white" opacity="0.9">
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};
