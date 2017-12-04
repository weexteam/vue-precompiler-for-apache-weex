const util = require('../util')
const {
  extend,
  getStaticStyleObject
} = util

function getResizeStyle (resize) {
  const stretch = '100% 100%'
  const res = resize || stretch
  const bgSize = ['cover', 'contain', stretch].indexOf(res) > -1 ? res : stretch
  // compatibility: http://caniuse.com/#search=background-size
  return { 'background-size': bgSize }
}

module.exports = function processImg (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  // src => data-img-src. both binding and static.
  const bindingUrl = attrsMap[':src']
  const staticUrl = attrsMap['src']
  const url = bindingUrl || staticUrl
  const isBinding = !!bindingUrl
  attrs.push({
    name: 'data-img-src',
    value: isBinding ? url : `"${url}"`
  })
  /**
   * resize: => background-position
   * NOTE: only static value is valid for resize.
   */
  const resize = attrsMap.resize
  const staticStyle = getStaticStyleObject(el)
  extend(staticStyle, getResizeStyle(resize))
  el.staticStyle = JSON.stringify(staticStyle)
  const finalClass = staticClass + ' weex-el weex-img'
  el.staticClass = `"${finalClass}"`
}
