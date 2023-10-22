class CodeTreeNode {
  constructor(char, weight, left = null, right = null) {
    this.char = char;
    this.weight = weight;
    this.left = left;
    this.right = right;
  }

  isLeaf() {
    return !(this.right || this.left);
  }

  static isLeaf(node) {
    return !(node.right || node.left);
  }
}

module.exports = { CodeTreeNode };
