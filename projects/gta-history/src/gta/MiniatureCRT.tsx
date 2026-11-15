import React from 'react';
import {POLICE} from '../theme';

// Miniature « écran cathodique » (1280x720) : pièce sombre, écran flou et pixellisé,
// mains sur un clavier. Formes originales, aucune image du jeu.
const ROSE = '#ff2d95';
const JAUNE = '#ffd400';
const P = 14; // taille d'un « pixel » de l'écran

// Dessine un sprite en gros pixels à partir de lignes de caractères.
const Sprite: React.FC<{x: number; y: number; lignes: string[]; couleurs: Record<string, string>}> = ({x, y, lignes, couleurs}) => (
  <g shapeRendering="crispEdges">
    {lignes.flatMap((l, j) => l.split('').map((c, i) => (c === '.' ? null : (
      <rect key={`${i}-${j}`} x={x + i * P} y={y + j * P} width={P} height={P} fill={couleurs[c]} />
    ))))}
  </g>
);

const POLICE_AUTO = ['.wwwwwwwww.', 'wwwkkrwwwyw', 'wwwkkrwwwww', 'wwwkkbwwwww', 'wwwkkbwwwyw', '.wwwwwwwww.'];
const AUTO = ['..rrrrrrrr.', '.yrrkkkrrrr', 'rrrrkkkrrrr', 'rrrrkkkrrr.', '.yrrkkkrr..', '..rrrrrr...'];

const Main: React.FC<{x: number; miroir?: boolean}> = ({x, miroir = false}) => (
  <g transform={`translate(${x} 0) scale(${miroir ? -1 : 1} 1)`}>
    <path d="M -150 740 Q -140 640 -40 610 Q 60 590 120 640 Q 150 690 140 740 Z" fill="url(#peau)" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-70 + i * 44} y={548 - (i === 1 || i === 2 ? 14 : 0)} width={36} height={110} rx={18} fill="url(#peau)" transform={`rotate(${-8 + i * 5} ${-52 + i * 44} 650)`} />
    ))}
    <rect x={104} y={612} width={36} height={86} rx={18} fill="url(#peau)" transform="rotate(48 122 655)" />
  </g>
);

export const MiniatureCRT: React.FC<{badge?: string}> = ({badge = 'OVER 480M COPIES'}) => (
  <svg viewBox="0 0 1280 720" width="100%" height="100%">
    <defs>
      <radialGradient id="piece" cx="52%" cy="45%" r="65%">
        <stop offset="0" stopColor="#1f5c8f" />
        <stop offset="0.45" stopColor="#0d2038" />
        <stop offset="1" stopColor="#030308" />
      </radialGradient>
      <radialGradient id="ecran" cx="50%" cy="50%" r="70%">
        <stop offset="0" stopColor="#1c4f7c" />
        <stop offset="1" stopColor="#081425" />
      </radialGradient>
      <linearGradient id="coque" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5a5866" />
        <stop offset="0.12" stopColor="#2d2c36" />
        <stop offset="1" stopColor="#0e0d14" />
      </linearGradient>
      <linearGradient id="peau" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9fd6f5" />
        <stop offset="0.25" stopColor="#4a6f8f" />
        <stop offset="1" stopColor="#0a0c16" />
      </linearGradient>
      <radialGradient id="vignette" cx="50%" cy="48%" r="75%">
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.85" />
      </radialGradient>
      <filter id="flouEcran" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3.2" /></filter>
      <filter id="flouAvant" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="5" /></filter>
      <filter id="halo" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="38" /></filter>
      <filter id="ombre" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity="0.6" /></filter>
      <pattern id="lignes" width="4" height="6" patternUnits="userSpaceOnUse"><rect width="4" height="2.5" fill="#000" opacity="0.38" /></pattern>
      <clipPath id="vitre"><rect x={290} y={64} width={760} height={470} rx={46} /></clipPath>
    </defs>

    <rect width={1280} height={720} fill="url(#piece)" />

    {/* Moniteur */}
    <rect x={250} y={50} width={840} height={500} rx={60} fill="#3fa9ff" opacity={0.55} filter="url(#halo)" />
    <rect x={236} y={18} width={868} height={580} rx={44} fill="url(#coque)" />
    <rect x={290} y={64} width={760} height={470} rx={46} fill="url(#ecran)" />
    <g clipPath="url(#vitre)">
      <g filter="url(#flouEcran)">
        {/* Ville vue du dessus, en gros pixels */}
        <g shapeRendering="crispEdges">
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={`a${i}`} x={300 + i * 140} y={300} width={98} height={84} fill="#2e6aa8" />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={`b${i}`} x={300 + i * 140} y={496} width={98} height={56} fill="#2e6aa8" />)}
          <rect x={290} y={398} width={760} height={84} fill="#0a1830" />
          {Array.from({length: 14}).map((_, i) => <rect key={i} x={300 + i * 56} y={436} width={28} height={P / 2} fill="#9fc4e8" />)}
        </g>
        <Sprite x={690} y={398} lignes={POLICE_AUTO} couleurs={{w: '#f4f7ff', k: '#26355e', r: '#ff3b3b', b: '#3b6bff', y: '#fff3a0'}} />
        <Sprite x={836} y={384} lignes={AUTO} couleurs={{r: '#ff4040', k: '#3a1420', y: '#fff3a0'}} />
        <g shapeRendering="crispEdges" fill={JAUNE}>
          {[[836, 356], [864, 342], [808, 370], [850, 482], [822, 496], [892, 356]].map(([x, y], i) => <rect key={i} x={x} y={y} width={P} height={P} />)}
        </g>
        {/* Bandes de bug */}
        <rect x={290} y={372} width={420} height={12} fill="#ff2d95" opacity={0.85} />
        <rect x={640} y={500} width={410} height={10} fill="#39e6ff" opacity={0.85} />
        <rect x={900} y={330} width={150} height={8} fill="#39e6ff" opacity={0.7} />
      </g>
      <rect x={290} y={64} width={760} height={470} fill="url(#lignes)" />
      <path d="M 320 90 Q 660 60 1020 90 Q 700 110 320 180 Z" fill="#fff" opacity={0.07} />
    </g>
    <rect x={290} y={64} width={760} height={470} rx={46} fill="none" stroke="#000" strokeWidth={8} opacity={0.6} />
    <circle cx={1040} cy={568} r={7} fill="#4dff88" />
    <rect x={300} y={560} width={150} height={10} rx={5} fill="#000" opacity={0.5} />

    {/* Premier plan flou : clavier et mains */}
    <g filter="url(#flouAvant)">
      <path d="M 150 720 L 250 600 L 1030 600 L 1130 720 Z" fill="#17161e" />
      {[0, 1, 2].map((j) => Array.from({length: 15 - j}).map((_, i) => (
        <rect key={`${i}-${j}`} x={272 + j * 6 + i * (50 + j * 3)} y={610 + j * 36} width={40 + j * 3} height={26 + j * 3} rx={6} fill="#6f8fb0" opacity={0.75 - j * 0.12} />
      )))}
      <Main x={420} />
      <Main x={870} miroir />
    </g>

    <rect width={1280} height={720} fill="url(#vignette)" />

    {/* Texte */}
    <g transform="rotate(-3 640 190)" filter="url(#ombre)">
      <rect x={96} y={52} width={1088} height={270} rx={18} fill={ROSE} />
      <text x={640} y={164} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={116} fill="#fff">THE BUG THAT</text>
      <text x={640} y={284} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={116} fill="#fff">STARTED IT ALL</text>
    </g>
    <g transform="rotate(2 330 395)" filter="url(#ombre)">
      <rect x={96} y={350} width={badge.length * 26.5 + 56} height={84} rx={14} fill={JAUNE} />
      <text x={124} y={409} fontFamily={POLICE} fontWeight={700} fontSize={46} fill="#0b0f22">{badge}</text>
    </g>
  </svg>
);
