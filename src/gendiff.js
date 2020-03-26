import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser';
import getRenderer from './formatters';

const genDiff = (firstPath, secondPath, format) => {
  const readData = (pathToFile) => {
    const dataType = path.extname(pathToFile).slice(1);
    const absolutePath = path.resolve(process.cwd(), pathToFile);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return { dataType, data };
  };
  const firstConfig = readData(firstPath);
  const secondConfig = readData(secondPath);
  const firstObject = parse(firstConfig.data, firstConfig.dataType);
  const secondObject = parse(secondConfig.data, secondConfig.dataType);
  const compareObjects = (o1, o2) => {
    const properties = _.union(_.keys(o1), _.keys(o2)).sort();
    const processProperty = (property) => {
      if (o1[property] instanceof Object && o2[property] instanceof Object) {
        return { type: 'branch', name: property, children: compareObjects(o1[property], o2[property]) };
      }
      if (!_.has(o1, property)) {
        return { type: 'added', name: property, currentValue: o2[property] };
      }
      if (!_.has(o2, property)) {
        return { type: 'removed', name: property, currentValue: o1[property] };
      }
      if (o1[property] !== o2[property]) {
        return {
          type: 'changed', name: property, currentValue: o2[property], previousValue: o1[property],
        };
      }
      return { type: 'unchanged', name: property, currentValue: o1[property] };
    };
    return properties.map(processProperty);
  };
  const diffTree = compareObjects(firstObject, secondObject);
  return getRenderer(format)(diffTree);
};
export default genDiff;
