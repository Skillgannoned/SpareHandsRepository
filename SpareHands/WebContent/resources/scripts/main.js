var rootURL = "http://localhost:8080/SpareHands/rest";

$(document).ready(function() {
	$('#adverts-section').show();
	$('#profile-section').hide();
	var cookie = getCookie("UserLoggedIn=");

	
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
		$('#applications-section').show();
		$('#profile-section').hide();
		});
	$("#profileNav").click(function(event) {
		$('#advertsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('inactive').removeClass('active');
		$('#profileNav').addClass('active').removeClass('inactive');
		$('#adverts-section').hide();
		$('#applications-section').hide();
		$('#profile-section').show();
		generateProfile();
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
	$('#applications-section').hide();
	$('#profile-section').hide();
}


function generateProfile(){
	var userDetails = findUserById(getCookie("UserLoggedIn="));
	var date = new Date(userDetails.dob);
	date = date.customFormat( "#YYYY#-#MM#-#DD#" )
	$("#myDetailsSection").show();
	$("#myPasswordSection").hide();
	$('#profileForeName').val(userDetails.forename);
	$('#profileSurname').val(userDetails.surname);
	$('#profileEmail').val(userDetails.email);
	$('#profileDOB').val(date);
}

