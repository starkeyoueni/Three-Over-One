$(document).ready ->
  $.getJSON "http://three-over-one.myshopify.com/products.js", (data) ->
    items = []
    $.each data, (key, val) ->
      items.push "<li id='#{key}'>#{val}</li>"
    items_html = items.join('')
    $('.products').html(items_html)
    
