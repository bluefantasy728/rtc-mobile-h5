/* Point Chart Class */
var H5ComponentPoint = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	
	var base = cfg.data[0][1]; //the first one in data is the basic size
	
	var sum = 0;
	//calculate the total count of all the country
	$.each(cfg.data,function(index,item){
		sum += item[1];
	});
	//output all the points
	
	$.each(cfg.data,function(index,item){
		var point = $('<div class="point point_'+ index +'">');
		point.css({
			background:item[2],
			width:cfg.width/base*item[1],
			height:cfg.height/base*item[1],
			left:item[3],
			top:item[4]
		});
		
		var country = $('<p class="country">'+ item[0] +'</p>');
		var per = $('<p class="per">'+ parseInt(item[1]/sum*100) +'%</p>');
		country.append(per);
		point.append(country);
		component.append(point);
	});
	
	
	return component;
}
