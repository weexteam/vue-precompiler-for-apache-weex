const identifyTag = require('./identifier')
const components = require('./components')
const hooks = require('./hooks')
const util = require('./util')
const defaults = require('./config')

class Precompiler {
  constructor (config) {
    this.config = defaults
    util.extend(this.config, config)
  }

  precompile (el) {
    const attrsMap = el.attrsMap ? el.attrsMap : (el.attrsMap = {})
    const attrsList = el.attrsList ? el.attrsList : (el.attrsList = [])
    const attrs = el.attrs ? el.attrs : (el.attrs = [])
    const staticClass = (el.staticClass || '').replace(/"/g, '')
    const args = [el, attrsMap, attrsList, attrs, staticClass]
  
    const tag = identifyTag(el)
    // use component processors to process components' special attrs.
    const processor = components[tag]
    if (processor) {
      processor.apply(this, args)
    }
  
    // process hooks.  
    for (const k in hooks) {
      hooks[k].apply(this, args)
    }
  }
}

module.exports = function getPrecompiler (config) {
  const precompiler = new Precompiler(config)
  return precompiler.precompile.bind(precompiler)
}
