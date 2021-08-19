<template>
    <div>
        <el-table :data="tableData" border height="300px" style="width: 100%">
            <el-table-column width="60" label="序号">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item, index) in col"
                :key="`col_${index}`"
                :prop="dropCol[index].prop"
                :label="item.label"
            ></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="
                            detailCli(scope.row, scope.$index)
                        "
                        type="text"
                        size="small"
                    >
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            col: [{ label: "扩展名称", prop: "name" }],
            dropCol: [{ label: "扩展名称", prop: "name" }],
            pageNum: 1,
            pageSize: 10,
            total: 0,
        };
    },
    methods: {
        //查看
        detailCli(row, index) {},
        //分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {},
    },
};
</script>

<style>
</style>