import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const path = require('path');

const parse = (configPath) => {
  const fileExtension = path.extname(configPath);
  const fileContents = fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf-8');
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContents);
    case '.yml':
      return yaml.safeLoad(fileContents);
    case '.ini': {
      return ini.decode(fileContents);
    }
    default:
      throw new Error(`File type is not supported: ${fileExtension}`);
  }
};
export default parse;
