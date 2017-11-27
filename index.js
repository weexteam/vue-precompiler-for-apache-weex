const identifyTag = require('./identifier')
const components = require('./components')
const hooks = require('./hooks')

module.exports = function preprocessNode (el) {
  const attrsMap = el.attrsMap ? el.attrsMap : (el.attrsMap = {})
  const attrsList = el.attrsList ? el.attrsList : (el.attrsList = [])
  const attrs = el.attrs ? el.attrs : (el.attrs = [])
  const staticClass = (el.staticClass || '').replace(/"/g, '')
  const args = [el, attrsMap, attrsList, attrs, staticClass]

  const tag = identifyTag(el)
  // use component processors to process components' special attrs.
  const processor = components[tag]
  if (processor) {
    processor.apply(null, args)
  }

  // process hooks.  
  for (const k in hooks) {
    hooks[k].apply(null, args)
  }
}