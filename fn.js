function solve(arr, n, k) {
  const map = {}
  arr.forEach((num) => {
    const arr = map[num[0]] || []
    arr.push([num[1], num[2]])
    map[num[0]] = arr
  })

  const array = [...Array(n + 1)].fill(-1) // 因为有到达时间为0 的边. 所以使用-1
  array[k] = 0
  const queue = [[k, 0]]
  while (queue.length) {
    const [node, num] = queue.pop()
    ;(map[node] || []).forEach(([n, t]) => {
      if (array[n] !== -1 && array[n] <= num + t) return
      array[n] = num + t
      queue.push([n, array[n]])
    })
  }
  let max = 0
  for (let i = 1; i <= n; i++) {
    if (array[i] === -1) return -1
    if (array[i] > max) max = array[i]
  }
  return max
}