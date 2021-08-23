import Sortable from 'sortablejs'
//element行拖拽
function rowDrop() {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    const _this = this
    Sortable.create(tbody, {
        //  指定父元素下可被拖拽的子元素
        draggable: '.el-table__row',
        onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.list.splice(oldIndex, 1)[0]
            _this.tableData.list.splice(newIndex, 0, currRow)
        },
    })
}
