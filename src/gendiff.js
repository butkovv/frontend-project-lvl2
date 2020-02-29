import parse from './parser';
import render from './renderer';

const _ = require('lodash');

const genDiff = (firstPath, secondPath) => {
  const firstObject = parse(firstPath);
  const secondObject = parse(secondPath);
  const compare = (o1, o2) => {
    const properties = _.uniq([...Object.keys(o1), ...Object.keys(o2)]).sort();
    const iter = (property) => {
      if (o1[property] instanceof Object && o2[property] instanceof Object) {
        return { type: 'branch', name: property, children: compare(o1[property], o2[property]) };
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
    return properties.map(iter);
  };
  const result = compare(firstObject, secondObject);
  return render(result);
};
export default genDiff;
