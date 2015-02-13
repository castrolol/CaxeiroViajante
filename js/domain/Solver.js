

function Solver(numberOfGenerations, cities){

	var self = this;

	Object.defineProperty(this, "bestSolution", {
		get: function(){
			return self.population.getFittest();	
		}
	});


	this.cities = cities instanceof Array ? cities : [];
	this.maxGenerations = numberOfGenerations;
	this.generation = 0;
	this.mutationRate = 0.05;


	if( "StopWatch" in window ){
		this.stopWatch = new StopWatch();
	}

	this.solution = new Tour(cities);
	this.population = Population.init(50, cities);

	this.isCompleted = function(){
		return self.maxGenerations <= this.generation;
	};


}

Solver.prototype.iterate = function() {

	var self = this;

	if( self.isCompleted() ) return;

	self.generation++;

	self.population = self.population.evolve(self.mutationRate);

};

 
Solver.prototype.complete = function() {

	if( "stopWatch" in this ) this.stopWatch.start();

	this.generation = 0;
	var self = this;

	function iterateStep(){

		for(var i = 0; i < 10; i++) self.iterate();
		if( self.isCompleted() ) {
			if( "stopWatch" in self ) self.stopWatch.stop();
			return;
		}
		requestAnimationFrame(iterateStep);
	}

	iterateStep();

};


