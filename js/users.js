
	function checkStatus(username) {
		return (onlineusers.indexOf(username) != -1);
	}
	
	var onlineusers = "";
//	$.post("AJAX/whosOnline.php", {}, function(data) {
//	onlineusers = data;
	//alert(data);
	
	
		//for (i = 0; i < users.length; i++) {
		var i = 0;
		//	users = ["null"];
		var interval = window.setInterval(function(){
			var username = users[i][0];

			$.post("AJAX/getskin.php", {username:username}, function(data) {
				var userInfo = JSON.parse(data);
				var online = checkStatus(userInfo[1]);
				
				var parent = document.createElement("DIV");
				parent.setAttribute("id", userInfo[1]);
				parent.setAttribute("class", "user");


				//Append Sorted
					var base = document.getElementById("users-wrapper");
					if (base.childElementCount === 0) {
						
							document.getElementById("users-wrapper").appendChild(parent);
					} else {
						
						for (var i = 0; i < base.childElementCount; i++) {
							var currentChildNode = base.children[i];
							var currentId = currentChildNode.id;
							var currentstate = currentChildNode.children[1].children[1].getAttribute("online");

							if (online) {
								if (currentstate == "true") {
									if (userInfo[1].toLowerCase() < currentId.toLowerCase()) {
										$(currentChildNode).before(parent);
										break;
									} 
									else if (i == base.childElementCount - 1 ||
											   base.children[i+1].children[1].children[1].getAttribute("online") == "false")
									{ // Am Ende der Liste angekommen
										
										$(currentChildNode).after(parent);
										break;
									} else continue;
								} else {
									$("#users-wrapper").prepend(parent);
									break;
								}
							} else {
								if (currentstate == "true") {
									continue;
								} else {
									if (userInfo[1].toLowerCase() < currentId.toLowerCase()) {
										$(currentChildNode).before(parent);
										break;
									} else if (i == base.childElementCount - 1) { // Am Ende der Liste angekommen
										$(currentChildNode).after(parent);
										break;
									} else continue;
								}
							}

					}

						}
				//Finish Append

				
				var wrapper = document.createElement("DIV");
				wrapper.setAttribute("class", "img-wrapper");
				
					var img = document.createElement("IMG");
					img.setAttribute("src", userInfo[0]);
					img.setAttribute("class", "avatar");
					wrapper.appendChild(img);
				
				parent.appendChild(wrapper);
				
				var flexcontainer = document.createElement("DIV");
				flexcontainer.setAttribute("class", "flexcontainer");
				
					var ingamename = document.createElement("DIV");
					ingamename.setAttribute("class", "user-ingamename");
					ingamename.innerHTML = "<p class=\"user-ingamename\">"+userInfo[1]+"</p>";
					flexcontainer.appendChild(ingamename);

					var status = document.createElement("DIV");
					status.setAttribute("id", "status");
					status.setAttribute("online", online);

					/*if (online) {
						status.setAttribute("class", "status online");
						status.innerHTML = "<p class=\"status\">online</p>";
					} else {
						status.setAttribute("class", "status offline");
						status.innerHTML = "<p class=\"status\">offline</p>";
					}*/
				  
					flexcontainer.appendChild(status);
				
				parent.appendChild(flexcontainer);
				
				if (userInfo[2][1] !== null) {
					var profile = document.createElement("A");
					profile.setAttribute("class", "fbprofile");

						var ppicture = document.createElement("DIV");
						ppicture.setAttribute("class", "ppicture");

						profile.setAttribute("href", "https://www.facebook.com/" + userInfo[2][1]);
						profile.setAttribute("target", "blank");
						ppicture.innerHTML = "<img src=\"https://graph.facebook.com/"+userInfo[2][1]+"/picture\" />";


						var pname = document.createElement("DIV");
						pname.innerHTML = "<p class=\"pname\">"+userInfo[2][0]+"</p>";
						pname.setAttribute("class", "pname");

						profile.appendChild(ppicture);
						profile.appendChild(pname);

					parent.appendChild(profile);
				}
				else {
					var profile = document.createElement("DIV");
					profile.setAttribute("class", "fbprofile-nofb");

						var pname = document.createElement("DIV");
						pname.innerHTML = "<p class=\"pname\">"+userInfo[2][0]+"</p>";
						pname.setAttribute("class", "pname");

						profile.appendChild(pname);

					parent.appendChild(profile);
					
				}


				
			});
			i += 1;
			if (i == users.length) {
				clearInterval(interval);
			}
		},1);
		//}	
	
//	});
