import path from 'path';
import genDiff from '../src/gendiff';

test.each([
  ['before.json', 'after.json', '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}'],
  ['before.json', 'empty.json', '{\n- host: hexlet.io\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n}'],
  ['before.json', 'before.json', '{\n  host: hexlet.io\n  timeout: 50\n  proxy: 123.234.53.22\n  follow: false\n}'],
  ['empty.json', 'empty.json', '{\n\n}'],
])('main flow json', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  expect(genDiff(path1, path2)).toEqual(expected);
});

test.each([
  ['before.yml', 'after.yml', '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}'],
  ['before.yml', 'empty.yml', '{\n- host: hexlet.io\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n}'],
  ['before.yml', 'before.yml', '{\n  host: hexlet.io\n  timeout: 50\n  proxy: 123.234.53.22\n  follow: false\n}'],
  ['empty.yml', 'empty.yml', '{\n\n}'],
])('main flow yaml', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  expect(genDiff(path1, path2)).toEqual(expected);
});

test.each([
  ['before.ini', 'after.ini', '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}'],
  ['before.ini', 'empty.ini', '{\n- host: hexlet.io\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n}'],
  ['before.ini', 'before.ini', '{\n  host: hexlet.io\n  timeout: 50\n  proxy: 123.234.53.22\n  follow: false\n}'],
  ['empty.ini', 'empty.ini', '{\n\n}'],
])('main flow ini', (string1, string2, expected) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath(string1);
  const path2 = getFixturePath(string2);
  expect(genDiff(path1, path2)).toEqual(expected);
});
