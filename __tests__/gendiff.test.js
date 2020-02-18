import path from 'path';
// import { readFileSync } from 'fs';
import genDiff from '../src/gendiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('before.json');
const path2 = getFixturePath('after.json');

test('main flow', () => {
  expect(genDiff(path1, path2)).toEqual('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}');
});
