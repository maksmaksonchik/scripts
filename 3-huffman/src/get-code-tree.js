const { getFrequencyMap } = require('./utils/get-frequency-map');
const { CodeTreeNode } = require('./classes/code-tree-node');
const { getNextNodes } = require('./utils/get-next-nodes');

const getCodeTree = (str) => {
  if (str === '') {
    throw new Error('Невозможно построить дерево по пустой строке');
  }

  const frequencyMap = getFrequencyMap(str);

  const nodesSet = new Set();
  frequencyMap.forEach((freq, char) => nodesSet.add(new CodeTreeNode(char, freq)));

  while (nodesSet.size > 1) {
    const [left, right] = getNextNodes(nodesSet);

    nodesSet.delete(left);
    nodesSet.delete(right);

    const parent = new CodeTreeNode(null, left.weight + right.weight, left, right);

    nodesSet.add(parent);
  }

  return nodesSet.values().next().value;
};

module.exports = { getCodeTree };
