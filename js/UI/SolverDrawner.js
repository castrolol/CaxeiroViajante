function SolverDrawner(solver, canvasManager){
	
	this.manager = canvasManager;
	this.solver = solver;

	canvasManager.draw(function(ctx){
		ctx.beginPath();
		ctx.font="20px Segoe UI";
		ctx.fillStyle = "black";		
		ctx.fillText("Distancia: " + solver.population.getFittest().distance.toFixed("1") ,10,15);
		ctx.fillText("Fitness: " + solver.population.getFittest().fitness.toFixed("15") ,10,50);
		ctx.fillText("Geracoes: " + solver.generation.toFixed("0") ,10,75);
		ctx.fillText("Duraca\u0303o: " + solver.stopWatch.elapsed("s", 1).toFixed(1) + " s" ,10,102);
		ctx.fill();
		ctx.closePath();

	});



}