$(document).ready ->

  $("input[prodvar]").click (e) ->
    e.preventDefault()
    variant_id = this.getAttribute('prodvar')
    console.log "variant_id = #{variant_id}"
    f = document.createElement('form')
    f.style.display = 'none'
    this.parentNode.appendChild(f)
    f.method = 'POST'
    f.action = 'http://three-over-one.myshopify.com/cart/add'
    v = document.createElement('input')
    v.setAttribute('type', 'hidden')
    v.setAttribute('name', 'id')
    v.setAttribute('value', variant_id)
    f.appendChild(v)
    f.submit()
    return false
    
  productRow = $("#products .row")
  productDetail = $(".product-detail")
  
  showProduct = (e) ->
    console.log "#{e}"
    console.log "#{e}"
    $("#product-detail").slideDown 500, "easeOutCubic", ->
      $.scrollTo "#product-detail", 800, easing: "easeOutExpo"
      $("#detail-image a").lightBox()
    
  productRow.click showProduct

# e.preventDefault()
# if (!$(@).hasClass "open")
#   productRow.removeClass "open"
#   productRow.find(productDetail).animate height: '0'
#   productRow.animate marginBottom: '20px'
#   $(@).addClass "open"
#   productInfo = $(@).find(productDetail)
#   pHeight = productInfo.find($(".inner")).height()
#   productInfo.animate height: pHeight
#   $(@).animate marginBottom: pHeight
#   # $("html,body").animate scrollTop: productInfo.offset().top
#   # scrollPoint = productInfo.offset().top - 70
#   productHandle = productRow.attr("data")
#   # console.log $(@).find()
#   $('html,body').stop().scrollTo productDetail 1000, {easing: 'easeOutExpo'}
#   # console.log scrollPoint
#   console.log $(@).find(productDetail)
#   console.log productInfo.offset().top
#   console.log pHeight
#   console.log productInfo.index()
#   selectSize = productInfo.find(".size").find("li")
#   selectColor = productInfo.find(".color").find("li")
#   console.log selectSize
#   console.log selectColor
#   selectSize.click chooseVarients
#   selectColor.click chooseVarients
      
    
    
#   // if a variable is to be accessed outside of this scope, use ->
#   window.variable = whatever
#   
#   $(".#{product.handle}").click (e) ->
#     e.preventDefault()
#     $.get "/products/#{product.handle}.js", (data) ->
#       console.log data
# 
# 
# selectCallback = (variant, selector) ->
#   if variant and variant.available is true
#     $("#add-to-cart").removeClass("disabled").removeAttr("disabled").val "Add to Cart"
#     if variant.price < variant.compare_at_price
#       $("#price-preview").html Shopify.formatMoney(variant.price, "{{shop.money_format}}") + " <span>was " + Shopify.formatMoney(variant.compare_at_price, "{{shop.money_format}}") + "</span>"
#     else
#       $("#price-preview").html Shopify.formatMoney(variant.price, "{{shop.money_format}}")
#   else
#     message = (if variant then "Sold Out" else "Unavailable")
#     $("#add-to-cart").addClass("disabled").attr("disabled", "disabled").val "Sold Out"
#     $("#product .variants .price").text message
# 
# #
# #  Remove all occurrences of a token in a string
# #    s  string to be processed
# #    t  token to be removed
# #  returns new string
# remove = (s, t) ->
#   i = s.indexOf(t)
#   r = ""
#   return s  if i is -1
#   r += s.substring(0, i) + remove(s.substring(i + t.length), t)
#   r


# # initialize multi selector for product
# $(function() {
#   if ($.cookie("viewed-products") != null){ // if cookie exists...
#     var products = $.cookie("viewed-products");
#     var productHandles = products.split(" ");
#     var matches = 0;
#     var limit = 3;
#     
#     for (var i = (productHandles.length - 1);
# i >= 0;
# i--) {
#       if(productHandles[i] != "{{ product.handle }}" && productHandles[i] != "" && (matches < limit)){
#         Shopify.getProduct(productHandles[i]);
#         matches++;
#       }
#     }
# 
#     if (products.indexOf("{{ product.handle }}") == -1){ // add current product to list if it isn't already there
#       products += " {{ product.handle }}";
#       $.cookie("viewed-products", products, {path: "/"});
#     } else { // if it is already there, push it to the end of the string
#       var newstring = remove(products, '{{ product.handle }}');
#       newstring += " {{ product.handle }}";
#       $.cookie("viewed-products", newstring.replace(/ /g,' '), {path: "/"});
#     }
#   } else { // create cookie if it doesn't already exist
#     $.cookie("viewed-products", "{{ product.handle }}", {path: "/"});
#   }
#   
#   {% if product.variants.size > 1 or product.options.size > 1 %}
#     new Shopify.OptionSelectors("product-select", { product: {{ product | json }}, onVariantSelected: selectCallback });
#   
#       {% assign found_one_in_stock = false %}
#       {% for variant in product.variants %}
#         {% if variant.available and found_one_in_stock == false %}
#           {% assign found_one_in_stock = true %}
#           {% for option in product.options %}
#             $('#product-select-option-' + {{ forloop.index0 }}).val({{ variant.options[forloop.index0] | json }}).trigger('change');
#           {% endfor %}
#         {% endif %}
#       {% endfor %}
#   {% endif %}
# });
# 
