// SCORM Variables declaration

var Lesson_location = "";
var Lesson_status = "";
var PageVisitedStatus = "";
var Score = "";
var StudentName = "";
var StudentID = ""
var startTime = ""
var elapsedTime = "00:00:00";



/******** SCORM function implementation ***************/

function doLMSInitialize()	{
	
	result = LMSInitialize();
	
	if(result){
		startTime = new Date().getTime();
		doLMSGetValues();	
		
	}else{
		 alert("Unable to Initialize.\nLMSInitialize was not successful.");
	}
	
}

  


function doLMSGetValues(){
	
				
	if (LMSIsInitialized()) {
		
		StudentName = LMSGetValue("cmi.core.student_name");
		StudentID = LMSGetValue("cmi.core.student_id");
		Lesson_location = LMSGetValue("cmi.core.lesson_location");
		PageVisitedStatus = LMSGetValue("cmi.suspend_data");
		Lesson_status = LMSGetValue("cmi.core.lesson_status");
		Score = LMSGetValue("cmi.core.score.raw");
		
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
			
	}
	
}


function doLMSSetValue(completion, lastVisistedPage, pageProgress, Score) {

	LMSSetValue("cmi.core.lesson_location", lastVisistedPage);
	LMSSetValue("cmi.core.lesson_status", completion);
			
	LMSSetValue("cmi.suspend_data", pageProgress);
	LMSSetValue("cmi.core.score.raw", Score);
	
	calculateelapsedTime();	
	LMSSetValue( "cmi.core.session_time", elapsedTime );
		
	LMSCommit();
	  
}
 
function doLMSFinish() {
	
	//doLMSSetValue(1);
	LMSFinish("");
	
    
}

function calculateelapsedTime()
{
	if ( startTime != 0 )
	{
		var currentTime = new Date().getTime();
        var totalSecondsinau = ( (currentTime - startTime) / 1000 );
		elapsedTime = formatelapsedTime(totalSecondsinau);
	}
	else
	{		
		elapsedTime = "00:00:00";
	}
  
 
}

function formatelapsedTime(totalSecondsinau)
{

	var remainder = totalSecondsinau % 3600;
	var totalHours = "" + (totalSecondsinau - remainder)/3600;                        
	remainder = remainder % 60;  
	var totalMinutes = "" +  (totalSecondsinau - totalHours*3600 - remainder) /60;    
	var totalSeconds = "" + Math.round(remainder); 
	if(totalSeconds == "60") 
	{
		totalSeconds = "00";
		totalMinutes = "" + (totalMinutes + 1);
	} 
	if (totalHours.length < 2) totalHours = "0" + totalHours;
	if (totalMinutes.length < 2) totalMinutes = "0" + totalMinutes;
	if (totalSeconds.length <2) totalSeconds = "0" + totalSeconds;
	return totalHours + ":" + totalMinutes + ":" + totalSeconds;
   
}