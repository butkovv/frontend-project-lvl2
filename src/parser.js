import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return yaml.safeLoad;
    case 'ini': {
      return ini.decode;
    }
    default:
      throw new Error(`Data type is not supported: ${dataType}`);
  }
};
export default getParser;
