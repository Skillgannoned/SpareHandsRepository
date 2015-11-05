$(document).ready(function() {
	
	
	$('#createJobModalButton').click(function(event){
		var title = $('#createJobTitle').val();
		var description = $('#createJobDescription').val();
		var date = $('#creatJobDate').val();
		var location = $('#createJobLocation').val();
		var reward = $('#createJobReward').val();
		var userId = getCookie("UserLoggedIn=");
		clearModalErrorDiv("jobModalError");

		if(!title || !description || !date || !location || !reward){
			React.render( <p>Empty Fields!</p>,
	    			document.getElementById('jobModalError'));
		}
		else if(title.length>100){
			React.render( <p>Title can only be 100 characters!</p>,
	    			document.getElementById('jobModalError'));
		}
		else if(description.length>600){
			React.render( <p>Description can only be 600 characters!</p>,
	    			document.getElementById('jobModalError'));
		}
		else{
			createJob(userId, title, description, date, location, reward);
			$('#createJobTitle').val('');
			$('#createJobDescription').val('');
			$('#creatJobDate').val('');
			$('#createJobLocation').val('');
			$('#createJobReward').val('');
		}
	});

});