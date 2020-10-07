import * as reactDocgenTypescript from '../src';
import { readFileSync } from 'fs-extra';
import * as vfile from 'to-vfile';
import * as path from 'path';
import * as remark from 'remark';
import * as stringWidth from 'string-width';
import { Table } from 'mdast';
import * as u from 'unist-builder';
import { ReactDocgenRender } from '../src/types';
import { DocumentationObject } from '../types/react-docgen/dist/Documentation';
import { tableMdastBuilder } from 'react-docgen-typescript-markdown-render/build/tableMdastBuilder';
import { generatePropType } from '../src/render';

describe('remark use reactDocgenTypescript', () => {
  it('parse tsx/README.md', () => {
    const componentPath = path.resolve(__dirname, 'components', 'tsx');

    const { contents } = remark()
      .use({
        settings: { stringLength: stringWidth }
      })
      .use(reactDocgenTypescript)
      .processSync(vfile.readSync(path.join(componentPath, 'README.md')));

    expect(contents)
      .toBe(
        readFileSync(
          path.join(componentPath, 'default.md'),
          'utf-8',
        ),
      );
  });
  it('parse jsx/README.md', () => {
    const componentPath = path.resolve(__dirname, 'components', 'jsx');

    const { contents } = remark()
      .use({
        settings: { stringLength: stringWidth }
      })
      .use(reactDocgenTypescript)
      .processSync(vfile.readSync(path.join(componentPath, 'README.md')));

    expect(contents)
      .toBe(
        readFileSync(
          path.join(componentPath, 'default.md'),
          'utf-8',
        ),
      );
  });

  it('Chinese custom render', () => {
    const componentPath = path.resolve(__dirname, 'components', 'tsx');
    const tableRender = (doc: DocumentationObject): Table => {
      const dataSource = Object.keys(doc.props).map(name => ({...doc.props[name], name}));
      return tableMdastBuilder(dataSource, [
        { title: '属性', render: (vo) => u('strong', [u('text', vo.name)]) },
        { title: '描述', render: (vo) => vo.description,},
        { title: '类型', render: (vo) => u('inlineCode', generatePropType(vo)) },
        { title: '默认值', render: (vo) => vo.defaultValue ? vo.defaultValue.value : '-' },
      ])
    };

    const render: ReactDocgenRender = (docs) => u('root', docs.map(vo => tableRender(vo)));;
    const { contents } = remark()
      .use({
        settings: { stringLength: stringWidth }
      })
      .use(reactDocgenTypescript, { render })
      .processSync(vfile.readSync(path.join(componentPath, 'README.md')));

    expect(contents)
      .toBe(
        readFileSync(
          path.join(componentPath, 'custom.md'),
          'utf-8',
        ),
      );
  });

  it('throwError', () => {
    expect(() => {
      const componentPath = path.resolve(__dirname, 'components', 'tsx');
      remark()
        .use(reactDocgenTypescript)
        .processSync(vfile.readSync(path.join(componentPath, 'throwError.md')));
    })
      .toThrowError('Failed processing react component file at ./notExist.tsx. Details: Error: file does not exist');
  });

});
