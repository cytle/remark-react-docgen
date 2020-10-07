import { Node } from 'unist';
import { DocumentationObject } from "../types/react-docgen/dist/Documentation";
import { Options } from '../types/react-docgen/dist/babelParser';
import { Handler, Resolver } from '../types/react-docgen/dist/types';

export type ReactDocgenRender = (docs: DocumentationObject[]) => Node;

export type ReactDocgenOptions = {
  /**
   * Custom document rendering
   * @default defaultRender
   */
  render?: ReactDocgenRender;
  resolver?: Resolver;
  handlers?: Array<Handler>;
  options?: Options;
};
