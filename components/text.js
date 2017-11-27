const extend = require('../util').extend

function getLinesStyle (lines) {
  if (lines > 0) {
    return {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      '-webkit-line-clamp': lines
    }
  }
}

module.exports = function processText (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const n = attrsMap.lines
  if (n > 0) {
    /**
     * lines: x => styles: {}
     */
    let staticStyle = el.staticStyle
    try {
      staticStyle = JSON.parse(staticStyle)
    }
    catch (e) {
      staticStyle = {}
    }
    extend(staticStyle, getLinesStyle(n))
    el.staticStyle = JSON.stringify(staticStyle)
    const finalClass = staticClass + ' weex-el weex-text'
    el.staticClass = `"${finalClass}"`
  }
}
