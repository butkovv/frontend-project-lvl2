import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

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

const convertStringsToNums = (value) => {
  if (_.isPlainObject(value)) return undefined;
  if (!(typeof value === 'string')) return value;
  return Number.isNaN(Number(value)) ? value : Number(value);
};

const parse = (data, dataType) => {
  const parsedData = getParser(dataType)(data);
  const result = _.cloneDeepWith(parsedData, convertStringsToNums);
  return result;
};
export default parse;
