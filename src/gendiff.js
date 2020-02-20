import parse from './parse';

const _ = require('lodash');

const genDiff = (firstPath, secondPath) => {
  const firstObject = parse(firstPath);
  const secondObject = parse(secondPath);
  const properties = _.uniq([...Object.keys(firstObject), ...Object.keys(secondObject)]);
  const diffString = properties.reduce((acc, property) => {
    if (!_.has(firstObject, property)) return [...acc, `+ ${property}: ${secondObject[property]}`]; // +
    if (!_.has(secondObject, property)) return [...acc, `- ${property}: ${firstObject[property]}`]; // -
    return firstObject[property] === secondObject[property]
      ? [...acc, `  ${property}: ${firstObject[property]}`]
      : [...acc, `+ ${property}: ${secondObject[property]}`, `- ${property}: ${firstObject[property]}`];
  }, []);
  const result = `{\n${diffString.join('\n')}\n}`;
  return result;
};
export default genDiff;
