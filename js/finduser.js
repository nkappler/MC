function getStringDistance(a, b) {
  if(a.length === 0) return b.length; 
  if(b.length === 0) return a.length; 
 
  var matrix = [];
 
  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }
 
  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }
 
  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }
 
  return matrix[b.length][a.length];
}

function findUsername() {
	var givenString = document.getElementById("username-input").value;
	if (givenString === "" || givenString === null || givenString === undefined) {
		alert("Bitte gib deinen Namen oder \ndeinen Minecraft-Namen an.");
		return null;
	}
	
	var distance = -1;
	var bestIndex = 0;
	
	$.post("AJAX/getFindUserArray.php", {}, function(data) {
		var suggestions = JSON.parse(data);
		for (var i = 0; i < suggestions.length; i++) {
			for (var j = 0; j < suggestions[i].length; j++) {
				var currDistance = getStringDistance(givenString.toLowerCase(), suggestions[i][j].toLowerCase());
				if (currDistance < distance || distance == -1) {
					distance = currDistance;
					bestIndex = i;
				}
			}
		}
		
		showProfile(suggestions[bestIndex][0]);
	});
}

function showProfile(username) {
	var su = document.getElementById("selected-user");
	if (su !== undefined && su !== null) su.remove();
	
	
	$.post("AJAX/getskin.php", {username:username}, function(data) {
		var userInfo = JSON.parse(data);
		
		var outerdiv = document.createElement("DIV");
		outerdiv.setAttribute("id", "selected-user");
		outerdiv.innerHTML = "<p>Bist das du?</p>";

		var div = document.createElement("DIV");
		div.setAttribute("class", "cuser");
		var parent = div;

		document.getElementById("select-user-form").appendChild(outerdiv);
		outerdiv.appendChild(parent);

		var wrapper = document.createElement("DIV");
		wrapper.setAttribute("class", "img-wrapper");

			var img = document.createElement("IMG");
			img.setAttribute("src", userInfo[0]);
			img.setAttribute("class", "avatar");
			wrapper.appendChild(img);

		parent.appendChild(wrapper);

		var nameswrapper = document.createElement("DIV");
		nameswrapper.setAttribute("class", "nameswrapper");

			var ingamename = document.createElement("DIV");
			ingamename.setAttribute("class", "cuser-ingamename");
			ingamename.innerHTML = "<p class=\"cuser-ingamename\">"+userInfo[1]+"</p>";
			nameswrapper.appendChild(ingamename);

			var pname = document.createElement("DIV");
			pname.innerHTML = "<p class=\"cuname\">"+userInfo[2][0]+"</p>";
			pname.setAttribute("class", "cuname");
			nameswrapper.appendChild(pname);
		
		parent.appendChild(nameswrapper);
		
		if (userInfo[2][1] !== null) {

			var ppicture = document.createElement("DIV");
			ppicture.setAttribute("class", "cupicture");
			ppicture.innerHTML = "<img src=\"https://graph.facebook.com/"+userInfo[2][1]+"/picture\" />";

			//parent.appendChild(ppicture);

		}

		
		var form = document.createElement("FORM");
		form.setAttribute("action", "process_username.php");
		form.setAttribute("method", "post");
		
		var hiddenfield = document.createElement("input");
		hiddenfield.style.display = "none";
		hiddenfield.setAttribute("value", username);
		hiddenfield.setAttribute("name", "username");
		form.appendChild(hiddenfield);

		var submitbutton = document.createElement("INPUT");
		submitbutton.setAttribute("type", "submit");
		submitbutton.setAttribute("class", "login-form");
		submitbutton.setAttribute("value", "Ja, fortfahren...");
		form.appendChild(submitbutton);
		
		outerdiv.appendChild(form);
		
		document.getElementById("checkButton").setAttribute("value", "Aktualisieren");



	});
}