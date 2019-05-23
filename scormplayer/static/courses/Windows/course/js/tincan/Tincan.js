

var Tincan = {
	
	externalRegistration: "",
	activity_id: "",
	content_endpoint: "",
	actor: "",
	content_token: "",
	registration: "",
	authentication: "",
	endPoint: "",
	statementId: "",
	startTime:"",
	attempt_send:false,
	completion_send:false,
	initialize: function(){
		
		this.externalRegistration = unescape(Utils.urlQueryString("externalRegistration", document.location.search));
		this.activity_id = unescape(Utils.urlQueryString("activity_id", document.location.search));
		this.content_endpoint =unescape(Utils.urlQueryString("content_endpoint", document.location.search));
		this.actor = unescape(Utils.urlQueryString("actor", document.location.search));
		this.content_token = unescape(Utils.urlQueryString("content_token", document.location.search));
		this.registration = unescape(Utils.urlQueryString("registration", document.location.search));
		this.authentication = unescape(Utils.urlQueryString("auth", document.location.search));
		this.endPoint = unescape(Utils.urlQueryString("endpoint", document.location.search));
		//this.statementId = unescape(Utils.urlQueryString("endpoint", document.location.search));
		//alert(this.actor.toString());
		
		this.getData();
	},
	
	getData: function(){
		this.startTime  = new Date().getTime();
		var URL = this.endPoint + "activities/state?method=GET"
		
		//var data = "activityId=" + encodeURIComponent(this.activity_id) + "&actor=" + encodeURIComponent(this.actor) + "&stateId=location&registration=" + encodeURIComponent(this.registration) + "&externalRegistration=" + encodeURIComponent(this.externalRegistration)+ "&content_endpoint=" + encodeURIComponent(this.content_endpoint)	+ "&content_token=" + encodeURIComponent(this.content_token) + "&Authorization=" + this.authentication+"&Content-Type=application/json";		
		//	alert("getData :: " + this.activity_id);
		
		//window.console.log("URL :: " + URL);
		
		var data = "stateId=resume&actor="+encodeURIComponent(this.actor)+"&Content%2DType=application%2Fjson&Authorization="+encodeURIComponent(this.authentication)+"&registration=36fc1ee0-2849-4bb9-b697-71cd4cad1b6e&activityId="+encodeURIComponent(this.activity_id);
		
		//var data = "stateId=resume&actor=%7B%22objectType%22%3A%22Agent%22%2C%22name%22%3A%22biggerbrains%22%2C%22mbox%22%3A%22mailto%3Astuart%40accessetraining%2Ecom%22%7D&Content%2DType=application%2Fjson&Authorization=Basic%20MTMtMjEyMmZjMTBkZDA2MzFlOjFmOWU4ZmRlYzNmMDAxMTc1MzhmOTBkMjQ%3D&registration=36fc1ee0%2D2849%2D4bb9%2Db697%2D71cd4cad1b6e&activityId=http%3A%2F%2Faccessetraining.com%2F%3Fpost_type%3Dgb_xapi_content%26p%3D442"

		 Utils.ajaxCommunication(data, URL, Tincan.parseData, "");
		
	},
	
	putData: function(Lesson_location, completionArray){
		
		var URL = this.endPoint + 'activities/state?method=PUT'
		
		
		var data = 'stateId=resume&actor='+encodeURIComponent(this.actor)+'&Content%2DType=application%2Fjson&Authorization='+encodeURIComponent(this.authentication)+'&registration=36fc1ee0-2849-4bb9-b697-71cd4cad1b6e&activityId='+encodeURIComponent(this.activity_id)+'&content={"location":"' + Lesson_location + '","suspend_data":"' + completionArray + '"}';	

		//alert(data);		
		//	alert("getData :: " + this.activity_id);
		
		//window.console.log("URL :: " + URL);
		
		 Utils.ajaxCommunication(data, URL, "", "");
		
	},
	
	putStatement: function(){
		var URL = this.endPoint + 'statements/?method=PUT';
		
		//Lesson_status = "incomplete";
		
		if(Framework.completion == "completed" && this.completion_send == false){
			
			this.completion_send = true;
			var content = '{"context":{"registration":"36fc1ee0-2849-4bb9-b697-71cd4cad1b6e","contextActivities":{"grouping":{"id":"' +this.activity_id +'"},"parent":{"id":"' +this.activity_id +'"}}},"result":{"completion":true,"extensions":{"viewcount":14},"duration":"' +Tincan.calculateelapsedTime(this.startTime) +'"},"verb":"completed","actor":' + this.actor + ',"object":{"definition":{"type":"Course","name":{"und":""},"description":{"und":""}},"id":"'+this.activity_id +'"}}';
			
			var data = 'Content-Type=application/json&Authorization=' + encodeURIComponent(this.authentication) +' &content='+encodeURIComponent(content)+'&statementId=' + encodeURIComponent(UUID.generate());
			
			 Utils.ajaxCommunication(data, URL, "", "");
			/*var stmt = "content=" + {	
				"context":{
					"contextActivities":{
						"grouping":{"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"},
						"parent":{"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"}
					},
					"registration":"36fc1ee0-2849-4bb9-b697-71cd4cad1b6e"
				},
				"actor":{
					"mbox":"mailto:stuart@accessetraining.com",
					"name":"biggerbrains",
					"objectType":"Agent"
				},
				"verb":"completed",
				"object":{
					"definition":{
						"type":"Course",
						"name":{"und":""},
						"description":{"und":""}
					},
					"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"
				}
			}*/
			
		}else{
			
			/*var stmt = {
				"context":{
					"contextActivities":{
						"grouping":{"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"}
						,"parent":{"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"}
					},
					"registration":"36fc1ee0-2849-4bb9-b697-71cd4cad1b6e"
				},
				"actor":{
					"mbox":"mailto:stuart@accessetraining.com",
					"name":"biggerbrains",
					"objectType":"Agent"
				},
				"verb":"attempted",
				"object":{
					"definition":{
						"type":"Course",
						"name":{"und":""},
						"description":{"und":""}
					},
					"id":"http://accessetraining.com/?gb_xapi_content=windows-8-essentials"
				}
				
			}*/
			//alert("this.attempt_send :: " + this.attempt_send + " Type :: " + typeof(this.attempt_send));
			
			if(this.attempt_send == false){
				this.attempt_send = true;
				var content = '{"context":{"registration":"36fc1ee0-2849-4bb9-b697-71cd4cad1b6e","contextActivities":{"grouping":{"id":"' +this.activity_id +'"},"parent":{"id":"' +this.activity_id +'"}}},"verb":"attempted","actor":' + this.actor + ',"object":{"definition":{"type":"Course","name":{"und":""},"description":{"und":""}},"id":"'+this.activity_id +'"}}';
				
				var data = 'Content-Type=application/json&Authorization=' + encodeURIComponent(this.authentication) +'&content='+encodeURIComponent(content)+'&registration=36fc1ee0%2D2849%2D4bb9%2Db697%2D71cd4cad1b6e&statementId=' + encodeURIComponent(UUID.generate());
				//alert(data);
				 Utils.ajaxCommunication(data, URL, "", "");
			}
			
			
		}
				
			//alert(data);
			
			//alert(URL);
			
			//var data = "registration=36fc1ee0%2D2849%2D4bb9%2Db697%2D71cd4cad1b6e&content=%7B%22verb%22%3A%22c%22%2C%22actor%22%3A%7B%22mbox%22%3A%22mailto%3Astuart%40accessetraining.com%22%2C%22name%22%3A%22biggerbrains%22%2C%22objectType%22%3A%22Agent%22%7D%2C%22context%22%3A%7B%22registration%22%3A%2236fc1ee0-2849-4bb9-b697-71cd4cad1b6e%22%2C%22contextActivities%22%3A%7B%22grouping%22%3A%7B%22id%22%3A%22http%3A%2F%2Faccessetraining.com%2F%3Fpost_type%3Dgb_xapi_content%26p%3D442%22%7D%2C%22parent%22%3A%7B%22id%22%3A%22http%3A%2F%2Faccessetraining.com%2F%3Fpost_type%3Dgb_xapi_content%26p%3D442%22%7D%7D%7D%2C%22object%22%3A%7B%22id%22%3A%225w65kvzJm6Y%22%7D%7D&Content%2DType=application%2Fjson&statementId=37d581b8%2Dc4fa%2D42e3%2D8d64%2D863999701883&Authorization=Basic%20MTMtMjEyMmZjMTBkZDA2MzFlOjFmOWU4ZmRlYzNmMDAxMTc1MzhmOTBkMjQ%3D";	
			
			
			
			
			 
			
	},
	
	parseData: function(data){
		
		//alert(typeof data);
		if(typeof data == "object"){
			
			Lesson_location = data["location"];
			PageVisitedStatus = data["suspend_data"];
			
			var progressObj = new Object();
			if(Lesson_location != ""){
				progressObj.Lesson_location = Lesson_location;
				progressObj.PageVisitedStatus = PageVisitedStatus;
			}else{
				progressObj.Lesson_location = null;
				progressObj.PageVisitedStatus = null;
			}
			//alert("Lesson_location :: " + Lesson_location);
			Navigation.navigation(progressObj);
			
			//alert("Lesson_location :: " + Lesson_location + " PageVisitedStatus :: " + PageVisitedStatus);
		}
		
		//LoadCourse();
	},
	
	calculateelapsedTime : function(startTime)
	{		
		if (startTime != 0 )
		{
			var currentTime = new Date().getTime();
			var totalSecondsinau = ( (currentTime - startTime) / 1000 );
			return Utils.formatelapsedTime(totalSecondsinau);
		}
		else
		{		
			return "00:00:00";
		}
	}
	
	
	
	
}