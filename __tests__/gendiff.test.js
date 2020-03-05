import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const json1 = getFixturePath('before.json');
const json2 = getFixturePath('after.json');
const yml1 = getFixturePath('before.yml');
const yml2 = getFixturePath('after.yml');
const ini1 = getFixturePath('before.ini');
const ini2 = getFixturePath('after.ini');

test.each([
  ['tree', 'tree.diff'],
  ['plain', 'plain.diff'],
  ['json', 'json.diff'],
])('main flow', (format, expected) => {
  const result = getFixturePath(expected);
  expect(genDiff(json1, json2, format)).toEqual(fs.readFileSync(result, 'utf-8').trim());
  expect(genDiff(yml1, yml2, format)).toEqual(fs.readFileSync(result, 'utf-8').trim());
  expect(genDiff(ini1, ini2, format)).toEqual(fs.readFileSync(result, 'utf-8').trim());
});
