$(document).ready(function(){
	
	$('#container').hide();
	
	//alert("browser viewport :: " + $( window ).height() + " HTML document :: " + $( document ).height() );
	//alert(($( window ).height()*75)/100);
	
	$("#content").height(($(window).height()*75)/100);
	$('#coursemap').height(($('#content').height()*90)/100);
	$('#search').height(($('#content').height()*90)/100);
	
	var mode;
	mode = Utils.urlQueryString("type",document.location.search);
	
	if(mode == null){
		mode = "wbt";
	}
	
	if(resellerName != ""){
		
		var file = bridgeURL + "?reseller=" + resellerName;
		//alert(file);
		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(file)+"%22&format=xml&callback=?", function(xml) {
			var result = xml.results[0];
			result = result.replace(/&lt;/g,"<");
			result = result.replace(/&gt;/g,">");
			result = $.parseXML(result);
			//result = $(result);
			//alert(result);
			$(result).find("errornumber").each(function(){
				//alert($(this).text());
				if($(this).text() == "0"){
					var framework = new Framework(mode);
				}else{
					$('#reseller_popup').show();
				}
			});
			
			
		});	
		
	}else{
		var framework = new Framework(mode);
	}	
	
	
   /* var playerOrigin = '*';
    var status = $('.status');

    // Listen for messages from the player
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    }
    else {
        window.attachEvent('onmessage', onMessageReceived, false);
    }

    // Handle messages received from the player
    function onMessageReceived(event) {
        // Handle messages from the vimeo player only
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
            return false;
        }
        
        if (playerOrigin === '*') {
            playerOrigin = event.origin;
        }
        
        var data = JSON.parse(event.data);
       // alert(data.event);
        switch (data.event) {
            case 'ready':
                onReady();
                break;
               
            case 'playProgress':
                onPlayProgress(data.data);
                break;
                
            case 'pause':
                onPause();
                break;
               
            case 'finish':
                onFinish();
                break;
        }
    }

    

    // Helper function for sending a message to the player
    function post(action, value) {
        var data = {
          method: action
        };
        
        if (value) {
            data.value = value;
        }
        var player = $('iframe');
        var message = JSON.stringify(data);
		//alert(message);
        player[0].contentWindow.postMessage(message, playerOrigin);
    }

    function onReady() {
       // status.text('ready');
        
        post('addEventListener', 'pause');
        post('addEventListener', 'finish');
        post('addEventListener', 'playProgress');
    }

    function onPause() {
       // alert('paused');
    }

    function onFinish() {
		$('#next').click();
        //alert('finished');
    }

    function onPlayProgress(data) {
       // status.text(data.seconds + 's played');
    }
	
	*/
	
	$(window).bind('orientationchange', function(){
		$("#content").height(($(window).height()*75)/100);
		var h = (($(window).height()*75)/100-10);
		$("#ContentFrame").height(h);
		var h1 = $('#content').height()/2;
		$('#nav').css({top:h1});
		$('#coursemapContainer').height($('#content').height() - 8);
		
		$('#searchContainer').height($('#content').height() - 8);
		//$('#coursemapContainer').slideToggle();
		$("#coursemap").jScrollPaneRemove();
		
		$('#search').height(($('#content').height()*90)/100);
		$('#coursemap').height(($('#content').height()*90)/100);
		
		//$('#coursemapContainer').slideToggle();
		$("#coursemap").jScrollPane({showArrows:true, scrollbarWidth: 15, arrowSize: 12}).addTouch();
		$('.jScrollPaneDrag').addTouch();
		
		
		var percentage = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*$('#progress').width();
		$('#fill').width(percentage);
		var percentageText = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*100;
		$('#progressTxt').text(Math.ceil(percentageText) +"%");
		
		//$("#content").height(($(window).height()*75)/100);	
	});
	
	$( window ).resize(function() {
		$("#content").height(($(window).height()*75)/100);
		$('#coursemap').height(($('#content').height()*90)/100);
		$('#search').height(($('#content').height()*90)/100);
		$('#ContentFrame').height(($('#content').height()*90)/100);
		$('#coursemapContainer').hide();
		var percentage = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*$('#progress').width();
		$('#fill').width(percentage);
		var percentageText = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*100;
		$('#progressTxt').text(Math.ceil(percentageText) +"%");
	});
	
	$(window).bind('beforeunload', function () {
		Navigation.exit();
		 window.opener.hide();
	});
	
	//alert(mode);
	$('#coursemapbtn').click(function(){
		$("#coursemap").jScrollPaneRemove();
		$('#coursemap').height(($('#content').height()*90)/100);
				
		$('#coursemapContainer').slideToggle();
		$("#coursemap").jScrollPane({showArrows:true, scrollbarWidth: 15, arrowSize: 12}).addTouch();
		$('.jScrollPaneDrag').addTouch();
	
	});
		
	$('#back').click(function(){
	
		if(!$(this).hasClass('disable')){
			if(Framework.currentIndex > 0){
				Framework.currentIndex--;
				$('#'+Framework.currentIndex).click();
			}
		}
	});
	
	$('#next').click(function(){
		if(!$(this).hasClass('disable')){
			if(courseArray.length > Framework.currentIndex-1){
				Framework.currentIndex++;
				$('#'+Framework.currentIndex).click();			
			}
		}
	});
	
	$('#Search_txt').focus(function() {
		$(this).val("");
	});
	
	$("#Search_txt").keyup(function(event){
		if(event.keyCode == 13){
			$("#searchbtn").click();
		}
	});
	
	$('#searchbtn').click(function(){
		var cnt = 0;
		var searchText = $('#Search_txt').val().toLowerCase();
		$('#searchLinkHolder').html("");
		
		for(i=0;i<courseArray.length;i++){
			var tempText = courseArray[i].keywords.toLowerCase();
			if(tempText.indexOf(searchText) != -1){
				cnt++;
				var id = courseArray[i].id;
				$('#searchLinkHolder').append("<li id='search_" + id +"' value=" + id + ">" + courseArray[i].displayText + "</li>");
				
				$('#search_'+ id).click(function(){
					$('#'+$(this).attr('value')).click();
					$('#searchContainer').hide();
					//alert($(this).attr('value'));
					//loadContent($(this).attr('value'));
				});
			}
		}
		$("#searchLinkHolder").jScrollPaneRemove();
		
		if(cnt == 0){
			$('#searchLinkHolder').html("<span class='noresult'>No result found.</span>");
		}
		$('#searchContainer').slideDown();
		$("#searchLinkHolder").jScrollPane({showArrows:true, scrollbarWidth: 15, arrowSize: 12}).addTouch();
		$('.jScrollPaneDrag').addTouch();
		
	});
	$('#searchClose').click(function(){
		$('#searchContainer').slideToggle();
		
	});
	
	$('#bookmark_ok').click(function(){
		$('#'+Framework.currentIndex).click();
		$('#disabler').hide();
		$('#bookmark_container').hide();
	});
	$('#bookmark_cancel').click(function(){
		$('#disabler').hide();
		$('#bookmark_container').hide();
		Framework.currentIndex = 0;
		$('#'+Framework.currentIndex).click();
	});
	
	$('#closeBtn').click(function(){
		//window.close();
		//top.close();
		//window.open('', '_self', ''); 
		//window.top.close();
		top.close();
		//parent.window.close();
	});

});