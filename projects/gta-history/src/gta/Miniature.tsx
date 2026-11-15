import React from 'react';
import {C, POLICE} from '../theme';
import {DefsPapier} from '../papier';
import {grille, JAUNE, NOIR, ROSE, ROUGE, Ville, Voiture} from './pieces';

// Miniature YouTube (1280x720). Éléments figés, formes originales uniquement.
const G = grille(560, 250, 900, 620, 3, 2, 110);

export const Miniature = () => (
  <svg viewBox="0 0 1280 720" width="100%" height="100%">
    <DefsPapier />
    <rect width={1280} height={720} fill={C.creme} />
    <rect x={14} y={14} width={1252} height={692} rx={28} fill={C.ciel} />
    <clipPath id="cadreMini"><rect x={14} y={14} width={1252} height={692} rx={28} /></clipPath>
    <g clipPath="url(#cadreMini)">
      <g transform="rotate(-9 1000 520)" filter="url(#papier)">
        <Ville g={G} />
        {/* Étincelles du choc */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={G.rx(1) + 75} y={G.ry(1) - 150} width={16} height={56} rx={8} fill={JAUNE}
            transform={`rotate(${-75 + i * 25} ${G.rx(1) + 83} ${G.ry(1)})`} />
        ))}
        <Voiture x={G.rx(1) + 190} y={G.ry(1) - 14} rot={-16} couleur={ROUGE} taille={3.1} />
        <Voiture x={G.rx(1) - 40} y={G.ry(1) + 8} rot={6} police taille={3.1} />
      </g>
    </g>
    {/* Titre */}
    <g filter="url(#papier)">
      <rect x={40} y={60} width={530} height={200} rx={26} fill="#e9edff" transform="rotate(-3 305 160)" />
    </g>
    <text x={305} y={216} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={160} fill={NOIR} transform="rotate(-3 305 160)">A BUG</text>
    <g filter="url(#papier)">
      <rect x={50} y={290} width={640} height={180} rx={26} fill={ROSE} transform="rotate(2 370 380)" />
    </g>
    <text x={370} y={428} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={128} fill="#fff" transform="rotate(2 370 380)">MADE GTA</text>
    {/* Chiffre choc */}
    <g filter="url(#papier)">
      <rect x={60} y={520} width={430} height={150} rx={24} fill={JAUNE} transform="rotate(-2 275 595)" />
    </g>
    <text x={275} y={610} textAnchor="middle" fontFamily={POLICE} fontWeight={700} fontSize={92} fill={NOIR} transform="rotate(-2 275 595)">480M</text>
    <text x={275} y={652} textAnchor="middle" fontFamily={POLICE} fontWeight={600} fontSize={34} fill={NOIR} transform="rotate(-2 275 595)">copies later</text>
  </svg>
);
