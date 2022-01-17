import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const getObjectForFile = (file) => {
  return JSON.parse(readFileSync(path.resolve(file)));
};

const genDiff = (file1, file2) => {
  const objectForFile1 = getObjectForFile(file1);
  const objectForFile2 = getObjectForFile(file2);

  const keys1 = Object.keys(objectForFile1);
  const keys2 = Object.keys(objectForFile2);
  const unitedKeys = (_.union(keys1, keys2)).sort();
  let result = {};

  for (const key of unitedKeys) {
    if (_.has(objectForFile1, key) && _.has(objectForFile2, key) && objectForFile1[key] === objectForFile2[key]) {
      result[`  ${key}`] = objectForFile1[key];
    }
    if (_.has(objectForFile1, key) && _.has(objectForFile2, key) && objectForFile1[key] !== objectForFile2[key]) {
      result[`- ${key}`] = objectForFile1[key];
      result[`+ ${key}`] = objectForFile2[key];
    }
    if (_.has(objectForFile1, key) && !_.has(objectForFile2, key)) {
      result[`- ${key}`] = objectForFile1[key];
    }
    if (!_.has(objectForFile1, key) && _.has(objectForFile2, key)) {
      result[`+ ${key}`] = objectForFile2[key];
    }
  }

  const stringResult = JSON.stringify(result, null, '\n  ');
  return stringResult.replace(/"/g,"");
};

export default genDiff;
