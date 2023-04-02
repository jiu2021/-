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