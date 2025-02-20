#!/usr/bin/env node

// * types
type Options = { story?: string; output: string; author: boolean; image: boolean };

import fs from 'fs';
import path from 'path';

import prompts from 'prompts';

import { JSDOM } from 'jsdom';
import { program } from 'commander';

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

program
  .option('-s, --story <string>', 'Medium story url')
  .option('-o, --output <string>', 'Output path', '.output')
  .option('--no-author', 'Remove author info', true)
  .option('--no-image', 'Remove images', true)
  .action(async (opts: Options) => {
    try {
      let { story, output, author, image } = opts;

      if (!story) {
        const { _story } = await prompts({
          type: 'text',
          name: '_story',
          message: 'Medium story URL',
        });

        story = _story;
      }

      if (!output) {
        const { _output } = await prompts({
          type: 'text',
          name: '_output',
          message: 'Output path',
        });

        output = _output;
      }

      const resp = await fetch(story!);
      const html = await resp.text();
      const { document } = new JSDOM(html).window;

      const content = document.querySelector('article section')!;

      // * remove author info
      if (!author) content.querySelector('h1+div');

      // * remove images
      if (!image) content.querySelectorAll('figure:has(img)').forEach(figure => figure.remove());

      // * wrap pre tags' content with a code tag
      content.querySelectorAll('pre').forEach(pre => {
        pre.innerHTML = `<code>${pre.innerHTML
          .trim()
          .replace(/<br>/g, '\n') // * replace <br> with line feeds
          .replace(/<[^>]*>/g, '')}</code>`; // * strip html tags
      });

      const vfile = await unified()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .process(content.outerHTML);

      const markdown = String(vfile);
      const timestamp = new Date().toISOString().replace(/:|\./g, '-');
      const filePath = path.resolve(output, `${timestamp}.md`);

      if (!fs.existsSync(output)) fs.mkdirSync(output, { recursive: true });
      fs.writeFileSync(filePath, markdown, 'utf-8');

      console.log(`Converted '${document.title}' to markdown`);
    } catch (err) {
      console.error(err);
    }
  });

program.parse(process.argv);
