const config = {
  eventMap: {
    click: 'weex$tap',
    scroll: 'weex$scroll'
  },
  weexEvents: [
    'click',
    'tap',
    'scroll',
    // gesture
    'touchstart',
    'touchend',
    'touchmove',
    'swipe',
    'panstart',
    'panmove',
    'panend',
    'longpress',
    'long',
    // input & switch & slider
    'input',
    'key',
    'keyup',
    'keydown',
    'return',
    'change',
    'focus',
    'blur',
    'active',
    // appear series.
    'appear',
    'disappear',
    'offsetAppear',
    'offsetDisappear',
    // refresh & loading
    'refresh',
    'pullingdown',
    'loading',
    // video
    'start',
    'pause',
    'finish',
    'fail'
  ],
  // preservedTags: [
  //   'a',
  //   'container',
  //   'div',
  //   'image',
  //   'img',
  //   'text',
  //   'input',
  //   'switch',
  //   'list',
  //   'scroller',
  //   'waterfall',
  //   'slider',
  //   'indicator',
  //   'loading-indicator',
  //   'loading',
  //   'refresh',
  //   'textarea',
  //   'video',
  //   'web'
  // ],
  autoprefixer: {
    browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
  },
  px2rem: {
    rootValue: 75
  },
  bindingStyleNamesForPx2Rem: [
    'width',
    'height',
    'left',
    'right',
    'top',
    'bottom',
    'border',
    'borderWidth',
    'borderLeft',
    'borderRight',
    'borderTop',
    'borderBottom',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'fontSize',
    'transform',
    'webkitTransform',
    'WebkitTransform',
    'mozTransform',
    'MozTransform'
  ]
}

module.exports = config
