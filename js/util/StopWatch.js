  function StopWatch(){
	

	var events = [];
	var lastEvent;

	this.formats = [
		{
			formats : [ 'ms', 'millisecond', 'm' ],
			mult: 1
		},
		{
			formats : [ 's', 'second', 'sec' ],
			mult: 1000
		},
		{
			formats: ['m', 'minute', 'min'],
			mult: 60000
		},
		{
			formats: ['h', 'hour', 'hs'],
			mult: 3600000
		},
		{
			formats: ['d', 'day'],
			mult: 86400000
		}
	];

	function addEvent(ev){
		lastEvent = ev;
		events.push(ev);
	}

	this.start = function(){

		addEvent({
			type: "start",
			date: new Date()
		});

	}

	this.stop = function(){
		addEvent({
			type: "stop",
			date: new Date()
		});
	}

	this.startDate = function(date){
		if( date > new Date() ) throw new Error("The startDate cannot be after now");
		addEvent({
			type: "start",
			date: new Date()
		});
	}

	this.elapsed = function(format, precision){

		precision = ( typeof precision == "number" && precision ) || 2;

		var milis = 0;
		var startPoint = null;
		events.forEach(function(ev){

			switch(ev.type){
				case "start":
					if( startPoint == null ){
						startPoint = ev.date;
					}
					break;
				case "stop":
					if( startPoint != null ){						
						milis += ev.date - startPoint;
						startPoint = null;
					}
					break;
				default:
					//do nothing
					break;
			}

		});
		if( startPoint != null ) {
			milis += new Date() - startPoint;
		}
		var precMult = 1;

		for(var i = 0; i < precision; i++) precMult *= 10;

		var retorno;
		var boosted = milis * precMult;
		var mult = null;

		format = (format || 'ms').toLowerCase();

		this.formats.forEach(function(fmt){

			if( ~fmt.formats.indexOf(format) ){
				mult = fmt.mult;
				return false;
			}

		});

		if( !mult ) throw new Error('Invalid format! see StopWatch.formats');

		var solved = Math.floor( boosted / mult );

		var normal = solved / precMult;

		return normal;

	}

	this.elapsedData = function(){
		return {
			s : this.elapsed('s' , 0),
			m : this.elapsed('m', 2),
			ms : this.elapsed('ms', 0),
			h: this.elapsed('h', 2),
			elapsed : function(){
				return this.ms;
			},
			toString : this.toString,
			valueOf: function(){
				return this.ms;
			}
		}
	}

	this.toString = function(){

		var total = this.elapsed();
		var ms = total % 1000;
		var s = Math.floor( total / 1000 );
		var m = Math.floor( s / 60);
		s = s % 60;
		var h =  Math.floor( m / 60 );
		m = m % 60;
		var d = Math.floor( h / 24 );
		h = h % 24;

		ms = ms.toString();
		s = s.toString();
		m = m.toString();
		h = h.toString();
		d = d.toString();

		if( s.length == 1 ) s = "0" + s;
		if( m.length == 1 ) m = "0" + m;		


		var template = "h:m:s.ms";
		var preffix = "";
		if( d > 0 ){
			preffix = d + "d ";
		}

		return preffix + template.replace('ms', ms).replace('s', s).replace('m', m).replace('h', h);


	}

	return this;

}