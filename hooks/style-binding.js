/**
 * @fileOverview to wrap object leterals with _px2rem()
 */

const esprima = require('esprima')
const escodegen = require('escodegen')
const bindingStyleNamesForPx2Rem = require('../config').bindingStyleNamesForPx2Rem

const { getCompiler, getTransformer } = require('wxv-transformer')

// const exp = `a = {width: 'w', height: 'h'}`
// const ast = esprima.parse(exp)
// console.log('ast:', JSON.stringify(ast, null, 2))

/**
 * for test
 */ 
// const exp = `abc`
// const exp = `[{width:w}, abc]`
// styleBindingHook({ styleBinding: exp })

/**
 * transform :style="{width:w}" => :style="{width:_px2rem(w)}"
 * This kind of style binding with object literal is a good practice.
 * @param {ObjectExpression} obj
 */
function transformObject (obj, origTagName) {
  const compiler = getCompiler(origTagName)
  if (compiler) {
    return compiler.compile(obj, bindingStyleNamesForPx2Rem)
  }
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

/**
 * transform :style="someObj" => :style="_px2rem(someObj)"
 * This kind of binding with object variable could cause runtime
 * performance reducing.
 * @param {Identifier} node
 * @param {string} tagName
 */
function transformVariable (node, tagName) {
  let callName = '_px2rem'
  const args = [node, { type: 'Literal', value: 75 }]
  const transformer = getTransformer(tagName)
  if (transformer) {
    callName = '_processExclusiveStyle'
    args.push({
      type: 'Literal',
      value: tagName,
    })
  }
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: callName
    },
    arguments: args
  }
}

function styleBindingHook (
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
  let ast = esprima.parse(statement).body[0].expression.right
  if (ast.type === 'Identifier') {
    ast = transformVariable(ast, el._origTag)
  } else if (ast.type === 'ArrayExpression') {
    const elements = ast.elements
    for (let i = 0, l = elements.length; i < l; i++) {
      const element = elements[i]
      if (element.type === 'ObjectExpression') {
        transformObject(element, el._origTag)
      }
      else if (element.type === 'Identifier') {
        elements[i] = transformVariable(element, el._origTag)
      }
    }
  }
  else if (ast.type === 'ObjectExpression') {
    transformObject(ast, el._origTag)
  }
  else {
    return
  }

  const res = escodegen.generate(ast, {
    format: {
      indent: {
        style: ' '
      },
      newline: '',
    }
  })
  // console.log('res:', res)
  el.styleBinding = res
}

module.exports = styleBindingHook
