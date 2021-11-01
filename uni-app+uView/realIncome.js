// 计算实际收入
function getRealIncome(v) {
  let price = Number(v.price);
  let data = [];
  let sum = 0;
  v.ledger_role.map((res) => {
    let fixed = Number(res.fixed);
    let ratio = Number(res.ratio);
    let num = fixed + price * (ratio / 100);
    data.push(num);
  });
  data.map((s) => {
    sum += s;
  });
  console.log(price - sum);
  // let fixed0 = Number(v.ledger_role[0].fixed)
  // let fixed1 = Number(v.ledger_role[1].fixed)
  // let ratio0 = Number(v.ledger_role[0].ratio);
  // let ratio1 = Number(v.ledger_role[1].ratio);
  // let a = fixed0 + price * (ratio0 / 100);
  // let b = fixed1 + price * (ratio1 / 100);
  // return (price - a - b).toFixed(2)
  return (price - sum).toFixed(2);
}
let data = {
  price: "20.00",
  ledger_role: [
    { fixed: 1, ratio: 5 },
    { fixed: 2, ratio: 3 },
  ],
};

getRealIncome(data);
