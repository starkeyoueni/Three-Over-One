$(function() {
  var selectCallback = function(variant, selector) {
    if (variant && variant.available == true) {
      // selected a valid variant
       // remove unavailable class from add-to-cart button, and re-enable button
      jQuery('#add-to-cart').removeClass('disabled').removeAttr('disabled').val('Add to Cart');
      if(variant.price < variant.compare_at_price){
        jQuery('#price-preview').html(Shopify.formatMoney(variant.price, "{{shop.money_format}}") + " <span>was " + Shopify.formatMoney(variant.compare_at_price, "{{shop.money_format}}") + "</span>");
      } else {
        jQuery('#price-preview').html(Shopify.formatMoney(variant.price, "{{shop.money_format}}"));
      }

    } else {
      // variant doesn't exist
      var message = variant ? "Sold Out" : "Unavailable";    
      jQuery('#add-to-cart').addClass('disabled').attr('disabled', 'disabled').val('Sold Out');      // set add-to-cart button to unavailable class and disable button
      jQuery('#product .variants .price').text(message); // update price-field message
    }
  };

  function remove(s, t) {
    /*
    **  Remove all occurrences of a token in a string
    **    s  string to be processed
    **    t  token to be removed
    **  returns new string
    */
    i = s.indexOf(t);
    r = "";
    if (i == -1) return s;
    r += s.substring(0,i) + remove(s.substring(i + t.length), t);
    return r;
  }

  // initialize multi selector for product
  jQuery(function() {
    if (jQuery.cookie("viewed-products") != null){ // if cookie exists...
      var products = jQuery.cookie("viewed-products");
      var productHandles = products.split(" ");
      var matches = 0;
      var limit = 3;
      for (var i = (productHandles.length - 1); i >= 0; i--) {
        if(productHandles[i] != "{{ product.handle }}" && productHandles[i] != "" && (matches < limit)){
          Shopify.getProduct(productHandles[i]);
          matches++;
        }
      }

      if (products.indexOf("{{ product.handle }}") == -1){ // add current product to list if it isn't already there
        products += " {{ product.handle }}";
        jQuery.cookie("viewed-products", products, {path: "/"});
      } else { // if it is already there, push it to the end of the string
        var newstring = remove(products, '{{ product.handle }}');
        newstring += " {{ product.handle }}";
        jQuery.cookie("viewed-products", newstring.replace(/ /g,' '), {path: "/"});
      }
    } else { // create cookie if it doesn't already exist
      jQuery.cookie("viewed-products", "{{ product.handle }}", {path: "/"});
    }
  
    {% if product.variants.size > 1 or product.options.size > 1 %}
      new Shopify.OptionSelectors("product-select", { product: {{ product | json }}, onVariantSelected: selectCallback });
  
        {% assign found_one_in_stock = false %}
        {% for variant in product.variants %}
          {% if variant.available and found_one_in_stock == false %}
            {% assign found_one_in_stock = true %}
            {% for option in product.options %}
              jQuery('#product-select-option-' + {{ forloop.index0 }}).val({{ variant.options[forloop.index0] | json }}).trigger('change');
            {% endfor %}
          {% endif %}
        {% endfor %}
    {% endif %}
  });
  
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