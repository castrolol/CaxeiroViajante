//Math extensions 
Math.randomInt = function(min, max){
	return Math.round(Math.randomFloat(min, max));
};

Math.randomFloat = function(min, max){
	var seed = Math.random();
	return (seed * (max - min)) + min;
};




//Array extensions
Array.prototype.copy = function(){
	return this.slice(0);
}

Array.prototype.max = function(selector){

	var maxItem = this[0];
	var maxValue = -999999;
	this.forEach(function(item){
		var value = selector(item);
		if( value > maxValue ){
			maxItem = item;
			maxValue = value;
		} 
	});

	return maxItem;

}

Array.prototype.randomize = function(){

	var size = this.length;
	var itensInArray = 0;
	var newArray = [];
	var emptyObject = {}; //used to mark unique replaceable space

	this.forEach(function(){ newArray.push(emptyObject); }); //create a new array with same size and fill with emptyObject

	this.forEach(function(item){

		var index = Math.randomInt(0, size - 1);
		
		while(newArray[index] != emptyObject) {
			index += 1;
			index %= size;
		}

		itensInArray++;
		newArray[index] = item;

	});

	return newArray;
}

Array.prototype.contains = function(element) {
	for(var i = 0; i < this.length; i++){
	 if( element === this[i] ) return true;
	}
	return false;
};