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

exports.processImage = function (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  // src => data-img-src. both binding and static.
  for (let i = 0, l = attrs.length; i < l; i++) {
    const { name, value } = attrs[i]
    if (name === 'src') {
      attrs.push({
        name: 'data-img-src',
        value
      })
    }
  }
  /**
   * resize: => background-position
   * NOTE: only static value is valid for resize.
   */
  const resize = attrsMap.resize
  const staticStyle = getStaticStyleObject(el)
  extend(staticStyle, getResizeStyle(resize))
  el.staticStyle = JSON.stringify(staticStyle)
  const finalClass = staticClass + ' weex-el weex-image'
  el.staticClass = `"${finalClass}"`
  attrs.push({
    name: `weex-type`,
    value: '"image"'
  })
}
