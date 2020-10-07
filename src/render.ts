import { mdastBuilder } from 'react-docgen-typescript-markdown-render';
import { ComponentDoc, PropItem } from 'react-docgen-typescript';
import { DocumentationObject } from '../types/react-docgen/dist/Documentation';
import { PropDescriptor } from '../types/react-docgen/dist/types';
import * as u from 'unist-builder';
import { Node } from 'unist';

interface Doc {
  displayName: string;
  description: string;
  methods: {[key: string]: PropDescriptor;};
  props: {[key: string]: PropDescriptor;};

}

export function generatePropType(prop: PropDescriptor): string {
  const type = prop.tsType || prop.flowType || prop.type;
  if (!type) {
    return '';
  }
  if ('value' in type && Array.isArray(type.value)) {
    return type.value
    .map((typeValue) => typeValue.name || typeValue.value)
    .join(' | ');
  }
  return 'raw' in type ? type.raw : type.name;
}

const propDescriptor2PropItem = (name: string, prop: PropDescriptor): PropItem => {
  return {
    name,
    required: !!prop.required,
    type: {
      name: generatePropType(prop) || '',
    },
    description: prop.description || '',
    defaultValue: prop.defaultValue || '',
  }
}
const propDescriptors2PropItems = (props: Record<string, PropDescriptor>) => Object.keys(props).reduce<Record<string, PropItem>>((p, key) => {
  p[key] = propDescriptor2PropItem(key, props[key]);
  return p;
}, {});

const documentationObject2ComponentDoc = (doc: Doc): ComponentDoc => {
  return {
    displayName: doc.displayName,
    description: doc.description,
    props: propDescriptors2PropItems(doc.props || {}),
    methods: [],
  }
}

export const render = (docs: DocumentationObject[]): Node  =>
  u('root', mdastBuilder(docs.map(documentationObject2ComponentDoc)))
