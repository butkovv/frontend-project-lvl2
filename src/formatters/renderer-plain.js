import _ from 'lodash';

const render = (diffTree) => {
  const processNode = (node, path = []) => {
    switch (node.type) {
      case 'branch':
        return node.children.map((child) => processNode(child, [...path, node.name]));
      case 'added':
        return `Property '${[...path, node.name].join('.')}' was added with value: ${node.value instanceof Object ? '[complex value]' : `'${node.value}'`}`;
      case 'removed':
        return `Property '${[...path, node.name].join('.')}' was removed`;
      case 'changed':
        return `Property '${[...path, node.name].join('.')}' was changed from ${node.previousValue instanceof Object ? '[complex value]' : `'${node.previousValue}'`} to ${node.value instanceof Object ? '[complex value]' : `'${node.value}'`}`;
      case 'unchanged':
        break;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
    return null;
  };
  return _
    .remove(_
      .flattenDeep(diffTree
        .map((element) => processNode(element, []))), null)
    .join('\n');
};
export default render;
