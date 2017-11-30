const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

// const testStyle = 'width:750px;height:120px;display:flex;background-color:red;'
// postcss([autoprefixer])
//   .process(testStyle)
//   .then(res => {
//     console.log(res.css)
//   })

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
  try {
    styleObj = JSON.parse(staticStyle)
  }
  catch (e) {
    return
  }
  // process staticStyle.
}
