import _ from 'lodash';
import parse from './parser.js';

const genDiff = (file1, file2) => {
  const objectForFile1 = parse(file1);
  const objectForFile2 = parse(file2);

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

  const stringResult = JSON.stringify(result, null, '  ');
  return stringResult.replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;
