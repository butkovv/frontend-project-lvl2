import fs from 'fs';
import yaml, { FAILSAFE_SCHEMA } from 'js-yaml';
import ini from 'ini';

const path = require('path');

const parse = (configPath) => {
  const format = path.extname(configPath);
  const file = fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf-8');
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file, { schema: FAILSAFE_SCHEMA });
    case '.ini':
      return ini.decode(file);
    default:
      break;
  }
  return null;
};
export default parse;
