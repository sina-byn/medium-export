#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { program } from 'commander';

// * utils
import { resolveOptions, getMediumMarkdown, type Options } from './utils/index.js';

program
  .description('Command to convert Medium story to markdown')
  .option('-s, --story <string>', 'Medium story url')
  .option('-o, --output <string>', 'Output directory', '.output')
  .option('--no-author', 'Remove author info', true)
  .option('--no-image', 'Remove images', true)
  .action(async (opts: Options) => {
    opts = await resolveOptions(opts);
    const { output } = opts;

    const [title, markdown] = await getMediumMarkdown(opts);
    const timestamp = new Date().toISOString().replace(/:|\./g, '-');
    const filePath = path.resolve(output, `${timestamp}.md`);

    if (!fs.existsSync(output)) fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(filePath, markdown, 'utf-8');

    console.log(`Converted '${title}' to markdown`);
  });

program
  .command('append')
  .description('Command to append Medium story markdown to a file')
  .option('-s, --story <string>', 'Medium story url')
  .option('-o, --output <string>', 'Output file')
  .option('--no-author', 'Remove author info', true)
  .option('--no-image', 'Remove images', true)
  .action(async (opts: Options) => {
    opts = await resolveOptions(opts);
    const { output } = opts;

    const [title, markdown] = await getMediumMarkdown(opts);

    if (!fs.existsSync(output)) throw new Error(`'${output}' does not exist`);
    if (fs.statSync(output).isDirectory()) throw new Error(`'${output}' is not a file`);

    fs.appendFileSync(output, markdown, 'utf-8');

    console.log(`Appended '${title}' to '${output}'`);
  });

program.parse(process.argv);
