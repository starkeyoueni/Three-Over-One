//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require pages
//= require products
//= require slides.jquery

$(document).ready(function() {
  var options = {
		preload: true,
		generateNextPrev: false,
    pagination: false,
    generatePagination: false,
    autoHeight: true,
    autoHeightSpeed: 350
	};
  console.log(options);
	$('#slides').slides(options);
});
