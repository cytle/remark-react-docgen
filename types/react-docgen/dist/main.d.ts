/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as allHandlers from "./handlers";
import * as AllResolver from "./resolver";
import * as utils from "react-docgen/dist/utils";
import { Options } from "./babelParser";
import { DocumentationObject } from "./Documentation";
import { Handler, Resolver } from './types';

declare const defaultHandlers: Handler[];

/**
 * See `lib/parse.js` for more information about the arguments. This function
 * simply sets default values for convenience.
 *
 * The default resolver looks for *exported* `React.createClass(def)` calls
 * and expected `def` to resolve to an object expression.
 *
 * The default `handlers` look for `propTypes` and `getDefaultProps` in the
 * provided object expression, and extract prop type information, prop
 * documentation (from docblocks), default prop values and component
 * documentation (from a docblock).
 */
declare function defaultParse(src: string | Buffer, resolver?: Resolver | null | undefined, handlers?: Array<Handler> | null | undefined, options?: Options): Array<DocumentationObject> | DocumentationObject

export { defaultParse as parse, defaultHandlers, allHandlers as handlers, AllResolver as resolver, utils };
