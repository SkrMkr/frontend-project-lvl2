import _ from 'lodash';
import parse from './parser.js';
import stylish from './formatters/stylish.js';

const buildAst = (objectForFile1, objectForFile2) => {
  const keys1 = Object.keys(objectForFile1);
  const keys2 = Object.keys(objectForFile2);
  const unitedKeys = (_.union(keys1, keys2)).sort();

  const result = unitedKeys.map((key) => {
    if (!_.has(objectForFile2, key)) {
      return { key, value: objectForFile1[key], state: 'deleted' };
    }
    if (!_.has(objectForFile1, key)) {
      return { key, value: objectForFile2[key], state: 'added' };
    }
    if (_.isObject(objectForFile1[key]) && _.isObject(objectForFile2[key])) {
      return { key, tree: buildAst(objectForFile1[key], objectForFile2[key]) };
    }
    if (_.has(objectForFile1, key) && _.has(objectForFile2, key)
    && objectForFile1[key] === objectForFile2[key]) {
      return { key, value: objectForFile1[key], state: 'unchanged' };
    }
    return {
      key, oldValue: objectForFile1[key], newValue: objectForFile2[key], state: 'changed',
    };
  });
  return result;
};

const formattedAst = (ast, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(ast);
    default:
      return 'unknown formatter';
  }
};

const genDiff = (file1, file2, formatter) => {
  const objectForFile1 = parse(file1);
  const objectForFile2 = parse(file2);

  const ast = buildAst(objectForFile1, objectForFile2);
  return formattedAst(ast, formatter);
};

export default genDiff;
