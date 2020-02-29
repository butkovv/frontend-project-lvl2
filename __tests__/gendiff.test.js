import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff';

test.each([
  ['before.json', 'after.json', 'result.diff'],
  ['before.yml', 'after.yml', 'result.diff'],
  ['before.ini', 'after.ini', 'result.diff'],
])('main flow', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  const result = getFixturePath(expected);
  expect(genDiff(path1, path2)).toEqual(fs.readFileSync(result, 'utf-8').trim());
});
