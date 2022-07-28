//扁平数据结构转tree
const a = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
const b = [
    {
        id: 1,
        name:'部门1',
        children:[
            {
                id: 2,
                name:'部门2',
                children:[

                ]
            },
            {
                id: 3,
                name: '部门3',
                children:[
                    
                ]
            }
        ]
    }
]

function getChildList(data, result, pid){
    
}