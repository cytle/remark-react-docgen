import * as path from 'path';
import * as visit from 'unist-util-visit';
import { Plugin } from 'unified';
import * as docgen from 'react-docgen';
import { ReactDocgenOptions } from './types';
import { Link } from 'mdast';
import * as pathExists from 'path-exists';
import * as fs from 'fs-extra';
import { render as defaultRender } from './render';
import { DocumentationObject } from '../types/react-docgen/dist/Documentation';

const PLUGIN_NAME = 'react-docgen';
const reactDocgenTypescript: Plugin<[ReactDocgenOptions?]> =
  (ops) => {
    const {
      render,
      resolver,
      handlers,
      options,
    } = {
      render: defaultRender,
      ...ops
    };
    // const parser = fileParser || withDefaultConfig(parseOptions);
    return (tree, vfile) => {
      visit(tree, 'link', (node: Link, index, parent) => {
        try {
          /* istanbul ignore next */
          if (node.title && node.title.startsWith('react-docgen:')) {
            const p = path.resolve(vfile.dirname, node.url);
            vfile.info(`parse React Component which path is ${p}`, node.position, PLUGIN_NAME);
            if (!pathExists.sync(p)) {
              throw new Error('file does not exist');
            }
            const doc: Array<DocumentationObject> | DocumentationObject = docgen.parse(fs.readFileSync(p), resolver, handlers, options);
            const docNode = render(Array.isArray(doc) ? doc : [doc]);
            vfile.info(`react-docgen link replaced with table at ${node.url}`, node.position, PLUGIN_NAME);
            parent.children.splice(index, 1, docNode);
          }
        } catch (error) {
          vfile.fail(`Failed processing react component file at ${node.url}. Details: ${error}`, node.position, PLUGIN_NAME);
        }
      });
    }
  };

// fix commonjs
export = reactDocgenTypescript;
