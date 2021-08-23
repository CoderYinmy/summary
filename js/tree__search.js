/**
 * 模拟树的模糊查询
 */
export function mistySearch(tree, value, key) {
    let res = []

    for (let i = 0, il = tree.length; i < il; i++) {
        let node = tree[i]

        if (node[key].indexOf(value) > -1) {
            res.push(node)
        } else {
            if (node.children && node.children.length > 0) {
                let data = mistySearch(node.children, value, key)

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
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
let list = clone(mistySearch(tree, '业务类型', 'name'))