$(document).ready ->
  $('#products').scrollTo(0)
  $(".thumb a").click (e) ->
    prod_handle = $(this).attr("data")
    row_ref = $(this).attr("data-row")
    detail_block = $('#detail')
    detail_block.detach()
    $(detail_block).insertAfter("\##{row_ref}")
    tweeking = {easing: "easeOutExpo", offset: {top: -70}}
    $('body').scrollTo($('#detail p.banana'), 800, tweeking)
    