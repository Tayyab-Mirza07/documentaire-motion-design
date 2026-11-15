import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FILTRE, POLICE} from './theme';

// Filtre SVG qui donne l'effet « papier découpé » : bords légèrement irréguliers,
// grain de papier et ombre portée. À placer une fois dans chaque <svg> de scène.
export const DefsPapier = () => (
  <defs>
    {FILTRE === 'papier' && (
      <filter id="papier" x="-10%" y="-10%" width="120%" height="135%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="bruit" />
        <feDisplacementMap in="SourceGraphic" in2="bruit" scale="7" xChannelSelector="R" yChannelSelector="G" result="bord" />
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="9" result="grain" />
        <feColorMatrix in="grain" type="matrix"
          values="0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0.35 -0.05" result="grainBrun" />
        <feComposite in="grainBrun" in2="bord" operator="in" result="grainMasque" />
        <feMerge result="texture">
          <feMergeNode in="bord" />
          <feMergeNode in="grainMasque" />
        </feMerge>
        <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#5a4630" floodOpacity="0.32" />
      </filter>
    )}
    {FILTRE === 'craie' && (
      // Bords tremblés et texture granuleuse de craie (des « trous » dans la matière).
      <filter id="papier" x="-10%" y="-10%" width="120%" height="130%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="2" result="bruit" />
        <feDisplacementMap in="SourceGraphic" in2="bruit" scale="5" xChannelSelector="R" yChannelSelector="G" result="bord" />
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="7" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.55" result="trous" />
        <feComposite in="bord" in2="trous" operator="in" result="crayeux" />
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
      </filter>
    )}
    {FILTRE === 'plat' && (
      <filter id="papier" x="-10%" y="-10%" width="120%" height="135%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1f2a44" floodOpacity="0.12" />
      </filter>
    )}
    {FILTRE === 'lueur' && (
      <filter id="papier" x="-20%" y="-20%" width="140%" height="150%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="flou" />
        <feColorMatrix in="flou" type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.15  0 0 1 0 0.35  0 0 0 0.7 0" result="halo" />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    )}
  </defs>
);

// Ressort avec un petit rebond : la pièce « saute » en place comme dans un collage.
export const useRessort = (delai: number, rebond = true) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delai, fps, config: rebond ? {damping: 11, stiffness: 140} : {damping: 200}});
};

// Une pièce de papier qui apparaît en grandissant depuis son point d'ancrage (cx, cy).
export const Pop: React.FC<{cx: number; cy: number; delai?: number; children: React.ReactNode}> = ({
  cx, cy, delai = 0, children,
}) => {
  const s = useRessort(delai);
  return (
    <g filter="url(#papier)" transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}>
      {children}
    </g>
  );
};

// Une pièce qui glisse depuis un décalage (dx, dy) jusqu'à sa place.
export const Glisse: React.FC<{dx?: number; dy?: number; delai?: number; children: React.ReactNode}> = ({
  dx = 0, dy = 0, delai = 0, children,
}) => {
  const p = useRessort(delai, false);
  return (
    <g filter="url(#papier)" transform={`translate(${dx * (1 - p)} ${dy * (1 - p)})`}>
      {children}
    </g>
  );
};

// Étiquette en papier avec un titre et une phrase courte (une idée par scène).
export const Etiquette: React.FC<{titre: string; texte?: string; x?: number; y?: number; delai?: number; largeur?: number}> = ({
  titre, texte, x = 960, y = 150, delai = 10, largeur = 1000,
}) => {
  const h = texte ? 190 : 130;
  const s = useRessort(delai);
  const pTexte = useRessort(delai + 12, false);
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-1.5 * s})`}>
      <g filter="url(#papier)">
        <rect x={-largeur / 2} y={-h / 2} width={largeur} height={h} rx={26} fill={C.etiquette} />
      </g>
      <text y={texte ? -18 : 22} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={64} fill={C.texte}>
        {titre}
      </text>
      {texte && (
        <text y={52} textAnchor="middle" fontFamily={POLICE} fontWeight={500} fontSize={38} fill={C.texte} opacity={pTexte}>
          {texte}
        </text>
      )}
    </g>
  );
};

// Goutte d'eau avec deux petits yeux : notre personnage principal.
export const Goutte: React.FC<{x: number; y: number; taille?: number; yeux?: boolean}> = ({x, y, taille = 1, yeux = true}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`}>
    <path d="M0 -40 C 18 -14, 30 4, 30 18 A 30 30 0 0 1 -30 18 C -30 4, -18 -14, 0 -40 Z" fill={C.goutte} />
    <ellipse cx={-11} cy={10} rx={6} ry={10} fill="white" opacity={0.55} />
    {yeux && (
      <>
        <circle cx={-9} cy={20} r={3.6} fill="#3a2c20" />
        <circle cx={9} cy={20} r={3.6} fill="#3a2c20" />
      </>
    )}
  </g>
);

export const Nuage: React.FC<{x: number; y: number; taille?: number; couleur?: string}> = ({x, y, taille = 1, couleur = C.nuage}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`} fill={couleur}>
    <circle cx={-70} cy={10} r={50} />
    <circle cx={0} cy={-20} r={70} />
    <circle cx={75} cy={5} r={55} />
    <rect x={-120} y={10} width={250} height={55} rx={27} />
  </g>
);

export const Soleil: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 90}) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`rotate(${f * 0.4})`}>
        {Array.from({length: 12}).map((_, i) => (
          <rect key={i} x={-9} y={-r - 48} width={18} height={36} rx={9} fill={C.soleilBord} transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <circle r={r} fill={C.soleil} />
    </g>
  );
};

// Vagues de mer qui ondulent doucement.
export const Mer: React.FC<{y?: number}> = ({y = 860}) => {
  const f = useCurrentFrame();
  const vague = (decal: number, amp: number) => {
    let d = `M -50 ${y}`;
    for (let x = -50; x <= 1970; x += 40) {
      d += ` L ${x} ${y + Math.sin(x / 90 + f / 12 + decal) * amp}`;
    }
    return d + ' L 1970 1100 L -50 1100 Z';
  };
  return (
    <g filter="url(#papier)">
      <path d={vague(0, 14)} fill={C.mer} />
      <path d={vague(2, 10)} transform="translate(0 70)" fill={C.merFonce} />
    </g>
  );
};

// Fond crème + ciel, commun à toutes les scènes.
export const Fond: React.FC<{ciel?: string}> = ({ciel = C.ciel}) => (
  <>
    <rect width={1920} height={1080} fill={C.creme} />
    <rect x={30} y={30} width={1860} height={1020} rx={40} fill={ciel} filter="url(#papier)" />
  </>
);

export const interp = (f: number, a: number[], b: number[]) =>
  interpolate(f, a, b, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Petit personnage en papier. `vieux` ajoute des cheveux gris et une canne.
export const Personnage: React.FC<{x: number; y: number; couleur: string; taille?: number; vieux?: boolean; phase?: number}> = ({
  x, y, couleur, taille = 1, vieux = false, phase = 0,
}) => {
  const f = useCurrentFrame();
  const saut = Math.abs(Math.sin(f / 10 + phase)) * 6;
  return (
    <g transform={`translate(${x} ${y - saut}) scale(${taille})`}>
      {vieux && <rect x={34} y={-60} width={7} height={70} rx={3} fill="#8a6a4a" />}
      <rect x={-34} y={-70} width={68} height={80} rx={30} fill={couleur} />
      <circle cx={0} cy={-100} r={28} fill="#f1c9a0" />
      {vieux && <path d="M -28 -104 A 28 28 0 0 1 28 -104 L 22 -112 A 22 22 0 0 0 -22 -112 Z" fill="#e6e6e6" />}
      {!vieux && <path d="M -28 -102 A 28 28 0 0 1 28 -102 Q 0 -118 -28 -102 Z" fill="#5b3b25" />}
      <circle cx={-9} cy={-98} r={3.2} fill="#3a2c20" />
      <circle cx={9} cy={-98} r={3.2} fill="#3a2c20" />
    </g>
  );
};

// Pièce de monnaie en euros.
export const Piece: React.FC<{x: number; y: number; taille?: number}> = ({x, y, taille = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`}>
    <circle r={22} fill="#f5c542" />
    <circle r={16} fill="none" stroke="#d9a520" strokeWidth={3} />
    <text y={8} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={24} fill="#a87a10">€</text>
  </g>
);

// Texte SVG avec la police du film.
export const Texte: React.FC<{x: number; y: number; taille?: number; gras?: boolean; couleur?: string; ancre?: 'start' | 'middle' | 'end'; opacite?: number; surFond?: boolean; children: React.ReactNode}> = ({
  x, y, taille = 40, gras = false, couleur, ancre = 'middle', opacite = 1, surFond = false, children,
}) => (
  <text x={x} y={y} textAnchor={ancre} fontFamily={POLICE} fontWeight={gras ? 600 : 500} fontSize={taille} fill={couleur ?? (surFond ? C.texteFond : C.texte)} opacity={opacite}>
    {children}
  </text>
);

// Toile SVG d'une scène (1920x1080) : filtres de style + cadre arrondi qui coupe ce qui dépasse.
export const Toile: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg viewBox="0 0 1920 1080" width="100%" height="100%">
    <DefsPapier />
    <clipPath id="cadre"><rect x={30} y={30} width={1860} height={1020} rx={40} /></clipPath>
    <g clipPath="url(#cadre)">{children}</g>
  </svg>
);

const colline = (yBase: number, amp: number, decal = 0) =>
  `M 30 1050 L 30 ${yBase} Q ${480 + decal} ${yBase - amp} ${960 + decal} ${yBase} T 1890 ${yBase} L 1890 1050 Z`;

export const Collines = ({delai = 0}: {delai?: number}) => (
  <>
    <Glisse dy={500} delai={delai}><path d={colline(760, 160, 120)} fill={C.colline1} /></Glisse>
    <Glisse dy={500} delai={delai + 6}><path d={colline(850, 120, -200)} fill={C.colline2} /></Glisse>
    <Glisse dy={500} delai={delai + 12}><path d={colline(950, 90, 60)} fill={C.colline3} /></Glisse>
  </>
);
