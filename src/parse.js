import fs from 'fs';
import yaml, { FAILSAFE_SCHEMA } from 'js-yaml';

const path = require('path');

const parse = (configPath) => {
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), configPath)));
  }
  if (format === '.yml') {
    return yaml.safeLoad(fs
      .readFileSync(path.resolve(process.cwd(), configPath)), { schema: FAILSAFE_SCHEMA });
  }
  return null;
};
export default parse;
