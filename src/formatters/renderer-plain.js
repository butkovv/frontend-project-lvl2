import _ from 'lodash';

const processValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const render = (diffTree, ancestors = []) => {
  const processNode = (node) => {
    const {
      name,
      type,
      children,
      currentValue,
      previousValue,
    } = node;
    const fullPropertyName = [...ancestors, name].join('.');

    switch (type) {
      case 'branch':
        return render(children, [...ancestors, name]);
      case 'added':
        return `Property '${fullPropertyName}' was added with value: ${processValue(currentValue)}`;
      case 'removed':
        return `Property '${fullPropertyName}' was removed`;
      case 'changed':
        return `Property '${fullPropertyName}' was changed from ${processValue(previousValue)} to ${processValue(currentValue)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };
  return diffTree
    .flatMap((node) => processNode(node))
    .filter((node) => (node !== null))
    .join('\n');
};
export default render;
