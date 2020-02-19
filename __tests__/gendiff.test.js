import path from 'path';
import genDiff from '../src/gendiff';

test('main flow', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const path3 = getFixturePath('empty.json');
  expect(genDiff(path1, path2)).toEqual('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}');
  expect(genDiff(path1, path3)).toEqual('{\n- host: hexlet.io\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n}');
  expect(genDiff(path1, path1)).toEqual('{\n  host: hexlet.io\n  timeout: 50\n  proxy: 123.234.53.22\n  follow: false\n}');
  expect(genDiff(path3, path3)).toEqual('{\n\n}');
});
