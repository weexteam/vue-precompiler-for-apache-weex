const config = {
  eventMap: {
    click: 'weex$tap',
    scroll: 'weex$scroll'
  },
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
