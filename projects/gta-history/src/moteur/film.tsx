import React from 'react';
import {AbsoluteFill, CalculateMetadataFunction, Html5Audio, interpolate, Series, staticFile, useCurrentFrame} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {C, POLICE} from '../theme';

// Moteur commun à tous les films : enchaîne les scènes, pose la voix off et les
// sous-titres, et cale la durée de chaque scène sur sa piste audio.

export const FPS = 30;
export type Narration = {id: string; texte: string}[];
export type PropsScene = {texte: string; duree: number};
export type PropsFilm = {durees: number[]; avecVoix: boolean[]; sousTitres: boolean; style?: string};

// Instant (en images) où un mot est prononcé, estimé d'après sa position dans le texte.
// Sert à faire apparaître chaque élément au moment où la voix en parle.
export const instantDuMot = (texte: string, mot: string, duree: number) => {
  const i = texte.indexOf(mot);
  if (i < 0) return 0;
  return Math.round((i / texte.length) * (duree - 15) * 0.85);
};

const Fondu: React.FC<{duree: number; children: React.ReactNode}> = ({duree, children}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 10, duree - 10, duree], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

// Sous-titres : le texte est découpé en phrases, chacune affichée pendant une durée
// proportionnelle à sa longueur.
const SousTitres: React.FC<{texte: string; duree: number}> = ({texte, duree}) => {
  const f = useCurrentFrame();
  const phrases = texte.split(/(?<=[.?!])\s+/);
  const total = phrases.reduce((a, p) => a + p.length, 0);
  const utile = duree - 20;
  let debut = 5;
  let actuelle = phrases[phrases.length - 1];
  for (const p of phrases) {
    const d = (p.length / total) * utile;
    if (f < debut + d) {
      actuelle = p;
      break;
    }
    debut += d;
  }
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 62}}>
      <div style={{fontFamily: POLICE, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: '#fff', background: 'rgba(30,25,20,0.82)',
        padding: '12px 30px', borderRadius: 14, maxWidth: 1500, textAlign: 'center'}}>
        {actuelle}
      </div>
    </AbsoluteFill>
  );
};

// `dossierVoix` : sous-dossier de public/ qui contient <id>.mp3 pour chaque scène.
// `marge` : secondes ajoutées après chaque piste avant la scène suivante (plus petit = rythme plus soutenu).
export const creerFilm = (narration: Narration, scenes: React.FC<PropsScene>[], dossierVoix: string, marge = 1.2) => {
  if (scenes.length !== narration.length) {
    throw new Error(`${narration.length} textes de narration mais ${scenes.length} scènes`);
  }

  // Durée de chaque scène : celle de sa piste de voix si elle existe,
  // sinon une estimation d'après le nombre de mots.
  const calculerDurees: CalculateMetadataFunction<PropsFilm> = async ({props}) => {
    const res = await Promise.all(
      narration.map(async (s) => {
        const src = staticFile(`${dossierVoix}/${s.id}.mp3`);
        try {
          const r = await fetch(src, {method: 'HEAD'});
          if (!r.ok) throw new Error('absent');
          const sec = await getAudioDurationInSeconds(src);
          return {duree: Math.ceil((sec + marge) * FPS), voix: true};
        } catch {
          const mots = s.texte.split(/\s+/).length;
          return {duree: Math.ceil((mots / 2.4 + 1.5) * FPS), voix: false};
        }
      }),
    );
    const durees = res.map((r) => r.duree);
    return {durationInFrames: durees.reduce((a, b) => a + b, 0), props: {...props, durees, avecVoix: res.map((r) => r.voix)}};
  };

  const Film: React.FC<PropsFilm> = ({durees, avecVoix, sousTitres}) => (
    <AbsoluteFill style={{backgroundColor: C.creme}}>
      <Series>
        {narration.map((s, i) => {
          const Scene = scenes[i];
          const duree = durees[i];
          return (
            <Series.Sequence key={s.id} durationInFrames={duree}>
              <Fondu duree={duree}>
                <Scene texte={s.texte} duree={duree} />
              </Fondu>
              {sousTitres && <SousTitres texte={s.texte} duree={duree} />}
              {avecVoix[i] && <Html5Audio src={staticFile(`${dossierVoix}/${s.id}.mp3`)} />}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );

  return {Film, calculerDurees};
};
