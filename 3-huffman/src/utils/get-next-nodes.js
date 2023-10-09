const { CodeTreeNode } = require('../classes/code-tree-node');

const getNextNodes = (nodesSet) => {
  const initialNode = new CodeTreeNode(null, Infinity);

  let minNode = initialNode;
  let secondMinNode = initialNode;

  nodesSet.forEach((node) => {
    if (node.weight < secondMinNode.weight) {
      if (node.weight < minNode.weight) {
        secondMinNode = minNode;
        minNode = node;
        return;
      }

      secondMinNode = node;
    }
  });

  return [minNode, secondMinNode];
};

module.exports = { getNextNodes };
