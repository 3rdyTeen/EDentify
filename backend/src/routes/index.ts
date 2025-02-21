import { type Application } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export default function (app: Application) {
  fs.readdirSync(__dirname).forEach((file: string) => {
    if (file === 'index.ts' || file === 'index.js') return; // Skip index.ts

    const name = path.basename(file, path.extname(file));
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const module = require(path.join(__dirname, name));
    module.default(app);
  });
}
