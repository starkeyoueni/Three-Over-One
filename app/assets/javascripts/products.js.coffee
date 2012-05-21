$(document).ready ->
  $(".#{product.handle}").click (e) ->
    e.preventDefault()
    $.get "/products/#{product.handle}.js", (data) ->
      console.log data


selectCallback = (variant, selector) ->
  if variant and variant.available is true
    $("#add-to-cart").removeClass("disabled").removeAttr("disabled").val "Add to Cart"
    if variant.price < variant.compare_at_price
      $("#price-preview").html Shopify.formatMoney(variant.price, "{{shop.money_format}}") + " <span>was " + Shopify.formatMoney(variant.compare_at_price, "{{shop.money_format}}") + "</span>"
    else
      $("#price-preview").html Shopify.formatMoney(variant.price, "{{shop.money_format}}")
  else
    message = (if variant then "Sold Out" else "Unavailable")
    $("#add-to-cart").addClass("disabled").attr("disabled", "disabled").val "Sold Out"
    $("#product .variants .price").text message

#
#  Remove all occurrences of a token in a string
#    s  string to be processed
#    t  token to be removed
#  returns new string
remove = (s, t) ->
  i = s.indexOf(t)
  r = ""
  return s  if i is -1
  r += s.substring(0, i) + remove(s.substring(i + t.length), t)
  r


# # initialize multi selector for product
# $(function() {
#   if ($.cookie("viewed-products") != null){ // if cookie exists...
#     var products = $.cookie("viewed-products");
#     var productHandles = products.split(" ");
#     var matches = 0;
#     var limit = 3;
#     
#     for (var i = (productHandles.length - 1); i >= 0; i--) {
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
