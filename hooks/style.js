const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-plugin-px2rem')

/**
 * for test.
 */
// const testStyle = '{"width":"750px","height":"120px","display":"flex","background-color":"red","background-size":"cover"}'
// var res = postcss([
//   autoprefixer({
//     browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
//   }),
//   px2rem({
//     rootValue: 75
//   })
// ])
// .process(testStyle
//   .replace(/\s/g, '')
//   .replace(/,/g, ';')
//   .replace(/"/g, '')
// ).css
//   .replace(/[{}]/g, '')
//   .split(';')
//   .map(statement => statement.split(':').map(part => `"${part}"`).join(':'))
//   .join(",")
// res = `{${res}}`
// console.log('res=>', res)

module.exports = function styleHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const staticStyle = el.staticStyle
  let styleObj
  if (!staticStyle) {
    return
  }
  const config = this.config
  const before = staticStyle
    .replace(/\s/g, '')
    .replace(/",/g, '";')
    .replace(/"/g, '')
  // console.log('before:', staticStyle)
  const after = postcss([
      autoprefixer(config.autoprefixer),
      px2rem(config.px2rem)
    ])
    .process(before)
    .css
    .replace(/[{}]/g, '')
    .split(';')
    .map(statement => statement
      .split(':')
      .map(part => `"${part}"`)
      .join(':'))
    .join(",")
  // console.log('res=>', after)
  el.staticStyle = `{${after}}`
}
