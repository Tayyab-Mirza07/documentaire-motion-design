"""Variante de generer_voix.py qui utilise la voix de Google Traduction (sans clé).
Moins naturelle qu'edge-tts, mais sans dépendance : il faut seulement ffmpeg.
Lancement : python generer_voix_google.py
"""
import json
import re
import subprocess
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

URL = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=en&q="


def morceaux(texte: str, max_len: int = 180) -> list[str]:
    """Découpe le texte en phrases (puis aux virgules si besoin), car le service limite la longueur."""
    res = []
    for phrase in re.split(r"(?<=[.?!])\s+", texte):
        while len(phrase) > max_len:
            coupe = phrase.rfind(",", 0, max_len)
            coupe = coupe if coupe > 0 else phrase.rfind(" ", 0, max_len)
            res.append(phrase[: coupe + 1].strip())
            phrase = phrase[coupe + 1 :].strip()
        res.append(phrase)
    return [m for m in res if m]


def main() -> None:
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--narration", default="src/gta/narration.json")
    p.add_argument("--sortie", default="public/voix")
    a = p.parse_args()
    SORTIE = Path(a.sortie)
    SORTIE.mkdir(parents=True, exist_ok=True)
    for scene in json.loads(Path(a.narration).read_text(encoding="utf-8")):
        with tempfile.TemporaryDirectory() as tmp:
            liste = Path(tmp) / "liste.txt"
            lignes = []
            for i, m in enumerate(morceaux(scene["texte"])):
                mp3 = Path(tmp) / f"{i:02d}.mp3"
                req = urllib.request.Request(URL + urllib.parse.quote(m), headers={"User-Agent": "Mozilla/5.0"})
                mp3.write_bytes(urllib.request.urlopen(req, timeout=30).read())
                lignes.append(f"file '{mp3}'")
            liste.write_text("\n".join(lignes))
            fichier = SORTIE / f"{scene['id']}.mp3"
            # Assemble les morceaux et accélère légèrement la voix (10 %).
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(liste),
                            "-af", "atempo=1.1", "-ar", "44100", str(fichier)], check=True)
        print(f"OK  {fichier}")


if __name__ == "__main__":
    main()
