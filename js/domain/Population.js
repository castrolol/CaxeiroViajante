function Population(tours){

	this.tours = tours;
}

Population.init = function(size, cities){

	var tours = [];
	for(var i = 0; i < size; i++){
		tours.push(new Tour(cities.randomize()));
	}
	return new Population(tours);

}


Population.prototype.getFittest = function(){
	return this.tours.max(function(tour){
		return tour.fitness;
	});
};

Population.prototype.pickWithTournament = function() {
	var self = this;
	var size = this.tours.length;
	var candidates = this.tours.map(function(){
		return self.tours[Math.randomInt(0,  size - 1)];
	});

	return candidates.max(function(tour){
		return tour.fitness;
	});
};


Population.prototype.evolve = function(mutationRate){

	var self = this;
	var newTours = [];
	var size = this.tours.length;

	newTours.push(this.getFittest());

	for(var i = 1; i < size; i++){

		var parent1 = self.pickWithTournament();
		var parent2 = self.pickWithTournament();
		var newTour = parent1.crossOver(parent2);
		newTour = newTour.mutate(mutationRate);	
		newTours.push(newTour);

	}

	return new Population(newTours);

};



