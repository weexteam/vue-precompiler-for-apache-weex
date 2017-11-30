const config = {
  preservedTags: [
    'a',
    'container',
    'div',
    'image',
    'img',
    'text',
    'input',
    'switch',
    'list',
    'scroller',
    'waterfall',
    'slider',
    'indicator',
    'loading-indicator',
    'loading',
    'refresh',
    'textarea',
    'video',
    'web'
  ],
  autoprefixer: {
    browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
  },
  px2rem: {
    rootValue: 75
  }
}

module.exports = config
