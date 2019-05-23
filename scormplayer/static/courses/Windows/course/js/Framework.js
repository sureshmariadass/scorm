function Framework(mode){
	Framework.mode = mode;
	Framework.Lesson_location = "";
	Framework.PageVisitedStatus = new Array();
	Framework.completion = "incomplete";
	Framework.currentIndex = 0;
	Framework.protocol = window.location.href.indexOf("https") != -1 ? "https" : "http";
	//this.includeFiles(mode.toLowerCase());
	Utils.loadXML("xml/module.xml", this.parseXML);
	this.includeFiles(mode);
}

Framework.prototype.includeFiles = function(mode){
	if(mode == "scorm"){		// scorm supporting files are loaded here
		
		$.getScript("js/scorm/APIWrapper12.js", function() {
			$.getScript("js/scorm/Scorm12.js", function() {
													  	
				doLMSInitialize();
			});
		});
		
	}else if(mode == "scorm13"){		// scorm supporting files are loaded here
		
		$.getScript("js/scorm/APIWrapper13.js", function() {
			$.getScript("js/scorm/Scorm13.js", function() {
													  	
				doLMSInitialize();
			});
		});
		
	}else if(mode == "tincan"){	
		
		$.getScript("js/tincan/Tincan.js", function() {
			$.getScript("js/tincan/uuid.js", function() {
													  	
				Tincan.initialize();
			});
		});
	
	}else{
		$.getScript("js/lib/cookie.js", function() {
			$.getScript("js/web/Web.js", function() {
				Web.get();
			});
		});
	}
}

Framework.prototype.parseXML = function(xml){
	
	this.courseArray = new Array();
	var course = $(xml).find("course");
	document.title = $(course).attr("title");
	$('#title').html($(course).attr("title"));
	Framework.courseName = $(course).attr("title");
	Framework.courseId = $(course).attr("id");
	
	var str = "<ul>";
	
	$($(xml).find("page")).each(function(i){
		Framework.PageVisitedStatus[i] = 0;
		var obj = new Object();
		obj.id = i;
		obj.displayText = $(this).attr('displayText');
		obj.link = $(this).attr('link');
		obj.keywords = $(this).attr('keywords');
		courseArray.push(obj);	
		
		str += "<li id='"+i+"' class='link' tooltip='" + $(this).attr('tooltip')+"' url='" + $(this).attr('link') + "'>" + $(this).attr('displayText') + "</li>";
	})
	str += "</ul>";
	
	View.updateElements("coursemap",str);
	
	$(".link").click(function(){
		if($('#coursemapContainer').is(":visible")){
			$('#coursemapContainer').slideToggle();
		}
		Navigation.loadPages($(this));
	});
	$('#container').show();
	//Navigation.navigation();
}



