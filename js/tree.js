function getCheckedMenu(treeList) {
    let menusId = [];

    function search$1(tree) {
        if (tree.__checked__) {
            menusId.push(tree.id);
        }

        for (const child of tree.childens) {
            search$1(child);
        }
    }

    for (let i = 0, il = treeList.length; i < il; i++) {
        let tree = treeList[i];
        search$1(treeList[i]);
    }

    return menusId;
}

function convert$1(tree, muneids) {
    if (muneids.indexOf(tree.id) > -1) {
        tree.__checked__ = true;
    } else {
        tree.__checked__ = false;
    }

    for (const child of tree.childens) {
        convert$1(child, muneids);
    }
}

function convert(treeList, muneids) {
    for (let i = 0, il = treeList.length; i < il; i++) {
        convert$1(treeList[i], muneids);
    }
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 查找 tree 所有 __checked__ 的 node
function search(treeList) {
    let ret = [];
    function convert$1(tree) {
        if (tree.__checked__) {
            let operations = tree.operations.filter(v => v.__checked__);
            let res = {
                resourceId: tree.id,
                parentId: tree.parentId,
                operations: operations,
                resourceName: tree.name
            };

            ret.push(res);
        }

        for (const child of tree.childens) {
            convert$1(child);
        }
    }

    function convert(treeList) {
        for (let i = 0, il = treeList.length; i < il; i++) {
            convert$1(treeList[i]);
        }
    }
    convert(treeList);

    return ret;
}

function updateCheckedStatus(node, status, tree) {
    function update$1(node, status, tree) {
        node.__checked__ = status;

        tree.setChecked(node.id, status); // 设置当前的 node 状态

        if (node.childens && node.childens.length) {
            for (let i = 0, il = node.childens.length; i < il; i++) {
                update$1(node.childens[i], status, tree);
            }
        }
    }

    update$1(node, status, tree);
}

function isChildrenChecked(node) {
    return (node.childens || []).some(function(child) {
        return child.__checked__ == true;
    });
}

// 获取子孙节点
function getDescendants(node) {
    let result = [];

    function getLeaf(node, result) {
        result.push(node);

        if (node.childens && node.childens.length) {
            for (let i = 0, il = node.childens.length; i < il; i++) {
                let currentNode = node.childens[i];
                getLeaf(currentNode, result);
            }
        }
    }

    getLeaf(node, result);

    return result;
}