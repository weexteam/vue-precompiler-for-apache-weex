# weex-vue-precompiler

weex-vue-precompiler is a node transformer plugin for vue-loader. The main purpose is to precompile nodes for [weex-vue-render](https://www.npmjs.com/package/weex-vue-render) to reduce performance consumption in render's runtime.

Use this precompiler can save you a lot of render time for weex running on web using weex-vue-render.

## How To Use

In you vue-loader config, you can use it like this:

```javascript
// require and init.
const precompile = require('weex-vue-precompiler')(/*optional config*/)

// in vue config:
{
  optimizeSSR: false,
  postcss: [require('autoprefixer')({
    browsers: ['> 0.1%', 'ios >= 8']
  }), require('postcss-px2rem')({ remUnit: 75 })],
  compilerModules: [
    {
      postTransformNode: el => precompile(el)
    }
  ],
}
```

## config

* `preservedTags`: the preserved weex components tag list. The default value is: `['a','container','div','image','img','text','input','switch','list','scroller','waterfall','slider','indicator','loading-indicator','loading','refresh','textarea','video','web']`. If you have other components as plugins installed in weex, you should add them to this lists, add pass the whole list to this.
