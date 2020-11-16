export function getUrlParams (search) {
  search = search || location.search;
  var paramsSplit = search.replace(/^[^\?]*\?/i, '').split('&');
  var params = {};
 
  if (Array.isArray(paramsSplit)) {
    paramsSplit.forEach(function (item) {
      const itemSplit = item.split('=');
      params[itemSplit[0]] = itemSplit[1];
    });
  }
  return params
}

// 时间戳转换时间