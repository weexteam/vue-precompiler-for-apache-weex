const appearEvts = [
  'appear',
  'offsetAppear',
  'disappear',
  'offsetDisappear'
]

module.exports = function eventsHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  // process appear evts series:
  const evts = el.events
  console.log(el.hasBindings, evts)
  if (el.hasBindings && evts) {
    for (let i = 0, l = appearEvts.length; i < l; i++) {
      const appearEvt = appearEvts[i]
      const evtObj = evts[appearEvt]
      if (evtObj) {
        const name = `data-evt-${appearEvt}`
        attrs.push({
          name,
          value: '""'
        })
      }
    }

    // map click handler to tap handler.
    const clickObj = evts['click']
    if (clickObj) {
      evts['tap'] = clickObj
      delete evts['click']
    }
  }
}
