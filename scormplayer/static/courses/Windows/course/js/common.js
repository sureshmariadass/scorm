// Handle messages received from the player
		

		
		// Helper function for sending a message to the player
		function post(action, value) {
			var data = {
			  method: action
			};
			
			if (value) {
				data.value = value;
			}
			
			var message = JSON.stringify(data);
			alert(message);
			player[0].contentWindow.postMessage(message, playerOrigin);
		}

		function onReady() {
			status.text('ready');
			
			post('addEventListener', 'pause');
			post('addEventListener', 'finish');
		   // post('addEventListener', 'playProgress');
		}

		function onPause() {
			alert('paused');
		}

		function onFinish() {
		   alert('finished');
		}

		function onPlayProgress(data) {
		   // status.text(data.seconds + 's played');
		}