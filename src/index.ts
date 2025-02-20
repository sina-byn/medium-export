#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { program } from 'commander';

// * utils
import { resolveOptions, getMediumMarkdown, type Options } from './utils/index.js';

program
  .description('Command to convert Medium story to markdown')
  .option('-o, --output <string>', 'Output file|directory', '.output')
  .option('-s, --story <string>', 'Medium story url')
  .option('-a, --append', 'Remove author info', false)
  .option('--no-author', 'Remove author info', true)
  .option('--no-image', 'Remove images', true)
  .action(async (opts: Options) => {
    opts = await resolveOptions(opts);
    const { output, append } = opts;

    const [title, markdown] = await getMediumMarkdown(opts);

    if (append) {
      if (!fs.existsSync(output)) throw new Error(`'${output}' does not exist`);
      if (fs.statSync(output).isDirectory()) throw new Error(`'${output}' is not a file`);

      fs.appendFileSync(output, markdown, 'utf-8');

      console.log(`Appended '${title}' to '${output}'`);
      return;
    }

    const timestamp = new Date().toISOString().replace(/:|\./g, '-');
    const filePath = path.resolve(output, `${timestamp}.md`);

    if (!fs.existsSync(output)) fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(filePath, markdown, 'utf-8');

    console.log(`Converted '${title}' to markdown`);
  });

program.parse(process.argv);
