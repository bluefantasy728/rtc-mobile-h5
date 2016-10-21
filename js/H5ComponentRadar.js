/* Radar Chart Class */
var H5ComponentRadar = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	 
	 var w = cfg.width;
	 var h = cfg.height;
	//add a canvas
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	
	var r = w/2;
	var step = cfg.data.length;
	
	var isBlue = true;
	for(j=10; j>0; j--){
		
		ctx.beginPath();
		for(var i=0; i<step;i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var x = r + Math.sin(rad)*r*(j/10);
			var y = r + Math.cos(rad)*r*(j/10);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle = (isBlue = !isBlue)?'white':'#8fd7ef';
		ctx.fill();		
	}
	
	//draw sketch
	for(var i=0; i<step;i++){
		var rad = (2*Math.PI/360)*(360/step)*i;
		var x = r + Math.sin(rad)*r
		var y = r + Math.cos(rad)*r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		
		//text of each project
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		
		if(x>w/2){
			text.css('left',x/2);
		}else if(x==w/2){
			text.css({
				'left':'50%',
				'transform':'translateX(-50%)'
			});
		}else{
			text.css('right',(w-x)/2);
		}
		if(y>h/2){
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}
		component.append(text);
	}
	
	ctx.strokeStyle = 'darkgray';
	ctx.stroke();
	
	//another canvas layer is for data
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	ctx.strokeStyle = '#b50000';
	ctx.lineWidth = 2;
	
	function draw(per){
		
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
		ctx.clearRect(0,0,w,h);
		
		//line of data
		for(var i=0; i<step;i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin(rad)*r*rate;
			var y = r + Math.cos(rad)*r*rate;
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.stroke();
		
//		//circle of data
		ctx.fillStyle = '#b50000';
		for(var i=0; i<step;i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin(rad)*r*rate;
			var y = r + Math.cos(rad)*r*rate;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
		}
		ctx.closePath();
	}
	
	component.on('onLoad',function(){
		var s = 0;
		for(i=0; i<100; i++){
			setTimeout(function(){
				s+=0.01;
				draw(s)
			},i*10);
		}
	});
	component.on('onLeave',function(){
		var s = 1;
		for(i=0; i<100; i++){
			setTimeout(function(){
				s-=0.01;
				draw(s)
			},i*10);
		}
	});
	
	return component;
};
