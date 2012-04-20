$(function() {
  //BINDINGS
    $(".product-row a").bind("click", scrollToPlace);
  
    $(".product-thumb").click(function(){
    
        product = "/products/" + $(this).attr("data");
        
        $.get( product, function(data){
            startString = "<!--start-->"
            start = data.indexOf("<!--start-->") + startString.length;
            end = data.indexOf("<!--end-->");
            html = data.substring(start,end);
            $(".row.open").find(".product-detail .inner").html(html);
        })
    });

	// MouseOver Events

		$('div.shop-nav, #shop-nav-down').hover(function(){
				$("#shop-nav-down").stop().animate({"margin-top" : "0px"});
				$(this).stop().animate({"background-color" : '#fff'});
			},
			function(){
				$("#shop-nav-down").stop().animate({"margin-top" : "-300px"});
				$("div.shop-nav").stop().animate({"background-color" : '#F5EFE5'});
			});
								  
});//

function scrollToPlace(e) {
  e.preventDefault();
	
  $(".product-row a").removeClass("showing");
  $(this).addClass("showing");
	
  var productDetail = $(this).parent().parent();
	
  //CURRENT CONTAINER
  productDetail.container = productDetail.find(".product-detail");
  productDetail.container.inner = productDetail.container.find(".inner");
  productDetail.height = productDetail.container.inner.height();
  productDetail.position = productDetail.index();
	
  //OPEN CONTAINER
  productDetail.Open = productDetail.siblings().filter(".open");
  productDetail.Open.container = productDetail.Open.find(".product-detail");
  productDetail.Open.container.inner = productDetail.Open.container.find(".inner");
  productDetail.Open.height = productDetail.Open.container.inner.height();
  productDetail.Open.position = productDetail.Open.index();
	
  //SCROLL TO VALUE
  productDetail.scrollto = function() {
    if (productDetail.Open.isAfter()) {	
      //IF NO OPEN OR IF OPEN AREA IS BELOW TO-BO OPENED AREA
      return productDetail.offset().top - $("header").height() - 20;
    } else {
      //IF OPEN AREA IS BEFORE TO-BE OPENED AREA - TAKE AWAY THE HEIGHT OF THE INNER
      //REVISION: TAKE THE HEIGHT OF THE OPEN CONTAINER
      return productDetail.offset().top - productDetail.Open.height - $("header").height() - 20;
    }
  }
	
  //CONFIG
  productDetail.config = {
    openSpeed: 700,
    scrollSpeed: 700,
  }
	
  //FIND ORDER
  productDetail.Open.isAfter = function() {
    if (productDetail.Open.position === -1 || productDetail.Open.position > productDetail.position) {
      return true;
    } else {
      return false;
    }
  }
	
  // // // // // 	ANIMATIONS:
  //OPEN
  productDetail.addClass("open").container.stop().animate({"height" : productDetail.height}, productDetail.config.openSpeed);
  //CLOSE
  productDetail.Open.removeClass("open").container.stop().animate({"height" : "0px"}, productDetail.config.openSpeed);
  //SCROLL
  $("html, body").stop().animate({scrollTop: productDetail.scrollto()}, productDetail.config.scrollSpeed);
}