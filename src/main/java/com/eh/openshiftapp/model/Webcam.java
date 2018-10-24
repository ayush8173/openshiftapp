package com.eh.openshiftapp.model;

public class Webcam {

	private String clientIP;
	private String geoLocation;
	private String blobString;
	private String turnOnCam;

	public String getClientIP() {
		return clientIP;
	}

	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}

	public String getGeoLocation() {
		return geoLocation;
	}

	public void setGeoLocation(String geoLocation) {
		this.geoLocation = geoLocation;
	}

	public String getBlobString() {
		return blobString;
	}

	public void setBlobString(String blobString) {
		this.blobString = blobString;
	}

	public String getTurnOnCam() {
		return turnOnCam;
	}

	public void setTurnOnCam(String turnOnCam) {
		this.turnOnCam = turnOnCam;
	}
}
