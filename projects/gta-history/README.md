# GTA: the bug that built an empire

Remotion project for an 8-minute motion-design documentary (28 scenes, 7:44), built with the `documentaire-motion-design` skill.

- `SCRIPT.md`: title, hook, scene-by-scene script, chapters and sources
- `src/gta/narration.json`: the voice-over text, one entry per scene
- `src/gta/scenes1.tsx`, `src/gta/scenes2.tsx`: the 28 scenes; `src/gta/pieces.tsx`: reusable shapes
- `public/voix/gta/`: provisional voice tracks (Google TTS). Replace them with a real voice, one MP3 per scene id.
- `public/fonts/`: Space Grotesk (SIL Open Font License), loaded locally so rendering works offline

## Commands

```bash
npm install
npm run studio                                   # live preview
node scripts/planche.mjs nuit 0.8                # one still per scene in out/planche/
npx remotion render src/index.ts GTA out/gta-history.mp4 --props='{"style":"nuit"}' --concurrency=4
python3 generer_voix_google.py --narration src/gta/narration.json --sortie public/voix/gta   # regenerate the provisional voice
```

Set `CHROME=/path/to/chrome` for `planche.mjs`, or pass `--browser-executable` to Remotion, when no system Chrome is available.
