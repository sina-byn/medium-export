# medium-export [![NPM version](https://img.shields.io/npm/v/medium-export.svg?style=flat)](https://www.npmjs.com/package/medium-export) [![NPM monthly downloads](https://img.shields.io/npm/dm/medium-export.svg?style=flat)](https://npmjs.org/package/medium-export) [![NPM total downloads](https://img.shields.io/npm/dt/medium-export.svg?style=flat)](https://npmjs.org/package/medium-export) 

> Effortlessly convert your Medium stories to Markdown.

medium-export is a simple yet powerful tool that lets you convert Medium stories into Markdown format with ease. Whether you need to back up your articles, migrate content, or just prefer Markdown, this tool has you covered.

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

|   Option        | Default |    Description     |
|-----------------|---------|--------------------|
|   -s, --story   |   ---   |  Medium story URL  |
|  -o, --output   |   ---   |    Output path     |
| --no-author     |  false  | Remove author info |
| --no-image      |  false  |   Remove images    |

> If you don't provide `--story` or `--output`, you'll be prompted to enter them.
