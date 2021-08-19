<template>
    <div class="pf-menu">
        <div class="pf-column">
            <div class="pf-lefttitle"></div>
            <div class="pf-rightbtn">
                <el-button
                    type="button"
                    :disabled="isMenuModifyVisible"
                    size="small"
                    @click="onSubmitClick"
                    style="background: #099778; opacity: 0.8; color: #fff"
                    >保存</el-button
                >
            </div>
        </div>
        <div class="menu__tree-content">
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps"
                default-expand-all
                :check-strictly="checkStric"
                :default-checked-keys="ownMenusID"
                @check="treeNodeCheckChange"
                class="tree-line check_none"

            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span
                        style="vertical-align:middle;"
                        @click.stop="onDoubleClickChange(data)"
                        >{{ node.label }}</span
                    >
                    <span>
                        <img
                            style="width:22px;height:22px;vertical-align:middle;"
                            src="../../assets/images/privac_open.png"
                            @click="onModifyClick(data)"
                        />
                    </span>
                    <!-- <span class="check__btn" @click.stop="onDoubleClickChange(data)">快速选中</span> -->
                </span>
            </el-tree>
        </div>
        <div class="menuTip" width="100px" v-if="isMenuModifyVisible">
            <div class="menuTip__title">权限列表</div>
            <el-checkbox-group v-model="currentMenuOwnedOperationsID">
                <el-checkbox
                    v-for="(item, i) in currentMenuOperations"
                    :label="item.id"
                    :key="i"
                    >{{ item.name }}</el-checkbox
                >
            </el-checkbox-group>

            <div class="closeMenuTip">
                <div @click="onCloseClick">关闭</div>
            </div>
        </div>
    </div>
</template>

<script>
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
                resourceName: tree.name,
                isApp:tree.isApp
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

import findAncestor from "./findAncestor";

export default {
    name: "ns-role-selector",
    props: {
        data: {
            type: [Object, Array],
            default: () => {
                return {};
            }
        },
        ownMenus: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            checkStric: true,
            defaultProps: {
                children: "childens",
                label: "name"
            },
            ownMenusID: [], // 当前用户存在某个Menu的权限 id 集合
            isMenuModifyVisible: false,
            currentMenuOperations: [], // 当前 Menu 的权限信息
            currentMenuData: {}, // 当前 Menu 的信息
            currentMenuOwnedOperationsID: [], // 用户存在多少个信息
            currentMenuAll: [], //获取到所有选中
            fixMenuData: []
        };
    },
    watch: {
        data(newVal) {
            this.ownMenusID = getCheckedMenu(newVal);
        },
        ownMenus(newVal) {
            if (newVal.length && newVal.length > 0) {
                this.ownMenusID = newVal.map(v => v.resourceId);
            } else {
                this.ownMenusID = [];
            }
        }
    },
    mounted() {},
    methods: {
        onDoubleClickChange(currentNode) {
            const isCurrentNodeCheckedStatus = currentNode.__checked__;
            // 更新当前节点以及子节点的状态
            updateCheckedStatus(
                currentNode,
                !isCurrentNodeCheckedStatus,
                this.$refs.tree
            );

            // 更新祖先节点
            const ancestors = findAncestor(currentNode, this.data) || [];
            // 选中所有的祖先
            for (let i = 0, il = ancestors.length; i < il; i++) {
                let currentAncestor = ancestors[i];
                // 判断当前节点的 children 中是否存在已经被选中的，如果存在那么当前节点被选中
                let currentAncestorChecked = isChildrenChecked(currentAncestor);
                currentAncestor.__checked__ = currentAncestorChecked
                    ? true
                    : false;

                this.$refs.tree.setChecked(
                    currentAncestor,
                    currentAncestor.__checked__,
                    false
                );
            }
        },
        // 点击 Tree Node “选中” 或者 “取消”
        treeNodeCheckChange(currentNode, status) {
            debugger
            const isCurrentNodeCheckedStatus =
                status.checkedKeys.indexOf(currentNode.id) > -1;

            currentNode.__checked__ = isCurrentNodeCheckedStatus;
            if (currentNode.__checked__) {
                // 如果当前节点被选中，当前节点的所有祖先节点都被选中
                const ancestors = findAncestor(currentNode, this.data) || [];

                for (let i = 0, il = ancestors.length; i < il; i++) {
                    let currentNode = ancestors[i];
                    currentNode.__checked__ = true;

                    this.$refs.tree.setChecked(
                        currentNode,
                        currentNode.__checked__,
                        false
                    );
                }
            } else {
                // 如果当前节点被取消，那么所有的子孙都被取消
                const descendants = getDescendants(currentNode);

                for (let i = 0, il = descendants.length; i < il; i++) {
                    const currentNode = descendants[i];

                    currentNode.__checked__ = false;

                    this.$refs.tree.setChecked(
                        currentNode,
                        currentNode.__checked__,
                        false
                    );
                }
            }
        },
        // 点击“关闭”保存当前用户修改
        onCloseClick() {
            this.isMenuModifyVisible = false;

            this.currentMenuData.operations.forEach(v => {
                if (this.currentMenuOwnedOperationsID.indexOf(v.id) > -1) {
                    v.__checked__ = true;
                } else {
                    v.__checked__ = false;
                }
            });
        },
        // 点击 “锁”，用户初始拥有的权限
        onModifyClick(node) {
            this.isMenuModifyVisible = true;
            this.currentMenuData = node;
            this.currentMenuOperations = clone(node.operations);
            this.currentMenuOwnedOperationsID = this.currentMenuOperations.reduce(
                (prev, cur) => {
                    if (cur.__checked__) {
                        prev.push(cur.id);
                    }

                    return prev;
                },
                []
            );
        },
        // 提交
        onSubmitClick() {
            const data$1 = search(this.data);

            this.$emit("onSubmitTreeMenu", data$1);
        },
        emptyCheck() {}
    }
};
</script>
<style lang="scss" scoped>
.menu__tree-content {
    // width: 300px;
    height: 90% !important;
}
.pf-menu {
    overflow: hidden;
    height: 100%;
}
.tree-line /deep/ .el-tree-node {
    position: relative;
    padding-left: 16px; // 缩进量
}
.tree-line /deep/.el-tree-node__children {
    padding-left: 16px; // 缩进量
}

// 竖线
.tree-line /deep/ .el-tree-node::before {
    content: "";
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #cecece;
}
// 当前层最后一个节点的竖线高度固定
.tree-line /deep/ .el-tree-node:last-child::before {
    height: 38px; // 可以自己调节到合适数值
}

// 横线
.tree-line /deep/ .el-tree-node::after {
    content: "";
    width: 24px;
    height: 20px;
    position: absolute;
    left: -3px;
    top: 12px;
    border-width: 1px;
    border-top: 1px dashed #cecece;
}

// 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
/deep/ .tree-line > .el-tree-node::after {
    border-top: none;
}
/deep/ .tree-line > .el-tree-node::before {
    border-left: none;
}

// 展开关闭的icon
.tree-line /deep/ .el-tree-node__expand-icon {
    font-size: 16px;
    // 叶子节点（无子节点）
    &.is-leaf {
        color: transparent;
        // display: none; // 也可以去掉
    }
}
/deep/.el-tree-node__content {
    padding-left: 0 !important;
}
/deep/.el-tree {
    // min-width: 300px !important;
    background-color: #fff;
    height: 100%;
    overflow: auto;
}
.menuTip {
    width: 100px;
    min-height: 200px;
    overflow-y: auto;
    position: absolute;
    right: 8px;
    top: 20%;
    background: #fff;
    padding: 10px 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
    z-index: 999;
}
.menuTip__title {
    text-align: center;
}
.closeMenuTip {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
}
.ns-role-saveBtn {
    background: #f5f5f5;
    padding: 12px 10px;
    text-align: right;
    border-bottom: 1px solid #fff;
}
.check__btn {
    padding: 1px 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    vertical-align: middle;
}
</style>