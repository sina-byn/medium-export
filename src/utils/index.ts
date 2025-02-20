import prompts from 'prompts';

import { JSDOM } from 'jsdom';

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

// * types
export type Options = { story?: string; output: string; author: boolean; image: boolean };

export const resolveOptions = async (opts: Options) => {
  let { story, output } = opts;

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

  return { ...opts, story, output };
};

export const getMediumMarkdown = async (opts: Options): Promise<[string, string]> => {
  const { story, author, image } = opts;

  const resp = await fetch(story!);
  const html = await resp.text();
  const { document } = new JSDOM(html).window;

  const content = document.querySelector('article section')!;

  // * remove author info
  if (!author) content.querySelector('h1+div')?.remove();

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

  return [document.title, String(vfile)];
};
