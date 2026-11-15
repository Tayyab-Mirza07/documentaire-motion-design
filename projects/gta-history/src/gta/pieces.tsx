import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, POLICE} from '../theme';
import {interp, Texte} from '../papier';
import {instantDuMot} from '../moteur/film';

// Pièces propres au film GTA : formes originales, aucun logo ni image du jeu.

export const ROSE = '#ff4fa3';
export const CYAN = '#3fd8ff';
export const JAUNE = '#ffd23f';
export const VERT = '#5fe08a';
export const ROUGE = '#ff5a5a';
export const BLEU = '#4f8cff';
export const VIOLET = '#a77bff';
export const ORANGE = '#ff9a3f';
export const NOIR = '#0b0f22';

// Instant où un mot est prononcé ; plante si le mot n'est pas dans la narration.
export const quand = (texte: string, mot: string, duree: number) => {
  if (texte.indexOf(mot) < 0) throw new Error(`Mot introuvable dans la narration : « ${mot} »`);
  return instantDuMot(texte, mot, duree);
};

export const Source: React.FC<{children: React.ReactNode}> = ({children}) => (
  <Texte x={1850} y={1041} taille={22} ancre="end" surFond opacite={0.7}>Source: {children}</Texte>
);

export const Carte: React.FC<{x: number; y: number; l: number; h: number; couleur?: string; rot?: number; rx?: number}> = ({
  x, y, l, h, couleur = C.etiquette, rot = 0, rx = 24,
}) => <rect x={x - l / 2} y={y - h / 2} width={l} height={h} rx={rx} fill={couleur} transform={`rotate(${rot} ${x} ${y})`} />;

// Apparition en fondu (sans rebond).
export const Fondu: React.FC<{delai: number; duree?: number; children: React.ReactNode}> = ({delai, duree = 10, children}) => {
  const f = useCurrentFrame();
  return <g opacity={interp(f, [delai, delai + duree], [0, 1])}>{children}</g>;
};

// Pastille colorée avec un texte blanc (année, étiquette courte).
export const Puce: React.FC<{x: number; y: number; texte: string; couleur?: string; taille?: number; texteCouleur?: string}> = ({
  x, y, texte, couleur = ROSE, taille = 40, texteCouleur = '#fff',
}) => {
  const l = texte.length * taille * 0.58 + taille * 1.4;
  const h = taille * 1.7;
  return (
    <g>
      <rect x={x - l / 2} y={y - h / 2} width={l} height={h} rx={h / 2} fill={couleur} />
      <text x={x} y={y + taille * 0.35} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={taille} fill={texteCouleur}>{texte}</text>
    </g>
  );
};

// Nombre qui grimpe de `de` à `a` entre t0 et t0 + dur.
export const Compteur: React.FC<{x: number; y: number; de?: number; a: number; t0: number; dur?: number; fmt: (v: number) => string;
  taille?: number; couleur?: string; ancre?: 'start' | 'middle' | 'end'}> = ({x, y, de = 0, a, t0, dur = 40, fmt, taille = 120, couleur = JAUNE, ancre = 'middle'}) => {
  const f = useCurrentFrame();
  const v = interp(f, [t0, t0 + dur], [de, a]);
  return <text x={x} y={y} textAnchor={ancre} fontFamily={POLICE} fontWeight={600} fontSize={taille} fill={couleur}>{fmt(v)}</text>;
};

// Voiture vue du dessus, centrée en (x, y), tournée de `rot` degrés.
export const Voiture: React.FC<{x: number; y: number; rot?: number; couleur?: string; police?: boolean; taille?: number}> = ({
  x, y, rot = 0, couleur = ROUGE, police = false, taille = 1,
}) => {
  const f = useCurrentFrame();
  const flash = Math.floor(f / 5) % 2 === 0;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${taille})`}>
      <rect x={-36} y={-19} width={72} height={38} rx={10} fill={police ? '#f2f4ff' : couleur} />
      <rect x={-14} y={-15} width={30} height={30} rx={6} fill={police ? '#2b3a6b' : '#1a1f3a'} opacity={0.85} />
      <rect x={28} y={-15} width={6} height={9} rx={2} fill="#fff7b0" />
      <rect x={28} y={6} width={6} height={9} rx={2} fill="#fff7b0" />
      {police && (
        <>
          <rect x={-4} y={-13} width={9} height={13} fill={flash ? ROUGE : '#7a1f1f'} />
          <rect x={-4} y={0} width={9} height={13} fill={flash ? '#1f2f7a' : BLEU} />
        </>
      )}
    </g>
  );
};

// Quadrillage de ville vue du dessus. `grille` donne aussi le centre des routes.
export const grille = (x: number, y: number, l: number, h: number, cols: number, rangs: number, route = 46) => {
  const bl = (l - (cols + 1) * route) / cols;
  const bh = (h - (rangs + 1) * route) / rangs;
  return {
    x, y, l, h, cols, rangs, route, bl, bh,
    ry: (j: number) => y + j * (bh + route) + route / 2,
    rx: (i: number) => x + i * (bl + route) + route / 2,
  };
};

export const Ville: React.FC<{g: ReturnType<typeof grille>; teinte?: string; teinte2?: string}> = ({g, teinte = C.colline2, teinte2 = C.colline1}) => (
  <g>
    <rect x={g.x} y={g.y} width={g.l} height={g.h} rx={18} fill={NOIR} />
    {Array.from({length: g.rangs + 1}).map((_, j) => (
      <line key={`h${j}`} x1={g.x + 10} x2={g.x + g.l - 10} y1={g.ry(j)} y2={g.ry(j)} stroke="#ffffff" strokeOpacity={0.25} strokeWidth={3} strokeDasharray="18 16" />
    ))}
    {Array.from({length: g.cols + 1}).map((_, i) => (
      <line key={`v${i}`} x1={g.rx(i)} x2={g.rx(i)} y1={g.y + 10} y2={g.y + g.h - 10} stroke="#ffffff" strokeOpacity={0.25} strokeWidth={3} strokeDasharray="18 16" />
    ))}
    {Array.from({length: g.cols * g.rangs}).map((_, k) => {
      const i = k % g.cols, j = Math.floor(k / g.cols);
      const bx = g.x + g.route + i * (g.bl + g.route), by = g.y + g.route + j * (g.bh + g.route);
      return (
        <g key={k}>
          <rect x={bx} y={by} width={g.bl} height={g.bh} rx={8} fill={teinte} />
          <rect x={bx + 10} y={by + 10} width={g.bl * 0.42} height={g.bh * 0.5} rx={5} fill={teinte2} />
          <rect x={bx + g.bl * 0.56} y={by + g.bh * 0.3} width={g.bl * 0.36} height={g.bh * 0.58} rx={5} fill={teinte2} opacity={0.6} />
        </g>
      );
    })}
  </g>
);

// Jauge verticale (0 à 1).
export const Jauge: React.FC<{x: number; y: number; h: number; v: number; titre: string}> = ({x, y, h, v, titre}) => (
  <g>
    <Carte x={x} y={y} l={260} h={h + 150} />
    <Texte x={x} y={y - h / 2 - 20} taille={44} gras>{titre}</Texte>
    <rect x={x - 35} y={y - h / 2 + 20} width={70} height={h} rx={18} fill="#c9cfe6" />
    <rect x={x - 35} y={y - h / 2 + 20 + h * (1 - v)} width={70} height={h * v} rx={18} fill={v > 0.5 ? VERT : ROUGE} />
  </g>
);

// Tampon incliné.
export const Tampon: React.FC<{x: number; y: number; texte: string; couleur?: string; rot?: number; taille?: number}> = ({x, y, texte, couleur = ROUGE, rot = -10, taille = 70}) => {
  const l = texte.length * taille * 0.62 + 70;
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <rect x={x - l / 2} y={y - taille * 0.85} width={l} height={taille * 1.7} rx={14} fill={NOIR} fillOpacity={0.85} stroke={couleur} strokeWidth={8} />
      <text x={x} y={y + taille * 0.35} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={taille} fill={couleur}>{texte}</text>
    </g>
  );
};

// Parlement stylisé (fronton + colonnes).
export const Parlement: React.FC<{x: number; y: number; taille?: number; couleur?: string}> = ({x, y, taille = 1, couleur = '#e9edff'}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`} fill={couleur}>
    <path d="M -90 -40 L 0 -95 L 90 -40 Z" />
    <rect x={-90} y={-34} width={180} height={14} />
    {[-70, -35, 0, 35, 70].map((d) => <rect key={d} x={d - 9} y={-16} width={18} height={70} />)}
    <rect x={-100} y={56} width={200} height={18} />
  </g>
);

export const Marteau: React.FC<{x: number; y: number; taille?: number}> = ({x, y, taille = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${taille}) rotate(-35)`}>
    <rect x={-12} y={-20} width={24} height={110} rx={8} fill="#c58a4a" />
    <rect x={-55} y={-55} width={110} height={50} rx={10} fill="#8a5a2a" />
    <rect x={-60} y={-60} width={16} height={60} rx={5} fill={JAUNE} />
    <rect x={44} y={-60} width={16} height={60} rx={5} fill={JAUNE} />
  </g>
);

export const Billets: React.FC<{x: number; y: number; taille?: number}> = ({x, y, taille = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`}>
    {[2, 1, 0].map((i) => (
      <g key={i} transform={`translate(${i * 10 - 10} ${-i * 16 + 16})`}>
        <rect x={-85} y={-42} width={170} height={84} rx={10} fill={i === 0 ? VERT : '#3fae69'} stroke="#1f6a3e" strokeWidth={4} />
        {i === 0 && <circle r={24} fill="#1f6a3e" />}
        {i === 0 && <text y={13} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={36} fill={VERT}>$</text>}
      </g>
    ))}
  </g>
);

// Immeubles en silhouette, posés sur la ligne y.
export const Skyline: React.FC<{x: number; y: number; l: number; couleur?: string; graine?: number; hMax?: number; fenetres?: boolean}> = ({
  x, y, l, couleur = C.colline2, graine = 1, hMax = 300, fenetres = true,
}) => {
  const n = Math.floor(l / 80);
  return (
    <g>
      {Array.from({length: n}).map((_, i) => {
        const h = 90 + ((i * 97 * graine + 31 * graine) % 100) / 100 * (hMax - 90);
        const bx = x + i * (l / n);
        return (
          <g key={i}>
            <rect x={bx} y={y - h} width={l / n - 8} height={h} fill={couleur} />
            {fenetres && Array.from({length: Math.floor(h / 46)}).map((__, k) => (
              <rect key={k} x={bx + 14} y={y - h + 16 + k * 44} width={l / n - 36} height={14} fill={JAUNE} opacity={(i + k) % 3 === 0 ? 0.85 : 0.25} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

export const Palmier: React.FC<{x: number; y: number; taille?: number; couleur?: string}> = ({x, y, taille = 1, couleur = '#0e1228'}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`} fill="none" stroke={couleur} strokeLinecap="round">
    <path d="M 0 0 Q -14 -120 10 -240" strokeWidth={16} />
    {[-150, -110, -60, -20, 30].map((a, i) => (
      <path key={i} d="M 10 -240 Q 70 -290 150 -230" strokeWidth={14} transform={`rotate(${a} 10 -240)`} />
    ))}
  </g>
);

// Certificat de record (rosette).
export const Certificat: React.FC<{x: number; y: number; titre: string; texte: string}> = ({x, y, titre, texte}) => (
  <g>
    <Carte x={x} y={y} l={640} h={230} rot={-3} />
    <g transform={`rotate(-3 ${x} ${y})`}>
      <circle cx={x - 235} cy={y} r={52} fill={JAUNE} />
      <circle cx={x - 235} cy={y} r={34} fill={ORANGE} />
      <path d={`M ${x - 265} ${y + 40} l -12 70 l 32 -22 l 20 30 l 6 -70 Z`} fill={ORANGE} />
      <Texte x={x + 50} y={y - 18} taille={40} gras>{titre}</Texte>
      <Texte x={x + 50} y={y + 36} taille={30}>{texte}</Texte>
    </g>
  </g>
);

// Boîtier de console générique.
export const Console: React.FC<{x: number; y: number; couleur: string; nom: string}> = ({x, y, couleur, nom}) => (
  <g>
    <rect x={x - 120} y={y - 50} width={240} height={100} rx={18} fill={couleur} />
    <rect x={x - 96} y={y - 8} width={110} height={10} rx={5} fill={NOIR} opacity={0.6} />
    <circle cx={x + 78} cy={y - 4} r={12} fill={CYAN} />
    <Texte x={x} y={y + 100} taille={34} surFond>{nom}</Texte>
  </g>
);

// Cadre de lecteur vidéo.
export const Lecteur: React.FC<{x: number; y: number; l?: number; h?: number; couleur?: string}> = ({x, y, l = 620, h = 350, couleur = '#1a1f3a'}) => (
  <g>
    <rect x={x - l / 2} y={y - h / 2} width={l} height={h} rx={22} fill={couleur} stroke={ROSE} strokeWidth={6} />
    <path d={`M ${x - 34} ${y - 50} L ${x + 50} ${y} L ${x - 34} ${y + 50} Z`} fill="#fff" />
    <rect x={x - l / 2 + 30} y={y + h / 2 - 40} width={l - 60} height={10} rx={5} fill="#fff" opacity={0.3} />
    <rect x={x - l / 2 + 30} y={y + h / 2 - 40} width={(l - 60) * 0.3} height={10} rx={5} fill={ROSE} />
  </g>
);

// Épingle de carte.
export const Epingle: React.FC<{x: number; y: number; couleur?: string; taille?: number}> = ({x, y, couleur = ROSE, taille = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${taille})`}>
    <path d="M 0 0 C -40 -50 -38 -95 0 -100 C 38 -95 40 -50 0 0 Z" fill={couleur} />
    <circle cy={-64} r={14} fill="#fff" />
  </g>
);

// Barre verticale qui pousse depuis sa base.
export const Barre: React.FC<{x: number; base: number; l: number; h: number; t0: number; couleur: string; valeur: string; nom: string}> = ({x, base, l, h, t0, couleur, valeur, nom}) => {
  const f = useCurrentFrame();
  const p = interp(f, [t0, t0 + 25], [0, 1]);
  return (
    <g>
      <rect x={x - l / 2} y={base - h * p} width={l} height={h * p} rx={12} fill={couleur} />
      <g opacity={interp(f, [t0 + 15, t0 + 25], [0, 1])}>
        <Texte x={x} y={base - h - 22} taille={58} gras surFond>{valeur}</Texte>
      </g>
      <g opacity={interp(f, [t0, t0 + 8], [0, 1])}>
        <Texte x={x} y={base + 50} taille={34} surFond>{nom}</Texte>
      </g>
    </g>
  );
};
