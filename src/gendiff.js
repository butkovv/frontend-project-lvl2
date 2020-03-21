import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parser';
import getRenderer from './formatters';

const genDiff = (firstPath, secondPath, format) => {
  const parse = (pathToFile) => {
    const fileExtension = path.extname(pathToFile);
    const absolutePath = path.resolve(process.cwd(), pathToFile);
    const fileContents = fs.readFileSync(absolutePath, 'utf-8');
    const parsedFile = getParser(fileExtension)(fileContents);
    return parsedFile;
  };
  const firstConfig = parse(firstPath);
  const secondConfig = parse(secondPath);
  const compareObjects = (o1, o2) => {
    const properties = _.union(_.keys(o1), _.keys(o2)).sort();
    const compareProperties = (property) => {
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
    return properties.map(compareProperties);
  };
  const diffArray = compareObjects(firstConfig, secondConfig);
  return getRenderer(format)(diffArray);
};
export default genDiff;
