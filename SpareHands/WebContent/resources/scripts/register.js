var myNode = document.getElementById("registerModalError");
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var rootURL = "http://localhost:8080/SpareHands/rest";

$(document).ready(function() {

	$('#register').click(function(evnet){
		clearModalErrorDiv();
	});
	
	$('#registerButton').click(function(event){
		console.log("Reg");
		verifyRegisterDetails($('#registerForeName').val(), $('#registerSurname').val(),
				$('#registerEmail').val(), $('#registerPassword').val(),
				$('#registerPasswordConfirm').val());
	});
});

function verifyRegisterDetails(forename, surname, email, password1, password2){
	clearModalErrorDiv();
	if(!forename || !surname || !email || !password1 || !password2){
		React.render( <p>Please fill all fields!</p>,
			document.getElementById('registerModalError'));
	}
	else{
	    if(!emailRegex.test(email)){
	    	React.render( <p>Please enter a valid Email!</p>,
	    			document.getElementById('registerModalError'));
	    }
	    else{
	    	if(password1!=password2){
	    		React.render( <p>Passwords do not match!</p>,
		    			document.getElementById('registerModalError'));
	    	}
	    	else{
		    	var user = findUserByEmail(email);
		    	if(user != null){
		    		React.render( <p>Email already registered!</p>,
			    			document.getElementById('registerModalError'));
		    	}
		    	else{
		    		if(!(password1.length>=8)){
		    			React.render( <p>Password must be 8 or more characters!</p>,
				    			document.getElementById('registerModalError'));
		    		}
		    		else{
		    			addUserToDB();
		    			$('#registerModal').modal('hide');
		    			$('#registerForeName').val("");
		    			$('#registerLastName').val("");
						$('#registerEmail').val("");
						$('#registerPassword').val("");
						$('#registerPasswordConfirm').val("");
		    		}	
		    	}
	    	}
	    }
	}
}

function clearModalErrorDiv(){
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}


var  findUserByEmail= function(email) {
	var userData;
	$.ajax({
		type: 'GET',
		url: rootURL + '/user/email/' + email,
		dataType: "json",
		async: false,
		success: function (data) {
			userData = data
		}
	});
	return userData;
};


function addUserToDB(){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL + '/user/addUser',
		dataType: "json",
		data: registerFormToJson(),
		success:
			alert("User successfully added, try logging in!"),
		error: function(jqXHR, textStatus, errorThrown){
			alert('addUser error: ' + textStatus);
		}
	});
}

function registerFormToJson() {
	return JSON.stringify({ 
		"forename": $('#registerForeName').val(), 
		"surname": $('#registerSurname').val(),
		"email": $('#registerEmail').val(),
		"password": $('#registerPassword').val(),
		"dob": "2012-09-10",
		"picture_url": "/img/userProfiles/stock.jpg",
	});
};