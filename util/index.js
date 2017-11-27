exports.extend = function (to, from) {
  if (!to) { return }
  const args = Array.prototype.slice.call(arguments, 1)
  for (let i = 0, l = args.length; i < l; i++) {
    const from = args[i]
    for (const k in from) {
      if (from.hasOwnProperty(k)) {
        to[k] = from[k]
      }
    }
  }
}
