module.exports = function(content) {
  content = `
    const tag = document.createElement('style')
    tag.innerHTML = ${content}
    document.head.appendChild(tag)
  `
  return content
}