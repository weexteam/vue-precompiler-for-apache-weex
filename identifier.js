const metaMap = {
  figure: ['img', 'image', 'figure'],
  p: ['text', 'p'],
  div: ['container', 'div']
}

const checkMap = Object.keys(metaMap).reduce(function (pre, targetTag) {
  const tagArr = metaMap[targetTag]
  tagArr.forEach(function (fromTag) {
    pre[fromTag] = targetTag
  })
  return pre
}, {})

module.exports = function (el) {
  const targetTag = checkMap[el.tag]
  if (targetTag) {
    el.tag = targetTag
  }
  return el.tag
}
