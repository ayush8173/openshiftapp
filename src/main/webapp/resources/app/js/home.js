$(document).ready(function() {

	$("#logout").click(function() {
		$("#logoutForm").submit();
	});

	loadMenu("_welcome.html");
	
	setInterval(function(){
		$.ajax({
			type : "GET",
			url : "_welcome.html",
			error : function(xhr) {
				if(xhr.status == 401) {
					location.href = location.protocol + '//' + location.host + '/WebTrap';
//					if((location.hostname).endsWith("openshiftapps.com")) {
//						location.href = location.protocol + '//' + location.host;
//					} else {
//						location.href = location.protocol + '//' + location.host + '/ROOT';
//					}
				}
			}
		});
	},3600000);
});

// function displaybook(bookId) {
// $("#bookId").val(bookId);
// $("#displayBookForm").submit();
// }

var imgTimer;

function loadMenu(menuName) {
	includeHTML(menuName);
	$("ul.nav-sidebar li").removeClass("active");

	if ("_welcome.html" == menuName) {
		$("ul.nav-sidebar li:eq(0)").addClass("active");
	} else if ("_displayCookies.html" == menuName) {
		$("ul.nav-sidebar li:eq(1)").addClass("active");
	} else if ("_displayKeylogs.html" == menuName) {
		$("ul.nav-sidebar li:eq(2)").addClass("active");
	} else if ("_displayWebcam.html" == menuName) {
		$("ul.nav-sidebar li:eq(3)").addClass("active");
	}
}

function includeHTML(fileName) {
	$.ajax({
		type : "GET",
		url : fileName,
		success : function(response) {
			$('#mainContent').html(response);
		},
		error : function(xhr) {
			if(xhr.status == 401) {
				location.href = location.protocol + '//' + location.host + '/WebTrap';
			}
		}
	});
	return;
}

function encodeHtml(value) {
	return $('<div/>').text(value).html();
}

function decodeHtml(value) {
	return $('<div/>').html(value).text();
}