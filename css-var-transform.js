module.exports = function (css) {
  return Enhancer.CssVar ? Enhancer.CssVar.transform(css, 'xlsx-parser') : css;
}

