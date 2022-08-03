function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

function isObject(data) {
  return data && typeof data === 'object'
}
module.exports = {
  getType,
  isObject
}