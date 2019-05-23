var Web = {
	
	get:function(){
		var lesson_location_cookie = "lesson_location" + Framework.courseId;
		var pagevisisted_cookie = "pagevisitedstatus" + Framework.courseId;
		var obj = new Object();
		obj.Lesson_location = readCookie(lesson_location_cookie);
		obj.PageVisitedStatus = readCookie(pagevisisted_cookie);
		//alert(obj.Lesson_location);
		Navigation.navigation(obj);
	},
	
	set:function(Lesson_location, PageVisitedStatus){
		var lesson_location_cookie = "lesson_location" + Framework.courseId;
		var pagevisisted_cookie = "pagevisitedstatus" + Framework.courseId;
		createCookie(lesson_location_cookie,Lesson_location,100);
		createCookie(pagevisisted_cookie,PageVisitedStatus,100);
	}
}