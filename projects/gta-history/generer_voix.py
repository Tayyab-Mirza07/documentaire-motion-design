"""Génère la voix off de la vidéo, une piste MP3 par scène.

Utilise edge-tts (voix neuronales gratuites de Microsoft, pas de clé API).
Installation :  pip install edge-tts
Lancement   :  python generer_voix.py              (voix masculine par défaut)
               python generer_voix.py --voix fr-FR-DeniseNeural
Liste des voix françaises :  edge-tts --list-voices | grep fr-

Le texte est lu depuis --narration (par défaut src/social/narration.json) : modifiez-le là, relancez ce
script, puis relancez le rendu (`npx remotion render …`). La vidéo se cale toute seule sur la
durée de chaque piste.
"""
import argparse
import asyncio
import json
from pathlib import Path

import edge_tts



async def main(voix: str, debit: str, texte: Path, sortie: Path) -> None:
    sortie.mkdir(parents=True, exist_ok=True)
    for scene in json.loads(texte.read_text(encoding="utf-8")):
        fichier = sortie / f"{scene['id']}.mp3"
        await edge_tts.Communicate(scene["texte"], voix, rate=debit).save(str(fichier))
        print(f"OK  {fichier}")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--voix", default="fr-FR-HenriNeural")
    p.add_argument("--debit", default="-5%", help="vitesse de lecture, ex. -10%% ou +5%%")
    p.add_argument("--narration", default="src/social/narration.json")
    p.add_argument("--sortie", default="public/voix")
    a = p.parse_args()
    asyncio.run(main(a.voix, a.debit, Path(a.narration), Path(a.sortie)))
