const util = require('../util')
const {
  extend,
  getStaticStyleObject
} = util

function getLinesStaticStyle (n) {
  return {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    '-webkit-line-clamp': n
  }
}

exports.processText = function (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const staticStyle = getStaticStyleObject(el)
  let n = staticStyle.lines
  if (n > 0) {
    extend(staticStyle ,getLinesStaticStyle(n))
    el.staticStyle = JSON.stringify(staticStyle)
  }

  const finalClass = staticClass + ' weex-el weex-text'
  el.staticClass = `"${finalClass}"`
  attrs.push({
    name: `weex-type`,
    value: '"text"'
  })
  delete el.ns
  el.plain = false
}
