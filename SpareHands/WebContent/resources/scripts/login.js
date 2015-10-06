var myNode = document.getElementById("loginModalError");
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var rootURL = "http://localhost:8080/SpareHands/rest";

$(document).ready(function() {
	
	$('#login').click(function(evnet){
		clearModalErrorDiv("loginModalError");
	});
	
	$('#loginButton').click(function(event){
		verifyLogin($('#loginEmail').val(),$('#loginPassword').val());
	});
	
	
});

function verifyLogin(email, password){
	clearModalErrorDiv("loginModalError");
	if(!email || !password){
		React.render( <p>Please fill Email & Password fields!</p>,
			document.getElementById('loginModalError'));
	}
	else{
	    if(!emailRegex.test(email)){
	    	React.render( <p>Please enter a valid Email!</p>,
	    			document.getElementById('loginModalError'));
	    }
	    else{
	    	var user = findUserByEmail(email);
	    	if(user == null){
	    		React.render( <p>Unregistered Email!</p>,
		    			document.getElementById('loginModalError'));
	    	}
	    	else{
	    		if(!(password == user.password)){
	    			React.render( <p>Incorrect Password!</p>,
			    			document.getElementById('loginModalError'));
	    		}
	    		else{
	    			setCookie(user.id);
	    			displayUserLoggedIn();
	    			$('#loginModal').modal('hide');
	    			$('#loginPassword').val("");
	    		}	
	    	}
	    }
	}
}

