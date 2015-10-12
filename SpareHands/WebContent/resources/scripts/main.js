var rootURL = "http://localhost:8080/SpareHands/rest";

$(document).ready(function() {
	$('#jobs-section').show();
	$('#profile-section').hide();
	$('#applications-section').hide();

	var cookie = getCookie("UserLoggedIn=");

	if(!cookie){
		displayNoUserLoggedIn();
	}
	else{
		displayUserLoggedIn();
	}
	
	$("#jobsNav").click(function(event) {
		jobsSelected();
	});
	$("#applicationsNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('active').removeClass('inactive');
		$('#profileNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#applications-section').show();
		$('#profile-section').hide();
		});
	$("#profileNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('inactive').removeClass('active');
		$('#profileNav').addClass('active').removeClass('inactive');
		$('#jobs-section').hide();
		$('#applications-section').hide();
		$('#profile-section').show();
		generateProfile();
	});

	$("#logout").click(function(event) {
		displayNoUserLoggedIn();
		document.cookie = "UserLoggedIn="+getCookie("UserLoggedIn=")+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		jobsSelected();
	});
	
	$(document).on("click", '#jobPanelClickable', function(){showJobDetails($(this).data('identity'));});
});

function displayNoUserLoggedIn(){
	$('#applicationsNav').hide();
	$('#profileNav').hide();
	$('#logout').hide();
	$('#login').show();
	$('#register').show();
	$('#jobModalApplyButton').hide();
	$('#createJobButton').hide();
}

function displayUserLoggedIn(){
	$('#applicationsNav').show();
	$('#profileNav').show();
	$('#logout').show();
	$('#login').hide();
	$('#register').hide();
	$('#jobModalApplyButton').show();
	$('#createJobButton').show();
}

function jobsSelected() {
	$('#jobsNav').addClass('active').removeClass('inactive');
	$('#applicationsNav').addClass('inactive').removeClass('active');
	$('#profileNav').addClass('inactive').removeClass('active');
	$('#jobs-section').show();
	$('#applications-section').hide();
	$('#profile-section').hide();
}


function generateProfile(){
	var userDetails = findUserById(getCookie("UserLoggedIn="));
	var date = new Date(userDetails.dob);
	date = date.customFormat( "#YYYY#-#MM#-#DD#" );
	$("#myDetailsSection").show();
	$("#myPasswordSection").hide();
	$("#myAccountSection").hide();
	$('#myDetailsTab').addClass('active').removeClass('inactive');
	$('#myPasswordTab').addClass('inactive').removeClass('active');
	$('#myAccountTab').addClass('inactive').removeClass('active');
	$('#profileForeName').val(userDetails.forename);
	$('#profileSurname').val(userDetails.surname);
	$('#profileEmail').val(userDetails.email);
	$('#profileDOB').val(date);
}

function showJobDetails(id){
	var jobData = getJobById(id);
	$('#jobModalTitle span').text(jobData.title);
	$('#jobModalDescription span').text(jobData.description);
	$('#jobModalDate span').text(jobData.date);
	$('#jobModalLocation span').html('<a href="https://www.google.ie/maps/search/'+jobData.location+'">'+jobData.location+'</a>');
	$('#jobModalReward span').text(jobData.reward);

}
