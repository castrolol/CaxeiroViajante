function CitiesDrawner(getCities, canvasManager){
	
	this.manager = canvasManager;
	this.getCities = getCities;

	canvasManager.draw(function(ctx){

		var cities = getCities();
		if( !cities.length )return;
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.moveTo(cities[0].x, cities[0].y);
		for(var i = 1; i < cities.length; i++ ){
			ctx.lineTo(cities[i].x, cities[i].y);
		}
		ctx.lineTo(cities[0].x, cities[0].y);
		ctx.stroke();
		ctx.closePath();

		cities.forEach(function(city){
			drawCity(ctx, city);
		});

	});

	function drawCity(ctx, city){

		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.arc(city.x, city.y, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();

	}

}