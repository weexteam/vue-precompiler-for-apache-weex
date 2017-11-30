const transEvtsMap = {
  appear: 'appear',
  offsetAppear: 'offset-appear',
  disappear: 'disappear',
  offsetDisappear: 'offset-disappear'
}

module.exports = function eventsHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const preservedTags = this.config.preservedTags
  const isPreserved = preservedTags.indexOf(el._origTag || el.tag) > -1
  // process appear evts series:
  const evts = el.events
  if (!isPreserved) {
    // bind events to nativeEvents.
    el.nativeEvents = evts
  }
  if (el.hasBindings && evts) {
    const evtKeys = Object.keys(evts)
    for (let i = 0, l = evtKeys.length; i < l; i++) {
      const key = evtKeys[i]
      const transKey = transEvtsMap[key]
      const evtName = transKey || key
      if (transKey) {
        attrs.push({
          name: `weex-appear`,
          value: '""'
        })
      }
      attrs.push({
        name: `data-evt-${evtName}`,
        value: '""'
      })
    }

    // map click handler to tap handler.
    const clickObj = evts['click']
    if (clickObj) {
      evts['tap'] = clickObj
      delete evts['click']
    }
  }
}
