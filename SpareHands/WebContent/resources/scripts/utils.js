function findUserById(id) {
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


function findUserByEmail(email) {
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

function addUserToDB(formData){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL + '/user/addUser',
		dataType: "json",
		data: formData,
		success:function(){
			alert("User successfully added, try logging in!");}
	});
}


function clearModalErrorDiv(div){
	var myNode = document.getElementById(div);
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}

function setCookie(id){
	var a = new Date();
	a = new Date(a.getTime() +1000*60*60*24*365);
	document.cookie="UserLoggedIn="+id+";expires="+a.toGMTString()+';';
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

Date.prototype.customFormat = function(formatString){
	  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	  YY = ((YYYY=this.getFullYear())+"").slice(-2);
	  MM = (M=this.getMonth()+1)<10?('0'+M):M;
	  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	  DD = (D=this.getDate())<10?('0'+D):D;
	  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
	  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
	  h=(hhh=this.getHours());
	  if (h==0) h=24;
	  if (h>12) h-=12;
	  hh = h<10?('0'+h):h;
	  hhhh = h<10?('0'+hhh):hhh;
	  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	  mm=(m=this.getMinutes())<10?('0'+m):m;
	  ss=(s=this.getSeconds())<10?('0'+s):s;
	  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
	};
	
function updatePassword(password){
	var user = findUserById(getCookie("UserLoggedIn="));
	user.password=password;
	var jsonString = JSON.stringify({ 
		"id":user.id,
		"forename": user.forename, 
		"surname": user.surname,
		"email": user.email,
		"password": user.password,
		"dob": user.dob,
		"picture_url": user.picture_url,
	});
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/user/editUser/'+user.id,
		dataType: "json",
		data: jsonString,
		success:function(){
			alert("User updated!");}
	});
	$('#profilePassword').val("");
	$('#profilePasswordConfirm').val("");
}

function updateUserDetails(forename, surname, email, dob){
	var user = findUserById(getCookie("UserLoggedIn="));
	user.forename=forename;
	user.surname=surname;
	user.email=email;
	user.dob=dob;
	var jsonString = JSON.stringify({ 
		"id":user.id,
		"forename": user.forename, 
		"surname": user.surname,
		"email": user.email,
		"password": user.password,
		"dob": user.dob,
		"picture_url": user.picture_url,
	});
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/user/editUser/'+user.id,
		dataType: "json",
		data: jsonString,
		success:function(){
			alert("User updated!");}
	});
	$('#profileForeName').val(user.forename);
	$('#profileSurname').val(user.surname);
	$('#profileEmail').val(user.email);
	$('#profileDOB').val(user.dob);
}

function updateUserPicture(pictureURL){
	var user = findUserById(getCookie("UserLoggedIn="));
	user.picture_url=pictureURL;
	var jsonString = JSON.stringify({ 
		"id":user.id,
		"forename": user.forename, 
		"surname": user.surname,
		"email": user.email,
		"password": user.password,
		"dob": user.dob,
		"picture_url": user.picture_url,
	});
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/user/editUser/'+user.id,
		dataType: "json",
		data: jsonString,
		success:function(){}
	});
	var millisecondsToWait = 2000;
	for(var i=0;i<100;i++){
		setTimeout(function() {
			$('#uploadProgress').css('width', i+'%').attr('aria-valuenow', i);	
		}, (millisecondsToWait-200)/100);
	}
	setTimeout(function() {
		$("#imageFileName").val('');
		$('#uploadImageButton').hide();
		$('#uploadImageModal').modal('toggle');
		alert('Changes will be visible on next refresh');
	}, (millisecondsToWait));

}

function deleteAccount(user){
	if(confirm("Are you sure you want to delete your account?")){
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json',
			url: rootURL + '/user/deleteUser/'+user.id,
			dataType: "json",
			success:function(){
				alert("Account Deleted");}
		});
	}
}

function createJob(userId, title, description, date, location, reward){
	var user = findUserById(userId);
	var jsonString = JSON.stringify({ 
		"owner":user,
		"title": title, 
		"description": description,
		"reward": reward,
		"location": location,
		"date": date,
	});	
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL + '/job/addJob',
		dataType: "json",
		data: jsonString,
		success:function(){
			alert("Job successfully created!");}
	});
}


function getAllJobs() {
	var allJobs;
	$.ajax({
		type: 'GET',
		url: rootURL + '/job/allJobs',
		dataType: "json",
		async: false,
		success: function (data) {
			allJobs = data
		}
	});
	return allJobs;
};

function getJobById(id) {
	var jobData;
	$.ajax({
		type: 'GET',
		url: rootURL + '/job/allJobs/' + id,
		dataType: "json",
		async: false,
		success: function (data) {
			jobData = data
		}
	});
	return jobData;
};

function getJobByOwner(id) {
	var jobData;
	$.ajax({
		type: 'GET',
		url: rootURL + '/job/allJobs/' + id,
		dataType: "json",
		async: false,
		success: function (data) {
			jobData = data
		}
	});
	return jobData;
};

function getJobBySearchKey(searchKey) {
	var allJobs;
	if(!searchKey){
		return getAllJobs();
	}
	$.ajax({
		type: 'GET',
		url: rootURL + '/job/jobsByKey/'+searchKey,
		dataType: "json",
		async: false,
		success: function (data) {
			allJobs = data
		}
	});
	return allJobs;
};




