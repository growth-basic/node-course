function Layer(path, handler) {
  this.stack = [];
  this.path = path;
  this.handler = handler;
}

module.exports = Layer;
