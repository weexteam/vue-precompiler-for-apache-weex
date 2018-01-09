module.exports = [
  {
    type: 1,
    tag: 'div',
    plain: false,
    hasBindings: true,
    _hasBubbleParent: false,
    events: {
      appear: {
        value: 'appear',
        modifiers: {
          stop: true
        }
      },
      weex$tap: {
        value: 'click',
        modifiers: {
          stop: true
        }
      },
      click: {
        value: '$stopOuterA'
      }
    },
    attrs: [
      {
        name: 'weex-type',
        value: '"div"'
      }, {
        name: 'data-evt-click',
        value: '""'
      }, {
        name: 'weex-appear',
        value: '""'
      }, {
        name: 'data-evt-appear',
        value: '""'
      }
    ],
    staticClass: '" weex-ct weex-div"',
    _origTag: 'div'
  }, {
    type: 1,
    tag: 'div',
    plain: false,
    attrs: [
      {
        name: 'weex-type',
        value: '"div"'
      }
    ],
    staticClass: '" weex-ct weex-div"',
    static: false,
    _origTag: 'div'
  }
]
