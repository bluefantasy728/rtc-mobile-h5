/* Polyline Class */
var H5ComponentPolyline = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	
	//draw grid - background layer
	var w = cfg.width;
	var h = cfg.height;
	
	//add a canvas
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	
	//horizontal lines
	var step = 5;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#99C0FF';
	
	window.ctx = ctx;
	
	for(var i=0;i<step+1;i++){
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	
	//vertical lines and text for each item
	var text_w = w/step>>0;
	step = cfg.data.length + 1;
	for(var i=0; i<step+1;i++){
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css({
				'width':text_w/2,
				'left': x/2 + text_w/8
			});
			component.append(text);
		}
	}
	
	ctx.stroke();
	
	
		//draw points - data layer
		//we need 2 canvas, one is for background grid,another one is for data display
		var cns = document.createElement('canvas');
		var ctx = cns.getContext('2d');
		cns.width = ctx.width = w;
		cns.height = ctx.height = h;
		component.append(cns);


	function draw(per){
			
		ctx.clearRect(0,0,w,h);		
		//draw polyline data
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#b50000';
		
		var x = 0;
		var y = 0;
		var row_w = w/(cfg.data.length+1); //width of each item
		for(var i=0; i<cfg.data.length; i++){
			var item = cfg.data[i];
			x = row_w*i + row_w;
			y = h*(1.2-item[1]*per); //*1.2 is just for being nice looking
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}
		
		//connnect the points
		ctx.moveTo( row_w, h*(1.2 - cfg.data[0][1]*per));
		for(var i=0; i< cfg.data.length; i++){
			var item = cfg.data[i];
			x = row_w *i + row_w;
			y = h*(1.2-item[1]*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke(); //up the stroke to change stroke style
		
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(181,0,0,0.2)';
		
		//fill the shadow
		
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(181,0,0,0.2)';
		ctx.fill();
		
		//put the number on each point,very similar with drawing points
		for(var i=0; i<cfg.data.length; i++){
			var item = cfg.data[i];
			x = row_w*i + row_w;
			y = h*(1.2-item[1]*per); //*1.3 is just for being nice looking
			ctx.moveTo(x,y);
			ctx.font="20px microsoft yahei";
			ctx.fillStyle = '#b50000';
			ctx.fillText(item[1]*100 + '%',x-20,y-20);
		}
		ctx.stroke();		
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
			},i*10+500);
		}
	});
//	draw(1)
	
	
	return component;
};
