//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require pages
//= require products
//= require slides.jquery

$(document).ready(function() {
	$('#slides').slides({
		preload: true,
		generateNextPrev: false,
    pagination: false,
    generatePagination: false,
    autoHeight: true,
    autoHeightSpeed: 350
	});
});
