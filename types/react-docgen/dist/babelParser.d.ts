/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { ASTNode } from 'ast-types';

export type Parser = {
  parse: (src: string) => ASTNode;
};

type ParserOptions = {
  plugins?: Array<string | [string, any]>;
  tokens?: boolean;
};

type BabelOptions = {
  cwd?: string;
  filename?: string;
  envName?: string;
  babelrc?: boolean;
  root?: string;
  rootMode?: string;
  configFile?: string | false;
  babelrcRoots?: true | string | string[];
};

export type Options = BabelOptions & {
  parserOptions?: ParserOptions;
};


export default function buildParse(options?: Options): Parser
