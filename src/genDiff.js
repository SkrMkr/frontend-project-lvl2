import _ from 'lodash';
import parse from './parser.js';

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

const tabs = (depth) => ' '.repeat(4 * depth - 2);

const printValue = (value, depth) => {
  if (_.isObject(value)) {
    return Object.entries(value).map(([key, val]) => {
      return `{\n${tabs(depth)} ${key}: ${printValue(val, depth + 1)}\n${tabs(depth - 1)}  }`;
    }).join('\n');
  }
  return value;
};

const printLine = (depth, sign, key, value) => {
  console.log(`${tabs(depth)}${sign} ${key}: ${printValue(value, depth + 1)}`);
};

const printAst = (tree, depth = 1) => {
  if (depth === 1) {
    console.log('{');
  }

  tree.forEach((child) => {
    if (child.state === 'deleted') {
      printLine(depth, '-', child.key, child.value);
    }
    if (child.state === 'added') {
      printLine(depth, '+', child.key, child.value);
    }
    if (child.state === 'unchanged') {
      printLine(depth, ' ', child.key, child.value);
    }
    if (child.state === 'changed') {
      printLine(depth, '-', child.key, child.oldValue);
      printLine(depth, '+', child.key, child.newValue);
    }
    if (child.tree) {
      console.log(`${tabs(depth)}  ${child.key} {`);
      printAst(child.tree, depth + 1);
      console.log(`${tabs(depth)}  }`);
    }
  });

  if (depth === 1) {
    console.log('}');
  }
};

const genDiff = (file1, file2) => {
  const objectForFile1 = parse(file1);
  const objectForFile2 = parse(file2);

  const ast = buildAst(objectForFile1, objectForFile2);
  printAst(ast);
};

export default genDiff;
