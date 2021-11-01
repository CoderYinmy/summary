//拍平数组
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  // arr.reduce((v, item) => {
  //     return v.concat(Array.isArray(item) ? flatten(item) : item)
  // }, [])
  var res = [];
  arr.map((item) => {
    if (Array.isArray(item)) {
      res = [...res, ...flatten(item)];
    } else {
      res.push(item);
    }
  });
  console.log(res);
  return res;
}
flatten(arr);

// 数组排序

// 数组去重

// 数组查找

// 数据类型之间的转换

// 将数字12345678转化成RMB形式：12,345,678
function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  sign = num == (num = Math.abs(num));
  num = Math.floor(num * 10 + 0.50000000001);
  cents = num % 10;
  num = Math.floor(num / 10).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num + "." + cents;
}
formatCurrency(123456745);
// 斐波那契

// 二叉树遍历查找
function treeFn(data) {
  for (let i = 0, il = data.length; i < il; i++) {
    let item = data[i];
    if (item.children && item.children.length > 0) {
      treeFn(item.children);
    }
  }
  // console.log(data)
}
let dataTree = [
  {
    id: 0,
    children: [
      {
        id: 1,
        children: [
          {
            id: 12,
          },
        ],
      },
    ],
  },
];
treeFn(dataTree);

//实现闭包
let counter = (function () {
  let a = 1;
  return function () {
    return (a += 1);
  };
})();
