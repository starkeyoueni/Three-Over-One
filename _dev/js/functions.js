$(function(){
		
		
	//BINDINGS
	$(".product-row").bind("click", scrollToPlace);
		   
	
});//






function scrollToPlace(e){

	e.preventDefault();
	
	var productDetail = $(this).parent();
	
	//CURRENT CONTAINER
	productDetail.container = productDetail.find(".product-detail");
	productDetail.container.inner = productDetail.container.find(".inner");
	productDetail.height = productDetail.container.inner.height();
	productDetail.position = productDetail.index();
	
	//OPEN CONTAINER
	productDetail.Open = productDetail.siblings().filter(".open");
	productDetail.Open.container = productDetail.Open.find(".product-detail");
	productDetail.Open.position = productDetail.Open.index();
	
	//SCROLL TO VALUE
	productDetail.scrollto = function(){
		
		if(productDetail.Open.isAfter()){	
		//IF NO OPEN OR IF OPEN AREA IS BELOW TO-BO OPENED AREA
			return productDetail.offset().top - $("header").height() - 20;
		}else{
		//IF OPEM AREA IS BEFORE TO-BE OPENED AREA - TAKE AWAY THE HEIGHT OF THE INNER
			return productDetail.offset().top - productDetail.height - $("header").height() - 20;
		}
		
	}
	
	//CONFIG
	productDetail.config = {
		
		openSpeed: 700,
		scrollSpeed: 700,
		
	}
	
	//FIND ORDER
	productDetail.Open.isAfter = function(){
		
		if (productDetail.Open.position === -1 || productDetail.Open.position > productDetail.position){
			return true;
		}else{
			return false;
		}
		
	}
	
	
// // // // // 	ANIMATIONS:
	
	//OPEN
	productDetail.addClass("open").container.stop().animate({"height" : productDetail.height}, productDetail.config.openSpeed);
	//CLOSE
	productDetail.Open.removeClass("open").container.stop().animate({"height" : "0px"}, productDetail.config.openSpeed);
	//SCROLL
	$("body").stop().animate({scrollTop: productDetail.scrollto()}, productDetail.config.scrollSpeed);
							 
	
}