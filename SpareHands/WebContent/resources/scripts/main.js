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
	});
	$("#profileNav").click(function(event) {
		$('#advertsNav').addClass('inactive').removeClass('active');
		$('#applicationsNav').addClass('inactive').removeClass('active');
		$('#profileNav').addClass('active').removeClass('inactive');
		$('#adverts-section').hide();
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
	$('#profile-section').hide();
}

var HelloComponent = React.createClass({  
    render: function() {
    	return <div class="profile-photo">
		<img src="\""{this.props.imageSource}""\"" alt="...">
		</div>
		<div class="profile-bio">
		</div>
        return <div>Hello {this.props.name}</div>;
    }
});

function generateProfile(){
	console.log(getCookie("UserLoggedIn="));
	var userDetails = findUserById(getCookie("UserLoggedIn="));
	console.log(userDetails);
	React.render(
		
	);
}

var  findUserById= function(id) {
	var userData;
	$.ajax({
		type: 'GET',
		url: rootURL + '/user/allUsers/' + id,
		dataType: "json",
		async: false,
		success: function (data) {
			userData = data
		}
	});
	return userData;
};


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