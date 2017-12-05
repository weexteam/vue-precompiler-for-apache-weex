const bindingStyleNamesForPx2Rem = [
  'width',
  'height',
  'border',
  'borderWidth',
  'borderLeft',
  'borderRight',
  'borderTop',
  'borderBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'fontSize'
]

const ruleReg =/,?([^,:]+):([^,(]+(?:\([^)]+\)[^,}]*)?)/g

module.exports = function styleBindingHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const styleBinding = el.styleBinding
  if (!styleBinding) {
    return
  }
  const content = styleBinding.trim()
    .replace(/\s*[{}]\s*/g, '')
  let match
  let res = '{'
  while ((match = ruleReg.exec(content))) {
    try {
      let k = match[1]
      let v = match[2]
      k = k && k.trim()
      v = v && v.trim()
      if (k && bindingStyleNamesForPx2Rem.indexOf(k) > -1) {
        v = `_px2rem(${v},75)`
      }
      res += `${k}:${v},`
    } catch (err) {
      console.error('[weex-vue-precompiler] style binding match error:', str)
    }
  }
  res = res.substr(0, res.length - 1) + '}'
  el.styleBinding = res
}
