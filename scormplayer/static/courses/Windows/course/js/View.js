var View = {
	
	updateElements:function(container, innerElements){
		//alert(innerElements);
		$('#'+container).html(innerElements);
		
		if(container == "coursemap"){
			
			$("#coursemap").jScrollPane({showArrows:true, scrollbarWidth: 15, arrowSize: 12}).addTouch();
			
		}
	}
}