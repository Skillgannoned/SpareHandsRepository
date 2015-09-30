var loggedIn = false;

$(document).ready(function() {
	$('#logout').hide();
	$('#applicationsNav').hide();
	$('#profileNav').hide();
	
	$("#advertsNav").click(function(event) {
		advertsSelected();
	});
	$("#applicationsNav").click(function(event) {
		$('#advertsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('active').removeClass('inactive');
		$('#profileNav').addClass('inactive').removeClass('active');
		$('#adverts-section').hide();
	});
	$("#profileNav").click(function(event) {
		$('#advertsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('inactive').removeClass('active');
		$('#profileNav').addClass('active').removeClass('inactive');
		$('#adverts-section').hide();
	});

	$("#register-login").click(function(event) {
		$('#register-login').hide();
		$('#logout').show();
		$('#applicationsNav').show();
		$('#profileNav').show();
		loggedIn = true;
	});

	$("#logout").click(function(event) {
		$('#register-login').show();
		$('#logout').hide();
		$('#applicationsNav').hide();
		$('#profileNav').hide();
		loggedIn = false;
		advertsSelected();
	});
});

function advertsSelected() {
	$('#advertsNav').addClass('active').removeClass('inactive');
	$('#applicationsNav').addClass('inactive').removeClass('active');
	$('#profileNav').addClass('inactive').removeClass('active');
	$('#adverts-section').show();
}
