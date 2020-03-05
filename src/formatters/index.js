import renderPlain from './renderer-plain';
import renderTree from './renderer-tree';
import renderJSON from './renderer-json';

const getRenderer = (format) => {
  switch (format) {
    case 'tree':
      return renderTree;
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJSON;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
export default getRenderer;
