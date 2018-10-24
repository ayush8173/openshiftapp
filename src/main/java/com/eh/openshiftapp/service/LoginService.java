package com.eh.openshiftapp.service;

import java.sql.SQLException;

import com.eh.openshiftapp.dao.LoginDao;
import com.eh.openshiftapp.model.User;

public class LoginService {
	final LoginDao loginDao = new LoginDao();

	public User doLogin(String username, String password) throws SQLException {
		User user = loginDao.doLogin(username, password);
		return user;
	}
}
