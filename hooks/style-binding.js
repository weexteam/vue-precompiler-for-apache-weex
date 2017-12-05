const bindingStyleNamesForPx2Rem = [
  'width',
  'height',
  'border',
  'border-width',
  'border-left',
  'border-right',
  'border-top',
  'border-bottom',
  'border-left-width',
  'border-right-width',
  'border-top-width',
  'border-bottom-width',
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'padding',
  'padding-left',
  'padding-right',
  'padding-top',
  'padding-bottom',
  'font-size'
]

const ruleReg =/([^:]+):([^,]+)/

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
    .replace(/\s*[{}]\s*/g, '').split(',')
    .map(function (str) {
      const match = str.trim().match(ruleReg)
      let k = match[1]
      let v = match[2]
      k = k && k.trim()
      v = v && v.trim()
      if (k && bindingStyleNamesForPx2Rem.indexOf(k) > -1) {
        v = `_px2rem(${v})`
      }
      return `${k}:${v}`
    })
    .join(',')
  el.styleBinding = `{${content}}`
}
