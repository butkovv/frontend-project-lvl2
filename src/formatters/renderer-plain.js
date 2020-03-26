const render = (diffTree) => {
  const processNode = (node, path = []) => {
    switch (node.type) {
      case 'branch':
        return node.children
          .flatMap((child) => processNode(child, [...path, node.name]))
          .filter((child) => (child !== null))
          .join('\n');
      case 'added':
        return `Property '${[...path, node.name].join('.')}' was added with value: ${node.currentValue instanceof Object ? '[complex value]' : `'${node.currentValue}'`}`;
      case 'removed':
        return `Property '${[...path, node.name].join('.')}' was removed`;
      case 'changed':
        return `Property '${[...path, node.name].join('.')}' was changed from ${node.previousValue instanceof Object ? '[complex value]' : `'${node.previousValue}'`} to ${node.currentValue instanceof Object ? '[complex value]' : `'${node.currentValue}'`}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };
  return diffTree
    .flatMap((node) => processNode(node, []))
    .filter((node) => (node !== null))
    .join('\n');
};
export default render;
