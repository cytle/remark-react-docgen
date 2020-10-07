[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fcytle%2Fremark-react-docgen%2Fbadge&style=flat)](https://actions-badge.atrox.dev/cytle/remark-react-docgen/goto)


# remark-react-docgen

[remark](https://github.com/remarkjs/remark) plugin to transform React component to Markdown by  [`react-docgen`](https://github.com/reactjs/react-docgen)

## Getting Started

``` sh
yarn add -D remark-react-docgen
```

``` ts
import * as remark from 'remark';
import * as reactDocgen from 'remark-react-docgen';
import * as vfile from 'to-vfile';

const doc = vfile.readSync('README.md');
console.log(remark().use(reactDocgen).processSync(doc).contents);
```

The Component [`Column.jsx`](./__tests__/components/jsx/Column.jsx)

``` jsx
import * as React from "react";
import PropTypes from 'prop-types';

/**
 * Form column.
 */
export const Column = () => {
  return <div>Test</div>;
}

Column.propTypes = {
  /**
   * prop1 description
   */
  prop1: PropTypes.string,
  /** prop2 description */
  prop2: PropTypes.number.isRequired,
  /**
   * prop3 description a | b
   */
  prop3: PropTypes.func().isRequired,
  /** prop4 description 中文 */
  prop4: PropTypes.isRequired.oneOf(["option1", "option2" ,"option3"]),
};

Column.defaultProps = {
  prop1: "red",
  prop5: "default",
};

```

Convert the following Markdown:

``` markdown
# foo-components

## API

[Column](./Column.jsx "react-docgen:")
```

Into

``` markdown
# foo-components

## API

### Column

Form column.

#### Props

| Name               | Type                                | Default value | Description              |
| ------------------ | ----------------------------------- | ------------- | ------------------------ |
| prop1              | string                              | "red"         | prop1 description        |
| prop2 _(required)_ | number                              |               | prop2 description        |
| prop3 _(required)_ | func                                |               | prop3 description a \| b |
| prop4 _(required)_ | "option1" \| "option2" \| "option3" |               | prop4 description 中文   |
| prop5              |                                     | "default"     |                          |
```

## Options

### `remark().use(reactDocgen[, options])`

#### render

Custom document rendering

``` ts
import * as remark from 'remark';
import * as reactDocgen from 'remark-react-docgen';
import { ReactDocgenRender } from 'remark-react-docgen/build/types';
import * as vfile from 'to-vfile';
import * as stringWidth from 'string-width';
import { tableMdastBuilder } from 'react-docgen-markdown-render';

const tableRender = (doc: DocumentationObject): Table => {
  const dataSource = Object.keys(doc.props).map(name => ({...doc.props[name], name}));
  return tableMdastBuilder(dataSource, [
    { title: '属性', render: (vo) => u('strong', [u('text', vo.name)]) },
    { title: '描述', render: (vo) => vo.description,},
    { title: '类型', render: (vo) => u('inlineCode', generatePropType(vo)) },
    { title: '默认值', render: (vo) => vo.defaultValue ? vo.defaultValue.value : '-' },
  ])
};

const render: ReactDocgenRender = (docs) => u('root', docs.map(vo => tableRender(vo)));

const doc = vfile.readSync('README.md');

const { contents } = remark()
  .use({
    settings: { stringLength: stringWidth }
  })
  .use(reactDocgen, { render })
  .processSync(doc);
console.log(contents);
```

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.0-blue.svg
[typescript-4-0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE
