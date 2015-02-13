function Tour(cities){

	self = this;
	this.cities = cities instanceof Array ? cities : [];
	this.distance = 0;
	this.fitness = 0;

	var count = cities.length;

	cities.forEach(function(city, i){

		var j = (i + 1) % count;
		self.distance += city.distanceTo(cities[j]);
	});

	self.fitness = 1 / self.distance;
 }

Tour.prototype.isBestThan = function(otherTour){
	return this.fitness < otherTour.fitness;
}

Tour.prototype.swap = function(indexA, indexB){

	var cities = self.cities.copy();
	var keeped = cities[indexA];
	cities[indexA] = cities[indexB];
	cities[indexB] = keeped;

	return new Tour(cities);

};

Tour.prototype.mutate = function(rate) {
	
	if( Math.random() > rate ) return this;
	var size = this.cities.length;

	var swapIndexA = Math.randomInt(0, size - 1);
	var swapIndexB = Math.randomInt(0, size - 1);

	return this.swap(swapIndexA, swapIndexB);

};

Tour.prototype.crossOver = function(other) {
	
	var newRoute = [];
	
	var size = this.cities.length;

	var crossLimitA = Math.randomInt(0, size - 1);
	var crossLimitB = Math.randomInt(0, size - 1);

	var minLimit = Math.min(crossLimitA, crossLimitB);
	var maxLimit = Math.max(crossLimitA, crossLimitB);

	this.cities.forEach(function(city, i){
		var itemToAdd = null;
		if( i > minLimit && i < maxLimit ){
			itemToAdd = city;
		}
		newRoute.push(itemToAdd);
	});

	other.cities.forEach(function(candidate){

		if( newRoute.contains(candidate) ) return;

		newRoute.some(function(city, i){

			if( city != null ) return;
			newRoute[i] = candidate;
			return true;

		});

	});

	return new Tour(newRoute);

};