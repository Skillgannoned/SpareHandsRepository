var rootURL = "http://localhost:8080/SpareHands/rest";
var menuLeft = document.getElementById( 'cbp-spmenu-s1' );
var fileRegex = /\.(gif|jpg|jpeg|png)$/i;
var cookie = getCookie("UserLoggedIn=");

$(document).ready(function() {
	$('#jobs-section').show();
	$('#profile-section').hide();
	$('#applications-section').hide();
	$('#uploadImageButton').hide();

	if(!cookie){
		displayNoUserLoggedIn();
	}
	else{
		displayUserLoggedIn();
	}
	
	$("#jobsNav").click(function(event) {
		jobsSelected();
		closeNavBar();
	});
	$("#myJobsNav").click(function(event) {
		renderMyJobs();
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').show();
		$('#myapplications-section').hide();
		$('#profile-section').hide();
		closeNavBar();
		});
	$("#applicationsNav").click(function(event) {
		renderMyApplications();
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').hide();
		$('#myapplications-section').show();
		$('#profile-section').hide();
		closeNavBar();
		});
	$("#profileNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').hide();
		$('#myapplications-section').hide();
		$('#profile-section').show();
		generateProfile();
		closeNavBar();
	});
	
	$("#logout").click(function(event) {
		displayNoUserLoggedIn();
		document.cookie = "UserLoggedIn="+getCookie("UserLoggedIn=")+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		jobsSelected();
		closeNavBar();
	});
	
	$("#showLeft").click = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'showLeft' );
	};
	
	$("#imageFileName").change(function(){
		$('.uploadImageModalMessage span').text($("#imageFileName").val().replace('C:\\fakepath\\',''));
		if(fileRegex.test($("#imageFileName").val())){
			$('#uploadImageButton').show();
		}else{
			$('#uploadImageButton').hide();
			
		}
	});
	
	$('#uploadImageButton').click(function(){
		updateUserPicture($("#imageFileName").val().replace('C:\\fakepath\\','resources/img/userProfiles/'));		
	});
	
	$(document).on("click", '#jobModalApplyButton', function(){createApplication($(this).data('identity'));});
	$(document).on("click", '#jobPanelClickable', function(){showJobDetails($(this).data('identity'));});
	$(document).on("click", '#deleteJobButton', function(){deleteJob($(this).data('identity'));});
	$(document).on("click", '#deleteApplicationButton', function(){deleteApplication($(this).data('identity'));});
	$(document).on("click", '#manageJobApplicants', function(){renderManageJobApplicants($(this).data('identity'));});
	$(document).on("click", '#acceptApplicant', function(){editApplicantStatus($(this).data('identity'),"Accepted");});
	$(document).on("click", '#rejectApplicant', function(){editApplicantStatus($(this).data('identity'),"Rejected");});


});

function closeNavBar(){
	$('#nav_list').removeClass('active').addClass('inactive');
	$('.pushmenu-push').removeClass('pushmenu-push-toright');
	$('.pushmenu-left').removeClass('pushmenu-open');
}

function displayNoUserLoggedIn(){
	$('#nav_list').hide();
	$('#login').show();
	$('#register').show();
	$('#jobModalApplyButton').hide();
}

function displayUserLoggedIn(){
	$('#nav_list').show();
	$('#logout').show();
	$('#login').hide();
	$('#register').hide();
	$('#jobModalApplyButton').show();
	$('#createJobButton').show();
}

function jobsSelected() {
	$('#jobsNav').addClass('active').removeClass('inactive');
	$('#jobs-section').show();
	$('#myjobs-section').hide();
	$('#myapplications-section').hide();
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
	$('#profileImage').attr("src",userDetails.picture_url);
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
	$('#jobModalButtonContainer').html('<button type="button" class="btn btn-primary btn-lg btn-block" id="jobModalApplyButton" data-identity ="'+jobData.id+'">Apply!</button>');

}

function renderMyJobs(){
	var data = getJobByOwnerId(cookie);
	$('#myjobs-section').html('<div class="container"><table id="myjobsTable" class="table table-striped table-bordered" cellspacing="0" width="100%"><thead><tr>'+
			'<th style="width: 100px">Title</th>'+
			'<th style="width: 400px">Desciption</th>'+
			'<th>Location</th>'+
			'<th>Date</th>'+
			'<th>Reward</th>'+
			'<th>Applicants</th>'+
			'<th>Delete</th>'+
			'</tr></thead></table></div>');
	$('#myjobsTable').dataTable().fnDestroy();
	$('#myjobsTable').DataTable( {
		"processing": true,
        "data": data,
        "columns": [         
            { "data": "title" },
            { "data": "description" },
            { "data": "location" },
            { "data": "date" },
            { "data": "reward" },
            {sortable: false,
       	 		"mData":function(job){ return '<a href="#/" id="manageJobApplicants" data-toggle="modal" data-target="#applicantsModal" data-identity ="'+job.id+'" ><span class="glyphicon glyphicon-inbox" aria-hidden="true"></span></a>' }
            },
            {sortable: false,
       	 		"mData":function(job){ return '<a href="#/" id="deleteJobButton" data-identity ="'+job.id+'" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>' }
            }
            ]
    } );
}

function deleteJob(jobId){
	if(confirm("Are you sure?")){
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json',
			url: rootURL + '/job/deleteJob/'+jobId,
			dataType: "json",
			success:function(){
				renderMyJobs();}
		});
	}
}

function renderManageJobApplicants(jobId){
	var data = getApplicationByJobID(jobId);
	$('#applicantsTable').dataTable().fnDestroy();
	$('#applicantsTable').DataTable( {
		"processing": true,
        "data": data,
        "columns": [         
            { "data": "applicant.forename" },
            { "data": "applicant.surname" },
            { "data": "status" },
            {sortable: false,
       	 		"mData":function(applicant){ return '<a href="#/" id="acceptApplicant" data-identity ="'+applicant.id+'" ><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>' }
            },
            {sortable: false,
       	 		"mData":function(applicant){ return '<a href="#/" id="rejectApplicant" data-identity ="'+applicant.id+'" ><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>' }
            }
            ]
    } );
}

function getApplicationByJobID(jobId ) {
	var applications;
	$.ajax({
		type: 'GET',
		url: rootURL + '/applicant/allApplications/job/'+jobId,
		dataType: "json",
		async: false,
		success: function (data) {
			applications = data
		}
	});
	return applications;
};

function editApplicantStatus(applicationId, status){
	var application;
	$.ajax({
		type: 'GET',
		url: rootURL + '/applicant/allApplicants/'+applicationId,
		dataType: "json",
		async: false,
		success: function (data) {
			application = data
		}
	});
	application.status=status;
	var dateParts = application.job.date.split(/(\d{1,2})-(\d{1,2})-(\d{4})/);
	application.job.date= dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2];
	var jsonString = JSON.stringify({ 
		"id":application.id,
		"owner": application.owner, 
		"applicant": application.applicant,
		"job": application.job,
		"status": application.status,
	});
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/applicant/editApplication/'+application.id,
		dataType: "json",
		data: jsonString,
		success:function(){renderManageJobApplicants(application.job.id);}
	});
}

function renderMyApplications(){
	$('#applications-section').html('<div class="alert alert-warning"><h1>Coming Soon!</h1></div>');
	var data = getApplicationByApplicantID(cookie);
	$('#myapplications-section').html('<div class="container"><table id="myApplicationsTable" class="table table-striped table-bordered" cellspacing="0" width="100%"><thead><tr>'+
			'<th style="width: 100px">Title</th>'+
			'<th style="width: 400px">Desciption</th>'+
			'<th>Location</th>'+
			'<th>Date</th>'+
			'<th>Reward</th>'+
			'<th>Status</th>'+
			'<th>Delete</th>'+
			'</tr></thead></table></div>');
	$('#myApplicationsTable').dataTable().fnDestroy();
	$('#myApplicationsTable').DataTable( {
		"processing": true,
        "data": data,
        "columns": [
            { "data": "job.title" },
            { "data": "job.description" },
            { "data": "job.location" },
            { "data": "job.date" },
            { "data": "job.reward" },
            { "data": "status" },
            {sortable: false,
       	 	"mData":function(applicant){ return '<a href="#/" id="deleteApplicationButton" data-identity ="'+applicant.id+'" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>' }
            }
            ]
    } );
}

function deleteApplication(applicationId){
	if(confirm("Are you sure?")){
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json',
			url: rootURL + '/applicant/deleteApplicant/'+applicationId,
			dataType: "json",
			success:function(){
				renderMyApplications();}
		});
	}
}

function createApplication(jobId){
	var job = getJobById(jobId);
	var user = findUserById(cookie);
	var dateParts = job.date.split(/(\d{1,2})-(\d{1,2})-(\d{4})/);
	job.date= dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2];
	var jsonString = JSON.stringify({ 
		"owner":job.owner,
		"applicant": user, 
		"job": job,
		"status": "Pending",
	});	
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL + '/applicant/addApplicant',
		dataType: "json",
		data: jsonString,
		success:function(){
			alert("Application successfully created!");}
	});
}
