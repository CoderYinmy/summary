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

export default findAllParent
