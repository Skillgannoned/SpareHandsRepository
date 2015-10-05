$(document).ready(function() {
	var cookie = getCookie("loginCookie=");

	if(!cookie){
		displayNoUserLoggedIn();
	}
	else{
		displayUserLoggedIn();
	}
	
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

	$("#logout").click(function(event) {
		$('#login').show();
		$('#register').show();
		$('#logout').hide();
		$('#applicationsNav').hide();
		$('#profileNav').hide();
		advertsSelected();
	});
});

function displayNoUserLoggedIn(){
	$('#applicationsNav').hide();
	$('#profileNav').hide();
	$('#logout').hide();
	$('#login').show();
	$('#register').show();
}

function displayUserLoggedIn(){
	$('#applicationsNav').show();
	$('#profileNav').show();
	$('#logout').show();
	$('#login').hide();
	$('#register').hide();
}

function advertsSelected() {
	$('#advertsNav').addClass('active').removeClass('inactive');
	$('#applicationsNav').addClass('inactive').removeClass('active');
	$('#profileNav').addClass('inactive').removeClass('active');
	$('#adverts-section').show();
}

function getCookie(cookieName) {
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1);
		if (c.indexOf(cookieName) == 0)
			return c.substring(cookieName.length, c.length);
	}
	return "";
}