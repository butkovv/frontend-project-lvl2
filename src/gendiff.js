import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parser';
import getRenderer from './formatters';

const genDiff = (firstPath, secondPath, format) => {
  const convertStringsToNums = (value) => {
    if (_.isPlainObject(value)) return undefined;
    if (!(typeof value === 'string')) return value;
    return Number.isNaN(Number(value)) ? value : Number(value);
  };
  const parse = (pathToFile) => {
    const dataType = path.extname(pathToFile).slice(1);
    const absolutePath = path.resolve(process.cwd(), pathToFile);
    const fileContents = fs.readFileSync(absolutePath, 'utf-8');
    const parsedData = getParser(dataType)(fileContents);
    const result = _.cloneDeepWith(parsedData, convertStringsToNums);
    return result;
  };
  const firstConfig = parse(firstPath);
  const secondConfig = parse(secondPath);
  const compareObjects = (o1, o2) => {
    const properties = _.union(_.keys(o1), _.keys(o2)).sort();
    const processProperty = (property) => {
      if (o1[property] instanceof Object && o2[property] instanceof Object) {
        return { type: 'branch', name: property, children: compareObjects(o1[property], o2[property]) };
      }
      if (!_.has(o1, property)) {
        return { type: 'added', name: property, value: o2[property] };
      }
      if (!_.has(o2, property)) {
        return { type: 'removed', name: property, value: o1[property] };
      }
      if (o1[property] !== o2[property]) {
        return {
          type: 'changed', name: property, value: o2[property], previousValue: o1[property],
        };
      }
      return { type: 'unchanged', name: property, value: o1[property] };
    };
    return properties.map(processProperty);
  };
  const diffTree = compareObjects(firstConfig, secondConfig);
  return getRenderer(format)(diffTree);
};
export default genDiff;
