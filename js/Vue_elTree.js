// 二叉树遍历
export default function treeSearch(tree, value, key) {
    let res = []

    for (let i = 0, il = tree.length; i < il; i++) {
        let node = tree[i]
        if (node[key].indexOf(value) > -1) {
            rs.push(node)
        } else {
            if (node.children && node.children.length > 0) {
                let data = treeSearch(node.children, value, key)

                if (data && data.length > 0) {
                    let obj = {
                        ...node,
                        children: data,
                    }

                    res.push(obj)
                }
            }
        }
    }
    return res
}
