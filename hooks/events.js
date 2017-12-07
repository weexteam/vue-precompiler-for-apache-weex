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
}
