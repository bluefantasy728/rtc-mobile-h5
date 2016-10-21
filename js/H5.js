//this Class is to setup a whole big Page to body, with 3 functions, which are addPage, addComponent and loader
var H5 = function(){
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();
	this.pageArr = [];
	$('body').append(this.el);
	
	//add page to container
	this.addPage = function(name,text){
		var page = $('<div class="h5_page section">');
		if(name != undefined){
			page.addClass('h5_page_'+name);
		}
		if(name != undefined){
			page.text(text);
		}
		this.el.append(page);
		this.pageArr.push(page);
		if(typeof this.whenAddPage === 'function'){
			this.whenAddPage();
		}
		return this;
	}
	
	//add component to the page
	this.addComponent = function(name,cfg){
		var cfg = cfg || {};
		cfg = $.extend({
			type:'base'
		},cfg);
		
		var component;
		switch (cfg.type){
			case 'base':
				component = new H5ComponentBase(name,cfg);
				break;
			case 'polyline':
				component = new H5ComponentPolyline(name,cfg);
				break;
			case 'point':
				component = new H5ComponentPoint(name,cfg);
				break;
			case 'radar':
				component = new H5ComponentRadar(name,cfg);
				break;
			case 'bar':
				component = new H5ComponentBar(name,cfg);
				break;
				
		}
		var page = this.pageArr.slice(-1)[0];
		page.append(component);
		
		return this;
	}
	
	
	//initialize the pages
	this.loader = function(firstPage){
		this.el.show();
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction){
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad:function(anchorLink,index){
				$(this).find('.h5_component').trigger('onLoad');
			}
		});
		this.pageArr[0].find('.h5_component').trigger('onLoad');
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
		
	};
	
	
};
