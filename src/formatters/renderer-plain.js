import _ from 'lodash';

const processValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const render = (diffTree) => {
  const processNode = (node) => {
    const {
      name,
      type,
      children,
      ancestors,
      currentValue,
      previousValue,
    } = node;

    switch (type) {
      case 'branch':
        return render(children);
      case 'added':
        return `Property '${[...ancestors, name].join('.')}' was added with value: ${processValue(currentValue)}`;
      case 'removed':
        return `Property '${[...ancestors, name].join('.')}' was removed`;
      case 'changed':
        return `Property '${[...ancestors, name].join('.')}' was changed from ${processValue(previousValue)} to ${processValue(currentValue)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };
  return diffTree
    .flatMap((node) => processNode(node, []))
    .filter((node) => (node !== null))
    .join('\n');
};
export default render;
