import React from 'react';
import {POLICE} from '../theme';

// Miniature « héros » (1280x720) : la voiture de police sort de l'écran cathodique et percute
// la voiture rouge. Le visuel domine, le texte tient dans le tiers gauche. Formes originales.
const ROSE = '#ff2d95';
const JAUNE = '#ffd400';

const Auto: React.FC<{x: number; y: number; rot: number; s: number; police?: boolean}> = ({x, y, rot, s, police = false}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={58} ry={32} fill="#000" opacity={0.45} filter="url(#flouDoux)" />
    {/* Phares */}
    <path d="M 48 -18 L 150 -52 L 150 4 Z" fill="#fff6b0" opacity={0.22} />
    <path d="M 48 18 L 150 -4 L 150 52 Z" fill="#fff6b0" opacity={0.22} />
    <rect x={-52} y={-26} width={104} height={52} rx={15} fill={police ? '#f3f6ff' : 'url(#rouge)'} />
    {police && <rect x={-20} y={-26} width={42} height={52} fill="#141a33" />}
    <rect x={-52} y={-26} width={104} height={52} rx={15} fill="none" stroke="#000" strokeOpacity={0.35} strokeWidth={2} />
    <path d="M 12 -20 L 26 -16 L 26 16 L 12 20 Z" fill="#7fd0ff" opacity={0.9} />
    <path d="M -24 -19 L -32 -15 L -32 15 L -24 19 Z" fill="#4a86b8" opacity={0.9} />
    <rect x={-22} y={-20} width={32} height={40} rx={7} fill={police ? '#e3e8f7' : '#c2202c'} />
    <rect x={44} y={-22} width={8} height={11} rx={3} fill="#fff6b0" />
    <rect x={44} y={11} width={8} height={11} rx={3} fill="#fff6b0" />
    <rect x={-53} y={-21} width={5} height={10} rx={2} fill="#ff3b3b" />
    <rect x={-53} y={11} width={5} height={10} rx={2} fill="#ff3b3b" />
    {police && (
      <>
        <circle cx={-6} cy={-14} r={15} fill="#ff2b2b" opacity={0.6} filter="url(#flouDoux)" />
        <circle cx={-6} cy={14} r={15} fill="#2b6bff" opacity={0.7} filter="url(#flouDoux)" />
        <rect x={-11} y={-17} width={10} height={16} rx={2} fill="#ff4040" />
        <rect x={-11} y={1} width={10} height={16} rx={2} fill="#3f7bff" />
      </>
    )}
  </g>
);

export const MiniatureHero: React.FC<{badge?: string}> = ({badge = 'NEARLY 480M COPIES'}) => (
  <svg viewBox="0 0 1280 720" width="100%" height="100%">
    <defs>
      <radialGradient id="piece" cx="68%" cy="48%" r="70%">
        <stop offset="0" stopColor="#23679f" />
        <stop offset="0.5" stopColor="#0d2038" />
        <stop offset="1" stopColor="#030308" />
      </radialGradient>
      <radialGradient id="ecran" cx="50%" cy="50%" r="70%">
        <stop offset="0" stopColor="#2a6da6" />
        <stop offset="1" stopColor="#0a1a30" />
      </radialGradient>
      <linearGradient id="coque" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6a6878" />
        <stop offset="0.12" stopColor="#33323d" />
        <stop offset="1" stopColor="#101017" />
      </linearGradient>
      <linearGradient id="rouge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff5a4d" />
        <stop offset="1" stopColor="#d81e2c" />
      </linearGradient>
      <radialGradient id="vignette" cx="60%" cy="48%" r="80%">
        <stop offset="0.6" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.8" />
      </radialGradient>
      <filter id="flouDoux" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
      <filter id="flouEcran"><feGaussianBlur stdDeviation="1.6" /></filter>
      <filter id="halo" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="40" /></filter>
      <filter id="ombre" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.6" /></filter>
      <pattern id="lignes" width="4" height="6" patternUnits="userSpaceOnUse"><rect width="4" height="2.5" fill="#000" opacity="0.3" /></pattern>
      <clipPath id="vitre"><rect x={610} y={110} width={600} height={430} rx={44} /></clipPath>
    </defs>

    <rect width={1280} height={720} fill="url(#piece)" />

    <g transform="rotate(3 910 340)">
      <rect x={590} y={90} width={640} height={470} rx={60} fill="#3fa9ff" opacity={0.6} filter="url(#halo)" />
      <rect x={560} y={64} width={700} height={560} rx={44} fill="url(#coque)" />
      <rect x={610} y={110} width={600} height={430} rx={44} fill="url(#ecran)" />
      <g clipPath="url(#vitre)">
        <g filter="url(#flouEcran)" shapeRendering="crispEdges">
          {[0, 1, 2, 3].map((i) => [0, 1, 2].map((j) => (
            <rect key={`${i}${j}`} x={632 + i * 150} y={128 + j * 146} width={104} height={98} fill="#2f70b0" opacity={0.8} />
          )))}
          {Array.from({length: 11}).map((_, i) => <rect key={i} x={620 + i * 56} y={246} width={28} height={8} fill="#b9d8f5" opacity={0.7} />)}
          {Array.from({length: 11}).map((_, i) => <rect key={i} x={620 + i * 56} y={392} width={28} height={8} fill="#b9d8f5" opacity={0.7} />)}
          <rect x={610} y={300} width={300} height={12} fill={ROSE} opacity={0.85} />
          <rect x={860} y={470} width={350} height={10} fill="#39e6ff" opacity={0.85} />
        </g>
        <rect x={610} y={110} width={600} height={430} fill="url(#lignes)" />
      </g>
      <rect x={610} y={110} width={600} height={430} rx={44} fill="none" stroke="#000" strokeWidth={8} opacity={0.6} />
      <circle cx={1200} cy={590} r={7} fill="#4dff88" />
    </g>

    {/* Le héros : la collision qui déborde de l'écran */}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={560 + i * 26} y={470 + i * 34} width={170 - i * 18} height={9} rx={4} fill="#fff" opacity={0.35} transform={`rotate(-24 ${640} ${520})`} />
    ))}
    <Auto x={1085} y={235} rot={-58} s={3.1} />
    <g transform="translate(985 330)">
      <circle r={86} fill="#fff3a0" opacity={0.55} filter="url(#flouDoux)" />
      {Array.from({length: 12}).map((_, i) => (
        <rect key={i} x={-9} y={-150 - (i % 2) * 34} width={18} height={70 + (i % 2) * 30} rx={9} fill={i % 3 ? JAUNE : '#fff'} transform={`rotate(${i * 30 + 8})`} />
      ))}
      <path d="M 0 -62 L 18 -20 L 60 -26 L 30 6 L 52 46 L 8 30 L -22 64 L -24 20 L -66 6 L -28 -14 Z" fill="#fff" />
    </g>
    <Auto x={800} y={455} rot={-24} s={4} police />

    <rect width={1280} height={720} fill="url(#vignette)" />

    {/* Texte, tiers gauche */}
    <g transform="rotate(-3 300 230)" filter="url(#ombre)">
      <rect x={36} y={56} width={520} height={348} rx={18} fill={ROSE} />
      <text x={296} y={166} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={124} fill="#fff">THE BUG</text>
      <text x={296} y={252} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={70} fill="#fff">THAT STARTED</text>
      <text x={296} y={368} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={124} fill="#fff">IT ALL</text>
    </g>
    <g transform="rotate(2 250 500)" filter="url(#ombre)">
      <rect x={44} y={456} width={badge.length * 23 + 50} height={76} rx={14} fill={JAUNE} />
      <text x={69} y={509} fontFamily={POLICE} fontWeight={700} fontSize={40} fill="#0b0f22">{badge}</text>
    </g>
  </svg>
);
