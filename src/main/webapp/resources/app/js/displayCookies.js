(function() {
	$("#cookieTable").hide();
	$("#errorMessage").html("");
	$("#successMessage").html("");

	$("#displayCookieForm").submit(function(e) {
		$("#errorMessage").html("");
		$("#successMessage").html("");
		$("#cookieTable").hide();
		$("#cookieTable tbody").empty();

		var form = $(this);
		var url = form.attr('action');
		var method = form.attr('method');
		$.ajax({
			type : method,
			url : url,
			data : form.serialize(),
			success : function(response) {
				if (response.status == "success") {
					var userCookieList = response.data;
					for (var i = 0; i < userCookieList.length; i++) {
						$("#cookieTable tbody").append("<tr><td>"
								+ encodeHtml(userCookieList[i].username)
								+ "</td><td>"
								+ encodeHtml(userCookieList[i].cookie)
								+ "</td><td>"
								+ encodeHtml(userCookieList[i].cookieDate)
								+ "</td></tr>"
						)
					}
					$("#cookieTable").show();
				} else {
					$("#errorMessage").html(encodeHtml(response.data));
				}
			},
			error : function(xhr) {
				if(xhr.status == 401) {
					if(location.hostname == 'localhost') {
						location.href = location.protocol + '//' + location.host + '/ROOT';
					} else {
						location.href = location.protocol + '//' + location.host;
					}
				}
			}
		});
		e.preventDefault();
	});

	$("#deleteCookieForm").submit(function(e) {
		$("#errorMessage").html("");
		$("#successMessage").html("");
		$("#cookieTable").hide();
		$("#cookieTable tbody").empty();

		var form = $(this);
		var url = form.attr('action');
		var method = form.attr('method')
		$.ajax({
			type : method,
			url : url,
			data : form.serialize(),
			success : function(response) {
				if (response.status == "success") {
					$("#successMessage").html(encodeHtml(response.data));
				} else {
					$("#errorMessage").html(encodeHtml(response.data));
				}
			},
			error : function(xhr) {
				if(xhr.status == 401) {
					if(location.hostname == 'localhost') {
						location.href = location.protocol + '//' + location.host + '/ROOT';
					} else {
						location.href = location.protocol + '//' + location.host;
					}
				}
			}
		});
		e.preventDefault();
	});

})();