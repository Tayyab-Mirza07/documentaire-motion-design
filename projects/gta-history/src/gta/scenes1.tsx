import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Etiquette, Fond, Glisse, interp, Mer, Personnage, Pop, Texte, Toile} from '../papier';
import {PropsScene} from '../moteur/film';
import {Barre, Billets, BLEU, Carte, Compteur, CYAN, Fondu, grille, Jauge, JAUNE, Marteau, NOIR, ORANGE, Palmier, Parlement,
  Puce, quand, ROSE, ROUGE, Skyline, Source, Tampon, VERT, Ville, VIOLET, Voiture} from './pieces';

const GENS = [ROSE, CYAN, JAUNE, VERT, VIOLET, ORANGE, BLEU, ROUGE];
const G1 = grille(110, 290, 1240, 580, 5, 3);

// 1. Un jeu qui s'ennuie
export const Accroche: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const x = interp(f, [0, duree], [260, 900]);
  return (
    <Toile>
      <Fond />
      <Glisse dy={700} delai={5}><Ville g={G1} /></Glisse>
      <Fondu delai={25}>
        <Voiture x={x + 170} y={G1.ry(2)} />
        <Voiture x={x} y={G1.ry(2)} police />
      </Fondu>
      <Pop cx={1620} cy={560} delai={quand(texte, 'testers', duree) - 10}>
        <Jauge x={1620} y={590} h={330} v={0.08} titre="FUN" />
      </Pop>
      <Pop cx={730} cy={560} delai={quand(texte, 'close to', duree)}>
        <Tampon x={730} y={560} texte="CANCELLED?" taille={96} />
      </Pop>
      <Etiquette titre="Dundee, Scotland" texte="The mid-1990s" y={150} largeur={760} />
    </Toile>
  );
};

// 2. Le bug
export const Bug: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'ramming', duree);
  const choc = Math.max(0, Math.sin((f - t) / 3.2)) * (f > t ? 1 : 0);
  const cx = 730, cy = G1.ry(2);
  const tremble = f > t ? Math.sin(f * 1.7) * 7 : 0;
  const flics = [
    {dx: -330, dy: 0, rot: 0}, {dx: 330, dy: 0, rot: 180}, {dx: 0, dy: -203, rot: 90}, {dx: -330, dy: -203, rot: 32}, {dx: 330, dy: -203, rot: 148},
  ];
  const jauge = interp(f, [quand(texte, 'suddenly', duree), quand(texte, 'suddenly', duree) + 30], [0.08, 0.96]);
  const glitch = f < 22;
  return (
    <Toile>
      <Fond />
      <g filter="url(#papier)"><Ville g={G1} /></g>
      {flics.map((p, i) => {
        const arrive = interp(f, [quand(texte, 'aggressive', duree) + i * 5, t + i * 4], [1, 0.28 - choc * 0.1]);
        return <Voiture key={i} x={cx + p.dx * arrive} y={cy + p.dy * arrive} rot={p.rot} police />;
      })}
      <Voiture x={cx + tremble} y={cy - tremble * 0.6} rot={tremble * 2} />
      {f > t && [0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={cx - 6} y={cy - 70 - choc * 40} width={12} height={30} rx={6} fill={JAUNE} opacity={choc} transform={`rotate(${i * 60 + f * 3} ${cx} ${cy})`} />
      ))}
      {glitch && [0, 1, 2, 3].map((i) => (
        <rect key={i} x={110 + ((f * 131 + i * 317) % 900)} y={300 + ((f * 71 + i * 149) % 520)} width={340} height={22} fill={i % 2 ? CYAN : ROSE} opacity={0.75} />
      ))}
      <g filter="url(#papier)"><Jauge x={1620} y={590} h={330} v={jauge} titre="FUN" /></g>
      <Pop cx={1620} cy={300} delai={quand(texte, 'cannot stop', duree)}>
        <Puce x={1620} y={295} texte="BUG → FEATURE" couleur={VERT} texteCouleur={NOIR} taille={30} />
      </Pop>
      <Etiquette titre="Then a bug appears" y={150} largeur={760} />
      <Source>Prima Games; GamesRadar</Source>
    </Toile>
  );
};

// 3. La promesse
export const Promesse: React.FC<PropsScene> = ({texte, duree}) => {
  const t = quand(texte, 'Nearly', duree);
  return (
    <Toile>
      <Fond />
      
      <Etiquette titre="The Bug That Created GTA" texte="A history, 1997–2026" y={190} largeur={1150} delai={quand(texte, 'Grand Theft Auto', duree)} />
      <Fondu delai={t}>
        <Compteur x={500} y={520} a={480} t0={t} dur={45} fmt={(v) => `≈${Math.round(v)}M`} taille={170} />
        <Texte x={500} y={590} taille={44} surFond>copies sold</Texte>
      </Fondu>
      <Pop cx={1010} cy={480} delai={quand(texte, 'parliament', duree)}>
        <Carte x={1010} y={490} l={270} h={300} />
        <Parlement x={1010} y={460} couleur="#3a3f63" />
        <Texte x={1010} y={605} taille={32} gras>Parliament</Texte>
      </Pop>
      <Pop cx={1320} cy={480} delai={quand(texte, 'Court', duree)}>
        <Carte x={1320} y={490} l={270} h={300} />
        <Marteau x={1320} y={470} />
        <Texte x={1320} y={605} taille={32} gras>Court cases</Texte>
      </Pop>
      <Pop cx={1630} cy={480} delai={quand(texte, 'biggest', duree)}>
        <Carte x={1630} y={490} l={270} h={300} />
        <Billets x={1630} y={460} />
        <Texte x={1630} y={605} taille={32} gras>Record launches</Texte>
      </Pop>
      <Pop cx={960} cy={760} delai={quand(texte, 'This is how', duree)}>
        <Puce x={960} y={760} texte="How a glitch became a giant" couleur={ROSE} taille={50} />
      </Pop>
    </Toile>
  );
};

// 4. DMA Design
export const Dundee: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  return (
    <Toile>
      <Fond />
      <rect x={30} y={800} width={1860} height={250} fill={C.colline3} />
      <Pop cx={520} cy={800} delai={8}>
        <rect x={260} y={420} width={520} height={380} rx={10} fill={C.colline1} />
        {[0, 1, 2, 3].map((i) => [0, 1].map((j) => (
          <rect key={`${i}${j}`} x={300 + i * 118} y={540 + j * 110} width={80} height={70} rx={6} fill={JAUNE} opacity={(i + j) % 2 ? 0.9 : 0.4} />
        )))}
        <Carte x={520} y={470} l={430} h={84} />
        <Texte x={520} y={488} taille={50} gras>DMA DESIGN</Texte>
      </Pop>
      <Fondu delai={quand(texte, 'Lemmings', duree) - 8}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Personnage key={i} x={((f * 2.2 + i * 150) % 900) + 80} y={870} couleur={VERT} taille={0.5} phase={i} />
        ))}
        <Puce x={520} y={335} texte="Makers of Lemmings (1991)" couleur={VERT} texteCouleur={NOIR} taille={32} />
      </Fondu>
      <Glisse dx={900} delai={quand(texte, 'working title', duree) - 6}>
        <Carte x={1340} y={560} l={720} h={470} rot={3} />
        <g transform="rotate(3 1340 560)">
          <Texte x={1340} y={420} taille={32}>Working title</Texte>
          <Texte x={1340} y={510} taille={92} gras>Race’n’Chase</Texte>
          <g transform="translate(1080 560)">
            <rect width={520} height={190} rx={12} fill={NOIR} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={20 + i * 125} y={18} width={105} height={62} rx={6} fill={C.colline2} />)}
            {[0, 1, 2, 3].map((i) => <rect key={i} x={20 + i * 125} y={112} width={105} height={62} rx={6} fill={C.colline2} />)}
          </g>
          <Voiture x={1250 + ((f * 3) % 260)} y={656} police taille={0.7} />
          <Voiture x={1340 + ((f * 3) % 260)} y={656} taille={0.7} />
        </g>
      </Glisse>
      <Etiquette titre="DMA Design" texte="Founded by David Jones" y={150} largeur={760} />
    </Toile>
  );
};

// 5. Policier ou criminel
export const Choix: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'Almost nobody', duree);
  const tNom = quand(texte, 'new name', duree);
  return (
    <Toile>
      <Fond />
      <Pop cx={520} cy={500} delai={quand(texte, 'cop', duree)}>
        <Carte x={520} y={500} l={700} h={380} couleur="#dfe6ff" />
        <Texte x={520} y={380} taille={56} gras couleur={BLEU}>COP</Texte>
      </Pop>
      <Pop cx={1400} cy={500} delai={quand(texte, 'criminal', duree)}>
        <Carte x={1400} y={500} l={700} h={380} couleur="#ffe3ef" />
        <Texte x={1400} y={380} taille={56} gras couleur="#d81b6a">CRIMINAL</Texte>
      </Pop>
      <Fondu delai={quand(texte, 'criminal', duree) + 8}>
        {GENS.map((c, i) => {
          const reste = i === 0;
          const p = reste ? 0 : interp(f, [t + i * 4, t + 22 + i * 4], [0, 1]);
          const x0 = 290 + (i % 4) * 150, x1 = 1170 + (i % 4) * 150 + (i > 3 ? 0 : 0);
          const y = 520 + Math.floor(i / 4) * 130;
          return <Personnage key={i} x={x0 + (x1 - x0) * p} y={y} couleur={c} taille={0.8} phase={i} />;
        })}
      </Fondu>
      <Fondu delai={tNom - 20}>
        <Texte x={640} y={800} taille={64} gras surFond opacite={0.7}>Race’n’Chase</Texte>
        <rect x={430} y={776} width={420 * interp(f, [tNom - 8, tNom + 4], [0, 1])} height={10} rx={5} fill={ROUGE} />
      </Fondu>
      <Pop cx={1280} cy={780} delai={tNom + 12}>
        <Puce x={1280} y={780} texte="Grand Theft Auto" couleur={ROSE} taille={62} />
      </Pop>
      <Etiquette titre="Cop or criminal?" y={150} largeur={760} />
    </Toile>
  );
};

// 6. 1997 : trois villes
export const Sortie1997: React.FC<PropsScene> = ({texte, duree}) => {
  const villes = [
    {nom: 'Liberty City', c: BLEU, c2: '#9db9ff', mot: 'Liberty City'},
    {nom: 'Vice City', c: '#c2357d', c2: ROSE, mot: 'Vice City'},
    {nom: 'San Andreas', c: '#b3722b', c2: ORANGE, mot: 'San Andreas'},
  ];
  return (
    <Toile>
      <Fond />
      {villes.map((v, i) => {
        const x = 400 + i * 560;
        return (
          <Pop key={v.nom} cx={x} cy={560} delai={quand(texte, v.mot, duree) - 4}>
            <Ville g={grille(x - 230, 330, 460, 380, 3, 3, 30)} teinte={v.c} teinte2={v.c2} />
            <Voiture x={x - 60} y={470} taille={0.55} couleur={JAUNE} />
            <Carte x={x} y={775} l={420} h={84} />
            <Texte x={x} y={792} taille={46} gras>{v.nom}</Texte>
          </Pop>
        );
      })}
      <Pop cx={960} cy={860} delai={quand(texte, 'They come back', duree)}>
        <Puce x={960} y={868} texte="Remember these names" couleur={JAUNE} texteCouleur={NOIR} taille={32} />
      </Pop>
      <Etiquette titre="Late 1997" texte="PC, then PlayStation" y={150} largeur={700} />
    </Toile>
  );
};

// 7. Le scandale fabriqué
export const Scandale: React.FC<PropsScene> = ({texte, duree}) => {
  const unes = [
    {x: 360, y: 430, rot: -7, titre: 'BAN THIS GAME', mot: 'publicist'},
    {x: 620, y: 620, rot: 5, titre: 'OUTRAGE!', mot: 'outrage'},
    {x: 330, y: 760, rot: -3, titre: 'SICK CAR CRIME GAME', mot: 'on purpose'},
  ];
  const t = quand(texte, 'May 1997', duree);
  return (
    <Toile>
      <Fond />
      {unes.map((u) => (
        <Pop key={u.titre} cx={u.x} cy={u.y} delai={quand(texte, u.mot, duree)}>
          <Carte x={u.x} y={u.y} l={520} h={200} rot={u.rot} rx={8} couleur="#f4f1e6" />
          <g transform={`rotate(${u.rot} ${u.x} ${u.y})`}>
            <Texte x={u.x} y={u.y - 55} taille={24} couleur="#555">THE DAILY HEADLINE</Texte>
            <rect x={u.x - 230} y={u.y - 42} width={460} height={4} fill="#222" />
            <Texte x={u.x} y={u.y + 22} taille={u.titre.length > 14 ? 40 : 60} gras couleur="#111">{u.titre}</Texte>
            <rect x={u.x - 230} y={u.y + 50} width={460} height={8} rx={4} fill="#bbb" />
            <rect x={u.x - 230} y={u.y + 68} width={330} height={8} rx={4} fill="#bbb" />
          </g>
        </Pop>
      ))}
      <Pop cx={1360} cy={560} delai={t}>
        <Carte x={1360} y={570} l={760} h={520} />
        <Parlement x={1360} y={500} taille={1.7} couleur="#3a3f63" />
        <Texte x={1360} y={710} taille={52} gras>House of Lords</Texte>
        <Texte x={1360} y={770} taille={38}>20 May 1997 · before release</Texte>
      </Pop>
      <Pop cx={1640} cy={350} delai={t + 18}>
        <circle cx={1640} cy={350} r={78} fill={ROSE} />
        <Voiture x={1640} y={350} couleur={JAUNE} taille={1.1} rot={-15} />
      </Pop>
      <Etiquette titre="Outrage, on purpose" texte="Publicist: Max Clifford" y={150} largeur={800} />
      <Source>UK Parliament, Hansard, 20 May 1997</Source>
    </Toile>
  );
};

// 8. La formule
export const Formule: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const cartes = [
    {nom: 'FREEDOM', c: CYAN, mot: 'freedom'},
    {nom: 'SATIRE', c: JAUNE, mot: 'satire'},
    {nom: 'CONTROVERSY', c: ROSE, mot: 'controversy'},
  ];
  const p = interp(f, [quand(texte, 'sold anyway', duree), quand(texte, 'sold anyway', duree) + 50], [0, 1]);
  return (
    <Toile>
      <Fond />
      <path d={`M 150 840 Q 700 820 ${150 + 1620 * p} ${840 - 480 * p * p}`} fill="none" stroke={VERT} strokeWidth={14} strokeLinecap="round" opacity={0.55} />
      <Pop cx={330} cy={480} delai={quand(texte, 'eighteen', duree)}>
        <circle cx={330} cy={480} r={150} fill={ROUGE} />
        <circle cx={330} cy={480} r={126} fill="none" stroke="#fff" strokeWidth={10} />
        <Texte x={330} y={530} taille={150} gras couleur="#fff">18</Texte>
      </Pop>
      {cartes.map((c, i) => (
        <Pop key={c.nom} cx={1180} cy={370 + i * 170} delai={quand(texte, c.mot, duree)}>
          <Carte x={1180} y={370 + i * 170} l={900} h={136} rot={i % 2 ? 1.5 : -1.5} />
          <rect x={760} y={322 + i * 170} width={96} height={96} rx={20} fill={c.c} />
          <Texte x={1240} y={392 + i * 170} taille={68} gras>{c.nom}</Texte>
        </Pop>
      ))}
      <Etiquette titre="The formula" y={150} largeur={600} />
      <Source>UK Parliament, written answer, 3 Dec 1997</Source>
    </Toile>
  );
};

// 9. Rockstar
export const Rockstar: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'New York', duree);
  const p = interp(f, [t - 30, t + 10], [0, 1]);
  const ax = 1500 - 1080 * p, ay = 430 - Math.sin(p * Math.PI) * 130 + 60 * p;
  const etoile = Array.from({length: 10}).map((_, i) => {
    const r = i % 2 ? 44 : 100, a = (i * Math.PI) / 5 - Math.PI / 2;
    return `${1420 + r * Math.cos(a)},${660 + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <Toile>
      <Fond />
      <path d="M 1500 430 Q 960 180 420 490" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} strokeDasharray="14 14" />
      <circle cx={1500} cy={430} r={16} fill={CYAN} />
      <Texte x={1500} y={395} taille={36} surFond>London</Texte>
      <path d={`M ${ax - 30} ${ay} l 60 -14 l 0 28 Z`} fill={JAUNE} transform={`rotate(180 ${ax} ${ay})`} />
      <Glisse dy={600} delai={t - 10}>
        <Skyline x={120} y={860} l={640} hMax={330} graine={3} />
        <Carte x={440} y={800} l={330} h={76} />
        <Texte x={440} y={816} taille={42} gras>New York · 1998</Texte>
      </Glisse>
      <Pop cx={900} cy={800} delai={quand(texte, 'Sam and Dan', duree)}>
        <Personnage x={880} y={850} couleur={ROSE} taille={1.3} />
        <Personnage x={1010} y={850} couleur={CYAN} taille={1.3} phase={2} />
        <Texte x={945} y={640} taille={34} surFond>Sam &amp; Dan Houser</Texte>
      </Pop>
      <Pop cx={1420} cy={660} delai={quand(texte, 'Rockstar Games', duree)}>
        <polygon points={etoile} fill={JAUNE} />
        <Carte x={1420} y={810} l={480} h={84} />
        <Texte x={1420} y={827} taille={46} gras>Rockstar Games</Texte>
      </Pop>
      <Pop cx={1660} cy={560} delai={quand(texte, 'sequel', duree)}>
        <Puce x={1650} y={560} texte="1999 · sequel" couleur={VIOLET} taille={34} />
      </Pop>
      <Etiquette titre="A new label" texte="Inside the publisher Take-Two" y={150} largeur={800} />
    </Toile>
  );
};

// Bloc isométrique dont la hauteur pousse.
const BlocIso: React.FC<{x: number; y: number; h: number; c: string}> = ({x, y, h, c}) => {
  const a = 70, b = 36;
  return (
    <g>
      <path d={`M ${x - a} ${y} L ${x} ${y + b} L ${x} ${y + b - h} L ${x - a} ${y - h} Z`} fill={c} />
      <path d={`M ${x + a} ${y} L ${x} ${y + b} L ${x} ${y + b - h} L ${x + a} ${y - h} Z`} fill={c} opacity={0.6} />
      <path d={`M ${x - a} ${y - h} L ${x} ${y - b - h} L ${x + a} ${y - h} L ${x} ${y + b - h} Z`} fill="#e9edff" opacity={0.9} />
    </g>
  );
};

// 10. GTA III : la 3D
export const GTA3: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'three-dimensional', duree);
  const p = interp(f, [t - 20, t + 25], [0, 1]);
  const hs = [210, 130, 280, 160, 240, 110, 190, 300, 140];
  const cs = [BLEU, VIOLET, CYAN, ROSE, BLEU, VIOLET, CYAN, BLEU, ROSE];
  return (
    <Toile>
      <Fond />
      <Pop cx={420} cy={580} delai={10}>
        <Ville g={grille(190, 360, 460, 440, 3, 3, 30)} />
        <Voiture x={330} y={506} taille={0.5} />
        <Texte x={420} y={850} taille={38} surFond>1997 · from above</Texte>
      </Pop>
      <Fondu delai={quand(texte, 'street level', duree)}>
        <path d="M 700 580 L 820 580 M 790 550 L 825 580 L 790 610" fill="none" stroke={JAUNE} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      </Fondu>
      <Fondu delai={quand(texte, 'street level', duree) + 6}>
        <path d="M 1300 420 L 1720 630 L 1300 840 L 880 630 Z" fill={NOIR} />
        {hs.map((h, k) => {
          const i = k % 3, j = Math.floor(k / 3);
          return <BlocIso key={k} x={1300 + (i - j) * 140} y={500 + (i + j) * 70} h={10 + (h - 10) * p} c={cs[k]} />;
        })}
        <Texte x={1300} y={880} taille={38} surFond>2001 · a 3D world</Texte>
      </Fondu>
      <Etiquette titre="Grand Theft Auto III" texte="October 2001 · PlayStation 2" y={150} largeur={860} />
    </Toile>
  );
};

// 11. Après le 11 septembre
export const Septembre: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'delayed', duree);
  const p = interp(f, [t, t + 25], [0, 1]);
  const lignes = [
    {nom: 'Release delayed', mot: 'delayed'},
    {nom: 'A few pieces of content cut', mot: 'cut a few'},
    {nom: 'Cover redesigned', mot: 'redesigned'},
    {nom: 'About 1% of the game changed', mot: 'one percent'},
  ];
  const mois = (x: number, nom: string, actif: boolean) => (
    <g>
      <Carte x={x} y={520} l={300} h={330} />
      <rect x={x - 150} y={355} width={300} height={80} rx={24} fill={actif ? ROSE : '#8a93b8'} />
      <Texte x={x} y={412} taille={46} gras couleur="#fff">{nom}</Texte>
      {Array.from({length: 20}).map((_, k) => (
        <rect key={k} x={x - 120 + (k % 5) * 50} y={460 + Math.floor(k / 5) * 52} width={38} height={38} rx={8} fill="#c9cfe6" />
      ))}
    </g>
  );
  return (
    <Toile>
      <Fond />
      <Pop cx={300} cy={520} delai={8}>{mois(300, 'SEPT 2001', false)}</Pop>
      <Pop cx={660} cy={520} delai={14}>{mois(660, 'OCT 2001', true)}</Pop>
      <Fondu delai={20}>
        <circle cx={205 + 525 * p} cy={531 + 104 * p} r={26} fill="none" stroke={JAUNE} strokeWidth={9} />
        <Texte x={480} y={760} taille={36} surFond>Launch date</Texte>
      </Fondu>
      {lignes.map((l, i) => (
        <Glisse key={l.nom} dx={700} delai={quand(texte, l.mot, duree)}>
          <Carte x={1340} y={380 + i * 125} l={860} h={100} />
          <circle cx={970} cy={380 + i * 125} r={26} fill={VERT} />
          <path d={`M 957 ${380 + i * 125} l 9 10 l 18 -20`} fill="none" stroke={NOIR} strokeWidth={6} strokeLinecap="round" />
          <Texte x={1020} y={395 + i * 125} taille={42} ancre="start">{l.nom}</Texte>
        </Glisse>
      ))}
      <Etiquette titre="Weeks after September 11" y={150} largeur={900} />
      <Source>Rockstar statements, via GTA BOOM</Source>
    </Toile>
  );
};

// 12. Le monde ouvert
export const MondeOuvert: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const g = grille(110, 290, 1700, 580, 7, 3);
  const tH = quand(texte, 'Follow the story', duree);
  const tI = quand(texte, 'ignore', duree);
  const tT = quand(texte, 'taxi', duree);
  const pH = interp(f, [tH, tH + 25], [0, 1]);
  const pI = interp(f, [tI, tI + 30], [0, 1]);
  const pT = interp(f, [tT, tT + 70], [0, 1]);
  const chemins = [
    [[2, 2], [2, 0]], [[3, 2], [3, 1], [5, 1]], [[4, 2], [4, 3]], [[1, 2], [1, 3]], [[5, 2], [5, 0], [7, 0]], [[6, 2], [6, 3]], [[1, 2], [1, 1], [0, 1]],
  ];
  return (
    <Toile>
      <Fond />
      <g filter="url(#papier)"><Ville g={g} /></g>
      <line x1={g.rx(0)} y1={g.ry(2)} x2={g.rx(0) + (g.rx(7) - g.rx(0)) * pH} y2={g.ry(2)} stroke={JAUNE} strokeWidth={12} strokeLinecap="round" />
      {pH > 0.2 && <Puce x={g.rx(0) + 110} y={g.ry(2) - 52} texte="STORY" couleur={JAUNE} texteCouleur={NOIR} taille={28} />}
      {chemins.map((ch, k) => (
        <polyline key={k} points={ch.map(([i, j]) => `${g.rx(i)},${g.ry(j)}`).join(' ')} fill="none" stroke={[CYAN, ROSE, VERT, VIOLET][k % 4]}
          strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - interp(pI, [k * 0.1, k * 0.1 + 0.4], [0, 1])} />
      ))}
      <Fondu delai={tT - 5}>
        <Voiture x={g.rx(3)} y={g.ry(0) + (g.ry(2) - g.ry(0) - 30) * pT} rot={90} couleur={JAUNE} />
        <Personnage x={g.rx(3) + 60} y={g.ry(2) + 20} couleur={ROSE} taille={0.45} />
      </Fondu>
      <Pop cx={1500} cy={300} delai={quand(texte, 'genre', duree)}>
        <Puce x={1480} y={300} texte="A new genre: the open world" couleur={ROSE} taille={34} />
      </Pop>
      <Etiquette titre="Here is a city. Do what you want." y={150} largeur={1150} />
    </Toile>
  );
};

// 13. Vice City
export const ViceCity: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const tR = quand(texte, 'radio', duree);
  return (
    <Toile>
      <Fond ciel="#3a1a5c" />
      <rect x={30} y={30} width={1860} height={520} fill="#6a2a7a" opacity={0.5} />
      <Pop cx={960} cy={640} delai={6}>
        <circle cx={960} cy={640} r={270} fill={ORANGE} />
        <circle cx={960} cy={640} r={270} fill={ROSE} opacity={0.55} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={680} y={640 + i * 46} width={560} height={14 + i * 5} fill="#3a1a5c" />)}
      </Pop>
      <Mer y={800} />
      <Glisse dy={500} delai={quand(texte, 'palm trees', duree) - 10}>
        <Palmier x={250} y={900} taille={1.9} />
        <Palmier x={470} y={900} taille={1.3} />
        <Palmier x={1690} y={900} taille={1.8} />
      </Glisse>
      <Pop cx={1420} cy={520} delai={tR}>
        <Carte x={1420} y={520} l={420} h={220} />
        <Texte x={1420} y={460} taille={30} gras>RADIO · 1986</Texte>
        {Array.from({length: 9}).map((_, i) => {
          const h = 30 + Math.abs(Math.sin(f / 5 + i * 1.3)) * 90;
          return <rect key={i} x={1265 + i * 36} y={600 - h} width={24} height={h} rx={6} fill={i % 2 ? ROSE : CYAN} />;
        })}
      </Pop>
      <Pop cx={500} cy={520} delai={quand(texte, 'Hollywood', duree)}>
        <Puce x={560} y={470} texte="Hollywood cast" couleur={CYAN} texteCouleur={NOIR} taille={36} />
      </Pop>
      <Pop cx={960} cy={830} delai={quand(texte, 'pop culture', duree)}>
        <Puce x={960} y={860} texte="From game to pop culture" couleur={ROSE} taille={44} />
      </Pop>
      <Etiquette titre="Vice City" texte="2002 · a neon 1980s Miami" y={150} largeur={760} />
    </Toile>
  );
};

// 14. San Andreas
export const SanAndreas: React.FC<PropsScene> = ({texte, duree}) => {
  const villes = [{x: 360, y: 700, mot: 'Three cities'}, {x: 520, y: 400, mot: 'Three cities'}, {x: 980, y: 440, mot: 'Three cities'}];
  const actions = [{n: 'Swim', mot: 'swim'}, {n: 'Fly', mot: 'fly'}, {n: 'Haircut', mot: 'haircut'}, {n: 'Gain weight', mot: 'weight'}];
  return (
    <Toile>
      <Fond />
      <Pop cx={670} cy={570} delai={8}>
        <path d="M 150 420 Q 260 300 480 320 Q 700 280 900 330 Q 1180 330 1200 520 Q 1230 760 980 800 Q 700 860 420 830 Q 160 800 150 620 Z" fill={C.mer} />
        <path d="M 200 440 Q 300 340 480 360 Q 690 320 880 370 Q 1130 380 1150 520 Q 1170 720 960 760 Q 700 810 440 790 Q 210 760 200 610 Z" fill="#2f6b4a" />
      </Pop>
      <Fondu delai={quand(texte, 'countryside', duree)}>
        {[[640, 640], [720, 600], [780, 670], [600, 720]].map(([x, y], i) => <path key={i} d={`M ${x - 50} ${y} L ${x} ${y - 70} L ${x + 50} ${y} Z`} fill={VERT} opacity={0.85} />)}
      </Fondu>
      <Fondu delai={quand(texte, 'desert', duree)}>
        <ellipse cx={860} cy={560} rx={150} ry={70} fill={JAUNE} opacity={0.75} />
        <ellipse cx={760} cy={470} rx={90} ry={40} fill={JAUNE} opacity={0.6} />
      </Fondu>
      {villes.map((v, i) => (
        <Pop key={i} cx={v.x} cy={v.y} delai={quand(texte, v.mot, duree) + i * 7}>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={v.x - 46 + k * 24} y={v.y - 40 - (k % 2) * 26} width={20} height={50 + (k % 2) * 26} fill="#e9edff" />)}
          <circle cx={v.x} cy={v.y + 24} r={9} fill={ROSE} />
        </Pop>
      ))}
      {actions.map((a, i) => (
        <Pop key={a.n} cx={1520} cy={350 + i * 95} delai={quand(texte, a.mot, duree)}>
          <Puce x={1520} y={350 + i * 95} texte={a.n} couleur={[CYAN, VIOLET, ROSE, ORANGE][i]} texteCouleur={NOIR} taille={38} />
        </Pop>
      ))}
      <Pop cx={1520} cy={770} delai={quand(texte, 'best-selling', duree)}>
        <Carte x={1520} y={770} l={620} h={150} couleur={JAUNE} rot={-2} />
        <Texte x={1520} y={762} taille={54} gras>#1 on PlayStation 2</Texte>
        <Texte x={1520} y={810} taille={30}>best-selling game on the console</Texte>
      </Pop>
      <Etiquette titre="San Andreas" texte="2004 · one map, three cities" y={150} largeur={760} />
    </Toile>
  );
};

