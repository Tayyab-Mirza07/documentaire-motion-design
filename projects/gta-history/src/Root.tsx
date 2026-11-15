import {Composition, Still} from 'remotion';
import {calculerDurees, FilmGTA} from './gta/Film';
import {Miniature} from './gta/Miniature';

export const RemotionRoot = () => (
  <>
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
  <Still id="Miniature" component={Miniature} width={1280} height={720} />
  </>
);
