import _ from 'lodash';

const buildAst = (objectForFile1, objectForFile2) => {
  const keys1 = Object.keys(objectForFile1);
  const keys2 = Object.keys(objectForFile2);
  const unitedKeys = _.sortBy(_.union(keys1, keys2));

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

export default buildAst;
