/* Bar Chart Class */
var H5ComponentBar = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	
	var base = cfg.data[0][1]; //the first one in data is the basic size
	
	$.each(cfg.data,function(index,item){
		var line = $('<div class="line clearfix">');
		var name = $('<div class="name">');
		var rate = $('<div class="rate">');
		var qty = $('<div class="qty">');
		var bg = $('<div class="bg">');
		
		name.html(item[0]);
		qty.text(item[1]);
		rate.css({
			width:item[1] * 0.5 / base *100 + '%'
		});
		bg.css({
			backgroundColor:item[2]
		});
		rate.append(bg);
		line.append(name);
		line.append(rate);
		line.append(qty);
		component.append(line);
	});
	
	
	return component;
}
