/**
 * 二叉树遍历查找
 */
const ROOT_ID = 'PARENT_ID'

function findAllParent(node, tree, parentNodes = [], index = 0) {
    if (!node || node.parentId === ROOT_ID) {
        return
    }

    findParent(node, parentNodes, tree)

    let parntNode = parentNodes[index]
    findAllParent(parntNode, tree, parentNodes, ++index)

    return parentNodes
}

function findParent(node, parentNodes, tree) {
    for (let i = 0; i < tree.length; i++) {
        let item = tree[i]

        if (item.id === node.parentId) {
            parentNodes.push(item)
            return
        }

        if (item.childens && item.childens.length > 0) {
            findParent(node, parentNodes, item.childens)
        }
    }
}

/**
 * 二叉树增加__checked__
 */
function convert$1(tree) {
    tree.__checked__ = false
    tree.operations = tree.operations.map((v) => {
        return {
            ...v,
            __checked__: false,
        }
    })

    for (const child of tree.childens) {
        convert$1(child)
    }
}

export default findAllParent
