var Utils = {

	urlQueryString:function(key, queryStr, delim, equal){
		if(queryStr==null)
		queryStr = window.location.search;
		//alert(queryStr);
		if(queryStr.indexOf("?")==0)
			queryStr = queryStr.substring(1,queryStr.length);
		if(delim==null)
			delim ="&"
		if(equal==null)
			equal ="="

		if (queryStr.indexOf(key) != -1){
			var ary1 = queryStr.split(delim);
			for(var i=0;i<ary1.length;i++){
				var ary2 = ary1[i].split(equal)
				if(ary2[0]==key){
					return ary1[i].substring((ary1[i].indexOf(equal)+1),ary1[i].length);
				}
			}
		}
		return null;
	},
	loadXML : function(filePath, callback, options){
		
		$.get(filePath,function(data){
			callback(data, options);
		});
		
	},
	ajaxCommunication : function(sendData, sendURL, callBack, options){
		$.ajax({
			   
			   type:'POST',
			   url:sendURL,
			   async:false,
			   data:sendData,
			   contentType:"application/x-www-form-urlencoded",
			   success:function(data){
				   
				  callBack(data, options);
			   },
			  error:function (xhr, ajaxOptions, thrownError){
				   
				   callBack(thrownError);
			  }
		});	
		
	},
	getCount:function(array, element){
		var cnt = 0;
		for(i=0;i<array.length;i++){
			if(array[i] == element){
				cnt++;
			}
		}
		return cnt;
	},
	stringify: function (vContent) {
		if (vContent instanceof Object) {
			var sOutput = "";
			if (vContent.constructor === Array) {
				for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
				return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
			}
			if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
			for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
			return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
		}
		return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
	},
	
	ruuid: function(){
		
		 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function (c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);
		}
		);
	},
	formatelapsedTime: function(totalSecondsinau)
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
		return "PT"+totalHours+"H"+totalMinutes+"M"+totalSeconds+"S";
		
	   
	}
}