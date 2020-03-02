const _ = require('lodash');

const render = (diffArray) => {
  const iter = (node, path = []) => {
    switch (node.type) {
      case 'branch':
        return node.children.map((child) => iter(child, [...path, node.name]));
      case 'added':
        return `Property '${[...path, node.name].join('.')}' was added with value: ${node.value instanceof Object ? '[complex value]' : `'${node.value}'`}`;
      case 'removed':
        return `Property '${[...path, node.name].join('.')}' was removed`;
      case 'changed':
        return `Property '${[...path, node.name].join('.')}' was changed from ${node.previousValue instanceof Object ? '[complex value]' : `'${node.previousValue}'`} to ${node.value instanceof Object ? '[complex value]' : `'${node.value}'`}`;
      default:
        break;
    }
    return null;
  };
  return _
    .remove(_
      .flattenDeep(diffArray
        .map((element) => iter(element, []))), null)
    .join('\n');
};
export default render;
