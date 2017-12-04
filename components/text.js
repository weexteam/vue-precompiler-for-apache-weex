const util = require('../util')
const {
  extend,
  getStaticStyleObject
} = util

function getLinesStaticStyle () {
  return {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
  }
}

module.exports = function processText (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const staticStyle = getStaticStyleObject(el)
  let hasBindings = false
  const bindingLinesReg = /lines['"]?\s*:([^,}]+)/
  const styleBinding = el.styleBinding
  const bindingMatch = (styleBinding + '').match(bindingLinesReg)
  if (bindingMatch && bindingMatch[1]) {
    hasBindings = true
  }
  let n = staticStyle.lines
  if ((n > 0) || hasBindings) {
    extend(staticStyle ,getLinesStaticStyle())
    if (n > 0) {
      extend(staticStyle, {
        '-webkit-line-clamp': n
      })
      el.staticStyle = JSON.stringify(staticStyle)
    }
    else {
      el.styleBinding = styleBinding.replace(
        bindingLinesReg,
        function($0, $1) {
          return `webkitLineClamp:${$1}`
        })
    }
  }

  const finalClass = staticClass + ' weex-el weex-text'
  el.staticClass = `"${finalClass}"`
}
