var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

$(document).ready(function() {
	$("#myDetailsTab").click(function(event){
		$("#myDetailsSection").show();
		$("#myPasswordSection").hide();
		$('#myDetailsTab').addClass('active').removeClass('inactive');
		$('#myPasswordTab').addClass('active').removeClass('active');
	});
	$("#myPasswordTab").click(function(event){
		$("#myDetailsSection").hide();
		$("#myPasswordSection").show();
		$('#myDetailsTab').addClass('inactive').removeClass('active');
		$('#myPasswordTab').addClass('active').removeClass('inactive');
	});
	
	$('#updatePasswordButton').click(function(event){
		var password = $('#profilePassword').val();
		var passwordConfirm = $('#profilePasswordConfirm').val();
		clearModalErrorDiv("updatePasswordError");

		if(password!=passwordConfirm){
			React.render( <p>Passwords do not match!</p>,
	    			document.getElementById('updatePasswordError'));
		}
		else if(password.length<8){
			React.render( <p>Password must be 8 or more characters!</p>,
	    			document.getElementById('updatePasswordError'));
		}
		else{
			updatePassword(password);
		}
	});
	
	$('#saveChangesButton').click(function(event){
		var forename = $('#profileForeName').val();
		var surname = $('#profileSurname').val();
		var email = $('#profileEmail').val();
		var dob = $('#profileDOB').val();
		clearModalErrorDiv("updateProfileError");

		if(!forename || !surname || !email || !dob){
			React.render( <p>Empty Fields!</p>,
	    			document.getElementById('updateProfileError'));
		}
		else if(!emailRegex.test(email)){
			React.render( <p>Invalid Email!</p>,
	    			document.getElementById('updateProfileError'));
		}
		else{
			updateUserDetails(forename,surname,email,dob);
		}
	});

});