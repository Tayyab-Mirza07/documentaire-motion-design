// Rend une image fixe par scène (à ~80 % de sa durée) dans out/planche/, pour vérifier la mise en page.
// Usage : node scripts/planche.mjs [style] [fraction]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const style = process.argv[2] ?? 'nuit';
const fraction = Number(process.argv[3] ?? 0.8);
const browserExecutable = process.env.CHROME ?? undefined;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const inputProps = {style};
const comp = await selectComposition({serveUrl, id: 'GTA', inputProps, browserExecutable});
const durees = comp.props.durees;
fs.mkdirSync('out/planche', {recursive: true});
let debut = 0;
for (let i = 0; i < durees.length; i++) {
  const frame = debut + Math.floor(durees[i] * fraction);
  await renderStill({serveUrl, composition: comp, frame, inputProps, browserExecutable, scale: 0.5,
    output: `out/planche/${String(i + 1).padStart(2, '0')}.png`});
  debut += durees[i];
}
console.log('total', debut / 30, 's');
