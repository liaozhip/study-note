module.exports = function(content) {
  content = JSON.stringify(content)
  this.callback(null, content)
}