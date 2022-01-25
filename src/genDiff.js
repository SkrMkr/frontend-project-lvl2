import _ from 'lodash';
import parse from './parser.js';

const buildAst = (objectForFile1, objectForFile2) => {
  const keys1 = Object.keys(objectForFile1);
  const keys2 = Object.keys(objectForFile2);
  const unitedKeys = (_.union(keys1, keys2)).sort();

  const result = unitedKeys.map((key) => {
    if (_.has(objectForFile1, key) && !_.has(objectForFile2, key)) {
      return { key, value: objectForFile1[key], state: 'deleted' };
    }
    if (!_.has(objectForFile1, key) && _.has(objectForFile2, key)) {
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

const printAst = (tree) => {
  tree.forEach((child) => {
    if (child.state === 'deleted') {
      console.log(`-${child.key}: ${child.value}`);
    }
    if (child.state === 'added') {
      console.log(`+${child.key}: ${child.value}`);
    }
    if (child.state === 'unchanged') {
      console.log(`${child.key}: ${child.value}`);
    }
    if (child.state === 'changed') {
      console.log(`-${child.key}: ${child.oldValue}`);
      console.log(`+${child.key}: ${child.newValue}`);
    }
    if (child.tree) {
      console.log(`${child.key} {`);
      printAst(child.tree);
      console.log('}');
    }
  });
};

const genDiff = (file1, file2) => {
  const objectForFile1 = parse(file1);
  const objectForFile2 = parse(file2);

  const ast = buildAst(objectForFile1, objectForFile2);
  printAst(ast);
};

export default genDiff;
