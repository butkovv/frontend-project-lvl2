import path from 'path';
import fs from 'fs';
import genDiff from '../src';

test.each([
  ['before.json', 'after.json', 'tree.diff'],
  ['before.yml', 'after.yml', 'tree.diff'],
  ['before.ini', 'after.ini', 'tree.diff'],
])('main flow tree', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  const result = getFixturePath(expected);
  expect(genDiff(path1, path2, 'tree')).toEqual(fs.readFileSync(result, 'utf-8').trim());
});

test.each([
  ['before.json', 'after.json', 'plain.diff'],
  ['before.yml', 'after.yml', 'plain.diff'],
  ['before.ini', 'after.ini', 'plain.diff'],
])('main flow plain', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  const result = getFixturePath(expected);
  expect(genDiff(path1, path2, 'plain')).toEqual(fs.readFileSync(result, 'utf-8').trim());
});

test.each([
  ['before.json', 'after.json', 'json.diff'],
  ['before.yml', 'after.yml', 'json.diff'],
  ['before.ini', 'after.ini', 'json-ini.diff'],
])('main flow json', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  const result = getFixturePath(expected);
  expect(genDiff(path1, path2, 'json')).toEqual(fs.readFileSync(result, 'utf-8').trim());
});

/*
test.each([
  ['before.json', 'after.json', 'result.diff'],
  ['before.yml', 'after.yml', 'result.diff'],
  ['before.ini', 'after.ini', 'result.diff'],
])('borderline cases', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  const result = getFixturePath(expected);
  expect(genDiff(path1, path2, 'tree')).toEqual(fs.readFileSync(result, 'utf-8').trim());
});
*/
