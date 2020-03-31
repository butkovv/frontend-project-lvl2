import _ from 'lodash';

const stringify = (diffValue, level) => {
  if (!(_.isObject(diffValue))) {
    return diffValue;
  }
  const values = Object.entries(diffValue)
    .map(([key, value]) => {
      if (_.isObject(value)) return `${key}: ${stringify(value, level + 1)}`;
      return `${key}: ${value}`;
    });
  return `{\n${' '.repeat((level + 1) * 4)}${values.join(`\n${' '.repeat((level + 1) * 4)}`)}\n${' '.repeat((level) * 4)}}`;
};

const render = (diff) => {
  const processNode = (node, level) => {
    const {
      name,
      type,
      children,
      currentValue,
      previousValue,
    } = node;

    const offsetLength = 4;
    const openingOffset = ' '.repeat(level * offsetLength);
    const closingOffset = ' '.repeat((level + 1) * offsetLength);
    switch (type) {
      case 'branch':
        return `${openingOffset}${' '.repeat(4)}${name}: {\n${
          render(children)
        }\n${closingOffset}}`;
      case 'added':
        return `${openingOffset}  + ${name}: ${stringify(currentValue, level + 1)}`;
      case 'removed':
        return `${openingOffset}  - ${name}: ${stringify(currentValue, level + 1)}`;
      case 'changed':
        return `${openingOffset}  - ${name}: ${stringify(previousValue, level + 1)}\n${openingOffset}  + ${name}: ${stringify(currentValue, level + 1)}`;
      case 'unchanged':
        return `${openingOffset}${' '.repeat(4)}${name}: ${stringify(currentValue, level + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };
  const depth = diff[0].ancestors.length;
  const renderedDiff = diff
    .flatMap((node) => processNode(node, depth))
    .join('\n');
  return depth === 0 ? `{\n${renderedDiff}\n}` : renderedDiff;
};
export default render;
