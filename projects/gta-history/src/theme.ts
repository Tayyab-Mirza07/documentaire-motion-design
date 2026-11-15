import {continueRender, delayRender, getInputProps, staticFile} from 'remotion';
import {loadFont as fredoka} from '@remotion/google-fonts/Fredoka';
import {loadFont as caveat} from '@remotion/google-fonts/Caveat';
import {loadFont as poppins} from '@remotion/google-fonts/Poppins';

// Les styles visuels disponibles. On choisit au rendu :
//   npx remotion render ... --props='{"style":"craie"}'
// Le texte posé sur des cartes/étiquettes reste toujours foncé ; `texteFond` sert
// au texte écrit directement sur le décor.
export type NomStyle = 'papier' | 'craie' | 'infographie' | 'nuit';

type Style = {
  couleurs: typeof PAPIER;
  police: () => string;
  filtre: 'papier' | 'craie' | 'plat' | 'lueur';
};

const PAPIER = {
  creme: '#fbf3e4',
  ciel: '#cfe8ef',
  ciel2: '#c3dde8',
  ciel3: '#b9cbd6',
  soleil: '#ffc94d',
  soleilBord: '#f5a623',
  colline1: '#9fd18b',
  colline2: '#6fb36b',
  colline3: '#4f9a5c',
  mer: '#6cb7d9',
  merFonce: '#3f8fbf',
  goutte: '#4fa3e0',
  nuage: '#ffffff',
  nuageGris: '#c9d3dc',
  montagne: '#b7a28c',
  neige: '#ffffff',
  texte: '#4a3b2c',
  texteFond: '#4a3b2c',
  etiquette: '#fff8ea',
  accent: '#e8735a',
};

// Police variable servie depuis public/ : le rendu ne dépend pas de l'accès à Google Fonts.
const policeLocale = (nom: string, fichiers: string[]) => {
  for (const fichier of fichiers) {
    const attente = delayRender(`Police ${fichier}`);
    const face = new FontFace(nom, `url(${staticFile(fichier)}) format('woff2')`, {weight: '300 700'});
    face.load().then(() => {
      document.fonts.add(face);
      continueRender(attente);
    });
  }
  return nom;
};

const STYLES: Record<NomStyle, Style> = {
  // Collage de papier découpé : bords irréguliers, grain, ombres douces.
  papier: {couleurs: PAPIER, filtre: 'papier', police: () => fredoka('normal', {weights: ['500', '600'], subsets: ['latin', 'latin-ext']}).fontFamily},
  // Tableau noir : fond vert ardoise, décors tracés à la craie, notes en papier.
  craie: {
    couleurs: {...PAPIER, creme: '#2a2420', ciel: '#2f4a3c', ciel2: '#2c4538', ciel3: '#293f34', colline1: '#4d6b55', colline2: '#425e4a',
      colline3: '#38513f', mer: '#4f7f8f', merFonce: '#3d6876', montagne: '#6b6358', nuageGris: '#9aa5a0', texteFond: '#f4f1e8',
      etiquette: '#f6f0dc'},
    filtre: 'craie',
    police: () => caveat('normal', {weights: ['500', '700'], subsets: ['latin', 'latin-ext']}).fontFamily,
  },
  // Infographie moderne : aplats nets, ombres légères, typographie géométrique.
  infographie: {
    couleurs: {...PAPIER, creme: '#e9edf5', ciel: '#f7f9fc', ciel2: '#eef3f9', ciel3: '#e6ecf3', colline1: '#b8e0c8', colline2: '#8fcfa9',
      colline3: '#66bb8a', texte: '#1f2a44', texteFond: '#1f2a44', etiquette: '#ffffff'},
    filtre: 'plat',
    police: () => poppins('normal', {weights: ['500', '600'], subsets: ['latin', 'latin-ext']}).fontFamily,
  },
  // Nuit : fond bleu nuit, éléments lumineux avec un halo.
  nuit: {
    couleurs: {...PAPIER, creme: '#070914', ciel: '#121734', ciel2: '#10142d', ciel3: '#0e1228', colline1: '#24406a', colline2: '#1c3458',
      colline3: '#152846', mer: '#2c6fb0', merFonce: '#1f5590', montagne: '#3a3f63', nuage: '#dfe6ff', nuageGris: '#8a93b8',
      texte: '#141a33', texteFond: '#eef1ff', etiquette: '#e9edff'},
    filtre: 'lueur',
    police: () => policeLocale('Space Grotesk', ['fonts/SpaceGrotesk-latin.woff2', 'fonts/SpaceGrotesk-latin-ext.woff2']),
  },
};

const demande = (getInputProps() as {style?: NomStyle}).style;
export const NOM_STYLE: NomStyle = demande && demande in STYLES ? demande : 'papier';
const style = STYLES[NOM_STYLE];

export const C = style.couleurs;
export const FILTRE = style.filtre;
export const POLICE = style.police();
