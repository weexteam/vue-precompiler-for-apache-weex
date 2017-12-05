const esprima = require('esprima')
const escodegen = require('escodegen')

/**
 * to wrap object leterals with _px2rem()
 */

const bindingStyleNamesForPx2Rem = [
  'width',
  'height',
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
  'fontSize'
]

// // for test
// const exp = `a = { 'width': 'w', height: h, bgColor: _px2rem(bgColor, 75)}`
// const ast = esprima.parse(exp).body[0].expression.right
// console.log(JSON.stringify(ast, null, 2))
// transformObject(ast)
// let res = escodegen.generate(ast, {
//   format: {
//     indent: {
//       style: ' '
//     },
//     newline: '',
//   }
// })
// console.log('res:', res)

function transformObject (obj) {
  const properties = obj.properties
  for (let i = 0, l = properties.length; i < l; i++) {
    const prop = properties[i]
    const keyNode = prop.key
    const keyType = keyNode.type
    const key = keyType === 'Literal' ? keyNode.value : keyNode.name
    const valNode = prop.value
    if (bindingStyleNamesForPx2Rem.indexOf(key) > -1) {
      prop.value = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: '_px2rem'
        },
        arguments: [valNode, { type: 'Literal', value: 75 }]
      }
    }
  }
}

module.exports = function styleBindingHook (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  const styleBinding = el.styleBinding
  if (!styleBinding) {
    return
  }
  const statement = `a = ${styleBinding.trim()}`
  const ast = esprima.parse(statement).body[0].expression.right
  if (ast.type === 'Identifier') {
    return
  }

  if (ast.type === 'ArrayExpression') {
    const elements = ast.elements
    for (let i = 0, l = elements.length; i < l; i++) {
      const element = elements[i]
      if (element.type === 'ObjectExpression') {
        transformObject(element)
      }
    }
  }
  else if (ast.type === 'ObjectExpression') {
    transformObject(ast)
  }
  else {
    return
  }

  el.styleBinding = escodegen.generate(ast, {
    format: {
      indent: {
        style: ' '
      },
      newline: '',
    }
  })
}
