import _ from 'lodash';

const stringify = (diffValue, level) => {
  if (!(diffValue instanceof Object)) {
    return diffValue;
  }
  const values = Object.entries(diffValue)
    .map(([key, value]) => {
      if (value instanceof Object) return `${key}: ${stringify(value, level + 1)}`;
      return `${key}: ${value}`;
    });
  return `{\n${' '.repeat((level + 1) * 4)}${values.join(`\n${' '.repeat((level + 1) * 4)}`)}\n${' '.repeat((level) * 4)}}`;
};

const render = (diff) => {
  const processNode = (node, level = 0) => {
    const offsetLength = 4;
    const openingOffset = ' '.repeat(level * offsetLength);
    const closingOffset = ' '.repeat((level + 1) * offsetLength);
    switch (node.type) {
      case 'branch':
        return `${openingOffset}${' '.repeat(4)}${node.name}: {\n${node.children.map((child) => processNode(child, level + 1)).join('\n')}\n${closingOffset}}`;
      case 'added':
        return `${openingOffset}  + ${node.name}: ${stringify(node.value, level + 1)}`;
      case 'removed':
        return `${openingOffset}  - ${node.name}: ${stringify(node.value, level + 1)}`;
      case 'changed':
        return `${openingOffset}  - ${node.name}: ${stringify(node.previousValue, level + 1)}\n${openingOffset}  + ${node.name}: ${stringify(node.value, level + 1)}`;
      case 'unchanged':
        return `${openingOffset}${' '.repeat(4)}${node.name}: ${stringify(node.value, level + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };
  const diffString = `{\n${_.flatten(diff.map((element) => processNode(element, 0))).join('\n')}\n}`;
  return diffString;
};
export default render;
