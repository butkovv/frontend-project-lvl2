import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser';
import getRenderer from './formatters';

const readData = (pathToFile) => {
  const dataType = path.extname(pathToFile).slice(1);
  const absolutePath = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return { dataType, data };
};

const compareObjects = (object1, object2) => {
  const properties = _.union(_.keys(object1), _.keys(object2)).sort();
  const processProperty = (property) => {
    if (!_.has(object1, property)) {
      return {
        type: 'added',
        name: property,
        currentValue: object2[property],
      };
    }
    if (!_.has(object2, property)) {
      return {
        type: 'removed',
        name: property,
        currentValue: object1[property],
      };
    }
    if (_.isObject(object1[property]) && _.isObject(object2[property])) {
      return {
        type: 'branch',
        name: property,
        children: compareObjects(object1[property], object2[property]),
      };
    }
    if (object1[property] !== object2[property]) {
      return {
        type: 'changed',
        name: property,
        currentValue: object2[property],
        previousValue: object1[property],
      };
    }
    return {
      type: 'unchanged',
      name: property,
      currentValue: object1[property],
    };
  };
  return properties.map(processProperty);
};

const genDiff = (firstPath, secondPath, format) => {
  const firstConfig = readData(firstPath);
  const secondConfig = readData(secondPath);
  const firstObject = parse(firstConfig.data, firstConfig.dataType);
  const secondObject = parse(secondConfig.data, secondConfig.dataType);
  const diffTree = compareObjects(firstObject, secondObject);
  return getRenderer(format)(diffTree);
};
export default genDiff;
