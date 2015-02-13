function City(x, y) {

  var self = this;

  self.x = x || 0;
  self.y = y || 0;

  this.distanceTo = function (city) {

    var dx = city.x - self.x;
    var dy = city.y - self.y;

    return Math.sqrt((dx * dx) + (dy * dy));

  }

}
