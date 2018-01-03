module.exports = [
  {
    type: 1,
    ref: '"inner"',
    refInFor: false,
    tag: 'div',
    plain: false,
    hasBindings: true,
    _hasBubbleParent: false,
    events: {
      weex$tap: {
        value: 'innerClick',
        modifiers: {
          stop: true
        }
      },
      click: {
        value: '$stopOutterA'
      }
    },
    nativeEvents: {
      weex$tap: {
        value: 'innerClick',
        modifiers: {
          stop: true
        }
      },
      click: {
        value: '$stopOutterA'
      }
    },
    attrs: [
      {
        name: 'weex-type',
        value: '"div"'
      }, {
        name: 'data-evt-click',
        value: '""'
      }
    ],
    staticClass: '" weex-ct weex-div"',
    _origTag: 'div'
  }, {
    type: 1,
    tag: 'a',
    _hasBubbleParent: false,
    nativeEvents: {
      'weex$tap': {
        value: '$stopPropagation'
      }
    },
    events: {
      'weex$tap': {
        value: '$stopPropagation'
      }
    },
    plain: false,
    attrs: [
      {
        name: 'href',
        value: '"#"'
      }, {
        name: 'weex-type',
        value: '"a"'
      }
    ],
    staticClass: '" weex-ct weex-a"',
  }, {
    type: 1,
    tag: 'div',
    ref: '"outer"',
    refInFor: false,
    _hasBubbleParent: false,
    events: {
      weex$tap: {
        value: 'outerClick',
        modifiers: {
          stop: true
        }
      },
      click: {
        value: '$stopOutterA'
      }
    },
    nativeEvents: {
      weex$tap: {
        value: 'outerClick',
        modifiers: {
          stop: true
        }
      },
      click: {
        value: '$stopOutterA'
      }
    },
    plain: false,
    attrs: [
      {
        name: 'weex-type',
        value: '"div"'
      }, {
        name: 'data-evt-click',
        value: '""'
      }
    ],
    hasBindings: true,
    staticClass: '" weex-ct weex-div"',
    static: false,
    _origTag: 'div'
  }
]
