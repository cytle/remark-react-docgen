import { Handler } from '../types';
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
declare const componentDocblockHandler: Handler;
declare const componentMethodsHandler: Handler;
declare const componentMethodsJsDocHandler: Handler;
declare const defaultPropsHandler: Handler;
declare const propTypeHandler, contextTypeHandler, childContextTypeHandler: Handler;
declare const propTypeCompositionHandler: Handler;
declare const propDocBlockHandler: Handler;
declare const displayNameHandler: Handler;
declare const flowTypeHandler: Handler;

export {
  componentDocblockHandler,
  componentMethodsHandler,
  componentMethodsJsDocHandler,
  defaultPropsHandler,
  propTypeHandler,
  contextTypeHandler,
  childContextTypeHandler,
  propTypeCompositionHandler,
  propDocBlockHandler,
  displayNameHandler,
  flowTypeHandler,
}
