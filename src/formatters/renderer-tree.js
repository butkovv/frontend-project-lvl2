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

const render = (diff, depth = 0) => {
  const processNode = (node) => {
    const {
      name,
      type,
      children,
      currentValue,
      previousValue,
    } = node;

    const offsetLength = 4;
    const openingOffset = ' '.repeat(depth * offsetLength);
    const closingOffset = ' '.repeat((depth + 1) * offsetLength);
    switch (type) {
      case 'branch':
        return `${openingOffset}${' '.repeat(4)}${name}: {\n${
          render(children, depth + 1)
        }\n${closingOffset}}`;
      case 'added':
        return `${openingOffset}  + ${name}: ${stringify(currentValue, depth + 1)}`;
      case 'removed':
        return `${openingOffset}  - ${name}: ${stringify(currentValue, depth + 1)}`;
      case 'changed':
        return `${openingOffset}  - ${name}: ${stringify(previousValue, depth + 1)}\n${openingOffset}  + ${name}: ${stringify(currentValue, depth + 1)}`;
      case 'unchanged':
        return `${openingOffset}${' '.repeat(4)}${name}: ${stringify(currentValue, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };
  // const depth = diff[0].ancestors.length;
  const renderedDiff = diff
    .flatMap((node) => processNode(node))
    .join('\n');
  return depth === 0 ? `{\n${renderedDiff}\n}` : renderedDiff;
};
export default render;
