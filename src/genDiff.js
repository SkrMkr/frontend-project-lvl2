import _ from 'lodash';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const getObjectForFile = (file) => JSON.parse(readFile(file));

const genDiff = (file1, file2) => {
  const objectForFile1 = getObjectForFile(file1);
  const objectForFile2 = getObjectForFile(file2);

  const keys1 = Object.keys(objectForFile1);
  const keys2 = Object.keys(objectForFile2);
  const unitedKeys = (_.union(keys1, keys2)).sort();

  const result = unitedKeys.reduce((acc, key) => {
    if (_.has(objectForFile1, key) && _.has(objectForFile2, key)
    && objectForFile1[key] === objectForFile2[key]) {
      acc[`  ${key}`] = objectForFile1[key];
    }
    if (_.has(objectForFile1, key) && _.has(objectForFile2, key)
    && objectForFile1[key] !== objectForFile2[key]) {
      acc[`- ${key}`] = objectForFile1[key];
      acc[`+ ${key}`] = objectForFile2[key];
    }
    if (_.has(objectForFile1, key) && !_.has(objectForFile2, key)) {
      acc[`- ${key}`] = objectForFile1[key];
    }
    if (!_.has(objectForFile1, key) && _.has(objectForFile2, key)) {
      acc[`+ ${key}`] = objectForFile2[key];
    }
    return acc;
  }, {});

  const stringResult = JSON.stringify(result, null, '\n  ');
  return stringResult.replace(/"/g, '');
};

export default genDiff;
