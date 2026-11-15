import {Composition} from 'remotion';
import {calculerDurees, FilmGTA} from './gta/Film';

export const RemotionRoot = () => (
  <Composition
    id="GTA"
    component={FilmGTA}
    calculateMetadata={calculerDurees}
    defaultProps={{durees: [], avecVoix: [], sousTitres: true}}
    durationInFrames={300}
    fps={30}
    width={1920}
    height={1080}
  />
);
