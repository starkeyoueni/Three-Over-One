$(document).ready ->
  $(".#{product.handle}").click (e) ->
    e.preventDefault()
    $.get "/products/#{product.handle}.js", (data) ->
      console.log data
