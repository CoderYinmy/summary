<template>
    <div>
        <el-input
            class="pf-filter"
            size="small"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            clearable
            @change="filterChange"
        ></el-input>
        <el-tree
            :props="treeProps"
            node-key="id"
            ref="tree"
            :data="treeData"
            :filter-node-method="filterNode"
            :default-expanded-keys="treeDataFir"
            @node-click="clickChangeFn"
            class="pf-tree"
            highlight-current
            style="font-size: 14px"
        >
            <span slot-scope="{ node, data }" class="custom-tree-node">
                <span :id="data.id">{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterText: "",
            treeProps: {
                label: "orgName",
                children: "childens",
                isLeaf: "leaf",
            },
            treeData: [],
            treeDataFir: [],
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    methods: {
        //搜索el-tree 选中节点显示在可视区域
        filterChange(v) {
            if (v == "" && this.orgId !== "") {
                this.selectedRegion(this.orgId);
            }
        },
        //节点显示在可视区方法
        selectedRegion(item) {
            const node = document.getElementById(item);
            setTimeout(() => {
                if (node) {
                    this.$nextTick(() => {
                        node.scrollIntoView({ block: "center" });
                    });
                }
            }, 100);
        },
        //过滤tree
        filterNode(value, data) {
            if (data.orgName) {
                if (!value) return true;
                return data.orgName.indexOf(value) !== -1;
            }
        },
        //获取tree  数据
        getOrgTreeList() {
            //刷新tree默认展开已经点击节点
            this.$nextTick(function () {
                this.$refs["tree"].setCurrentKey(this.orgId);
            });
            // this.orgId   节点id
            this.treeDataFir = [this.orgId];
        },
        //点击节点
        clickChangeFn(data) {},
    },
};
</script>

<style>
</style>