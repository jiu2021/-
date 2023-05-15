// 浏览器环境
function URLParser(url) {
  const a = document.createElement('a');
  a.href = url;
  return {
    protocol: a.protocol,
    username: a.username,
    password: a.password,
    hostname: a.hostname, // host 可能包括 port, hostname 不包括
    port: a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
  }
}


// node
function URLParser_node(url) {
  const urlObj = new URL(url);
  return {
    protocol: urlObj.protocol,
    username: urlObj.username,
    password: urlObj.password,
    hostname: urlObj.hostname,
    port: urlObj.port,
    pathname: urlObj.pathname,
    search: urlObj.search,
    hash: urlObj.hash,
  }
}