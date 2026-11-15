import {creerFilm} from '../moteur/film';
import narration from './narration.json';
import {Accroche, Bug, Choix, Dundee, Formule, GTA3, MondeOuvert, Promesse, Rockstar, SanAndreas, Scandale, Septembre, Sortie1997, ViceCity} from './scenes1';
import {Attente, Consequences, Debat, Fin, GTA4, GTA5, GTA6, HotCoffee, Longevite, Online, Record, Sens, Trailer1, Trailer2} from './scenes2';

export const {Film: FilmGTA, calculerDurees} = creerFilm(
  narration,
  [Accroche, Bug, Promesse, Dundee, Choix, Sortie1997, Scandale, Formule, Rockstar, GTA3, Septembre, MondeOuvert, ViceCity, SanAndreas,
    HotCoffee, Consequences, Debat, GTA4, Record, GTA5, Online, Longevite, Attente, Trailer1, Trailer2, GTA6, Sens, Fin],
  'voix/gta',
);
