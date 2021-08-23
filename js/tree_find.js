function setName(datas) {
    //遍历树  获取id数组
    for (let i = 0; i < datas.length; i++) {
        let item = datas[i]
         if (item.hidden == 1) {
              //  let data = datas.splice(i, 1);
            }
        if (item.childens && item.childens.length > 0) {
            this.setName(item.childens);
        }
    }
    console.log(datas,'datas');
}