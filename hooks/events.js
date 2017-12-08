const transEvtsMap = {
  appear: 'appear',
  offsetAppear: 'offset-appear',
  disappear: 'disappear',
  offsetDisappear: 'offset-disappear'
}

// check whether this el has a parent with bubble=true attribute.
function hasBubbleParent (el) {
  let parent = el.parent
  while (parent) {
    if (parent._bubble || parent._hasBubbleParent === true) {
      el._hasBubbleParent = true
      return true
    }
    else if (parent._hasBubbleParent === false) {
      el._hasBubbleParent = false
      return false
    }
    parent = parent.parent
  }
  el._hasBubbleParent = false
  return false
}

module.exports = function eventsHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const eventMap = this.config.eventMap
  const evts = el.events
  // bind events to nativeEvents.
  el.nativeEvents = evts
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

    /**
     * map event handlers.
     * - click -> weex$tap
     * - scroll -> weex$scroll
     */
    for (const k in eventMap) {
      const evtObj = evts[k]
      if (evtObj) {
        evts[eventMap[k]] = evtObj
        delete evts[k]
      }
    }
  }

  // bind _bubble attr for every node.
  const bubble = attrsMap.bubble
  if (bubble === 'true' || bubble === true) {
    el._bubble = true
  }

  // stop propagation by default unless attr 'bubble' is set to true.
  if (evts) {
    if (!hasBubbleParent(el)) {
      for (const k in evts) {
        const evt = evts[k]
        const modifiers = evt.modifiers || (evt.modifiers = {})
        modifiers.stop = true
      }
    }
  }
  // console.log('===>', el, el.nativeEvents)
}
