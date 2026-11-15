import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Etiquette, Fond, Glisse, interp, Mer, Personnage, Pop, Texte, Toile} from '../papier';
import {PropsScene} from '../moteur/film';
import {Barre, BLEU, Carte, Certificat, Compteur, Console, CYAN, Epingle, Fondu, grille, JAUNE, Lecteur, NOIR, ORANGE, Palmier,
  Puce, quand, ROSE, ROUGE, Skyline, Source, Tampon, VERT, Ville, VIOLET, Voiture} from './pieces';

// 15. Hot Coffee
export const HotCoffee: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const tC = quand(texte, 'Hot Coffee', duree);
  const tM = quand(texte, 'modders', duree);
  const ouvert = interp(f, [tM + 10, tM + 25], [0, 1]);
  return (
    <Toile>
      <Fond />
      <Pop cx={480} cy={580} delai={8}>
        <circle cx={480} cy={580} r={250} fill="#c9cfe6" />
        <circle cx={480} cy={580} r={250} fill="none" stroke={CYAN} strokeWidth={10} opacity={0.7} />
        <circle cx={480} cy={580} r={150} fill="none" stroke="#fff" strokeWidth={5} opacity={0.6} />
        <circle cx={480} cy={580} r={62} fill={C.ciel} />
        <circle cx={480} cy={580} r={26} fill={NOIR} />
      </Pop>
      <Pop cx={1080} cy={580} delai={tM}>
        <path d="M 860 430 L 1010 430 L 1050 470 L 1300 470 L 1300 740 L 860 740 Z" fill={JAUNE} />
        <rect x={860} y={500} width={440} height={240} rx={10} fill="#f0b82a" />
        <g transform={`translate(1080 620)`}>
          <path d={`M -34 -20 L -34 -52 A 34 34 0 0 1 34 -52 L 34 -20`} fill="none" stroke={NOIR} strokeWidth={14} transform={`rotate(${-38 * ouvert} 34 -20)`} />
          <rect x={-56} y={-22} width={112} height={90} rx={14} fill={NOIR} />
          <circle cy={16} r={12} fill={JAUNE} />
        </g>
      </Pop>
      <Pop cx={1560} cy={580} delai={tC}>
        <Carte x={1560} y={580} l={400} h={430} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${1500 + i * 60} ${510 - ((f * 1.2 + i * 20) % 40)} q 18 -22 0 -44 q -18 -22 0 -44`} fill="none" stroke="#8a93b8" strokeWidth={8} strokeLinecap="round"
            opacity={1 - ((f * 1.2 + i * 20) % 40) / 40} />
        ))}
        <path d="M 1450 540 L 1670 540 L 1650 690 Q 1560 730 1470 690 Z" fill="#fff" stroke={NOIR} strokeWidth={6} />
        <path d="M 1670 570 q 70 10 60 60 q -10 40 -75 40" fill="none" stroke={NOIR} strokeWidth={14} />
        <ellipse cx={1560} cy={546} rx={104} ry={18} fill="#6b3d1e" />
        <Texte x={1560} y={765} taille={40} gras>“Hot Coffee”</Texte>
      </Pop>
      <Fondu delai={tM - 5}><Texte x={480} y={880} taille={36} surFond>The game disc</Texte></Fondu>
      <Pop cx={1080} cy={830} delai={quand(texte, 'never actually', duree)}>
        <Puce x={1080} y={830} texte="Switched off. Never removed." couleur={ROSE} taille={38} />
      </Pop>
      <Etiquette titre="2005: a hidden scene" y={150} largeur={800} />
    </Toile>
  );
};

// 16. Les conséquences
export const Consequences: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const tAO = quand(texte, 'Adults Only', duree);
  const tR = quand(texte, 'pulled', duree);
  const tC = quand(texte, 'twenty-four', duree);
  const ao = f > tAO;
  const ech = 1 + Math.max(0, 1 - Math.abs(f - tAO) / 8) * 0.25;
  return (
    <Toile>
      <Fond />
      <Pop cx={330} cy={560} delai={8}>
        <g transform={`translate(330 560) scale(${ech}) translate(-330 -560)`}>
          <Carte x={330} y={560} l={330} h={440} rx={16} couleur={ao ? ROUGE : '#e9edff'} />
          <rect x={185} y={360} width={290} height={400} rx={10} fill="none" stroke={NOIR} strokeWidth={8} />
          <Texte x={330} y={620} taille={ao ? 170 : 220} gras couleur={ao ? '#fff' : NOIR}>{ao ? 'AO' : 'M'}</Texte>
          <Texte x={330} y={720} taille={32} gras couleur={ao ? '#fff' : NOIR}>{ao ? 'ADULTS ONLY' : 'MATURE 17+'}</Texte>
        </g>
      </Pop>
      <Pop cx={960} cy={560} delai={tR - 25}>
        <Carte x={960} y={560} l={620} h={440} />
        {[0, 1, 2].map((j) => <rect key={j} x={690} y={460 + j * 120} width={540} height={12} rx={6} fill="#8a93b8" />)}
        {Array.from({length: 15}).map((_, k) => {
          const i = k % 5, j = Math.floor(k / 5);
          const part = interp(f, [tR + k * 2, tR + k * 2 + 10], [1, 0]);
          return <rect key={k} x={705 + i * 106} y={375 + j * 120} width={76} height={84} rx={8} fill={[ROSE, CYAN, VIOLET, ORANGE][k % 4]} opacity={part} transform={`translate(0 ${(1 - part) * -40})`} />;
        })}
        <Texte x={960} y={765} taille={30}>Store shelves</Texte>
      </Pop>
      <Fondu delai={tC - 10}>
        <Compteur x={1570} y={500} a={24.5} t0={tC - 10} dur={35} fmt={(v) => `$${v.toFixed(1)}M`} taille={120} />
        <Texte x={1570} y={560} taille={36} surFond>in return costs</Texte>
      </Fondu>
      <Pop cx={1570} cy={720} delai={quand(texte, 'Federal', duree)}>
        <Tampon x={1570} y={720} texte="FTC · 2006" couleur={CYAN} rot={-6} taille={64} />
      </Pop>
      <Etiquette titre="The fallout" y={150} largeur={600} />
      <Source>Game Developer; FTC (2006)</Source>
    </Toile>
  );
};

// 17. Le grand débat
export const Debat: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 22) * 7;
  const rad = (a * Math.PI) / 180;
  const bx = 430 * Math.cos(rad), by = 430 * Math.sin(rad);
  const plateau = (x: number, y: number, c: string, titre: string, lignes: string[]) => (
    <g>
      <line x1={x} y1={y} x2={x - 150} y2={y + 190} stroke="#e9edff" strokeWidth={5} />
      <line x1={x} y1={y} x2={x + 150} y2={y + 190} stroke="#e9edff" strokeWidth={5} />
      <rect x={x - 220} y={y + 190} width={440} height={170} rx={24} fill={c} />
      <Texte x={x} y={y + 252} taille={46} gras couleur={NOIR}>{titre}</Texte>
      {lignes.map((l, i) => <Texte key={l} x={x} y={y + 298 + i * 38} taille={30} couleur={NOIR}>{l}</Texte>)}
    </g>
  );
  return (
    <Toile>
      <Fond />
      <rect x={945} y={330} width={30} height={520} rx={10} fill="#e9edff" />
      <rect x={760} y={840} width={400} height={30} rx={12} fill="#e9edff" />
      <g filter="url(#papier)">
        <line x1={960 - bx} y1={360 - by} x2={960 + bx} y2={360 + by} stroke="#e9edff" strokeWidth={18} strokeLinecap="round" />
        <circle cx={960} cy={360} r={26} fill={JAUNE} />
      </g>
      <Fondu delai={quand(texte, 'Campaigners', duree) - 8}>
        {plateau(960 - bx, 360 - by, ROSE, 'BAN IT', ['Campaigners', 'and politicians'])}
      </Fondu>
      <Fondu delai={quand(texte, 'Defenders', duree) - 8}>
        {plateau(960 + bx, 360 + by, CYAN, 'SATIRE', ['Made for adults', 'and rated 18+'])}
      </Fondu>
      <Etiquette titre="Do violent games cause harm?" y={150} largeur={1050} />
    </Toile>
  );
};

// 18. GTA IV
export const GTA4: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'American dream', duree);
  const px = interp(f, [quand(texte, 'Niko', duree), duree], [520, 980]);
  const etoile = (cx: number, cy: number) => Array.from({length: 10}).map((_, i) => {
    const r = i % 2 ? 22 : 52, an = (i * Math.PI) / 5 - Math.PI / 2;
    return `${cx + r * Math.cos(an)},${cy + r * Math.sin(an)}`;
  }).join(' ');
  return (
    <Toile>
      <Fond ciel="#1a1d33" />
      <Skyline x={700} y={800} l={1190} hMax={430} graine={5} couleur="#2a3050" />
      <rect x={30} y={800} width={1860} height={250} fill="#11142a" />
      <Glisse dx={-600} delai={8}>
        <path d="M 90 720 L 420 720 L 380 800 L 130 800 Z" fill="#8a93b8" />
        <rect x={190} y={650} width={150} height={70} fill="#c9cfe6" />
        <rect x={240} y={590} width={36} height={60} fill={ROUGE} />
      </Glisse>
      <Fondu delai={quand(texte, 'Niko', duree) - 5}>
        <Personnage x={px} y={840} couleur="#5a6a52" taille={1.3} />
        <rect x={px + 50} y={800} width={50} height={40} rx={6} fill="#8a5a2a" />
        <Puce x={px + 20} y={650} texte="Niko Bellic" couleur="#e9edff" texteCouleur={NOIR} taille={30} />
      </Fondu>
      <Fondu delai={t - 8}>
        <g filter="url(#papier)"><polygon points={etoile(px + 330, 600 + Math.sin(f / 9) * 12)} fill={JAUNE} /></g>
        <Puce x={px + 330} y={700} texte="the dream" couleur={JAUNE} texteCouleur={NOIR} taille={26} />
      </Fondu>
      <Etiquette titre="Grand Theft Auto IV" texte="April 2008 · back to Liberty City" y={150} largeur={900} />
    </Toile>
  );
};

// 19. Un jour record
export const Record: React.FC<PropsScene> = ({texte, duree}) => {
  const tJ = quand(texte, 'three point six', duree);
  return (
    <Toile>
      <Fond />
      <line x1={180} y1={800} x2={980} y2={800} stroke="#e9edff" strokeWidth={5} opacity={0.6} />
      <Barre x={380} base={800} l={220} h={250} t0={quand(texte, 'three hundred and ten', duree)} couleur={CYAN} valeur="$310M" nom="Day one" />
      <Barre x={760} base={800} l={220} h={400} t0={quand(texte, 'five hundred million', duree)} couleur={ROSE} valeur="$500M" nom="Week one" />
      <Fondu delai={tJ - 5}>
        <Compteur x={1440} y={430} a={3.6} t0={tJ - 5} dur={30} fmt={(v) => `${v.toFixed(1)}M`} taille={130} />
        <Texte x={1440} y={490} taille={38} surFond>copies on day one</Texte>
      </Fondu>
      <Pop cx={1440} cy={700} delai={quand(texte, 'Guinness', duree)}>
        <Certificat x={1440} y={700} titre="World record" texte="Top-grossing game in 24 h" />
      </Pop>
      <Etiquette titre="A record launch" y={150} largeur={700} />
      <Source>Guinness World Records, via Neowin (2008)</Source>
    </Toile>
  );
};

// 20. GTA V
export const GTA5: React.FC<PropsScene> = ({texte, duree}) => {
  const noms = [{n: 'Michael', c: BLEU}, {n: 'Franklin', c: VERT}, {n: 'Trevor', c: ORANGE}];
  return (
    <Toile>
      <Fond />
      {noms.map((p, i) => (
        <Pop key={p.n} cx={300 + i * 220} cy={640} delai={quand(texte, p.n, duree)}>
          <Carte x={300 + i * 220} y={600} l={190} h={400} couleur={p.c} />
          <Personnage x={300 + i * 220} y={650} couleur="#e9edff" taille={1.3} phase={i * 2} />
          <Texte x={300 + i * 220} y={760} taille={34} gras couleur={NOIR}>{p.n}</Texte>
        </Pop>
      ))}
      <line x1={1000} y1={800} x2={1780} y2={800} stroke="#e9edff" strokeWidth={5} opacity={0.6} />
      <Barre x={1180} base={800} l={200} h={155} t0={quand(texte, 'eight hundred', duree) - 25} couleur={CYAN} valeur="$310M" nom="GTA IV · day one" />
      <Barre x={1560} base={800} l={200} h={400} t0={quand(texte, 'eight hundred', duree)} couleur={ROSE} valeur="$800M" nom="GTA V · day one" />
      <Pop cx={1370} cy={400} delai={quand(texte, 'one billion', duree)}>
        <Puce x={1180} y={420} texte="$1B in 3 days" couleur={JAUNE} texteCouleur={NOIR} taille={44} />
      </Pop>
      <Etiquette titre="Grand Theft Auto V" texte="September 2013 · Los Santos" y={150} largeur={860} />
      <Source>Take-Two, via GameSpot (2013)</Source>
    </Toile>
  );
};

// 21. GTA Online
export const Online: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const g = grille(110, 290, 1700, 420, 8, 2, 40);
  const t = quand(texte, 'shared playground', duree);
  const pts = Array.from({length: 26}).map((_, i) => ({x: 180 + ((i * 263) % 1560), y: 320 + ((i * 157) % 360)}));
  const maj = quand(texte, 'year after year', duree);
  return (
    <Toile>
      <Fond />
      <g filter="url(#papier)" opacity={0.75}><Ville g={g} /></g>
      {pts.map((p, i) => {
        const q = pts[(i + 5) % pts.length];
        const o = interp(f, [t + i * 2, t + i * 2 + 10], [0, 1]);
        return (
          <g key={i} opacity={o}>
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={CYAN} strokeWidth={3} opacity={0.45} />
            <circle cx={p.x} cy={p.y} r={15 + Math.sin(f / 6 + i) * 3} fill={[ROSE, CYAN, JAUNE, VERT][i % 4]} />
          </g>
        );
      })}
      <line x1={200} y1={810} x2={1720} y2={810} stroke="#e9edff" strokeWidth={5} opacity={0.6} />
      {['2013', '2015', '2017', '2019', '2021', '2023', '2025'].map((an, i) => (
        <Pop key={an} cx={260 + i * 233} cy={810} delai={maj - 10 + i * 5}>
          <Puce x={260 + i * 233} y={810} texte={an} couleur={i % 2 ? VIOLET : ROSE} taille={34} />
        </Pop>
      ))}
      <Fondu delai={maj - 10}><Texte x={960} y={890} taille={34} surFond>New updates, year after year</Texte></Fondu>
      <Etiquette titre="Grand Theft Auto Online" texte="A shared city, at no extra cost" y={150} largeur={900} />
    </Toile>
  );
};

// 22. 235 millions
export const Longevite: React.FC<PropsScene> = ({texte, duree}) => {
  const t = quand(texte, 'two hundred', duree);
  const gens = [{n: '2013', c: '#5a6aa8', mot: 'First PlayStation 3'}, {n: '2014', c: BLEU, mot: 'then the next'}, {n: '2022', c: VIOLET, mot: 'then the one after'}];
  return (
    <Toile>
      <Fond />
      {gens.map((g, i) => (
        <Pop key={g.n} cx={330 + i * 330} cy={420} delai={quand(texte, g.mot, duree)}>
          <Console x={330 + i * 330} y={400} couleur={g.c} nom={`Gen. ${i + 1} · ${g.n}`} />
        </Pop>
      ))}
      <Fondu delai={quand(texte, 'then the next', duree)}>
        <path d="M 470 400 L 520 400 M 800 400 L 850 400" stroke={JAUNE} strokeWidth={10} strokeLinecap="round" />
      </Fondu>
      <Fondu delai={t - 10}>
        <Compteur x={660} y={720} a={235} t0={t - 10} dur={45} fmt={(v) => `≈${Math.round(v)}M`} taille={170} />
        <Texte x={660} y={790} taille={40} surFond>copies sold by September 2026</Texte>
      </Fondu>
      <Pop cx={1500} cy={560} delai={quand(texte, 'Thirteen', duree)}>
        <Carte x={1500} y={560} l={520} h={420} rot={2} />
        <Texte x={1500} y={560} taille={190} gras couleur="#d81b6a">13</Texte>
        <Texte x={1500} y={640} taille={48} gras>years old</Texte>
        <Texte x={1500} y={700} taille={34}>and still on the charts</Texte>
      </Pop>
      <Etiquette titre="One game, three generations" y={150} largeur={950} />
      <Source>Take-Two results, Nov. 2026 (press reports)</Source>
    </Toile>
  );
};

// 23. L'attente
export const Attente: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t0 = quand(texte, 'Year after year', duree);
  const tF = quand(texte, '2022', duree);
  const ans = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  return (
    <Toile>
      <Fond />
      {ans.map((a, i) => (
        <Pop key={a} cx={250 + (i % 4) * 230} cy={380 + Math.floor(i / 4) * 130} delai={t0 - 20 + i * 6}>
          <Carte x={250 + (i % 4) * 230} y={380 + Math.floor(i / 4) * 130} l={200} h={104} />
          <Texte x={250 + (i % 4) * 230} y={398 + Math.floor(i / 4) * 130} taille={54} gras>{a}</Texte>
        </Pop>
      ))}
      <Fondu delai={t0 - 20}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Personnage key={i} x={200 + i * 125} y={800} couleur={[ROSE, CYAN, JAUNE, VERT, VIOLET, ORANGE, BLEU][i]} taille={0.9} phase={i * 1.7} />
        ))}
        <Texte x={575} y={870} taille={34} surFond>No new chapter</Texte>
      </Fondu>
      <Pop cx={1420} cy={560} delai={tF}>
        <Carte x={1420} y={330} l={560} h={110} couleur={ROUGE} />
        <Texte x={1420} y={350} taille={60} gras couleur="#fff">2022 · THE LEAK</Texte>
      </Pop>
      {Array.from({length: 9}).map((_, k) => {
        const p = interp(f, [tF + 12 + k * 4, tF + 30 + k * 4], [0, 1]);
        const x = 1230 + (k % 3) * 190, y = 480 + Math.floor(k / 3) * 125;
        return (
          <g key={k} opacity={p} transform={`translate(0 ${(1 - p) * -120}) rotate(${(k % 3 - 1) * 4} ${x} ${y})`}>
            <rect x={x - 82} y={y - 50} width={164} height={100} rx={10} fill="#3a3f63" stroke="#8a93b8" strokeWidth={4} />
            <path d={`M ${x - 12} ${y - 18} L ${x + 18} ${y} L ${x - 12} ${y + 18} Z`} fill="#c9cfe6" />
          </g>
        );
      })}
      <Fondu delai={tF + 40}><Texte x={1420} y={880} taille={34} surFond>Early development footage</Texte></Fondu>
      <Etiquette titre="The long wait" y={150} largeur={640} />
    </Toile>
  );
};

// Anneau « 24 heures » qui se remplit.
const Anneau: React.FC<{x: number; y: number; r: number; p: number; couleur: string}> = ({x, y, r, p, couleur}) => {
  const c = 2 * Math.PI * r;
  return (
    <g transform={`rotate(-90 ${x} ${y})`}>
      <circle cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeOpacity={0.15} strokeWidth={22} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={couleur} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${c * p} ${c}`} />
    </g>
  );
};

// 24. La première bande-annonce
export const Trailer1: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'ninety million', duree);
  const p = interp(f, [t - 10, t + 40], [0, 1]);
  return (
    <Toile>
      <Fond />
      <Pop cx={520} cy={570} delai={quand(texte, 'first trailer', duree)}>
        <Lecteur x={520} y={560} l={700} h={400} />
        <Texte x={520} y={820} taille={38} surFond>Trailer 1 · December 2023</Texte>
      </Pop>
      <Fondu delai={t - 12}>
        <Anneau x={1400} y={520} r={210} p={p} couleur={ROSE} />
        <Compteur x={1400} y={540} a={90} t0={t - 10} dur={50} fmt={(v) => `${Math.round(v)}M+`} taille={130} />
        <Texte x={1400} y={600} taille={34} surFond>YouTube views</Texte>
        <Texte x={1400} y={420} taille={34} gras surFond>24 hours</Texte>
      </Fondu>
      <Pop cx={1400} cy={810} delai={quand(texte, 'Guinness', duree)}>
        <Puce x={1400} y={820} texte="Guinness record · game reveal" couleur={JAUNE} texteCouleur={NOIR} taille={34} />
      </Pop>
      <Etiquette titre="Grand Theft Auto VI: first trailer" y={150} largeur={1150} />
      <Source>Guinness World Records (2023)</Source>
    </Toile>
  );
};

// 25. La deuxième bande-annonce et les reports
export const Trailer2: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const t = quand(texte, 'four hundred', duree);
  const dates = [{n: '2025', mot: 'from 2025', barre: 'May 2026'}, {n: 'May 2026', mot: 'May 2026', barre: 'November'}, {n: 'Nov. 2026', mot: 'November', barre: ''}];
  return (
    <Toile>
      <Fond />
      <Pop cx={420} cy={480} delai={8}>
        <Lecteur x={420} y={470} l={520} h={300} couleur="#2a1a4a" />
        <Texte x={420} y={680} taille={36} surFond>Trailer 2 · May 2025</Texte>
      </Pop>
      <Fondu delai={t - 12}>
        <Compteur x={1260} y={480} a={475} t0={t - 10} dur={50} fmt={(v) => `${Math.round(v)}M`} taille={190} />
        <Texte x={1260} y={550} taille={38} surFond>views in 24 hours, all platforms</Texte>
        <Texte x={1260} y={596} taille={28} surFond opacite={0.75}>Figure reported by Rockstar</Texte>
      </Fondu>
      {dates.map((d, i) => {
        const td = quand(texte, d.mot, duree);
        const tb = d.barre ? quand(texte, d.barre, duree) : 99999;
        return (
          <Pop key={d.n} cx={520 + i * 440} cy={790} delai={td - 6}>
            <Carte x={520 + i * 440} y={790} l={360} h={110} couleur={d.barre ? '#c9cfe6' : JAUNE} />
            <Texte x={520 + i * 440} y={810} taille={56} gras>{d.n}</Texte>
            {d.barre && <rect x={370 + i * 440} y={784} width={300 * interp(f, [tb - 4, tb + 8], [0, 1])} height={12} rx={6} fill={ROUGE} />}
          </Pop>
        );
      })}
      <Fondu delai={quand(texte, 'slipped twice', duree)}>
        <path d="M 715 790 L 745 790 M 1155 790 L 1185 790" stroke={JAUNE} strokeWidth={10} strokeLinecap="round" />
      </Fondu>
      <Etiquette titre="Bigger trailer, later date" y={150} largeur={900} />
      <Source>Rockstar Games, via The Hollywood Reporter</Source>
    </Toile>
  );
};

// 26. GTA VI
export const GTA6: React.FC<PropsScene> = ({texte, duree}) => (
  <Toile>
    <Fond ciel="#3a1a5c" />
    <Pop cx={1400} cy={640} delai={quand(texte, 'Vice City', duree) - 10}>
      <circle cx={1400} cy={640} r={240} fill={ORANGE} />
      <circle cx={1400} cy={640} r={240} fill={ROSE} opacity={0.5} />
    </Pop>
    <Glisse dy={600} delai={quand(texte, 'Vice City', duree) - 6}>
      <Skyline x={1020} y={800} l={870} hMax={330} graine={7} couleur="#1c1030" />
    </Glisse>
    <Mer y={800} />
    <Glisse dy={500} delai={quand(texte, 'Leonida', duree) - 8}>
      <Palmier x={1080} y={900} taille={1.6} />
      <Palmier x={1760} y={900} taille={1.9} />
    </Glisse>
    <Pop cx={520} cy={470} delai={quand(texte, 'November nineteenth', duree) - 6}>
      <Carte x={520} y={470} l={760} h={330} rot={-2} />
      <g transform="rotate(-2 520 470)">
        <rect x={140} y={305} width={760} height={90} rx={24} fill={ROSE} />
        <Texte x={520} y={368} taille={50} gras couleur="#fff">RELEASE DATE</Texte>
        <Texte x={520} y={510} taille={96} gras>19 NOV. 2026</Texte>
        <Texte x={520} y={590} taille={36}>PlayStation 5 · Xbox Series</Texte>
      </g>
    </Pop>
    <Pop cx={1400} cy={760} delai={quand(texte, 'Jason', duree)}>
      <Personnage x={1330} y={800} couleur={CYAN} taille={1.5} />
      <Personnage x={1480} y={800} couleur={ROSE} taille={1.5} phase={2} />
      <Puce x={1405} y={570} texte="Jason &amp; Lucia" couleur="#e9edff" texteCouleur={NOIR} taille={34} />
    </Pop>
    <Pop cx={520} cy={760} delai={quand(texte, 'Thirteen', duree)}>
      <Puce x={520} y={760} texte="2013 → 2026 · 13 years" couleur={JAUNE} texteCouleur={NOIR} taille={44} />
    </Pop>
    <Etiquette titre="Grand Theft Auto VI" texte="Vice City, state of Leonida" y={150} largeur={860} />
  </Toile>
);

// 27. Trois lectures
export const Sens: React.FC<PropsScene> = ({texte, duree}) => {
  const p = [
    {t: 'For critics', s: 'a bad influence', c: ROUGE, mot: 'critics'},
    {t: 'For fans', s: 'a parody of America', c: JAUNE, mot: 'fans'},
    {t: 'For the industry', s: 'the standard to beat', c: CYAN, mot: 'industry'},
  ];
  return (
    <Toile>
      <Fond />
      {p.map((q, i) => {
        const x = 370 + i * 590;
        return (
          <Pop key={q.t} cx={x} cy={570} delai={quand(texte, q.mot, duree) - 6}>
            <Carte x={x} y={570} l={520} h={500} />
            <circle cx={x} cy={480} r={96} fill={q.c} />
            {i === 0 && <><rect x={x - 11} y={430} width={22} height={64} rx={8} fill={NOIR} /><circle cx={x} cy={522} r={13} fill={NOIR} /></>}
            {i === 1 && <><circle cx={x - 32} cy={462} r={11} fill={NOIR} /><circle cx={x + 32} cy={462} r={11} fill={NOIR} />
              <path d={`M ${x - 48} ${495} Q ${x} ${560} ${x + 48} ${495} Z`} fill={NOIR} /></>}
            {i === 2 && <>{[0, 1, 2].map((k) => <rect key={k} x={x - 50 + k * 36} y={520 - (k + 1) * 30} width={28} height={(k + 1) * 30} rx={5} fill={NOIR} />)}</>}
            <Texte x={x} y={670} taille={50} gras>{q.t}</Texte>
            <Texte x={x} y={730} taille={38}>{q.s}</Texte>
          </Pop>
        );
      })}
      <Etiquette titre="So what is Grand Theft Auto?" y={150} largeur={1050} />
    </Toile>
  );
};

// 28. Retour à Dundee
export const Fin: React.FC<PropsScene> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const g = grille(110, 420, 900, 420, 4, 2, 44);
  const t = quand(texte, 'ramming', duree);
  const choc = f > t ? Math.max(0, Math.sin((f - t) / 3.2)) : 0;
  const jalons = ['1997', '2001', '2004', '2008', '2013', '2026'];
  const tEmp = quand(texte, 'This one', duree);
  return (
    <Toile>
      <Fond />
      <line x1={200} y1={330} x2={1720} y2={330} stroke="#e9edff" strokeWidth={5} opacity={0.6} />
      {jalons.map((a, i) => (
        <Pop key={a} cx={1720 - i * 304} cy={330} delai={6 + i * 5}>
          <Puce x={200 + (jalons.length - 1 - i) * 304} y={330} texte={jalons[jalons.length - 1 - i]} couleur={i === jalons.length - 1 ? ROSE : VIOLET} taille={36} />
        </Pop>
      ))}
      <Glisse dy={700} delai={quand(texte, 'Dundee', duree)}>
        <Ville g={g} />
      </Glisse>
      <Fondu delai={quand(texte, 'Dundee', duree) + 10}>
        <Epingle x={200} y={470} />
        <Voiture x={560 + choc * 12} y={g.ry(1)} />
        <Voiture x={440 + choc * 34} y={g.ry(1)} police />
        <Voiture x={690 - choc * 34} y={g.ry(1)} rot={180} police />
      </Fondu>
      <Pop cx={1440} cy={560} delai={quand(texte, 'Most bugs', duree)}>
        <Carte x={1440} y={540} l={700} h={130} couleur="#c9cfe6" rot={-2} />
        <Texte x={1440} y={560} taille={58} gras>Most bugs get fixed.</Texte>
      </Pop>
      <Pop cx={1440} cy={730} delai={tEmp}>
        <Carte x={1440} y={730} l={840} h={150} couleur={ROSE} rot={2} />
        <Texte x={1440} y={752} taille={62} gras couleur="#fff">This one built an empire.</Texte>
      </Pop>
      <Etiquette titre="It all leads back to Dundee" y={150} largeur={950} />
    </Toile>
  );
};

