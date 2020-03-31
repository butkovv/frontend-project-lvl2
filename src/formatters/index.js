import renderPlain from './renderer-plain';
import renderTree from './renderer-tree';

const getRenderer = (format) => {
  switch (format) {
    case 'tree':
      return renderTree;
    case 'plain':
      return renderPlain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
export default getRenderer;
