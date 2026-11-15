"""Découpe UNE piste de voix off (ex. un export ElevenLabs) en une piste par scène.

La piste doit contenir une pause d'au moins 1,2 s entre chaque scène, et seulement là.
Le plus simple : générer la voix à partir de `texte_elevenlabs.txt` (créé par
`python decouper_voix.py --preparer`), qui place une balise <break time="2.0s" />
entre les scènes. Ne collez pas les titres des scènes : ils seraient lus à voix haute.

Lancement : python decouper_voix.py --preparer            -> crée texte_elevenlabs.txt
            python decouper_voix.py ma_voix.mp3          -> crée public/voix/<id>.mp3
Options   : --narration src/social/narration.json  --pause 1.2
"""
import argparse
import json
import re
import subprocess
from pathlib import Path


def silences(fichier: str, pause: float) -> list[tuple[float, float]]:
    err = subprocess.run(["ffmpeg", "-i", fichier, "-af", f"silencedetect=n=-38dB:d={pause}", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    debuts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", err)]
    fins = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", err)]
    duree = float(re.search(r"Duration: (\d+):(\d+):([0-9.]+)", err).group(3)) + 60 * int(
        re.search(r"Duration: (\d+):(\d+)", err).group(2)) + 3600 * int(re.search(r"Duration: (\d+)", err).group(1))
    # On ignore le silence du tout début et de la toute fin.
    return [(d, f) for d, f in zip(debuts, fins) if d > 0.05 and f < duree - 0.05], duree


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("voix", nargs="?")
    p.add_argument("--narration", default="src/social/narration.json")
    p.add_argument("--sortie", default="public/voix")
    p.add_argument("--pause", type=float, default=1.2)
    p.add_argument("--preparer", action="store_true")
    a = p.parse_args()
    scenes = json.loads(Path(a.narration).read_text(encoding="utf-8"))

    if a.preparer:
        Path("texte_elevenlabs.txt").write_text('\n<break time="2.0s" />\n'.join(s["texte"] for s in scenes), encoding="utf-8")
        print("OK  texte_elevenlabs.txt : collez-le tel quel dans ElevenLabs.")
        return

    pauses, duree = silences(a.voix, a.pause)
    if len(pauses) != len(scenes) - 1:
        raise SystemExit(
            f"{len(pauses)} longues pauses trouvées, il en faut {len(scenes) - 1} (une entre chaque scène). "
            "Régénérez la voix depuis texte_elevenlabs.txt, ou ajustez --pause.")
    bornes = [0.0] + [x for d, f in pauses for x in (d, f)] + [duree]
    sortie = Path(a.sortie)
    sortie.mkdir(parents=True, exist_ok=True)
    for k, s in enumerate(scenes):
        debut, fin = bornes[2 * k], bornes[2 * k + 1]
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", f"{max(0, debut - 0.1):.3f}", "-to", f"{min(duree, fin + 0.2):.3f}",
                        "-i", a.voix, "-af", "afade=t=in:d=0.05,areverse,afade=t=in:d=0.08,areverse", "-ar", "44100", "-b:a", "192k",
                        str(sortie / f"{s['id']}.mp3")], check=True)
        print(f"{s['id']:<22} {debut:7.2f} -> {fin:7.2f}  ({fin - debut:5.2f} s)")


if __name__ == "__main__":
    main()
