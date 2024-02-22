//实现_.get()
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get(obj, path, defaultValue = undefined) {
  //处理path 可能是字符串也可能是数组
  if (typeof path === 'string') {
    path = path.replace(/\[(\d+)\]/, '.$1').split('.')
    console.log(path);
  } else if (!Array.isArray(path)) {
    return defaultValue
  }
  let res = obj
  for (let key of path) {
    res = Object(res)[key]
    if (res === undefined) return defaultValue
  }
  return res
}
const object = {
  'a': [{
    'b': {
      'c': 3
    }
  }]
}
console.log(get(object, 'a[0].b.c'));

