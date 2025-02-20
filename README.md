# medium-export [![NPM version](https://img.shields.io/npm/v/medium-export.svg?style=flat)](https://www.npmjs.com/package/medium-export) [![NPM monthly downloads](https://img.shields.io/npm/dm/medium-export.svg?style=flat)](https://npmjs.org/package/medium-export) [![NPM total downloads](https://img.shields.io/npm/dt/medium-export.svg?style=flat)](https://npmjs.org/package/medium-export)

> Effortlessly convert your Medium stories to Markdown.

medium-export is a lightweight yet powerful tool that allows you to convert your Medium stories into Markdown format with ease. Whether you're backing up your content, migrating to another platform, or simply prefer Markdown, medium-export streamlines the process.

Please consider following this project's author, [Sina Bayandorian](https://github.com/sina-byn), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/package/medium-export):

```sh
$ npm install -g medium-export
```

## Usage

To see available options, run:

```bash
medium-export --help
```

or using `npx`:

```bash
npx medium-export --help
```

| Option       | Default | Description        |
| ------------ | ------- | ------------------ |
| -s, --story  | ---     | Medium story URL   |
| -o, --output | ---     | Output directory   |
| --no-author  | false   | Remove author info |
| --no-image   | false   | Remove images      |

> If you don't provide `--story` or `--output`, you'll be prompted to enter them.

## Append to an Existing Markdown File

If you'd like to append a Medium story’s content to an existing Markdown file, use:

```bash
medium-export append
```

| Option       | Default | Description        |
| ------------ | ------- | ------------------ |
| -s, --story  | ---     | Medium story URL   |
| -o, --output | ---     | Output file        |
| --no-author  | false   | Remove author info |
| --no-image   | false   | Remove images      |

> If you don't provide `--story` or `--output`, you'll be prompted to enter them.

### Get Started

Now that you know the basics, try it out! Convert your Medium stories to Markdown effortlessly and keep your content in a portable format.
