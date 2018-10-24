package com.eh.openshiftapp.model;

public class KeyloggedUser {

	private String domain;
	private String page;
	private String pressedKey;
	private String clientIP;
	private String createdDate;

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPressedKey() {
		return pressedKey;
	}

	public void setPressedKey(String pressedKey) {
		this.pressedKey = pressedKey;
	}

	public String getClientIP() {
		return clientIP;
	}

	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
}
