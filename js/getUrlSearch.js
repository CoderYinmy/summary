let Url = "www.baidu.com?a=1&b=2#print";
//移除hash
function removeHash(url) {
  let startHash = url.indexOf("#");
  if (startHash !== -1) {
    return url.slice(0, startHash);
  }
  return url;
}

//获取query参数
function queryStr(url) {
  let queryStart = url.indexOf("?");
  url = removeHash(url);
  if (queryStart !== -1) {
    return url.slice(queryStart + 1);
  }
  return url;
}

//生成键值对
function getKeyValue(string, ifstring) {
  let idx = string.indexOf(ifstring);
  let item = [string.slice(0, idx), string.slice(idx + ifstring.length)];
  return item;
}

function parse(url) {
  let obj = {};
  url = url.trim().replace(/\+/g, " ");
  for (var param of url.split("&")) {
    let arr = getKeyValue(param, "=");
    let key = arr[0];
    key = decodeURIComponent(key);
    let value = arr[1];
    value = decodeURIComponent(value);
    obj[key] = value;
  }
  return obj;
}

function parseUrl(url) {
  return {
    href: removeHash(url),
    query: parse(queryStr(url)),
  };
}
console.log(parseUrl(Url));
