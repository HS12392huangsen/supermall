export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 正则表达式,正则表达式是干什么的?字符串匹配利器(难，规则太多)
export function formatDate(date, fmt) {
  // 1、获取年份
  // y
  // y+ -> 1个或者多个y 
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y

  // 2019
  // yy - 19
  // yyyy - 2019
  // y - 9
  // yyy - 019
  // yyyy-MM-dd
  if (/(y+)/.test(fmt)) {
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2、获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // 如果fmt中为'm'，则直接用str替换，得到如'4'、'10'之类的结果
      // 如果fmt中为'mm'，则str左边补零后替换，得到如'04'、'10'之类的结果
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  // 截取两位，传入04——>得到0004——>截取两位，得到04。传入4——>得到004——>截取两位，得到04
  return ('00' + str).substr(str.length);
};

