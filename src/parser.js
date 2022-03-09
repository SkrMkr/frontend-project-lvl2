import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (file) => {
  switch (path.extname(file)) {
    case '.json':
      return JSON.parse(readFileSync(path.resolve(file)));
    case '.yml':
      return yaml.load(readFileSync(path.resolve(file)));
    case '.yaml':
      return yaml.load(readFileSync(path.resolve(file)));
    default:
      return {};
  }
};

export default parse;
