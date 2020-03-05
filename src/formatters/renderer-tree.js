const _ = require('lodash');

const stringify = (diffValue, level) => {
  if (diffValue instanceof Object) {
    const valArray = Object.entries(diffValue)
      .map(([key, value]) => {
        if (value instanceof Object) return `${key}: ${stringify(value, level + 1)}`;
        return `${key}: ${value}`;
      });
    return `{\n${' '.repeat((level + 1) * 4)}${valArray.join(`\n${' '.repeat((level + 1) * 4)}`)}\n${' '.repeat((level) * 4)}}`;
  }
  return diffValue;
};

const render = (diffArray) => {
  const iter = (node, level = 0) => {
    const offsetLength = 4;
    const openingOffset = ' '.repeat(level * offsetLength);
    const closingOffset = ' '.repeat((level + 1) * offsetLength);
    if (node.children) {
      return `${openingOffset}${' '.repeat(4)}${node.name}: {\n${node.children.map((child) => iter(child, level + 1)).join('\n')}\n${closingOffset}}`;
    }
    if (node.type === 'added') {
      return `${openingOffset}  + ${node.name}: ${stringify(node.value, level + 1)}`;
    }
    if (node.type === 'removed') {
      return `${openingOffset}  - ${node.name}: ${stringify(node.value, level + 1)}`;
    }
    if (node.type === 'changed') {
      return `${openingOffset}  - ${node.name}: ${stringify(node.previousValue, level + 1)}\n${openingOffset}  + ${node.name}: ${stringify(node.value, level + 1)}`;
    }
    return `${openingOffset}${' '.repeat(4)}${node.name}: ${stringify(node.value, level + 1)}`;
  };
  const diffString = `{\n${_.flatten(diffArray.map((element) => iter(element, 0))).join('\n')}\n}`;
  return diffString;
};
export default render;
