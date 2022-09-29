let o = [{
  a: 1,
  b: 1
}, {
  a: '1',
  b: 1
}, {
  c: 1
}, {
  b: 1,
  'a': 1
}] //[{a:1,b:1},{a:'1',b:1},{c:1}]
function dropRepeat(arr) {
  const getNestDictSymbol = item => {
    const res = []
    const dfs = (cur, path) => {
      if (typeof cur !== 'object') {
        path.push(`#${Object.prototype.toString.call(cur)}:${cur}#`)
        res.push(path.join(''))
        return path.pop()
      }
      Object.keys(cur)
        .sort()
        .forEach(key => {
          path.push(key)
          dfs(cur[key], path)
          path.pop()
        })
    }

    dfs(item, [])
    return res.join('')
  }

  const res = []
  const visited = new Set()
  for (const item of arr) {
    if (typeof item !== 'object' || item == null) {
      if (visited.has(item)) continue
      res.push(item)
      visited.add(item)
    } else {
      const symbol = getNestDictSymbol(item)
      if (visited.has(symbol)) continue
      res.push(item)
      visited.add(symbol)
    }
  }

  return res
}

function dropRepeat(arr) {
  let newArr = []
  for (let t of arr) {
    if (newArr.find((c) => {
        for (let k in t) {
          if (t.hasOwnProperty(k)) {
            if (t[k] !== c[k]) {
              return false
            }
          }
        }
        return true
      })) {
      continue
    }
    newArr.push(t)
  }
  return newArr
}
console.log(unique(o));