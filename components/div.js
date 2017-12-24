exports.processDiv = function (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const finalClass = staticClass + ' weex-ct weex-div'
  el.staticClass = `"${finalClass}"`
}
