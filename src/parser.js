import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini': {
      return ini.decode;
    }
    default:
      throw new Error(`File type is not supported: ${fileExtension}`);
  }
};
export default getParser;
