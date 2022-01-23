import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(readFileSync(path.resolve(file)));
  }
  if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
    return yaml.load(readFileSync(path.resolve(file)));
  }
  return {};
};

export default parse;
