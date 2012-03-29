
(function($){
  $.fn.selectRange = function(start, end) {
          return this.each(function() {
                  if(this.setSelectionRange) {
                          this.focus();
                          this.setSelectionRange(start, end);
                  } else if(this.createTextRange) {
                          var range = this.createTextRange();
                          range.collapse(true);
                          //range.moveEnd('character', end);
                          range.moveStart('character', start);
                          range.select();
                  }
          });
  };
})(jQuery);

jQuery(window).load(function(){
  
  jQuery('#content-scroll, .slider, #slider').fadeIn("slow");
  jQuery('div.loading').remove();
  
  if(jQuery("#slider li").size() == 0){
    jQuery("#slider").remove();
    jQuery("#slider-empty").show(); 
  } else {
    if(jQuery("#slider li").size() == 1){ // hide slideshow controls if there's only one image
      jQuery('#slider').bxSlider({
        infiniteLoop: false,
        speed: 600,
        auto: true,
        controls: false,
        pager: false,
        autoDelay: 1000,
        pause: 5000
      });
    } else {
      jQuery('#slider').bxSlider({
        infiniteLoop: false,
        speed: 600,
        auto: true,
        controls: false,
        pager: true,
        autoDelay: 1000,
        pause: 5000
      });
    }
    jQuery('#slider').fadeIn('slow');
  }
  
  jQuery('#slider li img').click(function(){
    var url = jQuery(this).attr('data-url');
    if (url.length > 0) {window.location.href = url;}
  });
  
  var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
  if(IE6){
    jQuery("#placeholder img").css('width', jQuery("#placeholder img").width()+'px'); // restrict to initial width of image
  } else {
    jQuery("#placeholder img").css('maxWidth', jQuery("#placeholder img").width()+'px'); // restrict to initial width of image
  }
  
  var pw = jQuery("#placeholder img").width() + 8;
  jQuery("#placeholder img").parents('div.featured').css('maxWidth', pw+'px'); // force IE to play nice
  
  var pw = 960 - (jQuery("#product .images").outerWidth() + 40);
  jQuery("#product .content").css('width', pw+'px');
  jQuery("#product .content").fadeIn('slow');
  
  var totalWidth = 0;
  jQuery("#content-slide .product").each(function(){
    totalWidth += jQuery(this).outerWidth(true);
  });
  
  var windowWidth = jQuery(window).width();
  if(windowWidth < totalWidth){
    jQuery(".slider").show();
  }
  
  jQuery("#content-slide").width(totalWidth + "px");
  
  var imagesWidth = jQuery("#product .images").width();
  
  jQuery('.cy').each(function(){
    var h = Math.round(jQuery(this).height() / 2);
    var ph = Math.round(jQuery(this).parent().height() / 2);
    jQuery(this).css('paddingTop', ph - h);
    jQuery(this).fadeIn('slow');
  });
  
  if(jQuery("#content-slide").width() < 952){
    jQuery(".slider").hide();
  }
  
});

jQuery(document).ready(function(jQuery){
  
  jQuery("#content-slide .product .details, #content-table .product .details").css({opacity:0.0});
  
  jQuery('#slider li img').error(function(){ // remove problematic images
    jQuery(this).parents("li.slide").remove();
  });
  
  jQuery("#slider li img").each(function(){
    var url = jQuery(this).attr('data-url');
    if(url != undefined){
      if (url.length > 0) { jQuery(this).css("cursor","pointer");}
    }
  });
  
  jQuery('.product .details a').each(function(){
    var h = Math.round(jQuery(this).height() / 2);
    var ph = Math.round(jQuery(this).parent().height() / 2);
    jQuery(this).css('paddingTop', ph - h);
  });
  
  jQuery(".ui-slider-handle").draggable({
     containment: "parent",
     drag: function(e, ui) {
       var sliderWidth = jQuery(".slider .ui-slider-handle").outerWidth();
       var parentWidth = jQuery("#content-scroll").outerWidth() - sliderWidth;
       var offset = jQuery(".slider").offset();
       var leftPercent = (e.pageX - (offset.left + (sliderWidth * 0.5))) / parentWidth;
       var maxScroll = jQuery("#content-scroll").attr("scrollWidth") - jQuery("#content-scroll").width();
       var scrollValue = Math.round(maxScroll * leftPercent);
       jQuery("#content-scroll").attr("scrollLeft", scrollValue);
     }
  });
  
  jQuery("#content-slide a").click(function(e){
    var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
    if(!jQuery(this).parents(".product").hasClass("current") && !IE6){
      e.preventDefault();
      jQuery("#content-slide .product").removeClass("current");
      jQuery(this).parents(".product").addClass("current");
      jQuery(this).parents(".product").siblings().children('div.details').css({opacity: 0.0, top: '70%'});
      
      jQuery("#content-slide .product.current .details").animate({
        top: '65%'
      }, 400);
      
      var position = jQuery(this).parents(".product").offset();
      var currentScroll = jQuery("#content-scroll").attr("scrollLeft");
      var halfWindowWidth = Math.round(0.5 * jQuery(window).width());
      var halfParentWidth = Math.round(0.5 * jQuery(this).parents(".product").outerWidth());
      var scrollToValue = currentScroll + position.left - halfWindowWidth + halfParentWidth;
      
      jQuery("#content-scroll").animate({
        scrollLeft: scrollToValue
      }, 500);
      
      var scrollMax = jQuery("#content-slide").outerWidth() - 952;
      if(scrollToValue > scrollMax){ scrollToValue = scrollMax; }
      if(scrollToValue < 0){ scrollToValue = 0; }
      var slideTo = Math.round(832 * (scrollToValue / scrollMax));
      jQuery(".ui-slider-handle").animate({
        left: slideTo+"px"
      }, 500);
    }
  });
  
  jQuery('.image img, .cy, #content-scroll, .slider, #product .content, #slider').css('display', 'none');
  //jQuery('.featured .image').append('<div class="loading" style="padding:280px 0; width:472px;">Loading...</div>');
  jQuery('.slider-container').append('<div class="loading">Loading...</div>');
  
  jQuery('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
    jQuery(this).blur();
  })
  
  jQuery("li.dropdown").hover(function(){
    jQuery(this).children('ul.dropdown').show();
    jQuery(this).children('ul.dropdown').stop();
    jQuery(this).children('ul.dropdown').animate({
      opacity: 1.0
    }, 200);
  }, function(){
    jQuery(this).children('ul.dropdown').stop();
    jQuery(this).children('ul.dropdown').animate({
      opacity: 0.0
    }, 400, function(){
      jQuery(this).hide();
    });
  });
  
  jQuery("#add-to-cart").click(function(){
    var width = jQuery("#add-to-cart").outerWidth();
    jQuery("#add-to-cart").css({'width': width+'px'});
    jQuery("#add-to-cart").val("Adding...").animate({
      color: '#ffffff',
      backgroundColor: '#808080'
    }, 400);
  });
  
  jQuery('.product:not(.current)').live('mouseover mouseout', function(event) {
    if (event.type == 'mouseover') {
      jQuery(this).children('div.details').stop();
      jQuery(this).children('div.details').animate({
        opacity: 1.0
      }, 200);
    } else {
      jQuery(this).children('div.details').stop();
      jQuery(this).children('div.details').animate({
        opacity: 0.0
      }, 400);
    }
  });
  
  jQuery('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    && location.hostname == this.hostname) {
      var $target = jQuery(this.hash);
      $target = $target.length && $target || jQuery('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        jQuery('html,body').animate({scrollTop: targetOffset}, 1000);
        //return false;
      }
    }
  });
  
  jQuery("input.replace").each(function(i){ // input value replacement
    var originalvalue = jQuery(this).val();
    jQuery(this).focus( function(){ 
      jQuery(this).animate({color: '#ccc'}, 200);
      jQuery(this).selectRange(0,0);
    });
    jQuery(this).blur( function(){ 
      if( jQuery.trim(jQuery(this).val()) == '' ){ jQuery(this).val(originalvalue); } 
      jQuery(this).animate({color: '#666'}, 200);
    });
    jQuery(this).keydown( function(){ 
      jQuery(this).css({color: '#666'})
      if( jQuery.trim(jQuery(this).val()) == originalvalue ){ jQuery(this).val(''); } 
    });
  });
  
  jQuery('.image img').each(function(){
    if (!this.complete) { // if image is NOT cached
      jQuery(this).load(function(){
        jQuery(this).fadeIn(400);
      });
    } else { // if image is cached
      jQuery(this).fadeIn(400);
    }
  });

});

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

if ((typeof Shopify) === 'undefined') {
  Shopify = {};
}

Shopify.money_format = '$';

Shopify.onProduct = function(product) {
  jQuery("#recently-viewed").css('display', 'block');
  jQuery("#recently-viewed .products").append('<div class="product"><div class="image"><a href="' + product.url + '"><img src="' + Shopify.resizeImage(product.featured_image, 'large') + '" alt="' + product.title + '" /></a></div><div class="details clearfix"><a href="' + product.url + '"><span class="title">' + product.title + '</span></a></div></div>');
  jQuery("#recently-viewed .products .product:nth-child(3)").addClass("last");
  jQuery("#content-slide .product .details, #content-table .product .details").css({opacity:0.0});
};

Shopify.onError = function(XMLHttpRequest, textStatus) {
  var data = eval('(' + XMLHttpRequest.responseText + ')');
  if (!!data.message) {
    //alert(data.message + '(' + data.status  + '): ' + data.description);
  } else {
    //alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
  }
  
  /* product is sold out */
  jQuery("#cart-updated").html("<a href='#'>Product is sold out!</a>");
  var tempwidth = jQuery(".cart-summary").outerWidth();
  jQuery('#cart-updated').css({'left': '100%', 'margin-left':'-'+ tempwidth +'px', 'width': tempwidth+'px'})
  jQuery('#cart-updated').fadeIn(200).delay(2000).fadeOut(400);

  window.setTimeout(function() {
  jQuery("#add-to-cart").val("Add to Cart").animate({
      
          color: '#ffffff',
          backgroundColor: '#F5EFE5'
      
      }, 400);
  }, 2200);
};