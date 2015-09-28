var loggedIn = false;

$(document).ready(function() {
	$('#logout').hide();
	$('#applications').hide();
	$('#profile').hide();
	$("#adverts").click(function(event) {
		advertsSelected();
	});
	$("#applications").click(function(event) {
		$('#adverts').addClass('inactive').removeClass('active');
		$('#applications').addClass('active').removeClass('inactive');
		$('#profile').addClass('inactive').removeClass('active');
		$('#adverts-section').hide();
	});
	$("#profile").click(function(event) {
		$('#adverts').addClass('inactive').removeClass('active');
		$('#applications').addClass('inactive').removeClass('active');
		$('#profile').addClass('active').removeClass('inactive');
		$('#adverts-section').hide();
	});

	$("#register-login").click(function(event) {
		$('#register-login').hide();
		$('#logout').show();
		$('#applications').show();
		$('#profile').show();
		loggedIn = true;
	});

	$("#logout").click(function(event) {
		$('#register-login').show();
		$('#logout').hide();
		$('#applications').hide();
		$('#profile').hide();
		loggedIn = false;
		advertsSelected();
	});
});

function advertsSelected() {
	$('#adverts').addClass('active').removeClass('inactive');
	$('#applications').addClass('inactive').removeClass('active');
	$('#profile').addClass('inactive').removeClass('active');
	$('#adverts-section').show();
}
