function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

function getPostOrderOfTree(preStr, midStr) {
  // write code here
  var buildTree = function (preorder, inorder) {
    if (!preorder.length) return null;
    let rootVal = preorder.shift();
    let root = new TreeNode(rootVal);
    if (preorder.length === 1 && inorder.length === 1) return root;
    let index = inorder.indexOf(rootVal);
    root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index));
    root.right = buildTree(preorder.slice(index), inorder.slice(index + 1));
    return root
  };
  let root = buildTree([...preStr], [...midStr])
  let res = '';

  function recur(root) {
    if (!root) return '';
    recur(root.left);
    recur(root.right);
    res += root.val
  }
  recur(root);
  return res;
}