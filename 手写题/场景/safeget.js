const data = { a: { a: { b: 1 } } }
let path = 'a.a.b'
let failMsg = 'fail'
function safeGet(data, path, failMsg) {
  let paths = path.split('.')
  for (let p of paths) {
    if (data[p] === undefined) {
      return failMsg
    }
    data = data[p]
  }
  return data
}

function get(source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {
    result = Object(result)[p]
    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}