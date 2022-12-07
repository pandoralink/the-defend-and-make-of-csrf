let _100KBStr = "";
for (let i = 0; i < 1024 * 100; i++) {
  _100KBStr += "1";
}
for (let i = 0; i < 10; i++) {
  try {
    location.hash += _100KBStr;
  } catch (e) {
    console.log(i * 100 + "KB - " + (i + 1) * 100 + "KB 之间");
  }
}
console.log(location.hash.length);

/**
 * 测试浏览器 location.hash 大小范围
 * @param {number} [base=1] 默认为 1，100KB 起步计算
 * @param {number} [maxLimit=10] 默认为 10，即 1000KB
 */
function maxHashRange(base = 1, maxLimit = 10) {
  let baseStr = "";
  // URL 使用 ASCII 码编码，utf-8 和 ascii 的 1 都为 1 字节 | 1B
  for (let i = 0; i < 1024 * 100 * base; i++) {
    baseStr += "1";
  }
  let origin = "#";
  try {
    for (let i = 0; i < maxLimit; i++) {
      origin += baseStr;
      location.hash += baseStr;
      if (location.hash.length !== origin.length) {
        throw new Error("max length error")
      }
    }
    console.log("超过" + maxLimit * base * 100 + "KB");
  } catch (e) {
    // 超过 location.hash 长度会报错
    console.log("不超过" + Math.floor(origin.length / 1024) + "KB之间");
  }
  location.hash = "";
}
maxHashRange(1, 13);
