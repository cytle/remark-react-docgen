/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { PropDescriptor } from "./types";

export type DocumentationObject = {
  props?: {
    [key: string]: PropDescriptor;
  };
  context?: {
    [key: string]: PropDescriptor;
  };
  childContext?: {
    [key: string]: PropDescriptor;
  };
  composes?: Array<string>;
};

interface Documentation {
  addComposes(moduleName: string): void;
  set(key: string, value: any): void;

  get(key: string): any;

  getPropDescriptor(propName: string): PropDescriptor

  getContextDescriptor(propName: string): PropDescriptor

  getChildContextDescriptor(propName: string): PropDescriptor

  toObject(): DocumentationObject
}

export default Documentation
