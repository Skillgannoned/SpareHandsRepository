var Job = Backbone.Model.extend({
	urlRoot: rootURL,
	defaults:{       
		"id":"",
		"owner_id":"",
		"title":"",     
		"description":"",  
		"reward":"", 
		"location":"",  
		"date":"",      
		"picture_url":"",  
		},
  initialize: function(){
    console.log("modelJS init");
    this.on('change', function(){
    	console.log('Values for a model have changed');
    });
  }
});

var jobList = Backbone.Collection.extend({
	model: Job,
	url: "http://localhost:8080/SpareHands/rest/job/allJobs"});
