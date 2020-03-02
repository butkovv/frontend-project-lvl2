import renderPlain from './renderer-plain';
import renderTree from './renderer-tree';

const getRenderer = (format, diffArray) => {
  if (format === 'tree') return renderTree(diffArray);
  if (format === 'plain') return renderPlain(diffArray);
  return null;
};
export default getRenderer;
